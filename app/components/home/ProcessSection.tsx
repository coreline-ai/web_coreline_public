'use client';

import React from 'react';
import Link from 'next/link';
import { PROCESS_STEPS } from '../../constants';

export default function ProcessSection() {
    return (
        <section id="process" className="scroll-mt-40 py-24 px-4 flex justify-center border-b-2 transition-colors duration-300
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
                        <Link href="/services#senior-led-mvp" key={step.id} className="relative z-10 flex flex-col items-center group cursor-pointer">
                            <div className={`w-20 h-20 border-4 flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-110
                bg-white border-black
                dark:bg-[#111] dark:border-white/20 dark:shadow-2xl dark:shadow-black dark:group-hover:border-[#FFD600] dark:group-hover:text-[#FFD600]
                ${step.shape === 'circle' ? 'rounded-full' :
                                    step.shape === 'polygon' ? 'rounded-tr-3xl rounded-bl-3xl' :
                                        step.shape === 'rect' ? 'bg-[#FFD600] text-black border-[#FFD600] group-hover:text-black dark:bg-[#FFD600] dark:text-black dark:border-[#FFD600] dark:group-hover:text-black' : 'rounded-2xl'
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
