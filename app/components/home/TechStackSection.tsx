'use client';

import React from 'react';
import { TECH_STACK } from '../../constants';

export default function TechStackSection() {
    return (
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
    );
}
