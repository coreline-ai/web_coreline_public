'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '../data/projects';
import SimpleHeader from '../components/layout/SimpleHeader';
import SimpleFooter from '../components/layout/SimpleFooter';

export default function ProjectsPage() {
  // Duplicate projects to simulate "12+" items for visual fullness as requested
  const allProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  return (
    <div
      className={`min-h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-black dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black bw:bg-white bw:text-black bw:selection:bg-black bw:selection:text-white`}
    >
      <SimpleHeader />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b-4 border-black px-4 pt-32 pb-20 dark:border-white/20 bw:border-black">
          <div className="pointer-events-none absolute top-20 right-[-10%] h-[300px] w-[300px] rounded-full bg-[#FFD600] opacity-20 blur-[100px] dark:opacity-10 bw:hidden"></div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative z-10">
              <span className="mb-6 inline-block rounded-full border-2 border-black bg-white px-4 py-1.5 text-sm font-bold tracking-wider uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] bw:border-black bw:bg-white bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                • OPEN FOR OPPORTUNITIES
              </span>
              <h1 className="mb-6 text-5xl leading-[0.9] font-black tracking-tighter md:text-7xl">
                Coreline Project
                <br />
                <span className="relative inline-block dark:text-[#FFD600] bw:text-black">
                  Collections
                  <span className="bg-opacity-80 absolute -bottom-2 left-0 -z-10 h-1 w-full -rotate-1 transform rounded-sm bg-[#FFD600] dark:bg-white/90 bw:bg-black"></span>
                </span>
              </h1>
              <p className="max-w-lg text-xl leading-relaxed font-medium text-gray-600 dark:text-gray-400 bw:text-gray-600">
                Explore a curated list of scalable web applications, robust APIs, and interactive
                tools built with modern technologies.
              </p>

              <div className="mt-10 flex gap-4">
                <a
                  href="#projects-grid"
                  className="flex items-center gap-2 rounded-xl border-2 border-black bg-black px-8 py-4 font-bold text-white shadow-[6px_6px_0px_0px_#FFD600] transition-transform hover:-translate-y-1 dark:border-[#FFD600] dark:bg-[#FFD600] dark:text-black dark:shadow-none bw:border-black bw:bg-black bw:text-white bw:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  Browse Projects
                  <span className="material-symbols-outlined notranslate text-sm">arrow_downward</span>
                </a>
                <a
                  href="https://github.com/coreline-ai/web_coreline_public"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border-2 border-black bg-white px-8 py-4 font-bold text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 dark:border-white/20 dark:bg-transparent dark:text-white dark:shadow-none dark:hover:bg-white/10 bw:border-black bw:bg-white bw:text-black bw:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  View GitHub
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="group relative z-10 aspect-video overflow-hidden rounded-3xl border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#222] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute top-0 right-0 left-0 flex h-10 items-center gap-2 border-b-4 border-black bg-gray-100 px-4 dark:border-white/20 dark:bg-[#1a1a1a] bw:border-black bw:bg-gray-100">
                  <div className="h-3 w-3 rounded-full border border-black/10 bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full border border-black/10 bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full border border-black/10 bg-green-500"></div>
                </div>
                <div className="relative mt-10 h-full w-full">
                  <Image
                    src="/images/projects_header_right.png"
                    alt="Coreline Team collaborating on project development"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Gradient REMOVED */}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 left-0 translate-x-0 lg:left-[-2rem] z-20 rotate-[-5deg] rounded-2xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-0 dark:border-white dark:bg-black dark:shadow-[8px_8px_0px_0px_#FFD600] bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-1 text-4xl font-black">12+</div>
                <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Live Projects
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Grid Section */}
        <section
          id="projects-grid"
          className="relative border-b-4 border-black bg-[#FFD600] px-4 py-20 transition-colors dark:border-white/10 dark:bg-[#111] bw:border-black bw:bg-gray-200"
        >
          {/* Grid Background Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="relative z-10 mx-auto max-w-7xl">
            {/* Section Header & Search */}
            <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
              <div>
                <span className="mb-4 inline-block rounded bg-black px-3 py-1 text-xs font-bold text-white uppercase">
                  Showcase
                </span>
                <h2 className="text-5xl font-black text-black dark:text-white bw:text-black">Projects</h2>
                <p className="mt-4 max-w-xl text-lg font-bold text-black opacity-80 dark:text-gray-300 bw:text-gray-700">
                  A selection of recent development work, experiments, and deployed applications.
                </p>
              </div>

              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full rounded-xl border-2 border-black bg-white px-6 py-4 text-lg font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-medium focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none md:w-[320px]"
                />
                <span className="material-symbols-outlined notranslate pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-black/50">
                  search
                </span>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="group flex h-full flex-col rounded-3xl border border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 hover:-translate-y-2 dark:border-white/20 dark:bg-[#1a1a1a] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {/* Icon / Thumbnail Area */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-black bg-black text-white transition-colors group-hover:bg-[#FFD600] group-hover:text-black dark:border-white/20 dark:bg-[#FFD600] dark:text-black dark:group-hover:bg-[#FFD600] dark:group-hover:text-black bw:border-black bw:bg-black bw:text-white bw:group-hover:bg-black bw:group-hover:text-white">
                    <span className="material-symbols-outlined notranslate text-3xl">
                      {index % 4 === 0
                        ? 'terminal'
                        : index % 4 === 1
                          ? 'smartphone'
                          : index % 4 === 2
                            ? 'psychology'
                            : 'shopping_cart'}
                    </span>
                  </div>

                  <h3 className="mb-3 line-clamp-1 text-2xl font-black text-black dark:text-white bw:text-black">
                    {project.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed font-medium text-gray-600 dark:text-gray-400 bw:text-gray-600">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-auto mb-8 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-black bg-[#FFD600] px-2 py-1 text-[10px] font-bold text-black uppercase dark:border-white/20 dark:bg-black dark:text-gray-300 bw:border-black bw:bg-gray-200 bw:text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-dashed border-gray-200 pt-4 dark:border-white/10 bw:border-gray-200">
                    <div className="flex items-center gap-1 text-xs font-bold tracking-wide text-gray-400 uppercase">
                      <span className="material-symbols-outlined notranslate text-sm">schedule</span>
                      Last commit: {['2d ago', '5h ago', '1w ago', '3d ago'][index % 4]}
                    </div>
                    <Link
                      href={`/projects/${project.id}`}
                      className="rounded-lg border-2 border-black px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-black hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black bw:border-black bw:text-black bw:hover:bg-black bw:hover:text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-8 py-4 font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 dark:border-white/20 dark:bg-[#222] dark:text-white dark:shadow-none bw:border-black bw:bg-white bw:text-black bw:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                View More Projects
                <span className="material-symbols-outlined notranslate">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SimpleFooter />
    </div>
  );
}
