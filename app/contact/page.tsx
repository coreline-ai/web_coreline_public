"use client";

import React from 'react';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';

export default function ContactPage() {
    return (
        <div className="">
            <div className="min-h-screen font-sans transition-colors duration-300
        bg-white text-black selection:bg-black selection:text-white
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]
        dark:bg-black dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black
        dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]">

                <SimpleHeader />

                {/* Main Content */}
                <main className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
                    <div className="w-full max-w-4xl">
                        {/* Heading */}
                        <div className="mb-8">
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                                Contact <span className="relative inline-block px-4 transition-colors duration-300 bg-[#FFD600] text-black border-4 border-black italic transform -skew-x-6">
                                    Us
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl font-bold text-gray-500 dark:text-gray-400 max-w-2xl">
                                Have a question or want to work together? We&apos;d love to hear from you.
                            </p>
                        </div>

                        {/* Form Card */}
                        <div className="w-full border-4 rounded-[2rem] overflow-hidden relative transition-all duration-300
              bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              dark:bg-[#111] dark:border-white/20 dark:shadow-none p-8 md:p-12">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                                {/* Inquiry Type - Full Width on Mobile, Half on Desktop */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-black uppercase mb-3 flex items-center gap-2 transition-colors dark:text-gray-400">
                                        <span className="material-symbols-outlined text-sm">category</span>
                                        Inquiry Type
                                    </label>
                                    <div className="relative">
                                        <select className="w-full p-4 rounded-xl border-2 font-bold text-lg focus:outline-none focus:ring-0 transition-colors appearance-none
                      bg-gray-50 border-gray-200 focus:border-black text-black
                      dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:text-white">
                                            <option>General Inquiry (일반 문의)</option>
                                            <option>Project Request (프로젝트 의뢰)</option>
                                            <option>Recruitment (채용 관련)</option>
                                            <option>Partnership (제휴 문의)</option>
                                            <option>Other (기타)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors dark:text-white">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Full Name */}
                                <div>
                                    <label className="block text-xs font-black uppercase mb-3 flex items-center gap-2 transition-colors dark:text-gray-400">
                                        <span className="material-symbols-outlined text-sm">person</span>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full p-4 rounded-xl border-2 font-bold text-lg focus:outline-none focus:ring-0 transition-colors
                      bg-gray-50 border-gray-200 focus:border-black placeholder-gray-300 text-black
                      dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white"
                                    />
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-xs font-black uppercase mb-3 flex items-center gap-2 transition-colors dark:text-gray-400">
                                        <span className="material-symbols-outlined text-sm">mail</span>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full p-4 rounded-xl border-2 font-bold text-lg focus:outline-none focus:ring-0 transition-colors
                      bg-gray-50 border-gray-200 focus:border-black placeholder-gray-300 text-black
                      dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white"
                                    />
                                </div>

                                {/* Title (Subject) - Full Width */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-black uppercase mb-3 flex items-center gap-2 transition-colors dark:text-gray-400">
                                        <span className="material-symbols-outlined text-sm">title</span>
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="What is this regarding?"
                                        className="w-full p-4 rounded-xl border-2 font-bold text-lg focus:outline-none focus:ring-0 transition-colors
                      bg-gray-50 border-gray-200 focus:border-black placeholder-gray-300 text-black
                      dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white"
                                    />
                                </div>

                                {/* Message - Full Width */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-black uppercase mb-3 flex items-center gap-2 transition-colors dark:text-gray-400">
                                        <span className="material-symbols-outlined text-sm">edit_note</span>
                                        Message
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder="Please describe your inquiry in detail..."
                                        className="w-full p-4 rounded-xl border-2 font-bold text-lg focus:outline-none focus:ring-0 transition-colors
                      bg-gray-50 border-gray-200 focus:border-black placeholder-gray-300 text-black
                      dark:bg-black dark:border-white/20 dark:focus:border-[#FFD600] dark:placeholder-gray-700 dark:text-white resize-none"
                                    />
                                </div>

                            </div>

                            <div className="w-full border-t-2 border-dashed border-gray-200 dark:border-white/10 my-8"></div>

                            <div className="flex justify-end gap-4">
                                <button className="px-8 py-4 rounded-xl font-black text-lg border-2 transition-all
                  bg-white text-black border-black hover:bg-gray-50
                  dark:bg-transparent dark:text-white dark:border-white/30 dark:hover:bg-white/10">
                                    CANCEL
                                </button>
                                <button className="px-8 py-4 rounded-xl font-black text-lg border-2 transition-all flex items-center gap-2
                  bg-black text-white border-black hover:scale-105 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
                  dark:bg-white dark:text-black dark:border-transparent dark:hover:bg-[#FFD600] dark:shadow-none">
                                    SEND MESSAGE <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>

                        </div>

                        <p className="text-center mt-8 text-xs font-bold text-gray-400 dark:text-gray-600">
                            By sending a message, you agree to our <a href="#" className="underline hover:text-black dark:hover:text-white">Privacy Policy</a>
                        </p>
                    </div>
                </main>

                <SimpleFooter />
            </div>
        </div>
    );
}
