import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { checkAdminAuth } from "@/lib/admin-auth";

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

  const result = checkAdminAuth(request.headers.get("authorization"));

  if (result === "disabled") {
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
  if (result === "missing") return unauthorized("Authentication required.");
  if (result === "malformed") return unauthorized("Malformed credentials.");
  if (result === "invalid") return unauthorized("Invalid credentials.");

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
