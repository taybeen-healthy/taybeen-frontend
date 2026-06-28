import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("taybeen_access_token")?.value;
  const refreshToken = request.cookies.get("taybeen_refresh_token")?.value;

  const protectedPaths = ["/my-account", "/review", "/checkout"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !accessToken && !refreshToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-account/:path*", "/review/:path*", "/checkout/:path*"],
};
