'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useTheme } from '../../providers/ThemeProvider';

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const projectLink = '/boards/CL_Project_QnA';

  return (
    <>
      <nav className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-4 py-6">
        <div className="pointer-events-auto flex w-full max-w-[1200px] items-center justify-between rounded-xl border-2 border-black bg-white px-6 py-4 neo-shadow transition-all duration-300 dark:border dark:border-white/20 dark:bg-black/80 dark:shadow-none dark:backdrop-blur-md bw:border-black bw:bg-white bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-black transition-all duration-300 dark:border-transparent bw:border-black">
              <Image src="/logo.svg" alt="Coreline Logo" fill className="object-cover" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter">Coreline</h2>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-8 font-bold text-black transition-colors duration-300 dark:text-gray-300 bw:text-black">
              {['서비스', '포트폴리오', '프로세스', '소개'].map((item, i) => (
                <a
                  key={i}
                  href={`${item === '포트폴리오' ? '#projects' : item === '서비스' ? '#services' : item === '프로세스' ? '#process' : '#about'}`}
                  className="decoration-black decoration-2 underline-offset-4 transition-all hover:text-black hover:underline dark:decoration-[#FFD600] dark:hover:text-white bw:decoration-black bw:hover:text-black"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="mx-2 h-6 w-px bg-gray-300 dark:bg-gray-700 bw:bg-gray-300"></div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-white text-black neo-shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none dark:border-white/20 dark:bg-transparent dark:text-white dark:shadow-none dark:hover:translate-none dark:hover:bg-white/10 bw:border-black bw:bg-white bw:text-black bw:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="material-symbols-outlined notranslate" aria-hidden="true">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>

            <Link
              href={projectLink}
              className="rounded-lg border-2 border-black bg-black px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 dark:border-transparent dark:bg-white dark:text-black dark:shadow-none dark:hover:translate-none dark:hover:bg-[#FFD600] bw:border-black bw:bg-black bw:text-white bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bw:hover:bg-gray-800"
            >
              프로젝트 시작하기
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-gray-100 active:scale-95 dark:hover:bg-white/10 bw:hover:bg-gray-100"
              aria-label="Open main menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="material-symbols-outlined notranslate" aria-hidden="true">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[100] flex flex-col bg-white p-6 transition-all duration-300 dark:bg-black bw:bg-white"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" className="group relative z-50 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-[#FFD600] neo-shadow-sm transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none">
                <Image
                  src="/logo.svg"
                  alt="Coreline Logo"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </div>
              <span className="text-xl font-black tracking-tight">CORELINE</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-white text-black neo-shadow-sm transition-all active:scale-95 dark:border-white/20 dark:bg-transparent dark:text-white dark:shadow-none bw:border-black bw:bg-white bw:text-black"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined notranslate" aria-hidden="true">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-6 text-2xl font-black">
            {['서비스', '포트폴리오', '프로세스', '소개'].map((item, i) => (
              <a
                key={i}
                href={`${item === '포트폴리오' ? '#projects' : item === '서비스' ? '#services' : item === '프로세스' ? '#process' : '#about'}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b-2 border-black pb-4 transition-all hover:pl-4 dark:border-white/10 dark:text-gray-300 dark:hover:text-white bw:border-black bw:text-black bw:hover:text-gray-600"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <button
              onClick={toggleTheme}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-lg border-2 border-black bg-white text-lg font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95 dark:border-white/20 dark:bg-transparent dark:text-white dark:shadow-none bw:border-black bw:bg-white bw:text-black"
            >
              <span className="material-symbols-outlined notranslate">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
              {theme === 'light' ? '다크 모드' : '라이트 모드'}
            </button>

            <Link
              href={projectLink}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-14 w-full items-center justify-center rounded-lg border-2 border-black bg-black text-lg font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all active:scale-95 dark:border-transparent dark:bg-white dark:text-black dark:shadow-none bw:border-black bw:bg-black bw:text-white"
            >
              프로젝트 시작하기
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
