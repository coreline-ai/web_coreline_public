'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SimpleHeader from '../components/layout/SimpleHeader';
import SimpleFooter from '../components/layout/SimpleFooter';
import Link from 'next/link';

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (status === 'authenticated' && !session?.user?.isAdmin) {
            router.push('/');
        } else if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, session, router]);

    // Prevent infinite loading state
    React.useEffect(() => {
        if (status === 'loading') {
            const timer = setTimeout(() => {
                window.location.reload();
            }, 5000); // Reload if loading > 5s
            return () => clearTimeout(timer);
        }
    }, [status]);

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black bw:bg-white">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black dark:border-white/20 dark:border-t-[#FFD600] bw:border-black bw:border-t-transparent" />
                <p className="mt-4 animate-pulse font-bold text-gray-400">Loading Admin Console...</p>
            </div>
        );
    }

    if (!session?.user?.isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black">
                <h1 className="text-4xl font-black mb-4 dark:text-white">Admin Access Required</h1>
                <p className="mb-8 font-bold text-gray-500">이 페이지에 접근할 권한이 없습니다.</p>
                <Link href="/" className="px-6 py-3 bg-black text-white font-bold rounded-xl dark:bg-white dark:text-black">
                    홈으로 돌아가기
                </Link>
            </div>
        );
    }

    const adminModules = [
        {
            title: 'User Management',
            description: '사용자 목록 조회, 통계 및 계정 제재(Ban) 처리.',
            icon: 'group',
            link: '/admin/users',
            color: 'bg-blue-500'
        },
        {
            title: 'Board Management',
            description: '게시판 및 카테고리 추가, 설정 관리.',
            icon: 'dashboard_customize',
            link: '/admin/boards',
            color: 'bg-green-500'
        },
        {
            title: 'Content Moderation',
            description: '부적절한 게시글 및 댓글 일괄 관리.',
            icon: 'gavel',
            link: '/admin/posts',
            color: 'bg-red-500'
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-black dark:bg-[#111] dark:text-white bw:bg-white bw:text-black">
            <SimpleHeader />
            <main className="relative pt-32 pb-24">
                <div className="mx-auto max-w-[1200px] px-4">
                    <div className="mb-12 border-l-[6px] border-[#FFD600] pl-6">
                        <h1 className="mb-4 text-4xl font-black tracking-tight">Admin Console</h1>
                        <p className="text-lg font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">
                            시스템 관리 및 운영 도구입니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {adminModules.map((module) => (
                            <Link
                                key={module.title}
                                href={module.link}
                                className="group relative overflow-hidden rounded-[2rem] border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-white/20 dark:bg-black dark:shadow-none dark:hover:bg-white/5 bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_black]"
                            >
                                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-black text-white ${module.color}`}>
                                    <span className="material-symbols-outlined notranslate text-3xl">{module.icon}</span>
                                </div>
                                <h3 className="mb-2 text-2xl font-black">{module.title}</h3>
                                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">{module.description}</p>

                                <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase text-gray-400 group-hover:text-[#FFD600]">
                                    Open Module
                                    <span className="material-symbols-outlined notranslate text-sm">arrow_forward</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 rounded-[2rem] border-4 border-black bg-gray-50 p-12 dark:border-white/10 dark:bg-white/5 bw:border-black bw:bg-gray-50">
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <div>
                                <h2 className="mb-2 text-3xl font-black text-black dark:text-white bw:text-black">System Status</h2>
                                <p className="font-bold text-gray-400">모든 서비스가 정상 작동 중입니다.</p>
                            </div>
                            <div className="flex gap-12">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-[#FFD600]">99.9%</div>
                                    <div className="text-xs font-black uppercase text-gray-400">Uptime</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-black text-[#FFD600]">12ms</div>
                                    <div className="text-xs font-black uppercase text-gray-400">Latency</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <SimpleFooter />
        </div>
    );
}
