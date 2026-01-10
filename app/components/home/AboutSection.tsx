'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutSection() {
    return (
        <section id="about" className="scroll-mt-32 py-24 px-4 flex justify-center border-b-2 transition-colors duration-300
      bg-[#FFD600] border-black
      dark:bg-black dark:border-white/10">
            <div className="max-w-[1200px] w-full">
                <div className="rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden transition-all
          bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
          dark:bg-[#111] dark:border dark:border-white/10 dark:shadow-none">

                    <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full translate-x-4 -translate-y-4 transition-colors
             bg-black
             dark:hidden"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FFD600]/10 to-transparent blur-3xl rounded-full translate-x-12 -translate-y-12 pointer-events-none hidden dark:block"></div>

                    <div className="flex-1 relative z-10">
                        <h3 className="text-4xl md:text-5xl font-black leading-tight mb-8">
                            엔지니어의 <span className="px-3 py-1 transition-colors
                bg-black text-white
                dark:bg-transparent dark:text-[#FFD600] dark:px-0">머리</span>와<br />
                            디자이너의 <span className="italic">가슴</span>으로
                        </h3>
                        <p className="text-xl font-bold leading-relaxed mb-10 transition-colors
              text-gray-800
              dark:text-gray-400 dark:font-medium">
                            Coreline은 거대 에이전시의 비효율성에 지친 시니어 엔지니어들이 설립했습니다. 우리는 깔끔한 코드, 실용적인 솔루션, 직접적인 소통을 믿습니다. 중개인 없이 전문가들이 직접 훌륭한 제품을 만듭니다.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/profile" className="flex items-center gap-2 px-6 py-3 border-2 rounded-xl font-black transition-colors hover:-translate-y-1 hover:shadow-md
                bg-gray-50 border-black
                dark:bg-white/5 dark:border-white/20 dark:text-gray-300 dark:hover:bg-white/10">
                                <span className="material-symbols-outlined dark:text-[#FFD600]">check_circle</span> 100% 인하우스 팀
                            </Link>
                            <Link href="/profile" className="flex items-center gap-2 px-6 py-3 border-2 rounded-xl font-black transition-colors hover:-translate-y-1 hover:shadow-md
                bg-gray-50 border-black
                dark:bg-white/5 dark:border-white/20 dark:text-gray-300 dark:hover:bg-white/10">
                                <span className="material-symbols-outlined dark:text-[#FFD600]">check_circle</span> 투명한 가격 정책
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 flex justify-center relative z-10">
                        <Link href="/profile" className="relative w-64 h-64 block group cursor-pointer">
                            <div className="absolute inset-0 rounded-full translate-x-4 translate-y-4 transition-all group-hover:translate-x-5 group-hover:translate-y-5
                bg-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                dark:bg-[#FFD600] dark:opacity-80 dark:translate-x-2 dark:translate-y-2 dark:border-none dark:shadow-none dark:group-hover:translate-x-3 dark:group-hover:translate-y-3"></div>
                            <div className="relative w-full h-full rounded-full border-2 overflow-hidden bg-gray-200 transition-colors
                border-black
                dark:border-white/20 dark:bg-gray-800">
                                {/* Default Image (Fades out on hover) */}
                                <Image src="/images/intro_profile.png" alt="Founder" fill
                                    className="object-cover transition-opacity duration-500 group-hover:opacity-0" />

                                {/* Hover Image (Fades in on hover) */}
                                <Image src="/images/intro_profile_hover.png" alt="Founder Hover" fill
                                    className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-lg font-black rotate-6 transition-all group-hover:rotate-12
                bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                dark:bg-[#111] dark:text-white dark:border dark:border-white/20 dark:shadow-lg">
                                Hello! 👋 I am AI assistant
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
