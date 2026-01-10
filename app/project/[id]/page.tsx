"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';
import { PROJECTS } from '../../constants';

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();

    const project = PROJECTS.find(p => p.id === params.id);

    // Fallback if project not found
    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">404</h1>
                    <p className="mb-8">Project not found</p>
                    <Link href="/" className="px-6 py-3 rounded-xl border-2 border-black bg-[#FFD600] text-black font-black">
                        GO HOME
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="min-h-screen font-sans transition-colors duration-300 relative
        bg-[#f0f0f0] text-black selection:bg-black selection:text-white
        bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:2rem_2rem]
        dark:bg-[#111] dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black
        dark:bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]">

                <SimpleHeader />

                <main className="container mx-auto px-4 pt-24 pb-20 max-w-5xl">

                    {/* Header Card */}
                    <div className="rounded-[2rem] border-4 mb-16 overflow-hidden relative transition-all
            bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            dark:bg-[#1a1a1a] dark:border-white/20 dark:shadow-none">
                        <div className="absolute top-0 right-0 p-0 w-24 h-24 bg-[#FFD600] rounded-bl-[4rem] hidden md:block"></div>

                        <div className="p-8 md:p-12 relative z-10">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className="px-4 py-1.5 rounded-lg border-2 border-black bg-[#FFD600] text-black font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_black] dark:border-transparent dark:shadow-none">
                                    WEB APPLICATION
                                </span>
                                {project.version && (
                                    <span className="px-3 py-1.5 rounded-lg border-2 font-mono text-xs font-bold border-black bg-white dark:bg-black dark:border-white/20 dark:text-gray-300">
                                        {project.version}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                                <div className="flex-1">
                                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                                        {project.title}
                                    </h1>
                                    <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl text-gray-600 dark:text-gray-300">
                                        {project.description}
                                    </p>
                                </div>
                                {project.repoUrl && (
                                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-8 py-4 rounded-xl font-black text-white bg-black border-2 border-black transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]
                                       dark:bg-white dark:text-black dark:border-transparent dark:hover:bg-[#FFD600]">
                                        <span className="material-symbols-outlined">code</span>
                                        GITHUB REPO
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Technical Stack Section */}
                    {project.techStack && (
                        <div className="mb-20">
                            <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-4">
                                TECHNICAL STACK
                                <div className="h-1 flex-1 bg-black rounded-full dark:bg-white/20"></div>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {project.techStack.map((tech, index) => (
                                    <div key={index} className="p-6 rounded-2xl border-2 transition-all hover:-translate-y-1
                    bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    dark:bg-[#1a1a1a] dark:border-white/20 dark:shadow-none dark:hover:bg-[#222]">
                                        <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center border-2 border-black bg-[#FFD600] text-black dark:bg-[#FFD600] dark:border-transparent dark:text-black">
                                            <span className="material-symbols-outlined">{tech.icon}</span>
                                        </div>
                                        <h3 className="text-lg font-black mb-1">{tech.name}</h3>
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">{tech.role}</div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-snug">
                                            {tech.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Visual Overview */}
                    {project.visualOverview && (
                        <div className="mb-20">
                            <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-4">
                                VISUAL OVERVIEW
                                <div className="h-1 flex-1 bg-black rounded-full dark:bg-white/20"></div>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {project.visualOverview.map((img, index) => (
                                    <div key={index} className="rounded-2xl border-2 overflow-hidden bg-white text-black border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:bg-[#1a1a1a] dark:text-white dark:border-white/20 dark:shadow-none group aspect-video relative">
                                        <Image
                                            src={img}
                                            alt={`${project.imageAlt || project.title} - Screenshot ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Project Execution & Features */}
                    <div className="p-8 md:p-12 rounded-[2.5rem] border-4 bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:bg-[#1a1a1a] dark:border-white/20 dark:shadow-none">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Left Column */}
                            <div>
                                <h2 className="text-2xl font-black mb-8 uppercase tracking-wide">Project Execution</h2>
                                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-medium mb-12">
                                    {project.executionDetails || project.description}
                                </p>

                                {project.performance && (
                                    <div className="p-6 rounded-2xl border-2 border-black bg-[#FFD600] text-black shadow-[4px_4px_0px_0px_black] relative rotate-1 transition-transform hover:rotate-0">
                                        <div className="absolute -top-3 right-4 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">TOP RESULT</div>
                                        <h3 className="font-black text-xs uppercase tracking-widest mb-2 opacity-80">{project.performance.title}</h3>
                                        <p className="font-bold text-lg leading-snug">
                                            {project.performance.description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Right Column */}
                            <div>
                                <h2 className="text-xl font-black mb-8 uppercase tracking-wide text-gray-400 dark:text-gray-500">Core Features</h2>
                                <div className="space-y-6">
                                    {project.features?.map((feature, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-[#2DD4BF] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_black] dark:shadow-none dark:border-transparent">
                                                <span className="material-symbols-outlined text-black text-sm font-bold">check</span>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-lg mb-1">{feature.title}</h4>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-200 dark:border-white/10">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border-2 border-gray-200 dark:bg-black dark:border-white/10 dark:text-gray-400 font-mono text-xs">
                                        <span>Status: <span className="text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded ml-2">Active Maintenance</span></span>
                                        <span>License: <span className="font-bold text-black dark:text-white">MIT License</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </main>

                <SimpleFooter />
            </div>
        </div>
    );
}
