'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '../../data/projects';

export default function PortfolioSection() {
  return (
    <section
      id="projects"
      className="flex scroll-mt-20 justify-center border-b-2 border-black bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] px-4 py-24 transition-colors duration-300 dark:border-white/10 dark:bg-black dark:bg-none"
    >
      <div className="w-full max-w-[1200px]">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="mb-4 w-fit rounded-lg border-2 border-black bg-[#8B5CF6] px-4 py-1 text-xs font-black tracking-widest text-white uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all dark:border-none dark:shadow-none">
              Dashboard / Portfolio
            </div>
            <h2 className="text-4xl font-black md:text-5xl">
              <span className="relative inline-block">
                <span className="relative z-10">주요 프로젝트 사례</span>
                <span className="absolute -bottom-3 left-0 z-0 h-2 w-full -rotate-1 transform rounded-sm bg-[#FFD600]"></span>
              </span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden items-center gap-2 rounded-lg border-2 border-black bg-white px-6 py-3 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none md:flex dark:border dark:border-white/30 dark:bg-transparent dark:text-white dark:shadow-none dark:hover:translate-none dark:hover:bg-white dark:hover:text-black"
          >
            모든 프로젝트 <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p) => (
            <Link
              href={`/project/${p.id}`}
              key={p.id}
              className="group block overflow-hidden rounded-[2rem] border border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 dark:border dark:border-white/10 dark:bg-[#111] dark:shadow-none dark:hover:border-gray-500"
            >
              <div className="flex h-10 items-center gap-2 border-b border-black bg-gray-50 px-4 transition-colors dark:border-white/10 dark:bg-[#1A1A1A]">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-300"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <div className="flex-1 text-center font-mono text-[10px] text-gray-500">
                  {p.domain}
                </div>
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
                <div className="mb-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border-2 border-black bg-[#FFD600] px-3 py-1 text-[10px] font-black text-black uppercase transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-3 text-2xl font-black">{p.title}</h3>
                <p className="line-clamp-4 leading-relaxed font-bold text-gray-600 dark:font-medium dark:text-gray-400">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
