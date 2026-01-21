'use client';

import React from 'react';
import { TECH_STACK } from './tech-stack.constants';

export default function TechStackSection() {
  return (
    <div className="border-b-2 border-black bg-white py-12 transition-colors duration-300 dark:border-t-0 dark:border-b dark:border-white/10 dark:bg-[#0a0a0a] bw:border-black bw:bg-white">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(TECH_STACK).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="border-b-2 border-black pb-2 text-xl font-black text-black transition-colors dark:border-white/10 dark:text-gray-300 bw:border-black bw:text-black">
                {category}
              </h3>
              <div className="flex flex-col gap-2">
                {items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex cursor-default items-center gap-3 rounded-lg border-2 border-black bg-gray-100 px-4 py-2 text-sm font-bold transition-colors hover:bg-[#FFD600] dark:border-transparent dark:bg-white/5 dark:text-gray-300 dark:hover:bg-[#FFD600] dark:hover:text-black bw:border-black bw:bg-gray-100 bw:text-black bw:hover:bg-gray-200"
                  >
                    <span className="material-symbols-outlined notranslate text-lg">{tech.icon}</span>
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
