'use client';
// Trigger deploy update - v4 (Fix metadataBase)

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from './components/features/home/Navigation';
import HeroSection from './components/features/home/HeroSection';
import ServicesSection from './components/features/home/ServicesSection';
import { useTheme } from './components/providers/ThemeProvider';

const LoadingSkeleton = () => (
  <section className="flex justify-center px-4 py-24">
    <div className="w-full max-w-[1200px]">
      <div className="animate-pulse">
        <div className="mb-8 h-8 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700 bw:bg-gray-200"></div>
        <div className="h-48 rounded-lg bg-gray-200 dark:bg-gray-700 bw:bg-gray-200"></div>
      </div>
    </div>
  </section>
);

const TechStackSection = dynamic(() => import('./components/features/home/TechStackSection'), {
  loading: () => <LoadingSkeleton />,
});
const PortfolioSection = dynamic(() => import('./components/features/home/PortfolioSection'), {
  loading: () => <LoadingSkeleton />,
});
const ProcessSection = dynamic(() => import('./components/features/home/ProcessSection'), {
  loading: () => <LoadingSkeleton />,
});
const AboutSection = dynamic(() => import('./components/features/home/AboutSection'), {
  loading: () => <LoadingSkeleton />,
});
const CommunitySection = dynamic(() => import('./components/features/home/CommunitySection'), {
  loading: () => <LoadingSkeleton />,
});
const ContactSection = dynamic(() => import('./components/features/home/ContactSection'), {
  loading: () => <LoadingSkeleton />,
});
const FooterSection = dynamic(() => import('./components/features/home/FooterSection'), {
  loading: () => <LoadingSkeleton />,
});

export default function Home() {
  // Use global theme context is mainly used in Navigation/ThemeToggle,
  // but initializing it here ensures context is available if needed at top level.
  useTheme();

  return (
    <div className="">
      <div className="min-h-screen bg-white font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-black dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black bw:bg-white bw:text-black bw:selection:bg-black bw:selection:text-white">
        <Navigation />
        <HeroSection />
        <ServicesSection />
        <TechStackSection />
        <PortfolioSection />
        <ProcessSection />
        <AboutSection />
        <CommunitySection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
}
