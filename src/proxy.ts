import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Admin is gated here, at the network boundary, before any admin route
 * renders. Two properties matter:
 *
 *  1. It fails closed. With no credentials configured the admin area is not
 *     reachable at all, rather than reachable with a default password. The
 *     previous client-side gate shipped its password in the browser bundle;
 *     this one never leaves the server.
 *  2. The comparison is constant-time, so a response cannot be used to
 *     recover the credentials one character at a time.
 */

const ADMIN_PREFIX = "/admin";

/** Constant-time string comparison. Edge runtime has no `timingSafeEqual`. */
function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  // Compare a fixed number of bytes so length alone does not leak via timing.
  const length = Math.max(left.length, right.length);
  let diff = left.length ^ right.length;
  for (let i = 0; i < length; i += 1) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return diff === 0;
}

function unauthorized(message: string): NextResponse {
  return new NextResponse(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="OffMarketYacht Admin", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
      // Never let an admin response be cached or indexed.
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(ADMIN_PREFIX)) {
    return NextResponse.next();
  }

  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!user || !password) {
    return new NextResponse(
      "Admin is disabled. Set ADMIN_USER and ADMIN_PASSWORD to enable it.",
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      }
    );
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return unauthorized("Authentication required.");
  }

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized("Malformed credentials.");
  }

  const separator = decoded.indexOf(":");
  const suppliedUser = separator === -1 ? decoded : decoded.slice(0, separator);
  const suppliedPassword = separator === -1 ? "" : decoded.slice(separator + 1);

  // Evaluate both comparisons so the result does not short-circuit on username.
  const userOk = safeEqual(suppliedUser, user);
  const passwordOk = safeEqual(suppliedPassword, password);
  if (!userOk || !passwordOk) {
    return unauthorized("Invalid credentials.");
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
