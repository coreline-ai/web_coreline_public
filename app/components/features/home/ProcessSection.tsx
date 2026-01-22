'use client';

import React from 'react';
import Link from 'next/link';
import { PROCESS_STEPS } from './process.constants';

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="flex scroll-mt-40 justify-center border-b-2 border-black bg-white px-4 py-24 transition-colors duration-300 dark:border-white/10 dark:bg-[#0a0a0a] bw:border-black bw:bg-white"
    >
      <div className="w-full max-w-[1200px] text-center">
        <div className="mx-auto mb-6 w-fit rounded-lg border-2 border-black bg-black px-4 py-1.5 text-xs font-black tracking-widest text-white uppercase transition-all dark:border-[#FFD600] dark:bg-[#FFD600] dark:text-black bw:border-black bw:bg-black bw:text-white">
          Workflow
        </div>
        <h2 className="mb-20 text-4xl font-black">어떻게 일하나요?</h2>

        <div className="relative grid grid-cols-1 gap-12 px-4 md:grid-cols-4 md:gap-4">
          <div className="absolute top-10 left-[10%] -z-0 hidden h-0.5 w-[80%] border-t-4 border-dashed border-gray-200 transition-colors md:block dark:border-t-2 dark:border-gray-700 bw:border-gray-200"></div>

          {PROCESS_STEPS.map((step) => (
            <Link
              href="/services#senior-led-mvp"
              key={step.id}
              className="group relative z-10 flex cursor-pointer flex-col items-center"
            >
              <div
                className={`mb-8 flex h-20 w-20 items-center justify-center border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-110 dark:border-white/20 dark:bg-[#111] dark:shadow-2xl dark:shadow-black dark:group-hover:border-[#FFD600] dark:group-hover:text-[#FFD600] bw:border-black bw:bg-white bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${step.shape === 'circle'
                    ? 'rounded-full'
                    : step.shape === 'polygon'
                      ? 'rounded-tr-3xl rounded-bl-3xl'
                      : step.shape === 'rect'
                        ? 'border-[#FFD600] bg-[#FFD600] text-black group-hover:text-black dark:border-[#FFD600] dark:bg-[#FFD600] dark:text-black dark:group-hover:text-black bw:border-black bw:bg-black bw:text-white'
                        : 'rounded-2xl'
                  }`}
              >
                {step.shape === 'rect' ? (
                  <span className="material-symbols-outlined notranslate text-3xl">rocket_launch</span>
                ) : (
                  <span className="text-3xl font-black">{step.number}</span>
                )}
              </div>
              <h4 className="mb-2 text-xl font-black">{step.title}</h4>
              <p className="max-w-[180px] text-sm leading-relaxed font-bold text-gray-500 transition-colors dark:text-gray-500 dark:group-hover:text-gray-300 bw:text-gray-500 bw:group-hover:text-black">
                {step.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
