import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Admin protection
        if (path.startsWith("/admin") && token?.isAdmin !== true) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;
                // Pages that REQUIRE login
                if (pathname.endsWith("/new") || pathname.startsWith("/admin")) {
                    return !!token;
                }
                // All other pages (including boards, blog, research) are public
                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        "/admin/:path*",
        "/boards/:slug*/new",
    ]
};
