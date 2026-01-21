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
                    // Use NEXT_PUBLIC_API_URL to call the backend directly
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
                    const res = await fetch(`${apiUrl}/api/auth/token`, {
                        method: "POST",
                        body: JSON.stringify({
                            username_or_email: credentials.username,
                            password: credentials.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    });

                    const result = await res.json();

                    // Response spec: { access_token, token_type, user: { ... } }
                    // Response spec: { success: true, data: { access_token, user: ... } }
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
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
