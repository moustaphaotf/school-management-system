import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
    const isApiRoute = req.nextUrl.pathname.startsWith("/api");

    // Allow auth-related API routes
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    // Protect all other API routes
    if (isApiRoute) {
      if (!isAuth) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      return NextResponse.next();
    }

    // Redirect from auth page to dashboard if already logged in
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // Allow public pages
    if (!isAuth && !isApiRoute) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Let the middleware handle the auth check
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
    "/api/:path*",
  ],
};