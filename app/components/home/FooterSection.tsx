'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FooterSection() {
    return (
        <footer className="py-24 px-4 flex justify-center border-t-2 transition-colors duration-300
      bg-black text-white border-black
      dark:bg-black dark:text-white dark:border-white/10 dark:border-t">
            <div className="max-w-[1200px] w-full">
                <div className="flex flex-col lg:flex-row gap-20 mb-24">
                    <div className="flex-1">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10">
                            Ready to <br /><span className="text-[#FFD600]">Innovate?</span>
                        </h2>
                        <p className="text-2xl font-bold mb-12 max-w-lg transition-colors
              text-gray-400
              dark:text-gray-500">
                            초기 컨셉부터 최종 배포까지, 당신의 든든한 엔지니어링 파트너가 되어드리겠습니다.
                        </p>
                        <Link href="/contact" className="h-16 px-8 w-fit border-2 rounded-xl font-black text-xl flex items-center gap-3 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
              border-white shadow-[6px_6px_0px_0px_white] hover:bg-white hover:text-black
              dark:border-white dark:shadow-none dark:active:scale-95">
                            프로젝트 문의하기 <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="w-full lg:w-[450px]">
                        <div className="p-8 rounded-3xl border-2 relative transition-all
              bg-white border-black
              dark:bg-[#111] dark:border-white/10 dark:border">
                            <div className="absolute -top-3 -right-3 bg-[#FFD600] text-black px-4 py-1 font-black text-xs uppercase tracking-widest rotate-6 border-2 border-black">FAST TRACK</div>
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-2
                text-black
                dark:text-white">
                                <span className="material-symbols-outlined dark:text-[#FFD600]">bolt</span> 빠른 문의
                            </h3>
                            <form className="flex flex-col gap-5">
                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-1 transition-colors
                    text-black
                    dark:text-gray-500">Name</label>
                                    <input type="text" placeholder="홍길동" className="w-full p-4 rounded-xl font-black focus:ring-0 transition-all outline-none
                    border-2 border-black placeholder-gray-300 focus:border-[#FFD600] text-black bg-white
                    dark:bg-black dark:border-white/20 dark:text-white dark:font-bold dark:placeholder-gray-700" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-1 transition-colors
                    text-black
                    dark:text-gray-500">Email</label>
                                    <input type="email" placeholder="hello@company.com" className="w-full p-4 rounded-xl font-black focus:ring-0 transition-all outline-none
                    border-2 border-black placeholder-gray-300 focus:border-[#FFD600] text-black bg-white
                    dark:bg-black dark:border-white/20 dark:text-white dark:font-bold dark:placeholder-gray-700" />
                                </div>
                                <Link href="/contact" className="w-full h-12 font-black text-base rounded-xl border-2 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-4 flex items-center justify-center
                  bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  dark:bg-[#FFD600] dark:text-black dark:border-transparent dark:hover:bg-yellow-400 dark:active:scale-95 dark:shadow-none">
                                    문의 보내기
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t-2 flex flex-col md:flex-row justify-between items-center gap-8 transition-colors
          border-gray-800
          dark:border-gray-900">
                    <Link
                        href="/"
                        className="flex items-center gap-2 group w-fit mb-6"
                    >
                        <div className="w-8 h-8 bg-[#FFD600] flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
                            <Image src="/logo.svg" alt="Coreline Logo" width={20} height={20} className="w-5 h-5" />
                        </div>
                        <span className="font-black text-xl tracking-tight">CORELINE</span>
                    </Link>
                    <div className="flex gap-8 text-sm font-black uppercase tracking-widest transition-colors
            text-gray-400
            dark:text-gray-600">
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">Email</a>
                    </div>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-600">© 2026 Coreline AI Studio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
