
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Coreline | Engineering Studio',
    description: 'Coreline은 비즈니스 성장을 위한 AI 솔루션과 고성능 소프트웨어를 구축하는 엔지니어링 스튜디오입니다.',
    keywords: 'AI 개발, 소프트웨어 개발, 엔지니어링 스튜디오, MVP 개발, 웹 개발, React, Next.js',
    openGraph: {
        type: 'website',
        title: 'Coreline | Engineering Studio',
        description: '미래를 코딩하는 엔지니어링 스튜디오. 비즈니스 성장을 위한 AI 솔루션과 강력한 소프트웨어를 구축합니다.',
        images: 'https://coreline.studio/og-image.png',
        url: 'https://coreline.studio',
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
        <html lang="ko">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
            </head>
            <body className="bg-black text-white">{children}</body>
        </html>
    );
}
