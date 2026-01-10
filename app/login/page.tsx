'use client';

import React from 'react';
import Link from 'next/link';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';

export default function LoginPage() {
  return (
    <div className="">
      <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-black dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black">
        <SimpleHeader />

        {/* Main Content */}
        <main className="flex min-h-screen items-center justify-center p-4 pt-20">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:border-white/20 dark:bg-[#111] dark:shadow-none">
            {/* Yellow Top Bar */}
            <div className="h-4 border-b-4 border-black bg-[#FFD600] transition-colors duration-300 dark:border-white/10 dark:bg-[#FFD600]"></div>

            <div className="p-8 md:p-12">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-block rounded-full border-2 border-black bg-black px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase transition-colors dark:border-[#FFD600] dark:bg-[#FFD600] dark:text-black">
                  Secure Access
                </div>
                <h1 className="serif mb-2 text-4xl font-black">Welcome Back</h1>
                <p className="text-sm font-bold text-gray-500 transition-colors dark:text-gray-400">
                  Please enter your details to sign in.
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="mb-2 block text-xs font-black text-black uppercase transition-colors dark:text-gray-400">
                    Email or Username
                  </label>
                  <input
                    type="text"
                    placeholder="name@example.com"
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 p-4 font-bold text-black placeholder-gray-300 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-black uppercase transition-colors dark:text-gray-400">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="........"
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 p-4 font-bold text-black placeholder-gray-300 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600]"
                  />
                </div>

                <button className="flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#FFD600] text-lg font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-[#FFD600] dark:bg-[#FFD600] dark:text-black dark:shadow-none dark:hover:translate-none dark:hover:bg-yellow-400">
                  LOG IN <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </form>

              <div className="mt-6 flex justify-between text-[10px] font-black tracking-wide text-gray-400 uppercase transition-colors dark:text-gray-500">
                <button className="transition-colors hover:text-black dark:hover:text-white">
                  Forgot ID?
                </button>
                <button className="transition-colors hover:text-black dark:hover:text-white">
                  Forgot Password?
                </button>
              </div>

              <div className="relative mt-8 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-100 transition-colors dark:border-white/10"></div>
                </div>
                <span className="relative bg-white px-4 text-xs font-black text-gray-300 transition-colors dark:bg-[#111] dark:text-gray-600">
                  OR
                </span>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-gray-500 transition-colors dark:text-gray-400">
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  className="rounded-lg border-2 border-black px-3 py-1 text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none dark:border-white/20 dark:text-white dark:shadow-none dark:hover:translate-none dark:hover:bg-white/10"
                >
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
