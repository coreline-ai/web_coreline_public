'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactSection() {
    return (
        <section className="flex justify-center bg-black px-4 py-24 text-white transition-colors duration-300 dark:bg-black dark:text-white border-t-2 border-white/10">
            <div className="w-full max-w-[1200px]">
                <div className="flex flex-col gap-20 lg:flex-row">
                    <div className="flex-1">
                        <h2 className="mb-10 text-6xl font-black tracking-tighter md:text-8xl">
                            Ready to <br />
                            <span className="text-[#FFD600]">Innovate?</span>
                        </h2>
                        <p className="mb-12 max-w-lg text-2xl font-bold text-gray-400 transition-colors dark:text-gray-500">
                            초기 컨셉부터 최종 배포까지, 당신의 든든한 엔지니어링 파트너가 되어드리겠습니다.
                        </p>
                        <Link
                            href="/contact"
                            className="flex h-16 w-fit items-center gap-3 rounded-xl border-2 border-white px-8 text-xl font-black shadow-[6px_6px_0px_0px_white] transition-all hover:bg-white hover:text-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none dark:border-white dark:shadow-none dark:active:scale-95"
                        >
                            프로젝트 문의하기 <span className="material-symbols-outlined notranslate">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="w-full lg:w-[450px]">
                        <div className="relative rounded-3xl border-2 border-black bg-white p-8 transition-all dark:border dark:border-white/10 dark:bg-[#111]">
                            <div className="absolute -top-3 -right-3 rotate-6 border-2 border-black bg-[#FFD600] px-4 py-1 text-xs font-black tracking-widest text-black uppercase">
                                FAST TRACK
                            </div>
                            <h3 className="mb-8 flex items-center gap-2 text-2xl font-black text-black dark:text-white">
                                <span className="material-symbols-outlined notranslate dark:text-[#FFD600]">bolt</span> 빠른
                                문의
                            </h3>
                            <form className="flex flex-col gap-5">
                                <div>
                                    <label
                                        htmlFor="quick-name"
                                        className="mb-1 block text-[10px] font-black text-black uppercase transition-colors dark:text-gray-500"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="quick-name"
                                        type="text"
                                        placeholder="홍길동"
                                        className="w-full rounded-xl border-2 border-black bg-white p-4 font-black text-black placeholder-gray-300 transition-all outline-none focus:border-[#FFD600] focus:ring-0 dark:border-white/20 dark:bg-black dark:font-bold dark:text-white dark:placeholder-gray-700"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="quick-email"
                                        className="mb-1 block text-[10px] font-black text-black uppercase transition-colors dark:text-gray-500"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="quick-email"
                                        type="email"
                                        placeholder="hello@company.com"
                                        className="w-full rounded-xl border-2 border-black bg-white p-4 font-black text-black placeholder-gray-300 transition-all outline-none focus:border-[#FFD600] focus:ring-0 dark:border-white/20 dark:bg-black dark:font-bold dark:text-white dark:placeholder-gray-700"
                                    />
                                </div>
                                <Link
                                    href="/contact"
                                    className="mt-4 flex h-12 w-full items-center justify-center rounded-xl border-2 border-black bg-black text-base font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none dark:border-transparent dark:bg-[#FFD600] dark:text-black dark:shadow-none dark:hover:bg-yellow-400 dark:active:scale-95"
                                >
                                    문의 보내기
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
