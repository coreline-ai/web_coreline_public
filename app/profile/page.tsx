"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';

export default function ProfilePage() {
    return (
        <div className="">
            <div className="min-h-screen font-sans transition-colors duration-300
        bg-white text-black selection:bg-black selection:text-white
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]
        dark:bg-black dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black
        dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]">

                <SimpleHeader />

                <main className="container mx-auto px-4 pt-24 pb-20 max-w-6xl">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                        <Link href="/projects" className="hover:text-black dark:hover:text-white transition-colors">Portfolio</Link>
                        <span className="text-gray-300 dark:text-gray-700">/</span>
                        <span className="text-black dark:text-white">Senior Engineer Profile</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* LEFT COLUMN: Profile Card & Actions */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Profile Card */}
                            <div className="bg-[#111] rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] border-4 border-black dark:border-white/20 relative aspect-[4/5] flex flex-col">
                                <div className="absolute top-0 right-0 z-10">
                                    <div className="bg-[#FFD600] text-black text-xs font-black uppercase px-4 py-2 border-l-4 border-b-4 border-black">
                                        PROFILE
                                    </div>
                                </div>

                                {/* Code Background Effect */}
                                <div className="absolute inset-0 opacity-20 p-6 font-mono text-[10px] text-green-500 leading-relaxed pointer-events-none select-none overflow-hidden">
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

                                <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-0">
                                    <div className="relative mb-8 group">
                                        {/* Tooltip */}
                                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-max max-w-[280px] bg-white text-black px-4 py-3 rounded-2xl shadow-xl border-2 border-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20 pointer-events-none text-center">
                                            <p className="text-xs font-bold leading-relaxed">
                                                반갑습니다.<br />
                                                저는 <span className="text-[#FFD600] bg-black px-1 rounded">코어라인 AI 비서</span> 입니다.<br />
                                                무엇을 도와 드릴까요?
                                            </p>
                                            {/* Triangle */}
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-black transform rotate-45"></div>
                                        </div>

                                        {/* Image Container */}
                                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-300 border-4 border-white/20 relative overflow-hidden">
                                            <Image src="/images/profile_main.png" alt="Profile" fill className="object-cover object-top transition-opacity duration-500 group-hover:opacity-0" />
                                            <Image src="/images/profile_hover.png" alt="Profile Hover" fill className="object-cover object-top transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                                        </div>
                                    </div>

                                    <div className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase tracking-wider text-sm border-4 border-gray-200">
                                        Available for Hire
                                    </div>
                                </div>
                            </div>

                            {/* Links Card */}
                            <div className="bg-[#1a1a1a] rounded-3xl p-6 border-4 border-black dark:border-white/20 text-white flex items-center justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">code</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">GitHub & Resume</h3>
                                        <p className="text-[10px] text-gray-400">Access detailed project repos</p>
                                    </div>
                                </div>
                                <a href="https://github.com/coreline-ai" target="_blank" rel="noopener noreferrer" className="bg-[#FFD600] text-black px-4 py-2 rounded-lg text-xs font-black uppercase hover:bg-yellow-400 transition-colors">
                                    View Profile
                                </a>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Details */}
                        <div className="lg:col-span-7">
                            {/* Header Info */}
                            <div className="mb-10 flex flex-col gap-4">
                                <div className="flex flex-wrap gap-4 mb-2">
                                    <span className="px-3 py-1 rounded-full border-2 border-black dark:border-white text-xs font-black uppercase text-green-700 dark:text-green-400 bg-white dark:bg-black flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        Open to Work
                                    </span>
                                    <span className="px-3 py-1 rounded-full border-2 border-black dark:border-white text-xs font-black uppercase bg-white dark:bg-black">
                                        Senior Level
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black leading-tight">
                                    20-Year Senior Mobile &<br />Web Engineer
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                                    Specializing in Android framework tuning, custom platforms, and high-performance mobile/web applications.
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-1 bg-[#FFD600]"></div>
                                    <h3 className="font-black uppercase tracking-widest text-sm">Tech Stack</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {['Android SDK', 'iOS (Swift)', 'React Native', 'Flutter', 'Java/Kotlin', 'Node.js', 'System Level Tuning', 'Enterprise SDK'].map((tech) => (
                                        <span key={tech} className={`px-4 py-2 rounded-xl text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-transform hover:-translate-y-1 ${tech === 'Enterprise SDK' || tech === 'Android SDK' || tech === 'Flutter' || tech === 'System Level Tuning'
                                            ? 'bg-[#FFD600] text-black'
                                            : 'bg-white text-black'
                                            }`}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Career Highlights */}
                            <div className="mb-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-1 bg-black dark:bg-white"></div>
                                    <h3 className="font-black uppercase tracking-widest text-sm">Career Highlights</h3>
                                </div>

                                <div className="space-y-10 relative pl-4 border-l-2 border-gray-200 dark:border-gray-800 ml-2">
                                    {/* Item 1 */}
                                    <div className="relative pl-8">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black"></div>
                                        <h4 className="text-xl font-black">Team Lead</h4>
                                        <p className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 mb-2">Real Estate Tech Company</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Led new App dev & stability enhancements. Directed the engineering team in modernizing legacy systems.
                                        </p>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="relative pl-8">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black"></div>
                                        <h4 className="text-xl font-black">Team Lead / Deputy Manager</h4>
                                        <p className="text-[10px] font-bold uppercase text-pink-600 dark:text-pink-400 mb-2">R&D Center (Large Enterprise)</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Designed device-linked apps & platform modules. Managed cross-functional teams for flagship product integration.
                                        </p>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="relative pl-8">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black"></div>
                                        <h4 className="text-xl font-black">Senior Researcher</h4>
                                        <p className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 mb-2">Global R&D Centers</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Developed device-linked Android apps & control software. Focused on low-level optimization and hardware integration.
                                        </p>
                                    </div>

                                    {/* Item 4 */}
                                    <div className="relative pl-8">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-black"></div>
                                        <h4 className="text-xl font-black">Associate Researcher</h4>
                                        <p className="text-[10px] font-bold uppercase text-green-600 dark:text-green-400 mb-2">OMA Standard Startup</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Implemented standard protocols & mobile test tools. Contributed to early mobile internet standards.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Deep Dive */}
                    <div className="mb-20 pt-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 bg-[#FFD600] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:border-transparent text-black">
                                <span className="material-symbols-outlined">manage_search</span>
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-widest">TECHNICAL DEEP DIVE</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border-2 border-black dark:border-white/20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none h-full flex flex-col">
                                <div className="w-12 h-12 bg-[#FFD600] rounded-xl border-2 border-black dark:border-transparent flex items-center justify-center mb-6 text-black">
                                    <span className="material-symbols-outlined">memory</span>
                                </div>
                                <h3 className="text-xl font-black uppercase mb-6 leading-tight">Mobile & Platform Tuning</h3>
                                <div className="space-y-4 flex-1">
                                    {['Android Framework', 'Custom ROMs', 'Kernel optimization'].map((item) => (
                                        <div key={item} className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">check_circle</span>
                                            <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border-2 border-black dark:border-white/20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none h-full flex flex-col">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl border-2 border-black dark:border-transparent flex items-center justify-center mb-6 text-white">
                                    <span className="material-symbols-outlined">apartment</span>
                                </div>
                                <h3 className="text-xl font-black uppercase mb-6 leading-tight">Enterprise Architecture</h3>
                                <div className="space-y-4 flex-1">
                                    {['SDK Design', 'Middleware development', 'Large-scale integration'].map((item) => (
                                        <div key={item} className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[#FFD600]">check_circle</span>
                                            <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border-2 border-black dark:border-white/20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none h-full flex flex-col">
                                <div className="w-12 h-12 bg-blue-500 rounded-xl border-2 border-black dark:border-transparent flex items-center justify-center mb-6 text-white">
                                    <span className="material-symbols-outlined">layers</span>
                                </div>
                                <h3 className="text-xl font-black uppercase mb-6 leading-tight">Full-Stack Ecosystem</h3>
                                <div className="space-y-4 flex-1">
                                    {['Node.js', 'FastAPI', 'Next.js & Mobile Integration'].map((item) => (
                                        <div key={item} className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[#FFD600]">check_circle</span>
                                            <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Stats */}
                    <div className="border-t-2 border-black dark:border-white/20 pt-10 mt-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black mb-2">Career Impact</h2>
                            <p className="text-gray-500 text-sm">Key achievements and milestones.</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { val: '20+', label: 'Years Exp', color: 'text-purple-600' },
                                { val: '50+', label: 'Apps Launched', color: 'text-blue-500' },
                                { val: 'Lead', label: 'Team Leadership', color: 'text-[#FFD600]' },
                                { val: 'Arch', label: 'System Architecture', color: 'text-green-500' }
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white dark:bg-[#111] p-6 rounded-2xl border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none hover:-translate-y-1 transition-transform">
                                    <div className={`text-4xl font-black ${stat.color} mb-2`}>{stat.val}</div>
                                    <div className="text-xs font-bold uppercase text-gray-500">{stat.label}</div>
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
