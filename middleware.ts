import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { COOKIES_KEYS } from "./lib/constants";

const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register"];

export default withAuth(
  async function middleware(req) {
    // Add school ID from cookie to API requests if available
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
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/api/:path*"],
};
