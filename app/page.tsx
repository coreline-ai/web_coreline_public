'use client';
// Trigger deploy update - v6 (Fix 404 & Metadata)

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from './components/home/Navigation';
import HeroSection from './components/home/HeroSection';
import ServicesSection from './components/home/ServicesSection';
import { useTheme } from './components/ThemeProvider';

const LoadingSkeleton = () => (
  <section className="flex justify-center px-4 py-24">
    <div className="w-full max-w-[1200px]">
      <div className="animate-pulse">
        <div className="mb-8 h-8 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-48 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  </section>
);

const TechStackSection = dynamic(() => import('./components/home/TechStackSection'), {
  loading: () => <LoadingSkeleton />,
});
const PortfolioSection = dynamic(() => import('./components/home/PortfolioSection'), {
  loading: () => <LoadingSkeleton />,
});
const ProcessSection = dynamic(() => import('./components/home/ProcessSection'), {
  loading: () => <LoadingSkeleton />,
});
const AboutSection = dynamic(() => import('./components/home/AboutSection'), {
  loading: () => <LoadingSkeleton />,
});
const CommunitySection = dynamic(() => import('./components/home/CommunitySection'), {
  loading: () => <LoadingSkeleton />,
});
const ContactSection = dynamic(() => import('./components/home/ContactSection'), {
  loading: () => <LoadingSkeleton />,
});
const FooterSection = dynamic(() => import('./components/home/FooterSection'), {
  loading: () => <LoadingSkeleton />,
});

export default function Home() {
  // Use global theme context is mainly used in Navigation/ThemeToggle,
  // but initializing it here ensures context is available if needed at top level.
  useTheme();

  return (
    <div className="">
      <div className="min-h-screen bg-white font-sans text-black transition-colors duration-300 selection:bg-black selection:text-white dark:bg-black dark:text-white dark:selection:bg-[#FFD600] dark:selection:text-black">
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
