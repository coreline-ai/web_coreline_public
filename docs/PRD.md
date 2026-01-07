# Product Requirements Document (PRD) - Coreline

## 1. Introduction
**Coreline** is an Engineering-first AI & Software Studio portfolio website. The platform serves as a digital showroom for high-quality engineering services, demonstrating capabilities in AI application, software development, and full-cycle product delivery. It emphasizes a "results-oriented" approach, moving beyond simple prototypes to sustainable, production-ready solutions.

## 2. Goals & Objectives
- **Brand Identity**: Establish Coreline as a premium, engineering-focused studio.
- **Showcase Capability**: effectively display past projects, technical expertise, and the rigorous development process.
- **Lead Generation**: Convert visitors into potential clients through clear calls to action and trust-building content.
- **SEO & Performance**: Ensure maximum reach and accessibility through technical optimization.

## 3. Target Audience
- Founders and companies needing MVP development with architectural dept.
- Businesses looking to integrate AI/RAG/LLM solutions into existing workflows.
- Organizations requiring " Rescue & Recovery" for failing projects or legacy codebases.

## 4. Functional Requirements

### 4.1. Landing Page Structure
The application is primarily a single-page landing site containing the following sections:
1.  **Header**: Sticky navigation with logo and links (Projects, Services, Process, About, Contact).
2.  **Hero Section**: Strong value proposition ("Engineering First"), subtext, and primary/secondary CTA buttons. Includes a visual preview area.
3.  **Services**: Grid layout card interface describing core offerings (AI Engineering, Software Development, Architecture, DevOps).
4.  **Projects (Selected Works)**: Detailed case studies highlighting specific problems, technical solutions, and outcomes. Tags for tech stack used.
5.  **Process**: Step-by-step visualization of the work methodology (Problem Definition -> Operations).
6.  **Tech Stack**: Categorized display of technical expertise (Frontend, Backend, AI, Infra).
7.  **About**: Personal introduction and philosophy of the founder.
8.  **Contact**: Final call to action with email and project links.

### 4.2. Navigation & Interactions
- **Sticky Header**: Remains visible on scroll with backdrop blur.
- **Smooth Scrolling**: Anchor links to smooth scroll to respective sections.
- **Responsive Design**: Fully adaptive layout for mobile, tablet, and desktop.
- **Theme Support**: Light mode centric design (based on code analysis), potentially utilizing `next-themes` for toggling if implemented.

### 4.3. SEO & Metadata
- **Dynamic Metadata**: Title, Description, Keywords customization via Next.js Metadata API.
- **Open Graph (OG)**: Dynamic generation of social media preview images (`opengraph-image.tsx`).
- **Structured Data (JSON-LD)**: "Organization" and "Person" schema markup for detailed search engine understanding.
- **Sitemap & Robots**: Automated generation of `sitemap.xml` and `robots.txt`.

## 5. Technical Requirements

### 5.1. Core Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: npm/yarn/pnpm (Standard Node ecosystem)

### 5.2. Architecture
- **App Router**: Leveraging React Server Components (RSC) for performance.
- **Edge Runtime**: Used for Open Graph image generation.
- **Component-Based**: Modular components (layout, header, cards) for maintainability.

### 5.3. Performance Goals
- Core Web Vitals optimized (LCP, FID, CLS).
- Fast First Contentful Paint (FCP) using server-side rendering.
- Accessible HTML structure (ARIA labels, semantic tags).

## 6. Folder Structure Strategy
```
app/
  layout.tsx        # Global layout with SEO & Providers
  page.tsx          # Main landing page content
  globals.css       # Global styles & Tailwind directives
  sitemap.ts        # Sitemap generator
  robots.ts         # Robots.txt generator
  opengraph-image.tsx # Dynamic OG Image
components/         # Reusable UI components
public/             # Static assets (favicon, etc.)
docs/               # Documentation (PRD, Outline, etc.)
```

## 7. Future Considerations
- Blog/Insights section integration.
- CMS integration for easier project/service updates.
- Detailed separate pages for individual case studies if content grows.
