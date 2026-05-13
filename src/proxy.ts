import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get("mky_access")?.value === "1";

  if (!isAuthenticated) {
    const accessUrl = new URL("/access", request.url);
    accessUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(accessUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/marketplace/:path*"],
};
