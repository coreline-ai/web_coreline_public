/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/auth/token',
                destination: 'http://localhost:8000/api/auth/token',
            },
            {
                source: '/api/auth/register',
                destination: 'http://localhost:8000/api/auth/register',
            },
            {
                source: '/api/boards/:path*',
                destination: 'http://localhost:8000/api/boards/:path*',
            },
            {
                source: '/api/posts/:path*',
                destination: 'http://localhost:8000/api/posts/:path*',
            },
            {
                source: '/api/admin/:path*',
                destination: 'http://localhost:8000/api/admin/:path*',
            },
            {
                source: '/api/comments/:path*',
                destination: 'http://localhost:8000/api/comments/:path*',
            },
            {
                source: '/api/notifications/:path*',
                destination: 'http://localhost:8000/api/notifications/:path*',
            },
            {
                source: '/api/files/:path*',
                destination: 'http://localhost:8000/api/files/:path*',
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: cdn.jsdelivr.net coreline-media.s3.ap-northeast-2.amazonaws.com; font-src 'self' data:; connect-src 'self' http://localhost:8000 https://coreline-media.s3.ap-northeast-2.amazonaws.com; frame-ancestors 'none';",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
