'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '../../constants';
import { useTheme } from '../ThemeProvider';

export default function ServicesSection() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="services"
      className="flex scroll-mt-20 justify-center border-y-2 border-black bg-[#FFD600] px-4 py-24 transition-colors duration-300 dark:border-y dark:border-white/10 dark:bg-black"
    >
      <div className="w-full max-w-[1200px]">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <Link
              href="/services"
              className="flex w-fit cursor-pointer items-center gap-2 rounded-full border-2 border-white bg-black px-3 py-1 text-xs font-black tracking-widest text-white uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:scale-105 active:scale-95 dark:border-none dark:bg-[#FFD600] dark:text-black dark:shadow-none"
            >
              <span
                className="material-symbols-outlined text-sm text-[#FFD600] dark:text-black"
                aria-hidden="true"
              >
                stars
              </span>{' '}
              What We Do
            </Link>
            <h2 className="text-4xl leading-tight font-black md:text-6xl">
              탁월한 기술력, <br />
              <span className="text-white transition-all [text-shadow:2px_2px_0px_black,-2px_-2px_0px_black,2px_-2px_0px_black,-2px_2px_0px_black] dark:text-[#8B5CF6] dark:[text-shadow:none]">
                확실한 결과물.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-left text-lg leading-relaxed font-black text-black dark:text-gray-400">
            단순 코딩을 넘어 비즈니스 가치를 창출하는 맞춤형 엔지니어링 솔루션을 제공합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            // Define images for special cards
            const specialImage =
              i === 0
                ? '/images/service_langchain.png'
                : i === 1
                  ? '/images/service_rag.png'
                  : i === 2
                    ? '/images/service_api.png'
                    : i === 3
                      ? '/images/service_task.png'
                      : null;

            const linkTarget =
              i === 0
                ? '#fullstack-mobile'
                : i === 1
                  ? '#ai-ml-integration'
                  : i === 2
                    ? '#vibe-coding'
                    : i === 3
                      ? '#senior-led-mvp'
                      : '';

            return (
              <Link
                href={`/services${linkTarget}`}
                key={s.id}
                className={`group relative block flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border dark:border-white/10 dark:bg-[#111] dark:shadow-none hover:dark:translate-x-0 hover:dark:-translate-y-1 hover:dark:border-[#FFD600] ${specialImage ? 'p-0' : 'p-6 sm:p-8'}`}
              >
                {/* Special Layout for First & Second Card */}
                {specialImage ? (
                  <>
                    {/* Top Section (Image Only) */}
                    <div className="relative h-48 w-full border-b-2 border-black dark:border-white/10">
                      <div className="absolute inset-0">
                        <Image
                          src={specialImage}
                          alt={s.title}
                          fill
                          className={`object-cover ${i === 2 || i === 3 ? 'object-[70%_center]' : ''}`}
                        />{' '}
                        {/* Subtle gradient for depth, but keep image clear */}
                        {/* Subtle gradient for depth, but keep image clear - REMOVED per user request */}
                      </div>
                    </div>

                    {/* Bottom Section (Text + Icon) */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* Icon Moved Here */}
                      <div className="mb-4">
                        <div
                          className="group-hover:bg-opacity-100 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-white bg-black/20 shadow-lg backdrop-blur-md transition-colors group-hover:border-[#FFD600] group-hover:bg-[#FFD600]"
                          style={{ borderColor: s.color }}
                        >
                          <span
                            className="material-symbols-outlined text-3xl text-black/80 transition-colors group-hover:text-black dark:text-white"
                            aria-hidden="true"
                          >
                            {s.icon}
                          </span>
                        </div>
                      </div>

                      <h3 className="mb-3 text-xl font-black">{s.title}</h3>
                      <p className="flex-1 text-sm leading-relaxed font-bold text-gray-600 dark:font-medium dark:text-gray-400">
                        {s.description}
                      </p>
                      <div className="mt-6 flex justify-end">
                        <div className="flex h-8 w-8 items-center justify-center text-black transition-colors dark:rounded-full dark:bg-white/5 dark:text-white group-hover:dark:bg-[#FFD600] group-hover:dark:text-black">
                          <span
                            className="material-symbols-outlined text-lg font-black"
                            aria-hidden="true"
                          >
                            arrow_forward
                          </span>
                        </div>{' '}
                      </div>
                    </div>
                  </>
                ) : (
                  // Standard Layout for other cards
                  <div className="flex h-full flex-col">
                    <div
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-black transition-all group-hover:scale-110 dark:border dark:border-white/10"
                      style={{ backgroundColor: s.color }}
                    >
                      <span
                        className="material-symbols-outlined text-3xl text-white dark:text-white"
                        style={{ color: !isDarkMode ? '#fff' : undefined }}
                        aria-hidden="true"
                      >
                        {s.icon}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-black">{s.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed font-bold text-gray-600 dark:font-medium dark:text-gray-400">
                      {s.description}
                    </p>
                    <div className="mt-8 flex justify-end">
                      <div className="flex h-8 w-8 items-center justify-center text-black transition-colors dark:rounded-full dark:bg-white/5 dark:text-white group-hover:dark:bg-[#FFD600] group-hover:dark:text-black">
                        <span
                          className="material-symbols-outlined text-lg font-black"
                          aria-hidden="true"
                        >
                          arrow_forward
                        </span>
                      </div>{' '}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
