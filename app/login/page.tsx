"use client";

import React from 'react';
import Link from 'next/link';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';

export default function LoginPage() {
    return (
        <div className="">
            <div className="min-h-screen font-sans transition-colors duration-300
        bg-white text-black selection:bg-black selection:text-white
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]
        dark:bg-black dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black
        dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]">

                <SimpleHeader />

                {/* Main Content */}
                <main className="min-h-screen flex items-center justify-center p-4 pt-20">
                    <div className="w-full max-w-md border-4 rounded-[2rem] overflow-hidden relative transition-all duration-300
            bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            dark:bg-[#111] dark:border-white/20 dark:shadow-none">
                        {/* Yellow Top Bar */}
                        <div className="h-4 border-b-4 transition-colors duration-300
              bg-[#FFD600] border-black
              dark:bg-[#FFD600] dark:border-white/10"></div>

                        <div className="p-8 md:p-12">
                            <div className="text-center mb-8">
                                <div className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border-2 transition-colors
                  bg-black text-white border-black
                  dark:bg-[#FFD600] dark:text-black dark:border-[#FFD600]">
                                    Secure Access
                                </div>
                                <h1 className="text-4xl font-black mb-2 serif">Welcome Back</h1>
                                <p className="font-bold text-sm transition-colors
                  text-gray-500
                  dark:text-gray-400">Please enter your details to sign in.</p>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black uppercase mb-2 transition-colors
                    text-black
                    dark:text-gray-400">Email or Username</label>
                                    <input
                                        type="text"
                                        placeholder="name@example.com"
                                        className="w-full p-4 rounded-xl border-2 font-bold focus:outline-none focus:ring-0 transition-colors
                      bg-gray-50 border-gray-200 focus:border-black placeholder-gray-300 text-black
                      dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase mb-2 transition-colors
                    text-black
                    dark:text-gray-400">Password</label>
                                    <input
                                        type="password"
                                        placeholder="........"
                                        className="w-full p-4 rounded-xl border-2 font-bold focus:outline-none focus:ring-0 transition-colors
                      bg-gray-50 border-gray-200 focus:border-black placeholder-gray-300 text-black
                      dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white"
                                    />
                                </div>

                                <button className="w-full h-14 rounded-xl font-black text-lg border-2 transition-all flex items-center justify-center gap-2
                  bg-[#FFD600] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                  dark:bg-[#FFD600] dark:text-black dark:border-[#FFD600] dark:shadow-none dark:hover:bg-yellow-400 dark:hover:translate-none">
                                    LOG IN <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </form>

                            <div className="flex justify-between mt-6 text-[10px] font-black uppercase tracking-wide transition-colors
                text-gray-400
                dark:text-gray-500">
                                <button className="hover:text-black dark:hover:text-white transition-colors">Forgot ID?</button>
                                <button className="hover:text-black dark:hover:text-white transition-colors">Forgot Password?</button>
                            </div>

                            <div className="mt-8 relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-2 transition-colors
                    border-gray-100
                    dark:border-white/10"></div>
                                </div>
                                <span className="relative px-4 text-xs font-black transition-colors
                  bg-white text-gray-300
                  dark:bg-[#111] dark:text-gray-600">OR</span>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold transition-colors
                text-gray-500
                dark:text-gray-400">
                                Don&apos;t have an account?
                                <Link href="/signup" className="px-3 py-1 rounded-lg text-xs font-black border-2 transition-all hover:translate-x-[1px] hover:translate-y-[1px]
                  text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none
                  dark:text-white dark:border-white/20 dark:shadow-none dark:hover:bg-white/10 dark:hover:translate-none">
                                    REGISTER
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
