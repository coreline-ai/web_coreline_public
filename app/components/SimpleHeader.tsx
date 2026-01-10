'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

export default function SimpleHeader() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b-2 border-black bg-white px-6 transition-colors duration-300 dark:border-white/20 dark:bg-black/80 dark:backdrop-blur-md">
      <Link href="/" className="group flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-[#FFD600] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none">
          <Image src="/logo.svg" alt="Coreline Logo" width={20} height={20} className="h-5 w-5" />
        </div>
        <span className="hidden text-xl font-black tracking-tight md:block">Coreline</span>
      </Link>
      <div className="flex items-center gap-6 text-sm font-bold">
        <Link
          href="/"
          className="decoration-black decoration-2 underline-offset-4 hover:underline dark:decoration-[#FFD600]"
        >
          HOME
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none dark:border-white/30 dark:bg-transparent dark:text-white dark:shadow-none dark:hover:translate-none dark:hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <Link
          href="/login"
          className="rounded-lg border-2 border-black bg-white px-4 py-2 text-black transition-all hover:bg-gray-50 active:scale-95 dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:border-[#FFD600] dark:hover:bg-[#FFD600] dark:hover:text-black"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
