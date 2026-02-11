import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((request) => {
  const protectedPaths = ["/dashboard", "/editor"];
  const protectedApi = ["/api/export", "/api/upload", "/api/ai"];
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path)) || protectedApi.includes(pathname);
  if (isProtected && !request.auth) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/api/export", "/api/upload", "/api/ai"]
};
