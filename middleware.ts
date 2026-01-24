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

                // 1. ALWAYS PUBLIC ROUTES (Explicitly allow guest viewing for official boards)
                if (
                    pathname.startsWith("/blog") ||
                    pathname.startsWith("/research") ||
                    pathname.startsWith("/boards")
                ) {
                    // Only sub-actions like /new or /edit (if applicable) require login
                    if (pathname.endsWith("/new") || pathname.includes("/edit/")) {
                        return !!token;
                    }
                    return true;
                }

                // 2. ADMIN ONLY PROTECTION
                if (pathname.startsWith("/admin")) {
                    return !!token && (token as any).isAdmin === true;
                }

                // 3. INTERNAL API AND AUTH ROUTES (Handled by backend or NextAuth)
                if (pathname.startsWith("/api")) {
                    return true;
                }

                // Default: Allow page access (unless specifically listed above)
                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
