'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import SimpleHeader from '../../components/layout/SimpleHeader';
import SimpleFooter from '../../components/layout/SimpleFooter';
import { PROJECTS } from '../../data/projects';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();

  const project = PROJECTS.find((p) => p.id === params.id);

  // Fallback if project not found
  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-black dark:bg-black dark:text-white bw:bg-white bw:text-black">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-black">404</h1>
          <p className="mb-8">Project not found</p>
          <Link
            href="/"
            className="rounded-xl border-2 border-black bg-[#FFD600] px-6 py-3 font-black text-black"
          >
            GO HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="relative min-h-screen bg-[#f0f0f0] bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:2rem_2rem] font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-[#111] dark:bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black bw:bg-white bw:text-black bw:selection:bg-black bw:selection:text-white">
        <SimpleHeader />

        <main className="container mx-auto max-w-5xl px-4 pt-24 pb-20">
          {/* Header Card */}
          <div className="relative mb-16 overflow-hidden rounded-[2rem] border border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all dark:border-white/20 dark:bg-[#1a1a1a] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute top-0 right-0 hidden h-24 w-24 rounded-bl-[4rem] bg-[#FFD600] p-0 md:block"></div>

            <div className="relative z-10 p-8 md:p-12">
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <span className="rounded-lg border-2 border-black bg-[#FFD600] px-4 py-1.5 text-xs font-black tracking-widest text-black uppercase shadow-[2px_2px_0px_0px_black] dark:border-transparent dark:shadow-none bw:border-black bw:shadow-[2px_2px_0px_0px_black]">
                  WEB APPLICATION
                </span>
                {project.version && (
                  <span className="rounded-lg border-2 border-black bg-white px-3 py-1.5 font-mono text-xs font-bold dark:border-white/20 dark:bg-black dark:text-gray-300 bw:border-black bw:bg-white bw:text-black">
                    {project.version}
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
                <div className="flex-1">
                  <h1 className="mb-6 text-4xl leading-tight font-black tracking-tight md:text-6xl">
                    {project.title}
                  </h1>
                  <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-600 md:text-xl dark:text-gray-300 bw:text-gray-600">
                    {project.description}
                  </p>
                </div>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border-2 border-black bg-black px-8 py-4 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-transparent dark:bg-white dark:text-black dark:hover:bg-[#FFD600] bw:border-black bw:bg-black bw:text-white bw:hover:bg-gray-800"
                  >
                    <span className="material-symbols-outlined notranslate">code</span>
                    GITHUB REPO
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Technical Stack Section */}
          {project.techStack && (
            <div className="mb-20">
              <h2 className="mb-8 flex items-center gap-4 text-xl font-black tracking-widest uppercase">
                TECHNICAL STACK
                <div className="h-1 flex-1 rounded-full bg-black dark:bg-white/20 bw:bg-black"></div>
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {project.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 dark:border-white/20 dark:bg-[#1a1a1a] dark:shadow-none dark:hover:bg-[#222] bw:border-black bw:bg-white bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-black bg-[#FFD600] text-black dark:border-transparent dark:bg-[#FFD600] dark:text-black bw:border-black">
                      <span className="material-symbols-outlined notranslate">{tech.icon}</span>
                    </div>
                    <h3 className="mb-1 text-lg font-black">{tech.name}</h3>
                    <div className="mb-3 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      {tech.role}
                    </div>
                    <p className="text-sm leading-snug font-medium text-gray-600 dark:text-gray-400 bw:text-gray-600">
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
              <h2 className="mb-8 flex items-center gap-4 text-xl font-black tracking-widest uppercase">
                VISUAL OVERVIEW
                <div className="h-1 flex-1 rounded-full bg-black dark:bg-white/20 bw:bg-black"></div>
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {project.visualOverview.map((img, index) => (
                  <div
                    key={index}
                    className="group relative aspect-video overflow-hidden rounded-2xl border border-black bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:bg-[#1a1a1a] dark:text-white dark:shadow-none bw:border-black bw:bg-white bw:text-black bw:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
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
          <div className="rounded-[2.5rem] border border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-12 dark:border-white/20 dark:bg-[#1a1a1a] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              {/* Left Column */}
              <div>
                <h2 className="mb-8 text-2xl font-black tracking-wide uppercase">
                  Project Execution
                </h2>
                <p className="mb-12 text-lg leading-relaxed font-medium text-gray-600 dark:text-gray-300 bw:text-gray-600">
                  {project.executionDetails || project.description}
                </p>

                {project.performance && (
                  <div className="relative rotate-1 rounded-2xl border-2 border-black bg-[#FFD600] p-6 text-black shadow-[4px_4px_0px_0px_black] transition-transform hover:rotate-0">
                    <div className="absolute -top-3 right-4 bg-black px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                      TOP RESULT
                    </div>
                    <h3 className="mb-2 text-xs font-black tracking-widest uppercase opacity-80">
                      {project.performance.title}
                    </h3>
                    <p className="text-lg leading-snug font-bold">
                      {project.performance.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div>
                <h2 className="mb-8 text-xl font-black tracking-wide text-gray-400 uppercase dark:text-gray-500 bw:text-gray-400">
                  Core Features
                </h2>
                <div className="space-y-6">
                  {project.features?.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#2DD4BF] shadow-[2px_2px_0px_0px_black] dark:border-transparent dark:shadow-none bw:border-black bw:shadow-[2px_2px_0px_0px_black]">
                        <span className="material-symbols-outlined notranslate text-sm font-bold text-black">
                          check
                        </span>
                      </div>
                      <div>
                        <h4 className="mb-1 text-lg font-black">{feature.title}</h4>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 bw:text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 border-t border-dashed border-gray-200 pt-8 dark:border-white/10 bw:border-gray-200">
                  <div className="flex items-center justify-between rounded-xl border-2 border-gray-200 bg-gray-50 p-4 font-mono text-xs dark:border-white/10 dark:bg-black dark:text-gray-400 bw:border-gray-200 bw:bg-gray-50 bw:text-black">
                    <span>
                      Status:{' '}
                      <span className="ml-2 rounded bg-green-100 px-2 py-0.5 font-bold text-green-600 dark:bg-green-900/30 dark:text-green-400 bw:bg-green-100 bw:text-green-600">
                        Active Maintenance
                      </span>
                    </span>
                    <span>
                      License:{' '}
                      <span className="font-bold text-black dark:text-white bw:text-black">MIT License</span>
                    </span>
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
