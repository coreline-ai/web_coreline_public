'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '../../constants';

export default function PortfolioSection() {
    return (
        <section id="projects" className="scroll-mt-20 py-24 px-4 flex justify-center border-b-2 transition-colors duration-300
      bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] border-black
      dark:bg-black dark:border-white/10 dark:bg-none">
            <div className="max-w-[1200px] w-full">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="px-4 py-1 rounded-lg text-xs font-black uppercase tracking-widest w-fit mb-4 border-2 transition-all
              bg-[#8B5CF6] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              dark:border-none dark:shadow-none">
                            Dashboard / Portfolio
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black">
                            <span className="relative inline-block">
                                <span className="relative z-10">주요 프로젝트 사례</span>
                                <span className="absolute -bottom-3 left-0 w-full h-2 bg-[#FFD600] z-0 transform -rotate-1 rounded-sm"></span>
                            </span>
                        </h2>
                    </div>
                    <Link href="/projects" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg font-black transition-all
            bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
            dark:bg-transparent dark:text-white dark:border dark:border-white/30 dark:shadow-none dark:hover:bg-white dark:hover:text-black dark:hover:translate-none">
                        모든 프로젝트 <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PROJECTS.map((p) => (
                        <Link href={`/project/${p.id}`} key={p.id} className="block rounded-[2rem] overflow-hidden transition-all duration-300 group
              bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1
              dark:bg-[#111] dark:border dark:border-white/10 dark:shadow-none dark:hover:border-gray-500">

                            <div className="h-10 border-b-2 flex items-center px-4 gap-2 transition-colors
                bg-gray-50 border-black
                dark:bg-[#1A1A1A] dark:border-white/10">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <div className="flex-1 text-center text-[10px] font-mono text-gray-500">{p.domain}</div>
                            </div>

                            <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                                <Image
                                    src={p.imageUrl}
                                    alt={p.imageAlt || p.title}
                                    fill
                                    className="object-cover transition-all duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {p.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-lg text-[10px] font-black uppercase border-2 transition-colors bg-[#FFD600] text-black border-black">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-black mb-3">{p.title}</h3>
                                <p className="font-bold leading-relaxed line-clamp-4
                  text-gray-600
                  dark:text-gray-400 dark:font-medium">{p.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
