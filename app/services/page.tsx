"use client";

import React from 'react';
import Link from 'next/link';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#111] text-black dark:text-white font-sans selection:bg-[#FFD600] selection:text-black">
            <SimpleHeader />

            <main className="pt-24">
                {/* HERO SECTION */}
                <section className="py-20 px-4 text-center border-b-4 border-black dark:border-white/10 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="inline-block bg-[#FFD600] border-2 border-black px-3 py-1 text-xs font-black uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:text-black">
                            Variant 2 : Service Matrix
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tighter">
                            We Build The Future.<br />
                            Faster Than <span className="underline decoration-4 decoration-[#FFD600] underline-offset-8">Ever.</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                            Full-stack engineering, AI integration, and developer training for the next generation of startups.
                        </p>
                    </div>
                </section>

                {/* SECTION 1: FULL-STACK & MOBILE */}
                <section id="fullstack-mobile" className="py-24 px-4 border-b-4 border-black dark:border-white/10 relative">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 mb-12">
                        {/* Left Content */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-black text-sm border-2 border-black">01</div>
                                <h2 className="text-3xl font-black uppercase">Full-Stack & Mobile</h2>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 font-medium text-lg leading-relaxed mb-10">
                                Scalable, robust architectures built for growth. From complex web dashboards to responsive mobile applications, we leverage a modern, type-safe stack to ensure reliability and performance.
                            </p>

                            {/* Tech Stack Grid */}
                            <div className="bg-white dark:bg-[#1a1a1a] border-4 border-black dark:border-white/20 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none relative">
                                <div className="absolute -top-3 -right-3 bg-[#FFD600] px-3 py-1 border-2 border-black text-xs font-black uppercase text-black">The Stack</div>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Next.js 14', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Flutter', 'React Native', 'AWS', 'Docker'].map((tech) => (
                                        <span key={tech} className="px-3 py-1.5 border-2 border-black dark:border-white/20 text-xs font-bold uppercase bg-gray-50 dark:bg-black text-black dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="rounded-3xl border-4 border-black dark:border-white/20 overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-none aspect-video relative group">
                            <img
                                src="/images/services_fullstack.png"
                                alt="Developers working"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>

                    {/* Success Stories Grid */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                        <Link href="/projects" className="block bg-gray-50 dark:bg-[#222] border-l-4 border-purple-500 p-4 transition-transform hover:-translate-y-1 cursor-pointer">
                            <p className="text-xs font-bold uppercase text-purple-600 dark:text-purple-400 mb-1">Success Story</p>
                            <h4 className="font-black text-lg mb-1">Multi-App Ecosystem</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Unified 3 apps into one React Native codebase.</p>
                        </Link>

                        <Link href="/projects" className="block bg-gray-50 dark:bg-[#222] border-l-4 border-blue-500 p-4 transition-transform hover:-translate-y-1 cursor-pointer">
                            <p className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 mb-1">Success Story</p>
                            <h4 className="font-black text-lg mb-1">E-Commerce Platform Scale-up</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Handled 10x traffic surge with optimized Next.js architecture.</p>
                        </Link>
                    </div>
                </section>

                {/* SECTION 2: AI/ML & AX CONSULTING */}
                <section id="ai-ml-integration" className="py-24 px-4 bg-[#FEFCE8] dark:bg-[#111] border-b-4 border-black dark:border-white/10 relative">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 lg:flex-row-reverse">

                        {/* Left Content (Actually Right Content in layout but reversed for grid order if needed, but keeping visual order) */}
                        <div className="order-2 lg:order-1">
                            <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border-4 border-black dark:border-white/20 p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-none relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-square bg-gray-50 dark:bg-black border-2 border-black dark:border-white/10 rounded-xl flex flex-col items-center justify-center p-4 text-center hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors">
                                        <span className="material-symbols-outlined text-4xl text-purple-600 mb-2">psychology</span>
                                        <span className="text-xs font-black uppercase">LLM Integration</span>
                                    </div>
                                    <div className="aspect-square bg-gray-50 dark:bg-black border-2 border-black dark:border-white/10 rounded-xl flex flex-col items-center justify-center p-4 text-center hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors">
                                        <span className="material-symbols-outlined text-4xl text-yellow-600 mb-2">auto_fix_high</span>
                                        <span className="text-xs font-black uppercase">Auto-Agents</span>
                                    </div>
                                    <div className="aspect-square bg-gray-50 dark:bg-black border-2 border-black dark:border-white/10 rounded-xl flex flex-col items-center justify-center p-4 text-center hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors">
                                        <span className="material-symbols-outlined text-4xl text-green-600 mb-2">database</span>
                                        <span className="text-xs font-black uppercase">RAG Pipelines</span>
                                    </div>
                                    <div className="aspect-square bg-gray-50 dark:bg-black border-2 border-black dark:border-white/10 rounded-xl flex flex-col items-center justify-center p-4 text-center hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
                                        <span className="material-symbols-outlined text-4xl text-blue-600 mb-2">chat</span>
                                        <span className="text-xs font-black uppercase">Conversational UX</span>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full text-white flex items-center justify-center border-4 border-white dark:border-[#333]">
                                    <span className="material-symbols-outlined">hub</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="order-1 lg:order-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-[#FFD600] text-black flex items-center justify-center font-black text-sm border-2 border-black">02</div>
                                <h2 className="text-3xl font-black uppercase">AI/ML & AX Consulting</h2>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Automated Experience (AX) Design</h3>
                            <p className="text-gray-700 dark:text-gray-300 font-medium text-lg leading-relaxed mb-8">
                                We don't just add a chatbot. We re-engineer your workflows with intelligent agents. From Large Language Model fine-tuning to vector database implementation, we turn "AI hype" into measurable business automation.
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    'Custom LLM Fine-tuning',
                                    'Retrieval-Augmented Generation (RAG)',
                                    'AI Safety & Governance'
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 font-bold text-sm">
                                        <span className="material-symbols-outlined text-purple-600 filled text-lg">check_circle</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/projects" className="border-2 border-black dark:border-white/20 bg-white dark:bg-[#1a1a1a] p-4 rounded-xl flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">Recent Deployment</p>
                                    <h4 className="font-bold">Predictive Logistics AI</h4>
                                    <p className="text-xs text-gray-500">SupplyChain Inc. • 35% Efficiency Boost</p>
                                </div>
                                <span className="material-symbols-outlined">arrow_outward</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: AI INFRA & VIBE CODING */}
                <section id="vibe-coding" className="py-24 px-4 bg-[#111827] text-white border-b-4 border-black dark:border-white/10 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-black text-sm border-2 border-white/20">03</div>
                                <h2 className="text-3xl font-black uppercase">AI Infra & Vibe Coding</h2>
                            </div>
                            <p className="text-gray-300 font-medium text-lg leading-relaxed mb-10">
                                The way we write code has changed. We train your teams to leverage AI-assisted development environments. Master the art of "Vibe Coding"—where intuition meets AI generation.
                            </p>
                            <div className="flex gap-4 mb-10">
                                <button className="px-4 py-2 border border-gray-600 rounded bg-gray-800 text-xs font-mono hover:bg-gray-700 transition-colors">
                                    &gt; Cursor IDE Training
                                </button>
                                <button className="px-4 py-2 border border-gray-600 rounded bg-gray-800 text-xs font-mono hover:bg-gray-700 transition-colors">
                                    &gt; Copilot Enterprise
                                </button>
                            </div>

                            <div className="border-l-4 border-[#FFD600] pl-6 py-2">
                                <p className="font-bold text-lg mb-4 italic">"Our shipping velocity doubled after the Vibe Coding workshop."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">JD</div>
                                    <div className="text-xs text-gray-400">Jane Doe, CTO @ TechFlow</div>
                                </div>
                            </div>
                        </div>

                        {/* Code Block Mockup */}
                        <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 shadow-2xl overflow-hidden font-mono text-xs md:text-sm">
                            <div className="bg-[#2D2D2D] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="ml-4 text-gray-400">main.tsx — Cursor</div>
                            </div>
                            <div className="p-6 text-gray-300 overflow-x-auto">
                                <div className="mb-2"><span className="text-purple-400">import</span> {'{ useState }'} <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</div>
                                <div className="mb-2"><span className="text-purple-400">import</span> {'{ AI_Agent }'} <span className="text-purple-400">from</span> <span className="text-green-400">'@devforge/ai'</span>;</div>
                                <div className="mb-4 text-gray-500">// AI Generated Component Logic...</div>
                                <div className="mb-1"><span className="text-blue-400">const</span> <span className="text-yellow-400">GeneratedWorkflow</span> = () =&gt; {'{'}</div>
                                <div className="pl-4 mb-1"><span className="text-purple-400">return</span> &lt;<span className="text-yellow-400">AutomatedView</span> /&gt;;</div>
                                <div>{'}'}</div>

                                <div className="mt-4 bg-[#2D2D2D]/50 border border-purple-500/30 p-3 rounded text-gray-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-purple-400">auto_awesome</span>
                                    AI Suggestion: Refactor this for higher concurrency? <span className="text-blue-400 underline cursor-pointer">Apply</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: SENIOR-LED MVP */}
                <section id="senior-led-mvp" className="py-24 px-4 border-b-4 border-black dark:border-white/10 relative">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-black text-sm border-2 border-black">04</div>
                                <h2 className="text-3xl font-black uppercase">SENIOR-LED MVP</h2>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Validate fast. Scale faster.</h3>
                            <p className="text-gray-700 dark:text-gray-300 font-medium text-lg leading-relaxed mb-10">
                                We specialize in Minimum Viable Products that are actually viable. We strip away the non-essentials to focus on your core value proposition, delivering a product that investors love and users actually use.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="border-4 border-black dark:border-white/20 bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                                    <span className="material-symbols-outlined text-4xl text-red-500 mb-3">rocket_launch</span>
                                    <h4 className="font-black uppercase mb-2">Speed</h4>
                                    <p className="text-xs text-gray-500">Market-ready MVPs in 4-6 weeks. No bloated timelines.</p>
                                </div>
                                <div className="border-4 border-black dark:border-white/20 bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                                    <span className="material-symbols-outlined text-4xl text-green-500 mb-3">verified</span>
                                    <h4 className="font-black uppercase mb-2">Quality</h4>
                                    <p className="text-xs text-gray-500">Codebases that don't need rewriting when you scale.</p>
                                </div>
                            </div>

                            <div className="bg-[#FFD600] border-4 border-black p-4 rounded-xl flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="w-10 h-10 rounded-full bg-black text-[#FFD600] flex items-center justify-center">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                                <div>
                                    <h5 className="font-black text-black uppercase text-sm">SENIOR-LED ONLY</h5>
                                    <p className="text-xs font-bold text-black/80">No juniors practicing on your dime. Direct access to lead engineers.</p>
                                </div>
                            </div>
                        </div>

                        {/* CASE STUDY TIMELINE CARD */}
                        <div className="bg-white dark:bg-[#1a1a1a] border-4 border-black dark:border-white/20 rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-none h-full">
                            <h4 className="font-bold text-xs uppercase text-gray-500 mb-6">Case Study Timeline: 5 Steps</h4>

                            <div className="relative border-l-2 border-gray-200 dark:border-white/10 ml-3 space-y-10 pl-8 py-2">
                                <div className="relative">
                                    <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500 z-10 grid place-items-center">
                                        <span className="material-symbols-outlined text-[10px] text-gray-500">search</span>
                                    </span>
                                    <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded mb-1">Week 1</span>
                                    <h5 className="font-bold">Concept & Scope</h5>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500 z-10 grid place-items-center">
                                        <span className="material-symbols-outlined text-[10px] text-gray-500">design_services</span>
                                    </span>
                                    <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase rounded mb-1">Week 2</span>
                                    <h5 className="font-bold">Design & Prototype</h5>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500 z-10 grid place-items-center">
                                        <span className="material-symbols-outlined text-[10px] text-gray-500">code</span>
                                    </span>
                                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded mb-1">Week 3</span>
                                    <h5 className="font-bold">Development</h5>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-[#FFD600] border-2 border-black z-10 grid place-items-center">
                                        <span className="material-symbols-outlined text-[10px] text-black">rocket</span>
                                    </span>
                                    <span className="inline-block px-2 py-0.5 bg-[#FFD600] text-black text-[10px] font-bold uppercase rounded mb-1 border border-black">Week 4</span>
                                    <h5 className="font-black text-lg">MVP Launch</h5>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500 z-10 grid place-items-center">
                                        <span className="material-symbols-outlined text-[10px] text-gray-500">build</span>
                                    </span>
                                    <span className="inline-block px-2 py-0.5 bg-gray-200 text-gray-700 text-[10px] font-bold uppercase rounded mb-1">Ongoing</span>
                                    <h5 className="font-bold">Maintenance & Scale</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BOTTOM CTA */}
                <section className="py-28 px-4 bg-[#FFD600] dark:bg-[#111] text-center border-t-4 border-black dark:border-white/20">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 dark:text-white">
                        Stop Planning.<br />
                        Start Shipping.
                    </h2>
                    <p className="font-bold text-lg mb-12 dark:text-gray-300">Schedule a free 30-min technical roadmap session with a Lead Architect.</p>

                    <Link href="/contact" className="inline-block px-8 py-4 bg-[#111] text-white font-black text-lg uppercase rounded-xl border-4 border-white dark:border-[#FFD600] dark:text-white hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] dark:shadow-none">
                        Consult with a Senior Developer
                    </Link>
                </section>

            </main>

            <SimpleFooter />
        </div>
    );
}
