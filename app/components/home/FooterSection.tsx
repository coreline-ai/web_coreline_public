'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Process', href: '/#process' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/coreline-ai' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Twitter', href: '#' },
];

const contactLinks = [
  { name: 'Email', href: 'mailto:hello@coreline.ai' },
  { name: 'Schedule Call', href: '/contact' },
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex flex-col">
      {/* Main Footer Content */}
      <div className="w-full bg-gray-50 pt-24 pb-24 text-black transition-colors duration-300 dark:bg-[#111] dark:text-white bw:bg-gray-50 bw:text-black">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-start gap-12">
            {/* Left Side: Brand & Description & Social Icons */}
            <div className="max-w-[320px]">
              <Link href="/" className="group mb-8 flex w-fit items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFD600] text-black shadow-sm">
                  <Image
                    src="/logo.svg"
                    alt="Coreline Logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <span className="text-2xl font-black tracking-tight text-black dark:text-white bw:text-black">Coreline</span>
              </Link>
              <p className="mb-10 text-gray-500 text-sm leading-relaxed font-medium dark:text-gray-400 text-center lg:text-left bw:text-gray-500">
                A modern engineering studio for AI solutions, built with passion and code. We believe in open communication and vibrant collaboration.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3 justify-center lg:justify-start">
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200 text-black hover:scale-105 hover:border-gray-300 transition-all dark:bg-white dark:border-transparent dark:text-black bw:bg-white bw:border-gray-200 bw:text-black"
                  aria-label="Twitter"
                >
                  <span className="font-black text-lg">𝕏</span>
                </Link>
                <Link
                  href="https://github.com/coreline-ai"
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200 text-black hover:scale-105 hover:border-gray-300 transition-all dark:bg-white dark:border-transparent dark:text-black bw:bg-white bw:border-gray-200 bw:text-black"
                  aria-label="GitHub"
                >
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    alt="GitHub"
                    width={22}
                    height={22}
                    className="translate-y-[1px]"
                  />
                </Link>
              </div>
            </div>

            {/* Right Side: 3 Columns of Links */}
            <div className="flex w-full justify-center gap-10 md:w-auto md:justify-start md:gap-20 lg:gap-24 text-center md:text-left">
              {/* Column 1: Navigation */}
              <div>
                <h3 className="mb-6 inline-block rounded-md bg-black px-3 py-1 text-xs font-black tracking-widest text-[#FFD600] uppercase dark:bg-transparent dark:p-0 bw:bg-black bw:p-1 bw:px-3">
                  PLATFORM
                </h3>
                <ul className="space-y-4 text-sm font-bold text-gray-800 dark:text-gray-500 bw:text-gray-800">
                  {navigationLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="hover:text-black transition-colors dark:text-gray-400 dark:hover:text-white bw:text-gray-500 bw:hover:text-black"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Socials (Text) */}
              <div>
                <h3 className="mb-6 inline-block rounded-md bg-black px-3 py-1 text-xs font-black tracking-widest text-[#FFD600] uppercase dark:bg-transparent dark:p-0 bw:bg-black bw:p-1 bw:px-3">
                  RESOURCES
                </h3>
                <ul className="space-y-4 text-sm font-bold text-gray-800 dark:text-gray-500 bw:text-gray-800">
                  {socialLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors dark:text-gray-400 dark:hover:text-white bw:text-gray-500 bw:hover:text-black"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Contact/Company */}
              <div>
                <h3 className="mb-6 inline-block rounded-md bg-black px-3 py-1 text-xs font-black tracking-widest text-[#FFD600] uppercase dark:bg-transparent dark:p-0 bw:bg-black bw:p-1 bw:px-3">
                  COMPANY
                </h3>
                <ul className="space-y-4 text-sm font-bold text-gray-800 dark:text-gray-500 bw:text-gray-800">
                  {contactLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="hover:text-black transition-colors dark:text-gray-400 dark:hover:text-white bw:text-gray-500 bw:hover:text-black"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/privacy" className="hover:text-black transition-colors dark:text-gray-400 dark:hover:text-white bw:text-gray-500 bw:hover:text-black">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright - Full Width, Always Dark */}
      <div className="w-full bg-[#111] dark:bg-black py-8 border-t border-white/5 bw:bg-black">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-xs text-center font-medium">
            © {currentYear} Coreline AI Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
