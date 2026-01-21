'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from './ThemeProvider';
import { useRouter } from 'next/navigation';
import { NotificationDropdown } from './common/NotificationDropdown';

export default function SimpleHeader() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };



  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b-2 border-black bg-white px-6 transition-colors duration-300 dark:border-white/20 dark:bg-black/80 dark:backdrop-blur-md bw:border-black bw:bg-white">
      <Link href="/" className="group flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-[#FFD600] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none">
          <Image src="/logo.svg" alt="Coreline Logo" width={20} height={20} className="h-5 w-5" />
        </div>
        <span className="hidden text-xl font-black tracking-tight md:block">Coreline</span>
      </Link>

      <div className="flex items-center gap-4 text-xs font-black md:gap-6 md:text-sm">
        <Link
          href="/"
          className="decoration-black decoration-2 underline-offset-4 hover:underline dark:decoration-[#FFD600] bw:decoration-black"
        >
          HOME
        </Link>
        <Link
          href="/blog"
          className="decoration-black decoration-2 underline-offset-4 hover:underline dark:decoration-[#FFD600] bw:decoration-black"
        >
          BLOG
        </Link>
        <Link
          href="/research"
          className="decoration-black decoration-2 underline-offset-4 hover:underline dark:decoration-[#FFD600] bw:decoration-black"
        >
          LAB
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none dark:border-white/30 dark:bg-transparent dark:text-white dark:shadow-none dark:hover:translate-none dark:hover:bg-white/10 bw:border-black bw:bg-white bw:text-black"
        >
          <span className="material-symbols-outlined notranslate text-[18px]">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {session ? (
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <NotificationDropdown />

            <div className="hidden items-center gap-2 md:flex">
              <div className="h-6 w-6 rounded-full bg-[#FFD600] border-2 border-black dark:border-white/20 bw:border-black"></div>
              <span className="font-black text-black dark:text-white bw:text-black truncate max-w-[100px]">{session.user.name}</span>
              {session.user.isAdmin && (
                <Link href="/admin" className="bg-black px-1.5 py-0.5 text-[8px] text-white rounded dark:bg-white dark:text-black bw:bg-black bw:text-white">ADMIN</Link>
              )}
            </div>
            <button
              onClick={() => signOut()}
              className="rounded-lg border-2 border-black bg-black px-4 py-2 text-white transition-all hover:bg-gray-800 active:scale-95 dark:border-white/30 dark:bg-white dark:text-black dark:hover:bg-[#FFD600] bw:border-black bw:bg-black bw:text-white bw:hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-lg border-2 border-black bg-white px-4 py-2 text-black transition-all hover:bg-gray-50 active:scale-95 dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:border-[#FFD600] dark:hover:bg-[#FFD600] dark:hover:text-black bw:border-black bw:bg-white bw:text-black bw:hover:bg-gray-100"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
