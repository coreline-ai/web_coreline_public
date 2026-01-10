'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '../../constants';
import { useTheme } from '../ThemeProvider';

export default function ServicesSection() {
    const { isDarkMode } = useTheme();

    return (
        <section id="services" className="scroll-mt-20 py-24 px-4 flex justify-center transition-colors duration-300
      bg-[#FFD600] border-y-2 border-black
      dark:bg-black dark:border-y dark:border-white/10">
            <div className="max-w-[1200px] w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="flex flex-col gap-4">
                        <Link href="/services" className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest w-fit border-2 transition-all cursor-pointer hover:scale-105 active:scale-95
              bg-black text-white border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              dark:bg-[#FFD600] dark:text-black dark:border-none dark:shadow-none">
                            <span className="material-symbols-outlined text-sm text-[#FFD600] dark:text-black" aria-hidden="true">stars</span> What We Do
                        </Link>
                        <h2 className="text-4xl md:text-6xl font-black leading-tight">
                            탁월한 기술력, <br />
                            <span className="transition-all
                text-white [text-shadow:2px_2px_0px_black,-2px_-2px_0px_black,2px_-2px_0px_black,-2px_2px_0px_black]
                dark:text-[#8B5CF6] dark:[text-shadow:none]">확실한 결과물.</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-lg font-black text-left leading-relaxed
            text-black
            dark:text-gray-400">
                        단순 코딩을 넘어 비즈니스 가치를 창출하는 맞춤형 엔지니어링 솔루션을 제공합니다.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((s, i) => {
                        // Define images for special cards
                        const specialImage = i === 0
                            ? "/images/service_langchain.png"
                            : i === 1
                                ? "/images/service_rag.png"
                                : i === 2
                                    ? "/images/service_api.png"
                                    : i === 3
                                        ? "/images/service_task.png"
                                        : null;

                        const linkTarget = i === 0 ? '#fullstack-mobile' :
                            i === 1 ? '#ai-ml-integration' :
                                i === 2 ? '#vibe-coding' :
                                    i === 3 ? '#senior-led-mvp' : '';

                        return (
                            <Link href={`/services${linkTarget}`} key={s.id} className={`block rounded-2xl transition-all group cursor-pointer relative overflow-hidden flex flex-col h-full
              bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              dark:bg-[#111] dark:border dark:border-white/10 dark:shadow-none hover:dark:border-[#FFD600] hover:dark:-translate-y-1 hover:dark:translate-x-0
              ${specialImage ? 'p-0' : 'p-6 sm:p-8'}`}>

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
                                                    className={`object-cover ${(i === 2 || i === 3) ? 'object-[70%_center]' : ''}`}
                                                />                                                        {/* Subtle gradient for depth, but keep image clear */}
                                                {/* Subtle gradient for depth, but keep image clear - REMOVED per user request */}
                                            </div>
                                        </div>

                                        {/* Bottom Section (Text + Icon) */}
                                        <div className="p-6 flex flex-col flex-1">
                                            {/* Icon Moved Here */}
                                            <div className="mb-4">
                                                <div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 border-white bg-black/20 backdrop-blur-md shadow-lg transition-colors group-hover:bg-[#FFD600] group-hover:border-[#FFD600] group-hover:bg-opacity-100"
                                                    style={{ borderColor: s.color }}>
                                                    <span className="material-symbols-outlined text-3xl text-black/80 dark:text-white transition-colors group-hover:text-black" aria-hidden="true">
                                                        {s.icon}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-black mb-3">{s.title}</h3>
                                            <p className="font-bold text-sm leading-relaxed text-gray-600 dark:text-gray-400 dark:font-medium flex-1">
                                                {s.description}
                                            </p>
                                            <div className="mt-6 flex justify-end">
                                                            <div className="w-8 h-8 flex items-center justify-center transition-colors text-black dark:rounded-full dark:bg-white/5 dark:text-white group-hover:dark:bg-[#FFD600] group-hover:dark:text-black">
                                                                <span className="material-symbols-outlined text-lg font-black" aria-hidden="true">arrow_forward</span>
                                                            </div>                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // Standard Layout for other cards
                                    <div className="flex flex-col h-full">
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 border-2 border-black dark:border dark:border-white/10"
                                            style={{ backgroundColor: s.color }}>
                                            <span className="material-symbols-outlined text-3xl text-white dark:text-white"
                                                style={{ color: !isDarkMode ? '#fff' : undefined }} aria-hidden="true">
                                                {s.icon}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black mb-3">{s.title}</h3>
                                        <p className="font-bold text-sm leading-relaxed text-gray-600 dark:text-gray-400 dark:font-medium flex-1">
                                            {s.description}
                                        </p>
                                        <div className="mt-8 flex justify-end">
                                                        <div className="w-8 h-8 flex items-center justify-center transition-colors text-black dark:rounded-full dark:bg-white/5 dark:text-white group-hover:dark:bg-[#FFD600] group-hover:dark:text-black">
                                                            <span className="material-symbols-outlined text-lg font-black" aria-hidden="true">arrow_forward</span>
                                                        </div>                                        </div>
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
