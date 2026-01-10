
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_KR } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-plus-jakarta-sans',
    display: 'optional', // Add display option
});

const notoSansKR = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700', '900'],
    variable: '--font-noto-sans-kr',
    display: 'optional', // Add display option
});

export const metadata: Metadata = {
    metadataBase: new URL('https://web-coreline-public.vercel.app'),
    title: 'Coreline | Engineering Studio',
    description: 'Coreline은 비즈니스 성장을 위한 AI 솔루션과 고성능 소프트웨어를 구축하는 엔지니어링 스튜디오입니다.',
    keywords: 'AI 개발, 소프트웨어 개발, 엔지니어링 스튜디오, MVP 개발, 웹 개발, React, Next.js',
    viewport: 'width=device-width, initial-scale=1',
    openGraph: {
        type: 'website',
        title: 'Coreline | Engineering Studio',
        description: '미래를 코딩하는 엔지니어링 스튜디오. 비즈니스 성장을 위한 AI 솔루션과 강력한 소프트웨어를 구축합니다.',
        url: 'https://web-coreline-public.vercel.app',
    },
    twitter: {
        card: 'summary_large_image',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className={`${plusJakartaSans.variable} ${notoSansKR.variable}`}>
            <head>
                {/* Material Symbols Outlined font - kept as link, but added display=optional */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
                />
            </head>
            <body className="bg-black text-white" suppressHydrationWarning>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}

