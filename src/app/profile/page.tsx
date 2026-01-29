'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleHeader from '../components/layout/SimpleHeader';
import SimpleFooter from '../components/layout/SimpleFooter';

export default function ProfilePage() {
  return (
    <div className="">
      <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-black dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black bw:bg-white bw:text-black">
        <SimpleHeader />

        <main className="container mx-auto max-w-6xl px-4 pt-24 pb-20">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
            <Link
              href="/projects"
              className="transition-colors hover:text-black dark:hover:text-white bw:hover:text-black"
            >
              Portfolio
            </Link>
            <span className="text-gray-300 dark:text-gray-700 bw:text-gray-300">/</span>
            <span className="text-black dark:text-white bw:text-black">Senior Engineer Profile</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT COLUMN: Profile Card & Actions */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {/* Profile Card */}
              <div className="relative flex aspect-[3/4] flex-col overflow-hidden rounded-3xl border-4 border-black bg-[#111] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute top-0 right-0 z-10">
                  <div className="border-b-4 border-l-4 border-black bg-[#FFD600] px-4 py-2 text-xs font-black text-black uppercase">
                    PROFILE
                  </div>
                </div>

                {/* Code Background Effect */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden p-6 font-mono text-[10px] leading-relaxed text-green-500 opacity-20 select-none">
                  {`class Engineer(Senior):
    def __init__(self):
        self.exp = 20
        self.stack = ['Android', 'Web']
        self.focus = 'Performance'

    def build_future(self):
        return "Innovation"
        
    # Optimizing core frameworks...
    # Deploying to production...
    # Legacy system modernization...
                                `}
                </div>

                <div className="relative z-0 flex flex-1 flex-col items-center justify-center p-8">
                  <div className="group relative mb-8">
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute -top-16 left-1/2 z-20 w-max max-w-[280px] -translate-x-1/2 translate-y-2 transform rounded-2xl border-2 border-black bg-white px-4 py-3 text-center text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-xs leading-relaxed font-bold">
                        반갑습니다.
                        <br />
                        저는{' '}
                        <span className="rounded bg-black px-1 text-[#FFD600]">
                          코어라인 AI 비서
                        </span>{' '}
                        입니다.
                        <br />
                        무엇을 도와 드릴까요?
                      </p>
                      {/* Triangle */}
                      <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 transform border-r-2 border-b-2 border-black bg-white"></div>
                    </div>

                    {/* Image Container */}
                    <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/20 bg-gray-300 md:h-80 md:w-80">
                      <Image
                        src="/images/profile_main.png"
                        alt="Profile"
                        fill
                        className="object-cover object-top transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <Image
                        src="/images/profile_hover.png"
                        alt="Profile Hover"
                        fill
                        className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border-4 border-gray-200 bg-white px-6 py-3 text-sm font-black tracking-wider text-black uppercase">
                    Available for Hire
                  </div>
                </div>
              </div>

              {/* Links Card */}
              <div className="flex items-center justify-between rounded-3xl border-4 border-black bg-[#1a1a1a] p-6 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:shadow-none bw:border-black bw:bg-white bw:text-black bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                    <span className="material-symbols-outlined notranslate text-2xl">code</span>
                  </div>
                  <div>
                    <h3 className="font-bold">GitHub & Resume</h3>
                    <p className="text-[10px] text-gray-400">Access detailed project repos</p>
                  </div>
                </div>
                <a
                  href="https://github.com/coreline-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#FFD600] px-4 py-2 text-xs font-black text-black uppercase transition-colors hover:bg-yellow-400"
                >
                  View Profile
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Details */}
            <div className="lg:col-span-7">
              {/* Header Info */}
              <div className="mb-10 flex flex-col gap-4">
                <div className="mb-2 flex flex-wrap gap-4">
                  <span className="flex items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black text-green-700 uppercase dark:border-white dark:bg-black dark:text-green-400 bw:border-black bw:bg-white bw:text-green-700">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                    Open to Work
                  </span>
                  <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase dark:border-white dark:bg-black bw:border-black bw:bg-white">
                    Senior Level
                  </span>
                </div>
                <h1 className="text-4xl leading-tight font-black md:text-5xl">
                  20-Year Senior Mobile &<br />
                  Web Engineer
                </h1>
                <p className="text-lg leading-relaxed font-medium text-gray-600 dark:text-gray-300 bw:text-gray-600">
                  Specializing in Android framework tuning, custom platforms, and high-performance
                  mobile/web applications.
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-1 w-8 bg-[#FFD600]"></div>
                  <h3 className="text-sm font-black tracking-widest uppercase">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Android SDK',
                    'iOS (Swift)',
                    'React Native',
                    'Flutter',
                    'Java/Kotlin',
                    'Node.js',
                    'System Level Tuning',
                    'Enterprise SDK',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-xl border-2 border-black px-4 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] bw:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${tech === 'Enterprise SDK' ||
                        tech === 'Android SDK' ||
                        tech === 'Flutter' ||
                        tech === 'System Level Tuning'
                        ? 'bg-[#FFD600] text-black'
                        : 'bg-white text-black'
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Highlights */}
              <div className="mb-12">
                <div className="mb-8 flex items-center gap-3">
                  <div className="h-1 w-8 bg-black dark:bg-white bw:bg-black"></div>
                  <h3 className="text-sm font-black tracking-widest uppercase">
                    Career Highlights
                  </h3>
                </div>

                <div className="relative ml-2 space-y-10 border-l-2 border-gray-200 pl-4 dark:border-gray-800 bw:border-gray-200">
                  {/* Item 1 */}
                  <div className="relative pl-8">
                    <div className="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 border-white bg-black dark:border-black dark:bg-white bw:border-white bw:bg-black"></div>
                    <h4 className="text-xl font-black">Team Lead</h4>
                    <p className="mb-2 text-[10px] font-bold text-purple-600 uppercase dark:text-purple-400 bw:text-purple-600">
                      Device Tech Company
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 bw:text-gray-600">
                      Led new App dev & stability enhancements. Directed the engineering team in
                      modernizing legacy systems.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="relative pl-8">
                    <div className="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 border-white bg-black dark:border-black dark:bg-white bw:border-white bw:bg-black"></div>
                    <h4 className="text-xl font-black">Team Lead / Deputy Manager</h4>
                    <p className="mb-2 text-[10px] font-bold text-pink-600 uppercase dark:text-pink-400 bw:text-pink-600">
                      R&D Center (Large Enterprise)
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 bw:text-gray-600">
                      Designed device-linked apps & platform modules. Managed cross-functional teams
                      for flagship product integration.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="relative pl-8">
                    <div className="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 border-white bg-black dark:border-black dark:bg-white bw:border-white bw:bg-black"></div>
                    <h4 className="text-xl font-black">Senior Researcher</h4>
                    <p className="mb-2 text-[10px] font-bold text-blue-600 uppercase dark:text-blue-400 bw:text-blue-600">
                      Global R&D Centers
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 bw:text-gray-600">
                      Developed device-linked Android apps & control software. Focused on low-level
                      optimization and hardware integration.
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="relative pl-8">
                    <div className="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-black bw:border-white"></div>
                    <h4 className="text-xl font-black">Associate Researcher</h4>
                    <p className="mb-2 text-[10px] font-bold text-green-600 uppercase dark:text-green-400 bw:text-green-600">
                      OMA Standard Startup
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 bw:text-gray-600">
                      Implemented standard protocols & mobile test tools. Contributed to early
                      mobile internet standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Deep Dive */}
          <div className="mb-20 pt-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#FFD600] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-transparent dark:shadow-none bw:border-black bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="material-symbols-outlined notranslate">manage_search</span>
              </div>
              <h2 className="text-2xl font-black tracking-widest uppercase">TECHNICAL DEEP DIVE</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <div className="flex h-full flex-col rounded-3xl border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#FFD600] text-black dark:border-transparent bw:border-black">
                  <span className="material-symbols-outlined notranslate">memory</span>
                </div>
                <h3 className="mb-6 text-xl leading-tight font-black uppercase">
                  Mobile & Platform Tuning
                </h3>
                <div className="flex-1 space-y-4">
                  {['Android Framework', 'Custom ROMs', 'Kernel optimization'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="material-symbols-outlined notranslate text-purple-600 dark:text-purple-400 bw:text-purple-600">
                        check_circle
                      </span>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 bw:text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex h-full flex-col rounded-3xl border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-purple-500 text-white dark:border-transparent bw:border-black">
                  <span className="material-symbols-outlined notranslate">apartment</span>
                </div>
                <h3 className="mb-6 text-xl leading-tight font-black uppercase">
                  Enterprise Architecture
                </h3>
                <div className="flex-1 space-y-4">
                  {['SDK Design', 'Middleware development', 'Large-scale integration'].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="material-symbols-outlined notranslate text-[#FFD600]">
                          check_circle
                        </span>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 bw:text-gray-700">
                          {item}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex h-full flex-col rounded-3xl border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-blue-500 text-white dark:border-transparent bw:border-black">
                  <span className="material-symbols-outlined notranslate">layers</span>
                </div>
                <h3 className="mb-6 text-xl leading-tight font-black uppercase">
                  Full-Stack Ecosystem
                </h3>
                <div className="flex-1 space-y-4">
                  {['Node.js', 'FastAPI', 'Next.js & Mobile Integration'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="material-symbols-outlined notranslate text-[#FFD600]">check_circle</span>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 bw:text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-10 border-t-2 border-black pt-10 dark:border-white/20 bw:border-black">
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-black">Career Impact</h2>
              <p className="text-sm text-gray-500">Key achievements and milestones.</p>
            </div>

            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[
                { val: '20+', label: 'Years Exp', color: 'text-purple-600' },
                { val: '50+', label: 'Apps Launched', color: 'text-blue-500' },
                { val: 'Lead', label: 'Team Leadership', color: 'text-[#FFD600]' },
                { val: 'Arch', label: 'System Architecture', color: 'text-green-500' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 dark:border-white/20 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className={`text-4xl font-black ${stat.color} mb-2`}>{stat.val}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <SimpleFooter />
      </div>
    </div>
  );
}
