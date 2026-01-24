import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
                    // Use NEXTAUTH_URL for server-side internal API calls
                    // Vercel rewrites will route /api/py-auth/* to Python backend
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
            if (user) {
                token.accessToken = (user as any).accessToken;
                token.isAdmin = (user as any).isAdmin;
            }
            return token;
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            (session as any).user.isAdmin = token.isAdmin;
            (session as any).user.id = token.sub;
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",  // Redirect auth errors to login page with error query param
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
