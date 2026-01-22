'use client';

import React from 'react';
import SimpleHeader from '../components/layout/SimpleHeader';
import SimpleFooter from '../components/layout/SimpleFooter';

export default function ContactPage() {
  return (
    <div className="">
      <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-black dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black bw:bg-white bw:text-black bw:selection:bg-black bw:selection:text-white">
        <SimpleHeader />

        {/* Main Content */}
        <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-20">
          <div className="w-full max-w-4xl">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="mb-4 text-5xl font-black tracking-tighter md:text-7xl">
                Contact{' '}
                <span className="relative inline-block -skew-x-6 transform border-4 border-black bg-[#FFD600] px-4 text-black italic transition-colors duration-300">
                  Us
                </span>
              </h1>
              <p className="max-w-2xl text-lg font-bold text-gray-500 md:text-xl dark:text-gray-400 bw:text-gray-500">
                Have a question or want to work together? We&apos;d love to hear from you.
              </p>
            </div>

            {/* Form Card */}
            <div className="relative w-full overflow-hidden rounded-[2rem] border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 md:p-12 dark:border-white/20 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Inquiry Type - Full Width on Mobile, Half on Desktop */}
                <div className="md:col-span-2">
                  <label className="mb-3 block flex items-center gap-2 text-xs font-black uppercase transition-colors dark:text-gray-400 bw:text-gray-400">
                    <span className="material-symbols-outlined notranslate text-sm">category</span>
                    Inquiry Type
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-gray-50 p-4 text-lg font-bold text-black transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:focus:border-black">
                      <option>General Inquiry (일반 문의)</option>
                      <option>Project Request (프로젝트 의뢰)</option>
                      <option>Recruitment (채용 관련)</option>
                      <option>Partnership (제휴 문의)</option>
                      <option>Other (기타)</option>
                    </select>
                    <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform transition-colors dark:text-white bw:text-black">
                      <span className="material-symbols-outlined notranslate">expand_more</span>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="mb-3 block flex items-center gap-2 text-xs font-black uppercase transition-colors dark:text-gray-400 bw:text-gray-400">
                    <span className="material-symbols-outlined notranslate text-sm">person</span>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 p-4 text-lg font-bold text-black placeholder-gray-300 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:placeholder-gray-400 bw:focus:border-black"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="mb-3 block flex items-center gap-2 text-xs font-black uppercase transition-colors dark:text-gray-400 bw:text-gray-400">
                    <span className="material-symbols-outlined notranslate text-sm">mail</span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 p-4 text-lg font-bold text-black placeholder-gray-300 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:placeholder-gray-400 bw:focus:border-black"
                  />
                </div>

                {/* Title (Subject) - Full Width */}
                <div className="md:col-span-2">
                  <label className="mb-3 block flex items-center gap-2 text-xs font-black uppercase transition-colors dark:text-gray-400 bw:text-gray-400">
                    <span className="material-symbols-outlined notranslate text-sm">title</span>
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="What is this regarding?"
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 p-4 text-lg font-bold text-black placeholder-gray-300 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:placeholder-gray-400 bw:focus:border-black"
                  />
                </div>

                {/* Message - Full Width */}
                <div className="md:col-span-2">
                  <label className="mb-3 block flex items-center gap-2 text-xs font-black uppercase transition-colors dark:text-gray-400 bw:text-gray-400">
                    <span className="material-symbols-outlined notranslate text-sm">edit_note</span>
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Please describe your inquiry in detail..."
                    className="w-full resize-none rounded-xl border-2 border-gray-200 bg-gray-50 p-4 text-lg font-bold text-black placeholder-gray-300 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:placeholder-gray-400 bw:focus:border-black"
                  />
                </div>
              </div>

              <div className="my-8 w-full border-t-2 border-dashed border-gray-200 dark:border-white/10 bw:border-gray-200"></div>

              <div className="grid grid-cols-2 gap-4">
                <button className="rounded-xl border-2 border-black bg-white px-8 py-4 text-lg font-black text-black transition-all hover:bg-gray-50 dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:bg-white/10 bw:border-black bw:bg-white bw:text-black bw:hover:bg-gray-100">
                  CANCEL
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-black px-8 py-4 text-lg font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all hover:scale-105 active:scale-95 dark:border-transparent dark:bg-white dark:text-black dark:shadow-none dark:hover:bg-[#FFD600] bw:border-black bw:bg-black bw:text-white bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bw:hover:bg-gray-800">
                  SEND MESSAGE <span className="material-symbols-outlined notranslate hidden sm:inline">send</span>
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-xs font-bold text-gray-400 dark:text-gray-600 bw:text-gray-400">
              By sending a message, you agree to our{' '}
              <a href="#" className="underline hover:text-black dark:hover:text-white bw:hover:text-black">
                Privacy Policy
              </a>
            </p>
          </div>
        </main>

        <SimpleFooter />
      </div>
    </div>
  );
}
