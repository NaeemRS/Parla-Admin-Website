import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Protect all routes under /dashboard
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token"); // adjust key as per your auth setup

    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Define which paths middleware should run on
export const config = {
  matcher: ["/dashboard/:path*"],
};
