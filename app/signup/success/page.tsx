'use client';

import React from 'react';
import Link from 'next/link';
import SimpleHeader from '../../components/layout/SimpleHeader';
import SimpleFooter from '../../components/layout/SimpleFooter';

export default function SignUpSuccessPage() {
    return (
        <div className="">
            <div className="relative min-h-screen overflow-hidden bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-black dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black bw:bg-white bw:text-black bw:selection:bg-black bw:selection:text-white">
                <SimpleHeader />

                {/* Floating Celebration Shapes */}
                <div className="absolute top-48 left-1/4 hidden h-16 w-16 animate-bounce rounded-full border-4 border-black bg-[#FFD600] duration-[2000ms] md:block shadow-[4px_4px_0px_0px_black] dark:shadow-none"></div>
                <div className="absolute bottom-48 right-1/4 hidden h-20 w-20 animate-pulse rounded-full border-4 border-black bg-[#A78BFA] md:block shadow-[4px_4px_0px_0px_black] dark:shadow-none"></div>
                <div className="absolute top-32 right-32 hidden h-12 w-12 rotate-45 border-4 border-black bg-[#2DD4BF] md:block shadow-[4px_4px_0px_0px_black] dark:shadow-none"></div>

                <main className="relative z-10 flex min-h-screen items-center justify-center p-4 pt-20">
                    <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:border-white/20 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <div className="relative p-10 md:p-14 text-center">

                            <div className="mb-8 flex justify-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-black bg-[#FFD600] text-5xl shadow-[4px_4px_0px_0px_black] dark:border-white/20 dark:shadow-none bw:border-black bw:shadow-[4px_4px_0px_0px_black]">
                                    🎉
                                </div>
                            </div>

                            <h1 className="mb-6 text-4xl font-black uppercase tracking-tight text-black dark:text-white bw:text-black">
                                Welcome Aboard!<br />
                                <span className="text-2xl mt-2 block normal-case font-bold text-gray-500 dark:text-gray-400">여정의 시작을 환영합니다.</span>
                            </h1>

                            <div className="space-y-4 mb-10">
                                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    계정 생성이 성공적으로 완료되었습니다.
                                </p>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    이제 Coreline의 모든 기능을 자유롭게 탐험해보세요.<br />
                                    여러분의 아이디어가 현실이 되는 공간입니다.
                                </p>
                            </div>

                            <Link
                                href="/"
                                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-black bg-black px-12 text-lg font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(100,100,100,0.5)] active:translate-y-0 active:scale-95 active:shadow-none dark:border-transparent dark:bg-white dark:text-black dark:shadow-none dark:hover:bg-[#FFD600] bw:border-black bw:bg-black bw:text-white bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                홈으로 가기
                                <span className="material-symbols-outlined notranslate font-bold">arrow_forward</span>
                            </Link>

                        </div>

                        {/* Playful bottom strip */}
                        <div className="h-4 w-full bg-[#FFD600] border-t-4 border-black dark:border-white/20"></div>
                    </div>
                </main>

                <SimpleFooter />
            </div>
        </div>
    );
}
