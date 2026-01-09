"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';

export default function SignUpPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div className={`${isDarkMode ? 'dark' : ''}`}>
            <div className="min-h-screen font-sans transition-colors duration-300 overflow-hidden relative
        bg-white text-black selection:bg-black selection:text-white
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]
        dark:bg-black dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black
        dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]">

                <SimpleHeader isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

                {/* Floating Shapes */}
                <div className="absolute top-32 left-12 w-24 h-24 rounded-full border-4 border-black bg-[#FFD600] hidden md:block animate-bounce duration-[3000ms]"></div>
                <div className="absolute bottom-32 left-32 w-16 h-16 rounded-full border-4 border-black bg-[#A78BFA] hidden md:block animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 border-4 border-black bg-[#2DD4BF] hidden md:block rotate-12 transition-transform hover:rotate-45"></div>


                {/* Main Content */}
                <main className="min-h-screen flex items-center justify-center p-4 pt-20 relative z-10">
                    <div className="w-full max-w-md border-4 rounded-[2rem] overflow-hidden relative transition-all duration-300
            bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            dark:bg-[#111] dark:border-white/20 dark:shadow-none">

                        <div className="p-8 md:p-12 relative">

                            <div className="flex justify-center mb-6">
                                <span className="px-6 py-2 rounded-full border-2 border-black bg-[#FFD600] text-black font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_black] dark:border-transparent dark:shadow-none">
                                    JOIN US
                                </span>
                            </div>

                            <div className="text-center mb-10">
                                <h1 className="text-4xl font-black mb-2 text-black dark:text-white">Create Account</h1>
                                <p className="font-bold text-sm text-gray-500 dark:text-gray-400">Start building your projects today.</p>
                            </div>

                            <form className="space-y-5">
                                <div>
                                    <label className="block text-xs font-black uppercase mb-2 text-black dark:text-gray-400">Username</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="jdoe123"
                                            className="w-full p-3 pr-10 rounded-xl border-2 font-bold focus:outline-none focus:ring-0 transition-colors
                        bg-gray-50 border-black focus:border-black placeholder-gray-400 text-black
                        dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white"
                                        />
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-gray-500">person</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase mb-2 text-black dark:text-gray-400">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="name@company.com"
                                            className="w-full p-3 pr-10 rounded-xl border-2 font-bold focus:outline-none focus:ring-0 transition-colors
                        bg-gray-50 border-black focus:border-black placeholder-gray-400 text-black
                        dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white"
                                        />
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-gray-500">mail</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase mb-2 text-black dark:text-gray-400">Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="........"
                                            className="w-full p-3 pr-10 rounded-xl border-2 font-bold focus:outline-none focus:ring-0 transition-colors
                        bg-gray-50 border-black focus:border-black placeholder-gray-400 text-black
                        dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white"
                                        />
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">visibility_off</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Must be at least 8 characters.</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase mb-2 text-black dark:text-gray-400">Confirm Password</label>
                                    <input
                                        type="password"
                                        placeholder="........"
                                        className="w-full p-3 rounded-xl border-2 font-bold focus:outline-none focus:ring-0 transition-colors
                      bg-gray-50 border-black focus:border-black placeholder-gray-400 text-black
                      dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center gap-3 py-2">
                                    <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-white/10">
                                        {/* Checked state would have a smaller circle inside */}
                                    </div>
                                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400">
                                        I agree to the <a href="#" className="underline text-black decoration-2 dark:text-white">Terms of Service</a> and <a href="#" className="underline text-black decoration-2 dark:text-white">Privacy Policy</a>.
                                    </p>
                                </div>

                                <button className="w-full h-14 rounded-xl font-black text-lg border-2 transition-all flex items-center justify-center gap-2
                  bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#111]
                  dark:bg-white dark:text-black dark:border-transparent dark:shadow-none dark:hover:bg-[#FFD600]">
                                    CREATE ACCOUNT
                                </button>
                            </form>

                            <div className="w-full border-t-2 border-dashed border-gray-200 dark:border-white/10 my-6"></div>

                            <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                                Already have an account?
                                <Link href="/login" className="px-2 py-1 bg-[#FFD600] text-black border-2 border-black font-black uppercase hover:scale-105 transition-transform shadow-[2px_2px_0px_0px_black] dark:border-transparent dark:shadow-none">
                                    Log In
                                </Link>
                            </div>

                        </div>
                    </div>
                </main>

                <SimpleFooter />
            </div>
        </div>
    );
}
