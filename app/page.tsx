"use client";
// Trigger deploy update

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from './components/home/Navigation';
import HeroSection from './components/home/HeroSection';
import ServicesSection from './components/home/ServicesSection';
import { useTheme } from './components/ThemeProvider';

const LoadingSkeleton = () => (
    <section className="py-24 px-4 flex justify-center">
        <div className="max-w-[1200px] w-full">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 mb-8"></div>
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
        </div>
    </section>
);

const TechStackSection = dynamic(() => import('./components/home/TechStackSection'), { loading: () => <LoadingSkeleton /> });
const PortfolioSection = dynamic(() => import('./components/home/PortfolioSection'), { loading: () => <LoadingSkeleton /> });
const ProcessSection = dynamic(() => import('./components/home/ProcessSection'), { loading: () => <LoadingSkeleton /> });
const AboutSection = dynamic(() => import('./components/home/AboutSection'), { loading: () => <LoadingSkeleton /> });
const FooterSection = dynamic(() => import('./components/home/FooterSection'), { loading: () => <LoadingSkeleton /> });

export default function Home() {
    // Use global theme context is mainly used in Navigation/ThemeToggle, 
    // but initializing it here ensures context is available if needed at top level.
    useTheme();

    return (
        <div className="">
            <div className="min-h-screen transition-colors duration-300 font-sans
        bg-white text-black selection:bg-black selection:text-white
        dark:bg-black dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black">

                <Navigation />
                <HeroSection />
                <ServicesSection />
                <TechStackSection />
                <PortfolioSection />
                <ProcessSection />
                <AboutSection />
                <FooterSection />

            </div>
        </div>
    );
}
