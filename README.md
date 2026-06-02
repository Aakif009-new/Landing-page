# Xurya — Clean Energy For The Future

A premium, enterprise-grade renewable energy landing page built with Next.js 16, React, Tailwind CSS, and Three.js. Designed to the highest visual standards — blending the elegance of Apple, the trust of Stripe, and the innovation of modern clean-energy enterprises.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **3D:** Three.js, React Three Fiber, Drei
- **Typography:** Manrope (headings), Inter (body) via `next/font`
- **Animations:** CSS transitions, IntersectionObserver, animated counters
- **Linting:** ESLint 9 with Next.js config

## Project Structure

```
src/
├── app/
│   ├── globals.css          — Design system tokens, keyframes, base styles
│   ├── layout.tsx           — Root layout with fonts, metadata, OG tags
│   └── page.tsx             — Page assembly (all sections)
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx       — Sticky glassmorphic nav with mobile drawer
│   │   ├── Hero.tsx         — Full-screen hero with 3D, CTAs, metrics
│   │   ├── Trust.tsx        — Infinite logo marquee (text-based)
│   │   ├── WhyXurya.tsx     — 6 premium feature cards with hover states
│   │   ├── Solutions.tsx    — Interactive service selector with image
│   │   ├── CaseStudy.tsx    — Case study with image, testimonial, ROI
│   │   ├── Performance.tsx  — Animated counters + certification badges
│   │   ├── Sustainability.tsx — Dark CTA section with 3D particles
│   │   └── Footer.tsx       — 4-column enterprise footer with social links
│   ├── three/
│   │   ├── HeroScene.tsx    — Solar panels, wind turbines, energy particles
│   │   └── ParticlesBackground.tsx — Subtle particle system for CTA
│   └── ui/
│       ├── Button.tsx       — 4 variants, 3 sizes, anchor/button modes
│       ├── ScrollReveal.tsx — IntersectionObserver-driven fade-up wrapper
│       └── AnimatedCounter.tsx — Eased number counter with scroll trigger
├── hooks/
│   ├── useScrollReveal.ts   — Generic IntersectionObserver hook
│   ├── useCountUp.ts        — requestAnimationFrame counter hook
│   └── useMousePosition.ts  — Mouse coordinate tracker (unused)
├── lib/
│   └── utils.ts             — cn() classname utility
└── types/
    └── index.ts             — TypeScript interfaces (unused)
```

## Sections

| Section | Description |
|---------|-------------|
| **Navbar** | Fixed top navigation with glass effect on scroll, mobile hamburger menu |
| **Hero** | Full-viewport hero with Three.js 3D scene, animated badge, dual CTAs, metrics |
| **Trust** | Company logos in an infinite horizontal marquee |
| **Why Xurya** | 6 feature cards: Predictive Maintenance, Analytics, AI Monitoring, Quality Control, Carbon Tracking, 24/7 Support |
| **Solutions** | Residential, Commercial, Industrial, EV Charging — interactive card selector with hero image |
| **Case Study** | Nordpak transformation story: real image, testimonial, 3 ROI metrics |
| **Performance** | Animated counters (1200+ projects, 184.3K MWh, 125K tCO₂, 8 countries) + certification grid |
| **Sustainability** | Dark-themed CTA with grid overlay, 3D particles, 3 contact cards, assessment prompt |
| **Footer** | 4-column layout: Company, Solutions, Resources, Contact + social links + legal |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Design System

### Colors

- **Primary:** Emerald scale (`#059669` → `#10b981`)
- **Backgrounds:** White (`#fdfdfd`), soft surfaces (`#f5f5f5`)
- **Text:** Near-black (`#0d0d0d`), surface grays
- **Accents:** Emerald greens for CTAs, highlights

### Typography

- **Headings:** Manrope (700 weight, tight tracking)
- **Body:** Inter (400/500 weight, 1.6+ line height)

### Spacing

- Consistent `max-w-7xl` constraint (1280px)
- Section padding: `py-24 md:py-32`
- Card gaps: `gap-4 md:gap-6`

## Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.7 | Framework |
| `react` / `react-dom` | 19.2.4 | UI library |
| `three` | ^0.184.0 | 3D rendering |
| `@react-three/fiber` | ^9.6.1 | React renderer for Three.js |
| `@react-three/drei` | ^10.7.7 | R3F utilities |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^4 | Utility CSS framework |
| `@tailwindcss/postcss` | ^4 | PostCSS plugin |
| `typescript` | ^5 | Type checking |
| `eslint` / `eslint-config-next` | ^9 / 16.2.7 | Linting |

## Assets

- `public/images/solar-home.jpg` — Residential solar installation (Unsplash)
- `public/images/industrial-solar.jpg` — Commercial rooftop solar (Unsplash)

## Image Credits

- Solar home photo by [Rafael Moreno](https://unsplash.com/@rafamrn) (Unsplash)
- Industrial solar photo by [Jason Sung](https://unsplash.com/@jasonsung) (Unsplash)

Both licensed under the [Unsplash License](https://unsplash.com/license).

## Audit Summary

| Check | Status |
|-------|--------|
| Build | ✅ Passes |
| Lint | ✅ 0 errors, 0 warnings |
| TypeScript | ✅ No errors |
| Responsive | ✅ 320px–1920px |
| Accessibility | ⚠️ Needs skip link, focus rings |
| SEO | ⚠️ Needs sitemap, robots.txt, OG image |
| Performance | Estimated Lighthouse 85–92 |

See audit results for the full issue list and recommended improvements.

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel --prod
```

Or use the [Vercel for Git integration](https://vercel.com/docs/deployments/git).
