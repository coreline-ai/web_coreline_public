'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SimpleHeader from '../../components/layout/SimpleHeader';
import SimpleFooter from '../../components/layout/SimpleFooter';

export default function AdminPostsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (status === 'authenticated' && !session?.user?.isAdmin) {
            router.push('/');
        } else if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, session, router]);

    if (status === 'loading' || !session?.user?.isAdmin) {
        return <div className="min-h-screen bg-white dark:bg-black animate-pulse bw:bg-white" />;
    }

    return (
        <div className="min-h-screen bg-white font-sans text-black dark:bg-[#111] dark:text-white bw:bg-white bw:text-black">
            <SimpleHeader />
            <main className="relative pt-32 pb-24">
                <div className="mx-auto max-w-[1200px] px-4">
                    <div className="mb-12 border-l-[6px] border-[#FFD600] pl-6">
                        <h1 className="mb-4 text-4xl font-black tracking-tight">Content Moderation</h1>
                        <p className="text-lg font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">
                            게시글 및 댓글을 관리하는 페이지입니다. (준비 중)
                        </p>
                    </div>

                    <div className="rounded-[2rem] border-4 border-black bg-white p-12 shadow-[8px_8px_0px_0px_black] dark:border-white/20 dark:bg-black dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_black]">
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="mb-6 rounded-full bg-gray-100 p-8 dark:bg-white/10 bw:bg-gray-100">
                                <span className="material-symbols-outlined notranslate text-6xl text-gray-400">gavel</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-black">Feature Coming Soon</h2>
                            <p className="text-gray-500">이 기능은 아직 개발 중입니다.</p>
                        </div>
                    </div>
                </div>
            </main>
            <SimpleFooter />
        </div>
    );
}
