# 3D Room Portfolio

A scroll-driven portfolio site built around a 3D room scene — scrolling pans and
zooms the camera between a hero view, an about corner, a works desk, and a
contact mailpost, with each section's copy animating in alongside the camera move.

<img width="1915" height="1022" alt="image" src="https://github.com/user-attachments/assets/ef41b678-fccf-4cba-9ac5-a8571a217a55" />

**Live site:** https://malakelsadek.github.io/3droomportfolio/

## Tech stack

- [Next.js](https://nextjs.org/) (App Router, static export)
- [Spline](https://spline.design/) for the 3D room scene, loaded client-side only
- [Framer Motion](https://www.framer.com/motion/) for scroll-linked camera transforms and section/card animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- TypeScript

## Project structure

- `app/` — root layout and the single page entry point
- `components/ScrollingPortfolio.tsx` — the scroll container that drives the Spline camera (scale/x/y/brightness) and lays out each section
- `components/HeroContent.tsx`, `AboutContent.tsx`, `WorksContent.tsx`, `ContactContent.tsx` — per-section copy and UI, animated into view with `useInView`
- `components/WorksContent.tsx` also renders a centered popup (via portal) with project details and a link to the GitHub repo when a project card is clicked

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Produces a static export in `out/` (see `next.config.ts` — `output: "export"`).

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the static
export and publishes it to GitHub Pages. The build uses a `/3droomportfolio`
base path in production to match the GitHub Pages project URL.
