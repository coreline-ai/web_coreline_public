'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import SimpleHeader from '../components/layout/SimpleHeader';
import SimpleFooter from '../components/layout/SimpleFooter';
import { api } from '../lib/api-client';

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  if (status === 'authenticated') return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res: any = await api.post('/api/py-auth/register', {
        username: formData.username,
        email: formData.email,
        nickname: formData.nickname || formData.username,
        password: formData.password,
      });

      // API throws if not ok, so if we're here, it succeeded.
      // The backend returns { success: true, data: { access_token, user } }
      const token = res.data?.access_token || res.access_token;

      if (token) {
        // Auto sign in
        await signIn('credentials', {
          username: formData.username,
          password: formData.password,
          redirect: true,
          callbackUrl: '/signup/success',
        });
      } else {
        setError('Registration succeeded but no token returned');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="relative min-h-screen overflow-hidden bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-black dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black bw:bg-white bw:text-black bw:selection:bg-black bw:selection:text-white">
        <SimpleHeader />

        {/* Floating Shapes */}
        <div className="absolute top-32 left-12 hidden h-24 w-24 animate-bounce rounded-full border-4 border-black bg-[#FFD600] duration-[3000ms] md:block"></div>
        <div className="absolute bottom-32 left-32 hidden h-16 w-16 animate-pulse rounded-full border-4 border-black bg-[#A78BFA] md:block"></div>
        <div className="absolute right-20 bottom-20 hidden h-32 w-32 rotate-12 border-4 border-black bg-[#2DD4BF] transition-transform hover:rotate-45 md:block"></div>

        {/* Main Content */}
        <main className="relative z-10 flex min-h-screen items-center justify-center p-4 pt-20">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:border-white/20 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="relative p-8 md:p-12">
              <div className="mb-6 flex justify-center">
                <span className="rounded-full border-2 border-black bg-[#FFD600] px-6 py-2 text-xs font-black tracking-widest text-black uppercase shadow-[2px_2px_0px_0px_black] dark:border-transparent dark:shadow-none bw:border-black bw:shadow-[2px_2px_0px_0px_black]">
                  JOIN US
                </span>
              </div>

              <div className="mb-10 text-center">
                <h1 className="mb-2 text-4xl font-black text-black dark:text-white bw:text-black">
                  Create Account
                </h1>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">
                  Start building your projects today.
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl border-2 border-red-500 bg-red-50 p-4 text-xs font-bold text-red-500 transition-colors dark:bg-red-500/10 bw:bg-red-50">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-black text-black uppercase dark:text-gray-400 bw:text-black">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="jdoe123"
                      className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 font-bold text-black placeholder-gray-400 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:placeholder-gray-400 bw:focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-black text-black uppercase dark:text-gray-400 bw:text-black">
                      Nickname
                    </label>
                    <input
                      type="text"
                      name="nickname"
                      required
                      value={formData.nickname}
                      onChange={handleChange}
                      placeholder="Display Name"
                      className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 font-bold text-black placeholder-gray-400 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:placeholder-gray-400 bw:focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-black uppercase dark:text-gray-400 bw:text-black">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 font-bold text-black placeholder-gray-400 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:placeholder-gray-400 bw:focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-black uppercase dark:text-gray-400 bw:text-black">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="........"
                    className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 font-bold text-black placeholder-gray-400 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:placeholder-gray-400 bw:focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-black uppercase dark:text-gray-400 bw:text-black">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="........"
                    className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 font-bold text-black placeholder-gray-400 transition-colors focus:border-black focus:ring-0 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-700 dark:focus:border-[#FFD600] bw:border-black bw:bg-gray-50 bw:text-black bw:placeholder-gray-400 bw:focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-black text-lg font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 hover:bg-[#111] hover:shadow-none dark:border-transparent dark:bg-white dark:text-black dark:shadow-none dark:hover:bg-[#FFD600] bw:border-black bw:bg-black bw:text-white bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bw:hover:bg-gray-800"
                >
                  {isLoading ? 'CREATING...' : 'CREATE ACCOUNT'}
                </button>
              </form>

              <div className="my-6 w-full border-t-2 border-dashed border-gray-200 dark:border-white/10 bw:border-gray-200"></div>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">
                Already have an account?
                <Link
                  href="/login"
                  className="border-2 border-black bg-[#FFD600] px-2 py-1 font-black text-black uppercase shadow-[2px_2px_0px_0px_black] transition-transform hover:scale-105 dark:border-transparent dark:shadow-none bw:border-black bw:shadow-[2px_2px_0px_0px_black]"
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
