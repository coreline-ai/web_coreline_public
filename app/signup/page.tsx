'use client';

import React from 'react';
import Link from 'next/link';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';

export default function SignUpPage() {
  return (
    <div className="">
      <div className="relative min-h-screen overflow-hidden bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-black dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black">
        <SimpleHeader />

        {/* Floating Shapes */}
        <div className="absolute top-32 left-12 hidden h-24 w-24 animate-bounce rounded-full border-4 border-black bg-[#FFD600] duration-[3000ms] md:block"></div>
        <div className="absolute bottom-32 left-32 hidden h-16 w-16 animate-pulse rounded-full border-4 border-black bg-[#A78BFA] md:block"></div>
        <div className="absolute right-20 bottom-20 hidden h-32 w-32 rotate-12 border-4 border-black bg-[#2DD4BF] transition-transform hover:rotate-45 md:block"></div>

        {/* Main Content */}
        <main className="relative z-10 flex min-h-screen items-center justify-center p-4 pt-20">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:border-white/20 dark:bg-[#111] dark:shadow-none">
            <div className="relative p-8 md:p-12">
              <div className="mb-6 flex justify-center">
                <span className="rounded-full border-2 border-black bg-[#FFD600] px-6 py-2 text-xs font-black tracking-widest text-black uppercase shadow-[2px_2px_0px_0px_black] dark:border-transparent dark:shadow-none">
                  JOIN US
                </span>
              </div>

              <div className="mb-10 text-center">
                <h1 className="mb-2 text-4xl font-black text-black dark:text-white">
                  Create Account
                </h1>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                  Start building your projects today.
                </p>
              </div>

              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-black text-black uppercase dark:text-gray-400">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="jdoe123"
                      className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 pr-10 font-bold text-black placeholder-gray-400 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600]"
                    />
                    <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-black dark:text-gray-500">
                      person
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-black uppercase dark:text-gray-400">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 pr-10 font-bold text-black placeholder-gray-400 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600]"
                    />
                    <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-black dark:text-gray-500">
                      mail
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-black uppercase dark:text-gray-400">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="........"
                      className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 pr-10 font-bold text-black placeholder-gray-400 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600]"
                    />
                    <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                      visibility_off
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] font-bold text-gray-500 uppercase">
                    Must be at least 8 characters.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-black uppercase dark:text-gray-400">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="........"
                    className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 font-bold text-black placeholder-gray-400 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600]"
                  />
                </div>

                <div className="flex items-center gap-3 py-2">
                  <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-black hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-white/10">
                    {/* Checked state would have a smaller circle inside */}
                  </div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <a href="#" className="text-black underline decoration-2 dark:text-white">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-black underline decoration-2 dark:text-white">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>

                <button className="flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-black text-lg font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#111] hover:shadow-none dark:border-transparent dark:bg-white dark:text-black dark:shadow-none dark:hover:bg-[#FFD600]">
                  CREATE ACCOUNT
                </button>
              </form>

              <div className="my-6 w-full border-t-2 border-dashed border-gray-200 dark:border-white/10"></div>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link
                  href="/login"
                  className="border-2 border-black bg-[#FFD600] px-2 py-1 font-black text-black uppercase shadow-[2px_2px_0px_0px_black] transition-transform hover:scale-105 dark:border-transparent dark:shadow-none"
                >
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
