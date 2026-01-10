'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../ThemeProvider';

export default function Navigation() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-6 pointer-events-none">
                <div className="pointer-events-auto w-full max-w-[1200px] rounded-xl px-6 py-4 flex items-center justify-between transition-all duration-300
            bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            dark:bg-black/80 dark:backdrop-blur-md dark:border dark:border-white/20 dark:shadow-none">

                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 relative rounded-lg overflow-hidden border-2 border-black dark:border-transparent transition-all duration-300">
                            <Image src="/logo.svg" alt="Coreline Logo" fill className="object-cover" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter">Coreline</h2>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-8 font-bold transition-colors duration-300
                text-black
                dark:text-gray-300">
                            {['서비스', '포트폴리오', '프로세스', '소개'].map((item, i) => (
                                <a key={i} href={`${item === '포트폴리오' ? '#projects' : item === '서비스' ? '#services' : item === '프로세스' ? '#process' : '#about'}`}
                                    className="hover:underline decoration-2 underline-offset-4 transition-all
                    decoration-black hover:text-black
                    dark:decoration-[#FFD600] dark:hover:text-white">
                                    {item}
                                </a>
                            ))}
                        </div>

                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-black transition-all hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                bg-white text-black
                dark:bg-transparent dark:border-white/20 dark:text-white dark:shadow-none dark:hover:bg-white/10 dark:hover:translate-none">
                            <span className="material-symbols-outlined">
                                {isDarkMode ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>

                        <Link href="/login" className="px-6 py-3 rounded-lg font-black text-sm transition-all active:scale-95
                bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                dark:bg-white dark:text-black dark:border-transparent dark:hover:bg-[#FFD600] dark:shadow-none dark:hover:translate-none">
                            프로젝트 시작하기
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg transition-all active:scale-95
                                    hover:bg-gray-100 dark:hover:bg-white/10">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col p-6 transition-all duration-300
                        bg-white dark:bg-black">
                    <div className="flex justify-between items-center mb-10">
                        <Link href="/" className="flex items-center gap-2 group z-50 relative">
                            <div className="w-8 h-8 bg-[#FFD600] flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
                                <Image src="/logo.svg" alt="Coreline Logo" width={20} height={20} className="w-5 h-5" />
                            </div>
                            <span className="font-black text-xl tracking-tight">CORELINE</span>
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-black transition-all active:scale-95
                                    bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                    dark:bg-transparent dark:border-white/20 dark:text-white dark:shadow-none">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 text-2xl font-black">
                        {['서비스', '포트폴리오', '프로세스', '소개'].map((item, i) => (
                            <a key={i}
                                href={`${item === '포트폴리오' ? '#projects' : item === '서비스' ? '#services' : item === '프로세스' ? '#process' : '#about'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="border-b-2 border-black pb-4 hover:pl-4 transition-all
                                        dark:border-white/10 dark:text-gray-300 dark:hover:text-white">
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="mt-auto flex flex-col gap-4">
                        <button
                            onClick={toggleTheme}
                            className="w-full h-14 flex items-center justify-center gap-3 rounded-lg border-2 border-black font-bold text-lg transition-all active:scale-95
                                bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                dark:bg-transparent dark:border-white/20 dark:text-white dark:shadow-none">
                            <span className="material-symbols-outlined">
                                {isDarkMode ? 'light_mode' : 'dark_mode'}
                            </span>
                            {isDarkMode ? '라이트 모드' : '다크 모드'}
                        </button>

                        <button className="w-full h-14 rounded-lg font-black text-lg transition-all active:scale-95
                                bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
                                dark:bg-white dark:text-black dark:border-transparent dark:shadow-none">
                            프로젝트 시작하기
                        </button>
                    </div>
                </div >
            )
            }
        </>
    );
}
