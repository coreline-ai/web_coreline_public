'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="flex scroll-mt-32 justify-center border-b-2 border-black bg-[#FFD600] px-4 py-24 transition-colors duration-300 dark:border-white/10 dark:bg-black bw:border-black bw:bg-gray-200"
    >
      <div className="w-full max-w-[1200px]">
        <div className="relative flex flex-col items-center gap-16 overflow-hidden rounded-[3rem] border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all sm:p-10 sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:p-16 lg:flex-row dark:border dark:border-white/10 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute top-0 right-0 hidden md:block h-32 w-32 translate-x-4 -translate-y-4 rounded-bl-full bg-black transition-colors dark:hidden bw:hidden"></div>
          <div className="pointer-events-none absolute top-0 right-0 hidden h-64 w-64 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-[#FFD600]/10 to-transparent blur-3xl dark:block bw:hidden"></div>

          <div className="relative z-10 flex-1">
            <h3 className="mb-8 text-3xl leading-tight font-black sm:text-4xl md:text-5xl">
              엔지니어의{' '}
              <span className="bg-black px-3 py-1 text-white transition-colors dark:bg-transparent dark:px-0 dark:text-[#FFD600] bw:bg-black bw:text-white bw:px-3 bw:py-1">
                머리
              </span>
              와<br />
              디자이너의 <span className="italic">가슴</span>으로
            </h3>
            <p className="mb-10 text-xl leading-relaxed font-bold text-gray-800 transition-colors dark:font-medium dark:text-gray-400 bw:text-gray-800">
              Coreline은 거대 에이전시의 비효율성에 지친 시니어 엔지니어들이 설립했습니다. 우리는
              깔끔한 코드, 실용적인 솔루션, 직접적인 소통을 믿습니다. 중개인 없이 전문가들이 직접
              훌륭한 제품을 만듭니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-xl border-2 border-black bg-gray-50 px-6 py-3 font-black transition-colors hover:-translate-y-1 hover:shadow-md dark:border-white/20 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 bw:border-black bw:bg-gray-50 bw:text-black bw:hover:bg-gray-100"
              >
                <span className="material-symbols-outlined notranslate dark:text-[#FFD600] bw:text-black">check_circle</span>{' '}
                100% 인하우스 팀
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-xl border-2 border-black bg-gray-50 px-6 py-3 font-black transition-colors hover:-translate-y-1 hover:shadow-md dark:border-white/20 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 bw:border-black bw:bg-gray-50 bw:text-black bw:hover:bg-gray-100"
              >
                <span className="material-symbols-outlined notranslate dark:text-[#FFD600] bw:text-black">check_circle</span>{' '}
                투명한 가격 정책
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex w-full justify-center lg:w-1/3">
            <Link href="/profile" className="group relative block h-64 w-64 cursor-pointer">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-full border-2 border-black bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:translate-x-5 group-hover:translate-y-5 dark:translate-x-2 dark:translate-y-2 dark:border-none dark:bg-[#FFD600] dark:opacity-80 dark:shadow-none dark:group-hover:translate-x-3 dark:group-hover:translate-y-3 bw:translate-x-4 bw:translate-y-4 bw:border-2 bw:border-black bw:bg-black bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bw:group-hover:translate-x-5 bw:group-hover:translate-y-5"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-black bg-gray-200 transition-colors dark:border-white/20 dark:bg-gray-800 bw:border-black bw:bg-gray-200">
                {/* Default Image (Fades out on hover) */}
                <Image
                  src="/images/intro_profile.png"
                  alt="Founder"
                  fill
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />

                {/* Hover Image (Fades in on hover) */}
                <Image
                  src="/images/intro_profile_hover.png"
                  alt="Founder Hover"
                  fill
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
              <div className="absolute -right-4 -bottom-4 rotate-6 rounded-lg border-2 border-black bg-white px-4 py-2 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:rotate-12 dark:border dark:border-white/20 dark:bg-[#111] dark:text-white dark:shadow-lg bw:border-black bw:bg-white bw:text-black bw:shadow-lg">
                Hello! 👋 I am AI assistant
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
