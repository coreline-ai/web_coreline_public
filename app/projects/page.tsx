'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '../constants';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';

export default function ProjectsPage() {
    // Duplicate projects to simulate "12+" items for visual fullness as requested
    const allProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300
            bg-white text-black selection:bg-black selection:text-white
            bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]
            dark:bg-black dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black
            dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]`}>
            <SimpleHeader />

            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4 border-b-4 border-black dark:border-white/20 relative overflow-hidden">
                    <div className="absolute top-20 right-[-10%] w-[300px] h-[300px] bg-[#FFD600] rounded-full blur-[100px] opacity-20 dark:opacity-10 pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-10">
                            <span className="inline-block px-4 py-1.5 rounded-full border-2 border-black dark:border-white text-sm font-bold mb-6 bg-white dark:bg-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
                                • OPEN FOR OPPORTUNITIES
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tighter">
                                Coreline Project<br />
                                <span className="relative inline-block dark:text-[#FFD600]">
                                    Collections
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFD600] dark:bg-white/90 -z-10 bg-opacity-80 transform -rotate-1 rounded-sm"></span>
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg font-medium leading-relaxed">
                                Explore a curated list of scalable web applications, robust APIs, and interactive tools built with modern technologies.
                            </p>

                            <div className="mt-10 flex gap-4">
                                <a href="#projects-grid" className="px-8 py-4 bg-black text-white font-bold rounded-xl shadow-[6px_6px_0px_0px_#FFD600] border-2 border-black hover:-translate-y-1 transition-transform flex items-center gap-2
                                    dark:bg-[#FFD600] dark:text-black dark:border-[#FFD600] dark:shadow-none">
                                    Browse Projects
                                    <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                </a>
                                <a href="https://github.com/coreline-ai/web_coreline_public" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black font-bold rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform flex items-center gap-2
                                    dark:bg-transparent dark:text-white dark:border-white/20 dark:shadow-none dark:hover:bg-white/10">
                                    View GitHub
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative z-10 rounded-3xl border-4 border-black dark:border-white/20 overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-none bg-white dark:bg-[#222] aspect-video group">
                                <div className="absolute top-0 left-0 right-0 h-10 border-b-4 border-black dark:border-white/20 bg-gray-100 dark:bg-[#1a1a1a] flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500 border border-black/10"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black/10"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500 border border-black/10"></div>
                                </div>
                                <div className="mt-10 h-full w-full relative">
                                    <Image
                                        src="/images/projects_header_right.png"
                                        alt="Team collaboration"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Overlay Gradient REMOVED */}
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-8 -left-8 z-20 bg-white dark:bg-black border-4 border-black dark:border-white rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#FFD600] rotate-[-5deg] hover:rotate-0 transition-transform">
                                <div className="text-4xl font-black mb-1">12+</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live Projects</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Project Grid Section */}
                <section id="projects-grid" className="py-20 px-4 bg-[#FFD600] dark:bg-[#111] border-b-4 border-black dark:border-white/10 relative transition-colors">
                    {/* Grid Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Section Header & Search */}
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                            <div>
                                <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded mb-4 uppercase">Showcase</span>
                                <h2 className="text-5xl font-black text-black dark:text-white">Projects</h2>
                                <p className="text-lg font-bold mt-4 text-black opacity-80 dark:text-gray-300 max-w-xl">
                                    A selection of recent development work, experiments, and deployed applications.
                                </p>
                            </div>

                            <div className="w-full md:w-auto relative">
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    className="w-full md:w-[320px] px-6 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all text-lg font-bold placeholder:font-medium text-black bg-white"
                                />
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-black/50 pointer-events-none">search</span>
                            </div>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allProjects.map((project, index) => (
                                <div key={`${project.id}-${index}`} className="bg-white dark:bg-[#1a1a1a] rounded-3xl border-3 border-black dark:border-white/20 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group">

                                    {/* Icon / Thumbnail Area */}
                                    <div className="w-16 h-16 rounded-2xl border-2 border-black dark:border-white/20 bg-black dark:bg-[#FFD600] flex items-center justify-center mb-6 group-hover:bg-[#FFD600] dark:group-hover:bg-[#FFD600] text-white dark:text-black group-hover:text-black dark:group-hover:text-black transition-colors">
                                        <span className="material-symbols-outlined text-3xl">
                                            {index % 4 === 0 ? 'terminal' : index % 4 === 1 ? 'smartphone' : index % 4 === 2 ? 'psychology' : 'shopping_cart'}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black mb-3 text-black dark:text-white line-clamp-1">{project.title}</h3>

                                    <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed mb-6 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                        {project.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="px-2 py-1 rounded-md border border-black dark:border-white/20 text-[10px] font-bold uppercase bg-[#FFD600] text-black dark:bg-black dark:text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="border-t-2 border-dashed border-gray-200 dark:border-white/10 pt-4 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            Last commit: {['2d ago', '5h ago', '1w ago', '3d ago'][index % 4]}
                                        </div>
                                        <Link href={`/project/${project.id}`} className="px-4 py-2 rounded-lg border-2 border-black dark:border-white/20 text-xs font-bold text-black hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-[#222] font-black rounded-xl border-2 border-black dark:border-white/20 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none hover:-translate-y-1 transition-transform text-black dark:text-white">
                                View More Projects
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <SimpleFooter />
        </div>
    );
}
