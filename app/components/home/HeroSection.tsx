'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="pt-48 pb-24 px-4 flex justify-center relative overflow-hidden transition-all duration-300
          bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]
          dark:bg-none dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-black dark:to-black">

            <div className="max-w-[1200px] w-full flex flex-col lg:flex-row items-center gap-20 relative z-10">
                <div className="flex-1 flex flex-col gap-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit transition-all
                bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                dark:bg-white/5 dark:border dark:border-white/10 dark:shadow-none">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-black/10"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-gray-300">프로젝트 접수 중</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight transition-colors break-keep">
                        미래를 코딩하는 <span className="dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FFD600] dark:to-yellow-200">AI</span><br />
                        <span className="inline-block relative">
                            <span className="absolute inset-x-0 bottom-2 h-4 bg-[#FFD600] -z-10 -rotate-2 dark:hidden"></span>
                            <span className="dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FFD600] dark:to-yellow-200">
                                엔지니어링
                            </span>
                        </span> 스튜디오
                    </h1>

                    <p className="text-xl font-medium max-w-lg leading-relaxed pl-6 border-l-4 transition-all
                text-gray-700 border-black
                dark:text-gray-400 dark:border-[#FFD600] dark:border-l-2">
                        비즈니스 성장을 위한 AI 솔루션과 강력한 소프트웨어를 구축합니다. 복잡한 문제를 단순하고 직관적인 코드로 해결하세요.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href="/services" className="h-14 px-8 font-black text-lg rounded-xl flex items-center gap-3 transition-all active:scale-95
                  bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                  dark:bg-[#FFD600] dark:text-black dark:shadow-none dark:hover:bg-yellow-400 dark:hover:translate-none">
                            서비스 보기 <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                        </Link>
                        <a href="https://github.com/coreline-ai/web_coreline_public" target="_blank" rel="noopener noreferrer" className="h-14 px-8 font-black text-lg rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2
                  bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                  dark:bg-transparent dark:text-white dark:border dark:border-white/30 dark:shadow-none dark:hover:bg-white/10 dark:hover:translate-none">
                            <span className="material-symbols-outlined" aria-hidden="true">hub</span> GIT HUB
                        </a>
                    </div>

                    <div className="flex gap-8 pt-4">
                        {[{ num: '50+', label: 'Projects' }, { num: '98%', label: 'Retention' }].map((stat, i) => (
                            <div key={i} className="p-4 rounded-xl transition-all
                    bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    dark:bg-white/5 dark:border dark:border-white/10 dark:shadow-none dark:backdrop-blur-sm">
                                <span className="block text-3xl font-black">{stat.num}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full max-w-[500px] relative">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFD600] rounded-full blur-[100px] opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-500"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-500"></div>

                    <div className="relative aspect-square rounded-[2rem] overflow-hidden transition-all duration-300
                bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                dark:bg-[#111] dark:border dark:border-white/20 dark:shadow-2xl dark:shadow-blue-500/10">

                        <div className="h-10 w-full flex items-center px-4 gap-2 border-b-2 transition-colors
                  bg-black border-black
                  dark:bg-[#222] dark:border-white/10">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>

                        <div className="p-8 h-full flex items-center justify-center overflow-hidden relative
                  bg-gray-50
                  dark:bg-black/50">
                            <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-20 pointer-events-none">
                                {Array.from({ length: 400 }).map((_, i) => (
                                    <div key={i} className="border-[0.5px] border-black/10 dark:border-white/10"></div>
                                ))}
                            </div>
                            <span className="material-symbols-outlined animate-pulse
                    text-black/10
                    dark:text-white/50"
                                style={{ fontSize: '200px' }} aria-hidden="true">code_blocks</span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl transition-all
                  bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]
                  dark:bg-[#222]/90 dark:backdrop-blur-md dark:border dark:border-white/10 dark:shadow-none">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-black dark:text-[#FFD600]" aria-hidden="true">smart_toy</span>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400">AI System Analysis</span>
                                        <span className="text-[10px] font-black text-green-600 dark:text-green-400">LIVE</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border border-black/10 dark:border-transparent">
                                        <div className="h-full bg-black dark:bg-[#FFD600] w-[75%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
