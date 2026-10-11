/**
 * Single admin credential check, shared by the network gate in `src/proxy.ts`
 * and by every `/api/admin/*` route (which the proxy matcher does not cover).
 * Edge-safe: no Node-only APIs.
 *
 *  - fails closed when no credentials are configured;
 *  - compares in constant time and evaluates both fields, so a response cannot
 *    be used to recover the credentials one character at a time.
 */

/** Constant-time string comparison. Edge runtime has no `timingSafeEqual`. */
export function safeEqual(a: string, b: string): boolean {
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

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASSWORD);
}

export type AdminAuthResult = "ok" | "disabled" | "missing" | "malformed" | "invalid";

export function checkAdminAuth(authorization: string | null): AdminAuthResult {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) return "disabled";
  if (!authorization?.startsWith("Basic ")) return "missing";

  let decoded: string;
  try {
    decoded = atob(authorization.slice(6));
  } catch {
    return "malformed";
  }

  const separator = decoded.indexOf(":");
  const suppliedUser = separator === -1 ? decoded : decoded.slice(0, separator);
  const suppliedPassword = separator === -1 ? "" : decoded.slice(separator + 1);

  // Evaluate both comparisons so the result does not short-circuit on username.
  const userOk = safeEqual(suppliedUser, user);
  const passwordOk = safeEqual(suppliedPassword, password);
  return userOk && passwordOk ? "ok" : "invalid";
}

/**
 * Mutating admin requests must come from this site. Basic credentials are sent
 * automatically by the browser, so without this a third-party page could make
 * an admin's browser submit an approval.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  // `request.url` can carry a normalised host (for example localhost), so the
  // comparison uses the host the browser actually addressed.
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
