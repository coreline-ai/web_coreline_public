/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [];
    },
    async headers() {
        const isDev = process.env.NODE_ENV === 'development';
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

        // CSP: Strict in production, relaxed in development
        const cspValue = isDev
            ? "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: cdn.jsdelivr.net coreline-media.s3.ap-northeast-2.amazonaws.com; font-src 'self' data:; connect-src 'self' http://localhost:8000 https://coreline-media.s3.ap-northeast-2.amazonaws.com; frame-ancestors 'none';"
            : `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: cdn.jsdelivr.net coreline-media.s3.ap-northeast-2.amazonaws.com; font-src 'self' data:; connect-src 'self' ${backendUrl} https://coreline-media.s3.ap-northeast-2.amazonaws.com; frame-ancestors 'none'; form-action 'self';`;

        const headers = [
            {
                key: 'X-Frame-Options',
                value: 'DENY',
            },
            {
                key: 'X-XSS-Protection',
                value: '1; mode=block',
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
                value: cspValue,
            },
        ];

        // Add HSTS only in production (HTTPS required)
        if (!isDev) {
            headers.push({
                key: 'Strict-Transport-Security',
                value: 'max-age=31536000; includeSubDomains; preload',
            });
        }

        return [
            {
                source: '/(.*)',
                headers,
            },
        ];
    },
};

export default nextConfig;
