'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative flex justify-center overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] px-4 pt-48 pb-24 transition-all duration-300 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:bg-none dark:from-gray-900 dark:via-black dark:to-black">
      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-20 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all dark:border dark:border-white/10 dark:bg-white/5 dark:shadow-none">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full border border-black/10 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wider text-black uppercase dark:text-gray-300">
              프로젝트 접수 중
            </span>
          </div>

          <h1 className="text-3xl leading-tight font-black tracking-tight break-keep transition-colors sm:text-5xl md:text-7xl">
            미래를 코딩하는{' '}
            <span className="dark:bg-gradient-to-r dark:from-[#FFD600] dark:to-yellow-200 dark:bg-clip-text dark:text-transparent">
              AI
            </span>
            <br />
            <span className="relative inline-block">
              <span className="inline-block bg-[#FFD600] px-2 text-black dark:text-black">
                엔지니어링
              </span>
            </span>{' '}
            스튜디오
          </h1>

          <p className="max-w-lg border-l-4 border-black pl-6 text-xl leading-relaxed font-medium text-gray-700 transition-all dark:border-l-2 dark:border-[#FFD600] dark:text-gray-400">
            비즈니스 성장을 위한 AI 솔루션과 강력한 소프트웨어를 구축합니다. 복잡한 문제를 단순하고
            직관적인 코드로 해결하세요.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/services"
              className="flex h-14 items-center gap-3 rounded-xl border-2 border-black bg-black px-8 text-lg font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 dark:bg-[#FFD600] dark:text-black dark:shadow-none dark:hover:translate-none dark:hover:bg-yellow-400"
            >
              서비스 보기{' '}
              <span className="material-symbols-outlined notranslate" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
            <a
              href="https://github.com/coreline-ai/web_coreline_public"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-black bg-white px-8 text-lg font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 dark:border dark:border-white/30 dark:bg-transparent dark:text-white dark:shadow-none dark:hover:translate-none dark:hover:bg-white/10"
            >
              <span className="material-symbols-outlined notranslate" aria-hidden="true">
                hub
              </span>{' '}
              GIT HUB
            </a>
          </div>

          <div className="flex gap-8 pt-4">
            {[
              { num: '50+', label: 'Projects' },
              { num: '98%', label: 'Retention' },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border-2 border-black bg-white p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all dark:border dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:backdrop-blur-sm"
              >
                <span className="block text-3xl font-black">{stat.num}</span>
                <span className="text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-[500px] flex-1 lg:translate-y-10">
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#FFD600] opacity-0 blur-[100px] transition-opacity duration-500 dark:opacity-20"></div>
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500 opacity-0 blur-[100px] transition-opacity duration-500 dark:opacity-20"></div>

          <div className="group relative aspect-square overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:border dark:border-white/20 dark:bg-[#111] dark:shadow-2xl dark:shadow-blue-500/10">
            <div className="flex h-10 w-full items-center gap-2 border-b-2 border-black bg-black px-4 transition-colors dark:border-white/10 dark:bg-[#222]">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>

            <div className="relative flex h-full items-center justify-center overflow-hidden bg-gray-50 dark:bg-black/50">
              {/* Default State: Image + Grid + Icon */}
              <div className="absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
                <div className="pointer-events-none absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-25">
                  {Array.from({ length: 400 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-[0.5px] border-black/10 dark:border-white/10"
                    ></div>
                  ))}
                </div>
                <span
                  className="material-symbols-outlined notranslate relative z-10 animate-pulse text-black/20 dark:text-white/40"
                  style={{ fontSize: '225px' }}
                  aria-hidden="true"
                >
                  code_blocks
                </span>
              </div>

              {/* Hover State: Video */}
              <video
                src="/images/render_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 z-10 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/5 via-transparent to-transparent dark:from-black/40"></div>
            </div>

            <div className="absolute right-6 bottom-6 left-6 z-30 rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all dark:border dark:border-white/10 dark:bg-[#222]/90 dark:shadow-none dark:backdrop-blur-md">
              <div className="flex items-center gap-4">
                <span
                  className="material-symbols-outlined notranslate text-black dark:text-[#FFD600]"
                  aria-hidden="true"
                >
                  smart_toy
                </span>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-500 uppercase dark:text-gray-400">
                      AI System Analysis
                    </span>
                    <span className="text-[10px] font-black text-green-600 dark:text-green-400">
                      LIVE
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full border border-black/10 bg-gray-200 dark:border-transparent dark:bg-gray-700">
                    <div className="h-full w-[75%] rounded-full bg-black dark:bg-[#FFD600]"></div>
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
