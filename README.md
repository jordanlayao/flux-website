# Flux — Treasury Intelligence Landing Page

A self-learning project where I designed a complete fintech landing page from scratch in Figma and brought it to life using Cursor. Flux is a fictional treasury intelligence platform — the goal was to go through the full design-to-development workflow: ideation, visual design, interaction design, and production-grade frontend implementation.

**Live demo:** [fluxfinancesio.vercel.app](https://fluxfinancesio.vercel.app/)

## What I Built

A high-fidelity, animation-heavy landing page featuring:

- **Interactive dashboard hero** — 4-screen tabbed dashboard with Framer Motion transitions, liquid glass tab bar, and staggered appearance animations
- **Scroll-driven text reveal** — Character-by-character highlight animation using GSAP SplitText, scrubbed to scroll position
- **Bento grid** — 4 cards with AI chat dropdown, audio player, orbiting ticker animation, and shader-based grain textures
- **Switchback scroll section** — GSAP ScrollTrigger-pinned section with 3 tabs, word-by-word masked text reveals, clip-path entrance animation, and per-tab illustrations
- **386-frame scroll sequence** — Canvas-rendered image sequence in the footer with BSP preloading, two-tier quality (lo/hi), and scroll-event-driven RAF rendering
- **Endless trust bar carousel** — CSS animation with edge fading and visibility-gated playback
- **Testimonials** — Horizontal overflow card layout with background images

## Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | GSAP (ScrollTrigger, SplitText), Framer Motion, Lenis smooth scroll |
| Rendering | Canvas API for frame sequences, `@paper-design/shaders-react` for grain |
| Icons | Lucide React |
| Font | Geist Sans + Geist Mono |
| Deployment | Vercel |
| Design | Figma |
| Development | Cursor |

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Main page — composes all sections
│   ├── layout.tsx          # Root layout with Lenis + GSAP providers
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── navigation.tsx
│   │   ├── hero.tsx
│   │   ├── hero-dashboard.tsx
│   │   ├── quote-block.tsx
│   │   ├── trust-bar.tsx
│   │   ├── bento-grid.tsx
│   │   ├── bento-card-1.tsx  — bento-card-4.tsx
│   │   ├── switchback-scroll.tsx
│   │   ├── card-deck.tsx
│   │   ├── testimonials.tsx
│   │   └── footer-animation.tsx
│   ├── animations/
│   │   ├── smooth-scroll-provider.tsx
│   │   └── gsap-provider.tsx
│   └── frame-preload-trigger.tsx
├── lib/
│   └── frame-preloader.ts  # BSP-ordered background frame loader
public/
├── frames/                 # 386-frame image sequences (desktop/mobile, lo/hi)
├── bento/                  # Bento card assets
├── card-deck/              # Card deck illustrations + testimonial images
├── switchback/             # Switchback section photographs
├── dashboard/              # Dashboard UI assets
├── trustbar logos/         # Trust bar SVG logos
└── logo/                   # Flux logo
```

## Key Learnings

- **Figma to code workflow** — Designing in Figma first, then using Figma MCP tools in Cursor to extract exact specs (colors, spacing, typography, assets) and translate them to code
- **Scroll-driven animations** — GSAP ScrollTrigger for pinning, scrubbing, and progress-based transitions; balancing visual richness with performance
- **Canvas frame sequences** — Implementing Adaline-style scroll-driven image sequences with BSP preloading for optimal frame coverage, two-tier quality progressive enhancement, and scroll-event-driven RAF (not continuous loops)
- **Performance optimization** — IntersectionObserver-gated animations, deferred preloading, passive scroll listeners with early-exit guards, `next/image` optimization, and `next/dynamic` code splitting
- **Animation systems coordination** — Managing GSAP, Framer Motion, Lenis, and raw RAF together without desync or competing layout cycles

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design

The full design file lives in Figma. Every section was designed from scratch — no templates, no UI kits. Heaviy inspired by Adeline and Linears website.
