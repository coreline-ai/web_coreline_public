"use client";

import React, { useState } from 'react';
import { PROJECTS, SERVICES, PROCESS_STEPS, TECH_STACK } from './constants';

export default function Home() {
    // Default to dark mode as per recent heavy development, but allow toggling
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div className={`${isDarkMode ? 'dark' : ''}`}>
            <div className="min-h-screen transition-colors duration-300 font-sans
        bg-white text-black selection:bg-black selection:text-white
        dark:bg-black dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black">

                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-6 pointer-events-none">
                    <div className="pointer-events-auto w-full max-w-[1200px] rounded-xl px-6 py-4 flex items-center justify-between transition-all duration-300
            bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            dark:bg-black/80 dark:backdrop-blur-md dark:border dark:border-white/20 dark:shadow-none">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300
                                bg-[#FFD600] text-black border-2 border-black
                                dark:border-transparent">
                                <span className="material-symbols-outlined font-black">terminal</span>
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter">Coreline</h2>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <div className="flex items-center gap-8 font-bold transition-colors duration-300
                text-black
                dark:text-gray-300">
                                {['서비스', '포트폴리오', '프로세스', '소개'].map((item, i) => (
                                    <a key={i} href={`#${item === '포트폴리오' ? 'projects' : item === '서비스' ? 'services' : item === '프로세스' ? 'process' : 'about'}`}
                                        className="hover:underline decoration-2 underline-offset-4 transition-all
                    decoration-black hover:text-black
                    dark:decoration-[#FFD600] dark:hover:text-white">
                                        {item}
                                    </a>
                                ))}
                            </div>

                            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>

                            {/* Theme Toggle Button */}
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-black transition-all hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                bg-white text-black
                dark:bg-transparent dark:border-white/20 dark:text-white dark:shadow-none dark:hover:bg-white/10 dark:hover:translate-none">
                                <span className="material-symbols-outlined">
                                    {isDarkMode ? 'light_mode' : 'dark_mode'}
                                </span>
                            </button>

                            <button className="px-6 py-3 rounded-lg font-black text-sm transition-all active:scale-95
                bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                dark:bg-white dark:text-black dark:border-transparent dark:hover:bg-[#FFD600] dark:shadow-none dark:hover:translate-none">
                                프로젝트 시작하기
                            </button>
                        </div>

                        <div className="md:hidden">
                            <span className="material-symbols-outlined">menu</span>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-48 pb-24 px-4 flex justify-center relative overflow-hidden transition-all duration-300
          bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]
          dark:bg-none dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-black dark:to-black">

                    <div className="max-w-[1200px] w-full flex flex-col lg:flex-row items-center gap-20 relative z-10">
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit transition-all
                bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                dark:bg-white/5 dark:border dark:border-white/10 dark:shadow-none">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-black/10"></span>
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-gray-300">프로젝트 접수 중</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight transition-colors">
                                미래를 코딩하는 <span className="dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FFD600] dark:to-yellow-200">AI</span><br />
                                <span className="inline-block relative">
                                    <span className="absolute inset-x-0 bottom-2 h-4 bg-[#FFD600] -z-10 -rotate-2 dark:hidden"></span>
                                    <span className="dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FFD600] dark:to-yellow-200">
                                        엔지니어링
                                    </span>
                                </span> 스튜디오
                            </h1>

                            <p className="text-xl font-medium max-w-lg leading-relaxed pl-6 border-l-4 transition-all
                text-gray-700 border-black
                dark:text-gray-400 dark:border-[#FFD600] dark:border-l-2">
                                비즈니스 성장을 위한 AI 솔루션과 강력한 소프트웨어를 구축합니다. 복잡한 문제를 단순하고 직관적인 코드로 해결하세요.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="h-14 px-8 font-black text-lg rounded-xl flex items-center gap-3 transition-all active:scale-95
                  bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                  dark:bg-[#FFD600] dark:text-black dark:shadow-none dark:hover:bg-yellow-400 dark:hover:translate-none">
                                    서비스 보기 <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                                <button className="h-14 px-8 font-black text-lg rounded-xl transition-all active:scale-95
                  bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                  dark:bg-transparent dark:text-white dark:border dark:border-white/30 dark:shadow-none dark:hover:bg-white/10 dark:hover:translate-none">
                                    포트폴리오
                                </button>
                            </div>

                            <div className="flex gap-8 pt-8">
                                {[{ num: '50+', label: 'Projects' }, { num: '98%', label: 'Retention' }].map((stat, i) => (
                                    <div key={i} className="p-4 rounded-xl transition-all
                    bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    dark:bg-white/5 dark:border dark:border-white/10 dark:shadow-none dark:backdrop-blur-sm">
                                        <span className="block text-3xl font-black">{stat.num}</span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-[500px] relative">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFD600] rounded-full blur-[100px] opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-500"></div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-500"></div>

                            <div className="relative aspect-square rounded-[2rem] overflow-hidden transition-all duration-300
                bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                dark:bg-[#111] dark:border dark:border-white/20 dark:shadow-2xl dark:shadow-blue-500/10">

                                <div className="h-10 w-full flex items-center px-4 gap-2 border-b-2 transition-colors
                  bg-black border-black
                  dark:bg-[#222] dark:border-white/10">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>

                                <div className="p-8 h-full flex items-center justify-center overflow-hidden relative
                  bg-gray-50
                  dark:bg-black/50">
                                    <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-20 pointer-events-none">
                                        {Array.from({ length: 400 }).map((_, i) => (
                                            <div key={i} className="border-[0.5px] border-black/10 dark:border-white/10"></div>
                                        ))}
                                    </div>
                                    <span className="material-symbols-outlined animate-pulse
                    text-black/10
                    dark:text-white/50"
                                        style={{ fontSize: '200px' }}>code_blocks</span>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl transition-all
                  bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]
                  dark:bg-[#222]/90 dark:backdrop-blur-md dark:border dark:border-white/10 dark:shadow-none">
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-black dark:text-[#FFD600]">smart_toy</span>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400">AI System Analysis</span>
                                                <span className="text-[10px] font-black text-green-600 dark:text-green-400">LIVE</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border border-black/10 dark:border-transparent">
                                                <div className="h-full bg-black dark:bg-[#FFD600] w-[75%] rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="scroll-mt-32 py-24 px-4 flex justify-center transition-colors duration-300
          bg-[#FFD600] border-y-2 border-black
          dark:bg-black dark:border-y dark:border-white/10">
                    <div className="max-w-[1200px] w-full">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest w-fit border-2 transition-all
                  bg-black text-white border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  dark:bg-[#FFD600] dark:text-black dark:border-none dark:shadow-none">
                                    <span className="material-symbols-outlined text-sm text-[#FFD600] dark:text-black">stars</span> What We Do
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black">
                                    탁월한 기술력, <br />
                                    <span className="transition-all
                    text-white [text-shadow:2px_2px_0px_black,-2px_-2px_0px_black,2px_-2px_0px_black,-2px_2px_0px_black]
                    dark:text-[#8B5CF6] dark:[text-shadow:none]">확실한 결과물.</span>
                                </h2>
                            </div>
                            <p className="max-w-xs text-lg font-black text-right md:text-left leading-relaxed
                text-black
                dark:text-gray-400">
                                단순 코딩을 넘어 비즈니스 가치를 창출하는 맞춤형 엔지니어링 솔루션을 제공합니다.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {SERVICES.map((s) => (
                                <div key={s.id} className="p-6 rounded-2xl transition-all group cursor-pointer
                  bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  dark:bg-[#111] dark:border dark:border-white/10 dark:shadow-none hover:dark:border-[#FFD600] hover:dark:-translate-y-1 hover:dark:translate-x-0">

                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:scale-110
                    border-2 border-black
                    dark:border dark:border-white/10"
                                        style={{ backgroundColor: s.color }}>
                                        <span className="material-symbols-outlined text-3xl
                      text-white
                      dark:text-white"
                                            style={{ color: !isDarkMode ? '#fff' : undefined }}>
                                            {s.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black mb-3">{s.title}</h3>
                                    <p className="font-bold text-sm leading-relaxed
                    text-gray-600
                    dark:text-gray-400 dark:font-medium">{s.description}</p>
                                    <div className="mt-8 flex justify-end">
                                        <div className="w-8 h-8 flex items-center justify-center transition-colors
                       text-black
                       dark:rounded-full dark:bg-white/5 dark:text-white group-hover:dark:bg-[#FFD600] group-hover:dark:text-black">
                                            <span className="material-symbols-outlined text-lg font-black">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Ribbon */}
                <div className="py-12 border-b-2 border-black transition-colors duration-300
          bg-white
          dark:bg-[#0a0a0a] dark:border-b dark:border-white/10 dark:border-t-0">
                    <div className="max-w-[1200px] mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {Object.entries(TECH_STACK).map(([category, items]) => (
                                <div key={category} className="flex flex-col gap-4">
                                    <h3 className="text-xl font-black pb-2 border-b-2 transition-colors
                    border-black text-black
                    dark:border-white/10 dark:text-gray-300">{category}</h3>
                                    <div className="flex flex-col gap-2">
                                        {items.map((tech) => (
                                            <div key={tech.name} className="flex items-center gap-3 px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-default
                        bg-gray-100 border-2 border-black hover:bg-[#FFD600]
                        dark:bg-white/5 dark:border-transparent dark:text-gray-300 dark:hover:bg-[#FFD600] dark:hover:text-black">
                                                <span className="material-symbols-outlined text-lg">{tech.icon}</span>
                                                {tech.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Portfolio Section */}
                <section id="projects" className="scroll-mt-24 py-24 px-4 flex justify-center border-b-2 transition-colors duration-300
          bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] border-black
          dark:bg-black dark:border-white/10 dark:bg-none">
                    <div className="max-w-[1200px] w-full">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <div className="px-4 py-1 rounded-lg text-xs font-black uppercase tracking-widest w-fit mb-4 border-2 transition-all
                  bg-[#8B5CF6] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  dark:border-none dark:shadow-none">
                                    Dashboard / Portfolio
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black">주요 프로젝트 사례</h2>
                            </div>
                            <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg font-black transition-all
                bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                dark:bg-transparent dark:text-white dark:border dark:border-white/30 dark:shadow-none dark:hover:bg-white dark:hover:text-black dark:hover:translate-none">
                                모든 프로젝트 <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {PROJECTS.map((p) => (
                                <div key={p.id} className="rounded-[2rem] overflow-hidden transition-all duration-300 group
                  bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1
                  dark:bg-[#111] dark:border dark:border-white/10 dark:shadow-none dark:hover:border-gray-500">

                                    <div className="h-10 border-b-2 flex items-center px-4 gap-2 transition-colors
                    bg-gray-50 border-black
                    dark:bg-[#1A1A1A] dark:border-white/10">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        <div className="flex-1 text-center text-[10px] font-mono text-gray-500">{p.domain}</div>
                                    </div>

                                    <div className="aspect-video overflow-hidden relative
                    bg-gray-200
                    dark:bg-gray-800">
                                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-all duration-500
                      grayscale-[20%] hover:grayscale-0
                      dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:scale-105" />
                                        <div className="absolute inset-0 transition-colors
                      hidden
                      dark:block dark:bg-black/20 dark:group-hover:bg-transparent"></div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {p.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 rounded-lg text-[10px] font-black uppercase border-2 transition-colors
                          bg-gray-100 border-black
                          dark:bg-white/10 dark:border-white/5 dark:text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-2xl font-black mb-3">{p.title}</h3>
                                        <p className="font-bold leading-relaxed
                      text-gray-600
                      dark:text-gray-400 dark:font-medium">{p.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section id="process" className="scroll-mt-32 py-24 px-4 flex justify-center border-b-2 transition-colors duration-300
          bg-white border-black
          dark:bg-[#0a0a0a] dark:border-white/10">
                    <div className="max-w-[1200px] w-full text-center">
                        <div className="px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest w-fit mx-auto mb-6 border-2 transition-all
              bg-black text-white border-black
              dark:bg-[#FFD600] dark:text-black dark:border-[#FFD600]">Workflow</div>
                        <h2 className="text-4xl font-black mb-20">어떻게 일하나요?</h2>

                        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 px-4">
                            <div className="hidden md:block absolute top-10 left-[10%] w-[80%] h-0.5 border-t-4 border-dashed -z-0 transition-colors
                border-gray-200
                dark:border-gray-700 dark:border-t-2"></div>

                            {PROCESS_STEPS.map((step) => (
                                <div key={step.id} className="relative z-10 flex flex-col items-center group">
                                    <div className={`w-20 h-20 border-4 flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-110
                    bg-white border-black
                    dark:bg-[#111] dark:border-white/20 dark:shadow-2xl dark:shadow-black dark:group-hover:border-[#FFD600] dark:group-hover:text-[#FFD600]
                    ${step.shape === 'circle' ? 'rounded-full' :
                                            step.shape === 'polygon' ? 'rounded-tr-3xl rounded-bl-3xl' :
                                                step.shape === 'rect' ? 'bg-black text-white dark:bg-[#FFD600] dark:text-black dark:border-[#FFD600]' : 'rounded-2xl'
                                        }`}>
                                        {step.shape === 'rect' ? (
                                            <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                                        ) : (
                                            <span className="text-3xl font-black">{step.number}</span>
                                        )}
                                    </div>
                                    <h4 className="text-xl font-black mb-2">{step.title}</h4>
                                    <p className="text-sm font-bold leading-relaxed max-w-[180px] transition-colors
                    text-gray-500
                    dark:text-gray-500 dark:group-hover:text-gray-300">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="scroll-mt-32 py-24 px-4 flex justify-center border-b-2 transition-colors duration-300
          bg-[#FFD600] border-black
          dark:bg-black dark:border-white/10">
                    <div className="max-w-[1200px] w-full">
                        <div className="rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden transition-all
              bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
              dark:bg-[#111] dark:border dark:border-white/10 dark:shadow-none">

                            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full translate-x-4 -translate-y-4 transition-colors
                 bg-black
                 dark:hidden"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FFD600]/10 to-transparent blur-3xl rounded-full translate-x-12 -translate-y-12 pointer-events-none hidden dark:block"></div>

                            <div className="flex-1 relative z-10">
                                <h3 className="text-4xl md:text-5xl font-black leading-tight mb-8">
                                    엔지니어의 <span className="px-3 py-1 transition-colors
                    bg-black text-white
                    dark:bg-transparent dark:text-[#FFD600] dark:px-0">머리</span>와<br />
                                    디자이너의 <span className="italic">가슴</span>으로
                                </h3>
                                <p className="text-xl font-bold leading-relaxed mb-10 transition-colors
                  text-gray-800
                  dark:text-gray-400 dark:font-medium">
                                    Coreline은 거대 에이전시의 비효율성에 지친 시니어 엔지니어들이 설립했습니다. 우리는 깔끔한 코드, 실용적인 솔루션, 직접적인 소통을 믿습니다. 중개인 없이 전문가들이 직접 훌륭한 제품을 만듭니다.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 px-6 py-3 border-2 rounded-xl font-black transition-colors
                    bg-gray-50 border-black
                    dark:bg-white/5 dark:border-white/20 dark:text-gray-300">
                                        <span className="material-symbols-outlined dark:text-[#FFD600]">check_circle</span> 100% 인하우스 팀
                                    </div>
                                    <div className="flex items-center gap-2 px-6 py-3 border-2 rounded-xl font-black transition-colors
                    bg-gray-50 border-black
                    dark:bg-white/5 dark:border-white/20 dark:text-gray-300">
                                        <span className="material-symbols-outlined dark:text-[#FFD600]">check_circle</span> 투명한 가격 정책
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/3 flex justify-center relative z-10">
                                <div className="relative w-64 h-64">
                                    <div className="absolute inset-0 rounded-full translate-x-4 translate-y-4 transition-all
                    bg-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    dark:bg-[#FFD600] dark:opacity-80 dark:translate-x-2 dark:translate-y-2 dark:border-none dark:shadow-none"></div>
                                    <div className="relative w-full h-full rounded-full border-2 overflow-hidden bg-gray-200 transition-colors
                    border-black
                    dark:border-white/20 dark:bg-gray-800">
                                        <img src="https://picsum.photos/400/400?grayscale" alt="Founder" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-lg font-black rotate-6 transition-all
                    bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    dark:bg-[#111] dark:text-white dark:border dark:border-white/20 dark:shadow-lg">
                                        Hello! 👋
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer / Contact */}
                <footer className="py-24 px-4 flex justify-center border-t-2 transition-colors duration-300
          bg-black text-white border-black
          dark:bg-black dark:text-white dark:border-white/10 dark:border-t">
                    <div className="max-w-[1200px] w-full">
                        <div className="flex flex-col lg:flex-row gap-20 mb-24">
                            <div className="flex-1">
                                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10">
                                    Ready to <br /><span className="text-[#FFD600]">Innovate?</span>
                                </h2>
                                <p className="text-2xl font-bold mb-12 max-w-lg transition-colors
                  text-gray-400
                  dark:text-gray-500">
                                    초기 컨셉부터 최종 배포까지, 당신의 든든한 엔지니어링 파트너가 되어드리겠습니다.
                                </p>
                                <button className="h-16 px-10 border-2 rounded-xl font-black text-xl flex items-center gap-3 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
                  border-white shadow-[6px_6px_0px_0px_white] hover:bg-white hover:text-black
                  dark:border-white dark:shadow-none dark:active:scale-95">
                                    프로젝트 문의하기 <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                            <div className="w-full lg:w-[450px]">
                                <div className="p-8 rounded-3xl border-2 relative transition-all
                  bg-white border-black
                  dark:bg-[#111] dark:border-white/10 dark:border">
                                    <div className="absolute -top-3 -right-3 bg-[#FFD600] text-black px-4 py-1 font-black text-xs uppercase tracking-widest rotate-6 border-2 border-black">FAST TRACK</div>
                                    <h3 className="text-2xl font-black mb-8 flex items-center gap-2
                    text-black
                    dark:text-white">
                                        <span className="material-symbols-outlined dark:text-[#FFD600]">bolt</span> 빠른 문의
                                    </h3>
                                    <form className="flex flex-col gap-5">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase mb-1 transition-colors
                        text-black
                        dark:text-gray-500">Name</label>
                                            <input type="text" placeholder="홍길동" className="w-full p-4 rounded-xl font-black focus:ring-0 transition-all outline-none
                        border-2 border-black placeholder-gray-300 focus:border-[#FFD600] text-black bg-white
                        dark:bg-black dark:border-white/20 dark:text-white dark:font-bold dark:placeholder-gray-700" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase mb-1 transition-colors
                        text-black
                        dark:text-gray-500">Email</label>
                                            <input type="email" placeholder="hello@company.com" className="w-full p-4 rounded-xl font-black focus:ring-0 transition-all outline-none
                        border-2 border-black placeholder-gray-300 focus:border-[#FFD600] text-black bg-white
                        dark:bg-black dark:border-white/20 dark:text-white dark:font-bold dark:placeholder-gray-700" />
                                        </div>
                                        <button type="button" className="w-full h-16 font-black text-lg rounded-xl border-2 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-4
                      bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      dark:bg-[#FFD600] dark:text-black dark:border-transparent dark:hover:bg-yellow-400 dark:active:scale-95 dark:shadow-none">
                                            문의 보내기
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 border-t-2 flex flex-col md:flex-row justify-between items-center gap-8 transition-colors
              border-gray-800
              dark:border-gray-900">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 flex items-center justify-center bg-[#FFD600] rounded-lg text-black transition-all
                  border-2 border-white
                  dark:border-none">
                                    <span className="material-symbols-outlined text-[18px] font-black">terminal</span>
                                </div>
                                <h2 className="text-xl font-black tracking-tighter">Coreline</h2>
                            </div>
                            <div className="flex gap-8 text-sm font-black uppercase tracking-widest transition-colors
                text-gray-400
                dark:text-gray-600">
                                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                                <a href="#" className="hover:text-white transition-colors">Email</a>
                            </div>
                            <p className="text-sm font-bold text-gray-500 dark:text-gray-600">© 2026 Coreline AI Studio. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
