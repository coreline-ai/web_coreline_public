import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `refreshToken`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
    try {
        const apiUrl = process.env.NEXTAUTH_URL || 'http://localhost:8000';
        console.log("[NextAuth] Refreshing access token...");

        const response = await fetch(`${apiUrl}/api/py-auth/refresh`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                refresh_token: token.refreshToken,
            }),
        });

        const refreshedToken = await response.json();

        if (!response.ok) {
            console.error("RefreshAccessTokenError", refreshedToken);
            throw refreshedToken;
        }

        console.log("[NextAuth] Token refreshed successfully");

        return {
            ...token,
            accessToken: refreshedToken.data.access_token,
            accessTokenExpires: Date.now() + 25 * 60 * 1000, // 25 minutes (expires before 30min backend expiry)
            refreshToken: refreshedToken.data.refresh_token ?? token.refreshToken, // Fallback to old refresh token
        };
    } catch (error) {
        console.error("RefreshAccessTokenError", error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username/Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                try {
                    const apiUrl = process.env.NEXTAUTH_URL || 'http://localhost:8000';
                    console.log(`[NextAuth] Calling auth API: ${apiUrl}/api/py-auth/token`);
                    const res = await fetch(`${apiUrl}/api/py-auth/token`, {
                        method: "POST",
                        body: JSON.stringify({
                            username_or_email: credentials.username,
                            password: credentials.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    });

                    const result = await res.json();

                    if (res.ok && result.success && result.data) {
                        return {
                            id: result.data.user.id,
                            name: result.data.user.nickname,
                            accessToken: result.data.access_token,
                            refreshToken: result.data.refresh_token,
                            accessTokenExpires: Date.now() + 25 * 60 * 1000, // 25 minutes
                            isAdmin: result.data.user.is_admin,
                            email: result.data.user.email,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Initial sign in
            if (user) {
                return {
                    accessToken: (user as any).accessToken,
                    accessTokenExpires: (user as any).accessTokenExpires,
                    refreshToken: (user as any).refreshToken,
                    user,
                    isAdmin: (user as any).isAdmin,
                    sub: user.id
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            // Access token has expired, try to update it
            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            (session as any).error = token.error;
            (session as any).user.isAdmin = token.isAdmin;
            (session as any).user.id = token.sub;
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
