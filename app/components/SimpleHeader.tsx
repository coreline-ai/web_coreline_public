"use client";

import React from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export default function SimpleHeader() {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 border-b-2 transition-colors duration-300
      bg-white border-black
      dark:bg-black/80 dark:backdrop-blur-md dark:border-white/20">
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg border-2 transition-all duration-300
          bg-[#FFD600] border-black text-black
          dark:border-transparent">
                    <span className="material-symbols-outlined font-black text-sm">terminal</span>
                </div>
                <span className="text-xl font-black tracking-tighter">Coreline</span>
            </Link>
            <div className="flex items-center gap-6 font-bold text-sm">
                <Link href="/" className="hover:underline decoration-2 underline-offset-4 decoration-black dark:decoration-[#FFD600]">HOME</Link>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border-2 transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none
          bg-white text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          dark:bg-transparent dark:text-white dark:border-white/30 dark:shadow-none dark:hover:bg-white/10 dark:hover:translate-none">
                    <span className="material-symbols-outlined text-[18px]">
                        {isDarkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>

                <Link href="/signup" className="px-4 py-2 rounded-lg border-2 transition-all active:scale-95
          bg-black text-white border-black hover:bg-white hover:text-black
          dark:bg-white dark:text-black dark:border-transparent dark:hover:bg-[#FFD600]">
                    Sign Up
                </Link>
            </div>
        </header>
    );
}
