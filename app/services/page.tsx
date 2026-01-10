'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-[#FFD600] selection:text-black dark:bg-[#111] dark:text-white">
      <SimpleHeader />

      <main className="pt-24">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b-4 border-black px-4 py-20 text-center dark:border-white/10">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-6 inline-block border-2 border-black bg-[#FFD600] px-3 py-1 text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:text-black">
              Variant 2 : Service Matrix
            </div>
            <h1 className="mb-6 text-5xl leading-[0.9] font-black tracking-tighter md:text-7xl">
              We Build The Future.
              <br />
              Faster Than{' '}
              <span className="underline decoration-[#FFD600] decoration-4 underline-offset-8">
                Ever.
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-600 dark:text-gray-400">
              Full-stack engineering, AI integration, and developer training for the next generation
              of startups.
            </p>
          </div>
        </section>

        {/* SECTION 1: FULL-STACK & MOBILE */}
        <section
          id="fullstack-mobile"
          className="relative border-b-4 border-black px-4 py-24 dark:border-white/10"
        >
          {/* Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="relative z-10 mx-auto mb-12 grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-[#0066FF] text-sm font-black text-white">
                  01
                </div>
                <h2 className="text-3xl font-black uppercase">Full-Stack & Mobile</h2>
              </div>
              <p className="mb-10 text-lg leading-relaxed font-medium text-gray-700 dark:text-gray-300">
                Scalable, robust architectures built for growth. From complex web dashboards to
                responsive mobile applications, we leverage a modern, type-safe stack to ensure
                reliability and performance.
              </p>

              {/* Tech Stack Grid */}
              <div className="relative border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#1a1a1a] dark:shadow-none">
                <div className="absolute -top-3 -right-3 border-2 border-black bg-[#FFD600] px-3 py-1 text-xs font-black text-black uppercase">
                  The Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'React',
                    'Next.js 14',
                    'TypeScript',
                    'Node.js',
                    'Python',
                    'FastAPI',
                    'PostgreSQL',
                    'Redis',
                    'Flutter',
                    'React Native',
                    'AWS',
                    'Docker',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="cursor-default border-2 border-black bg-gray-50 px-3 py-1.5 text-xs font-bold text-black uppercase transition-colors hover:bg-black hover:text-white dark:border-white/20 dark:bg-black dark:text-gray-300 dark:hover:bg-white dark:hover:text-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="group relative aspect-video overflow-hidden rounded-3xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:shadow-none">
              <Image
                src="/images/services_fullstack.png"
                alt="Developers working"
                fill
                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
          </div>

          {/* Success Stories Grid */}
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
            <Link
              href="/projects"
              className="block cursor-pointer border-l-4 border-purple-500 bg-gray-50 p-4 transition-transform hover:-translate-y-1 dark:bg-[#222]"
            >
              <p className="mb-1 text-xs font-bold text-purple-600 uppercase dark:text-purple-400">
                Success Story
              </p>
              <h4 className="mb-1 text-lg font-black">Multi-App Ecosystem</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Unified 3 apps into one React Native codebase.
              </p>
            </Link>

            <Link
              href="/projects"
              className="block cursor-pointer border-l-4 border-blue-500 bg-gray-50 p-4 transition-transform hover:-translate-y-1 dark:bg-[#222]"
            >
              <p className="mb-1 text-xs font-bold text-blue-600 uppercase dark:text-blue-400">
                Success Story
              </p>
              <h4 className="mb-1 text-lg font-black">E-Commerce Platform Scale-up</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Handled 10x traffic surge with optimized Next.js architecture.
              </p>
            </Link>
          </div>
        </section>

        {/* SECTION 2: AI/ML & AX CONSULTING */}
        <section
          id="ai-ml-integration"
          className="relative border-b-4 border-black bg-[#FEFCE8] px-4 py-24 dark:border-white/10 dark:bg-[#111]"
        >
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:flex-row-reverse">
            {/* Left Content (Actually Right Content in layout but reversed for grid order if needed, but keeping visual order) */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#1a1a1a] dark:shadow-none">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-black bg-gray-50 p-4 text-center transition-colors hover:bg-purple-100 dark:border-white/10 dark:bg-black dark:hover:bg-purple-900/20">
                    <span className="material-symbols-outlined mb-2 text-4xl text-purple-600">
                      psychology
                    </span>
                    <span className="text-xs font-black uppercase">LLM Integration</span>
                  </div>
                  <div className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-black bg-gray-50 p-4 text-center transition-colors hover:bg-yellow-100 dark:border-white/10 dark:bg-black dark:hover:bg-yellow-900/20">
                    <span className="material-symbols-outlined mb-2 text-4xl text-yellow-600">
                      auto_fix_high
                    </span>
                    <span className="text-xs font-black uppercase">Auto-Agents</span>
                  </div>
                  <div className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-black bg-gray-50 p-4 text-center transition-colors hover:bg-green-100 dark:border-white/10 dark:bg-black dark:hover:bg-green-900/20">
                    <span className="material-symbols-outlined mb-2 text-4xl text-green-600">
                      database
                    </span>
                    <span className="text-xs font-black uppercase">RAG Pipelines</span>
                  </div>
                  <div className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-black bg-gray-50 p-4 text-center transition-colors hover:bg-blue-100 dark:border-white/10 dark:bg-black dark:hover:bg-blue-900/20">
                    <span className="material-symbols-outlined mb-2 text-4xl text-blue-600">
                      chat
                    </span>
                    <span className="text-xs font-black uppercase">Conversational UX</span>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-4 border-white bg-black text-white dark:border-[#333]">
                  <span className="material-symbols-outlined">hub</span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="order-1 lg:order-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-[#FFD600] text-sm font-black text-black">
                  02
                </div>
                <h2 className="text-3xl font-black uppercase">AI/ML & AX Consulting</h2>
              </div>
              <h3 className="mb-4 text-xl font-bold">Automated Experience (AX) Design</h3>
              <p className="mb-8 text-lg leading-relaxed font-medium text-gray-700 dark:text-gray-300">
                We don&apos;t just add a chatbot. We re-engineer your workflows with intelligent
                agents. From Large Language Model fine-tuning to vector database implementation, we
                turn &quot;AI hype&quot; into measurable business automation.
              </p>

              <ul className="mb-8 space-y-3">
                {[
                  'Custom LLM Fine-tuning',
                  'Retrieval-Augmented Generation (RAG)',
                  'AI Safety & Governance',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold">
                    <span className="material-symbols-outlined filled text-lg text-purple-600">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/projects"
                className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-black bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-white/20 dark:bg-[#1a1a1a]"
              >
                <div>
                  <p className="mb-1 text-[10px] font-bold text-gray-500 uppercase">
                    Recent Deployment
                  </p>
                  <h4 className="font-bold">Predictive Logistics AI</h4>
                  <p className="text-xs text-gray-500">SupplyChain Inc. • 35% Efficiency Boost</p>
                </div>
                <span className="material-symbols-outlined">arrow_outward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3: AI INFRA & VIBE CODING */}
        <section
          id="vibe-coding"
          className="relative overflow-hidden border-b-4 border-black bg-[#111827] px-4 py-24 text-white dark:border-white/10"
        >
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 bg-purple-500 text-sm font-black text-white">
                  03
                </div>
                <h2 className="text-3xl font-black uppercase">AI Infra & Vibe Coding</h2>
              </div>
              <p className="mb-10 text-lg leading-relaxed font-medium text-gray-300">
                The way we write code has changed. We train your teams to leverage AI-assisted
                development environments. Master the art of &quot;Vibe Coding&quot;—where intuition
                meets AI generation.
              </p>
              <div className="mb-10 flex gap-4">
                <button className="rounded border border-gray-600 bg-gray-800 px-4 py-2 font-mono text-xs transition-colors hover:bg-gray-700">
                  &gt; Cursor IDE Training
                </button>
                <button className="rounded border border-gray-600 bg-gray-800 px-4 py-2 font-mono text-xs transition-colors hover:bg-gray-700">
                  &gt; Copilot Enterprise
                </button>
              </div>

              <div className="border-l-4 border-[#FFD600] py-2 pl-6">
                <p className="mb-4 text-lg font-bold italic">
                  &quot;Our shipping velocity doubled after the Vibe Coding workshop.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-xs font-bold">
                    JD
                  </div>
                  <div className="text-xs text-gray-400">Jane Doe, CTO @ TechFlow</div>
                </div>
              </div>
            </div>

            {/* Code Block Mockup */}
            <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#1E1E1E] font-mono text-xs shadow-2xl md:text-sm">
              <div className="flex items-center gap-2 border-b border-gray-700 bg-[#2D2D2D] px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-gray-400">main.tsx — Cursor</div>
              </div>
              <div className="overflow-x-auto p-6 text-gray-300">
                <div className="mb-2">
                  <span className="text-purple-400">import</span> {'{ useState }'}{' '}
                  <span className="text-purple-400">from</span>{' '}
                  <span className="text-green-400">&apos;react&apos;</span>;
                </div>
                <div className="mb-2">
                  <span className="text-purple-400">import</span> {'{ AI_Agent }'}{' '}
                  <span className="text-purple-400">from</span>{' '}
                  <span className="text-green-400">&apos;@devforge/ai&apos;</span>;
                </div>
                <div className="mb-4 text-gray-500">{`// AI Generated Component Logic...`}</div>
                <div className="mb-1">
                  <span className="text-blue-400">const</span>{' '}
                  <span className="text-yellow-400">GeneratedWorkflow</span> = () =&gt; {'{'}
                </div>
                <div className="mb-1 pl-4">
                  <span className="text-purple-400">return</span> &lt;
                  <span className="text-yellow-400">AutomatedView</span> /&gt;;
                </div>
                <div>{'}'}</div>

                <div className="mt-4 flex items-center gap-2 rounded border border-purple-500/30 bg-[#2D2D2D]/50 p-3 text-gray-400">
                  <span className="material-symbols-outlined text-sm text-purple-400">
                    auto_awesome
                  </span>
                  AI Suggestion: Refactor this for higher concurrency?{' '}
                  <span className="cursor-pointer text-blue-400 underline">Apply</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SENIOR-LED MVP */}
        <section
          id="senior-led-mvp"
          className="relative border-b-4 border-black px-4 py-24 dark:border-white/10"
        >
          {/* Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-red-500 text-sm font-black text-white">
                  04
                </div>
                <h2 className="text-3xl font-black uppercase">SENIOR-LED MVP</h2>
              </div>
              <h3 className="mb-4 text-xl font-bold">Validate fast. Scale faster.</h3>
              <p className="mb-10 text-lg leading-relaxed font-medium text-gray-700 dark:text-gray-300">
                We specialize in Minimum Viable Products that are actually viable. We strip away the
                non-essentials to focus on your core value proposition, delivering a product that
                investors love and users actually use.
              </p>

              <div className="mb-8 grid grid-cols-2 gap-6">
                <div className="rounded-2xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#1a1a1a] dark:shadow-none">
                  <span className="material-symbols-outlined mb-3 text-4xl text-red-500">
                    rocket_launch
                  </span>
                  <h4 className="mb-2 font-black uppercase">Speed</h4>
                  <p className="text-xs text-gray-500">
                    Market-ready MVPs in 4-6 weeks. No bloated timelines.
                  </p>
                </div>
                <div className="rounded-2xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#1a1a1a] dark:shadow-none">
                  <span className="material-symbols-outlined mb-3 text-4xl text-green-500">
                    verified
                  </span>
                  <h4 className="mb-2 font-black uppercase">Quality</h4>
                  <p className="text-xs text-gray-500">
                    Codebases that don&apos;t need rewriting when you scale.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border-4 border-black bg-[#FFD600] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[#FFD600]">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <h5 className="text-sm font-black text-black uppercase">SENIOR-LED ONLY</h5>
                  <p className="text-xs font-bold text-black/80">
                    No juniors practicing on your dime. Direct access to lead engineers.
                  </p>
                </div>
              </div>
            </div>

            {/* CASE STUDY TIMELINE CARD */}
            <div className="h-full rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#1a1a1a] dark:shadow-none">
              <h4 className="mb-6 text-xs font-bold text-gray-500 uppercase">
                Case Study Timeline: 5 Steps
              </h4>

              <div className="relative ml-3 space-y-10 border-l-2 border-gray-200 py-2 pl-8 dark:border-white/10">
                <div className="relative">
                  <span className="absolute top-0 -left-[41px] z-10 grid h-6 w-6 place-items-center rounded-full border-2 border-gray-400 bg-gray-100 dark:border-gray-500 dark:bg-gray-800">
                    <span className="material-symbols-outlined text-[10px] text-gray-500">
                      search
                    </span>
                  </span>
                  <span className="mb-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase">
                    Week 1
                  </span>
                  <h5 className="font-bold">Concept & Scope</h5>
                </div>
                <div className="relative">
                  <span className="absolute top-0 -left-[41px] z-10 grid h-6 w-6 place-items-center rounded-full border-2 border-gray-400 bg-gray-100 dark:border-gray-500 dark:bg-gray-800">
                    <span className="material-symbols-outlined text-[10px] text-gray-500">
                      design_services
                    </span>
                  </span>
                  <span className="mb-1 inline-block rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 uppercase">
                    Week 2
                  </span>
                  <h5 className="font-bold">Design & Prototype</h5>
                </div>
                <div className="relative">
                  <span className="absolute top-0 -left-[41px] z-10 grid h-6 w-6 place-items-center rounded-full border-2 border-gray-400 bg-gray-100 dark:border-gray-500 dark:bg-gray-800">
                    <span className="material-symbols-outlined text-[10px] text-gray-500">
                      code
                    </span>
                  </span>
                  <span className="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 uppercase">
                    Week 3
                  </span>
                  <h5 className="font-bold">Development</h5>
                </div>
                <div className="relative">
                  <span className="absolute top-0 -left-[41px] z-10 grid h-6 w-6 place-items-center rounded-full border-2 border-black bg-[#FFD600]">
                    <span className="material-symbols-outlined text-[10px] text-black">rocket</span>
                  </span>
                  <span className="mb-1 inline-block rounded border border-black bg-[#FFD600] px-2 py-0.5 text-[10px] font-bold text-black uppercase">
                    Week 4
                  </span>
                  <h5 className="text-lg font-black">MVP Launch</h5>
                </div>
                <div className="relative">
                  <span className="absolute top-0 -left-[41px] z-10 grid h-6 w-6 place-items-center rounded-full border-2 border-gray-400 bg-gray-100 dark:border-gray-500 dark:bg-gray-800">
                    <span className="material-symbols-outlined text-[10px] text-gray-500">
                      build
                    </span>
                  </span>
                  <span className="mb-1 inline-block rounded bg-gray-200 px-2 py-0.5 text-[10px] font-bold text-gray-700 uppercase">
                    Ongoing
                  </span>
                  <h5 className="font-bold">Maintenance & Scale</h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="border-t-4 border-black bg-[#FFD600] px-4 py-28 text-center dark:border-white/20 dark:bg-[#111]">
          <h2 className="mb-6 text-4xl font-black uppercase md:text-6xl dark:text-white">
            Stop Planning.
            <br />
            Start Shipping.
          </h2>
          <p className="mb-12 text-lg font-bold dark:text-gray-300">
            Schedule a free 30-min technical roadmap session with a Lead Architect.
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-xl border-4 border-white bg-[#111] px-8 py-4 text-lg font-black text-white uppercase shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] transition-all hover:-translate-y-1 dark:border-[#FFD600] dark:text-white dark:shadow-none"
          >
            Consult with a Senior Developer
          </Link>
        </section>
      </main>

      <SimpleFooter />
    </div>
  );
}
