import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { COOKIES_KEYS } from "./lib/constants";

const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register"];

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
    const isApiRoute = req.nextUrl.pathname.startsWith("/api");
    const isSchoolsPage = req.nextUrl.pathname === "/schools";
    const isPublicPage = PUBLIC_ROUTES.includes(req.nextUrl.pathname);

    if (!isAuth && !isPublicPage) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl.origin));
    }

    // Allow auth-related API routes
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    // Add school ID from cookie to API requests if available
    if (isApiRoute && !isApiAuthRoute) {
      if (!isAuth) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const schoolId = req.cookies.get(COOKIES_KEYS.CURRENT_SCHOOL)?.value;
      const headers = new Headers(req.headers);

      if (schoolId) {
        headers.set("X-School-Id", schoolId);
      }

      const response = NextResponse.next({
        request: {
          headers,
        },
      });

      return response;
    }

    // Redirect from auth page to schools page if already logged in
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/schools", req.url));
      }
      return NextResponse.next();
    }

    // Check if user has selected a school
    if (isAuth && !isAuthPage && !isSchoolsPage && !isApiRoute) {
      const schoolId = req.cookies.get(COOKIES_KEYS.CURRENT_SCHOOL)?.value;
      if (!schoolId) {
        return NextResponse.redirect(new URL("/schools", req.url));
      }
    }

    // Allow public pages
    if (!isAuth && !isApiRoute) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/api/:path*", "/schools"],
};
