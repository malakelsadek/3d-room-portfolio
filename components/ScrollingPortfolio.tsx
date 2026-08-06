'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import HeroContent from './HeroContent';
import AboutContent from './AboutContent';
import WorksContent from './WorksContent';
import ContactContent from './ContactContent';

// Spline pulls in a large WebGL/WASM runtime — load it only on the client,
// after the rest of the page has hydrated, instead of blocking the initial bundle.
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
});

const SCENE_URL = 'https://prod.spline.design/vEfWrRD-zL3z9TdR/scene.splinecode';

export default function ScrollingPortfolio() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sceneLoaded, setSceneLoaded] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
    });

    // A lighter, slightly under-damped spring settles quickly without feeling
    // sluggish, so the room stays glued to the scroll instead of lagging behind it.
    const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 90,
    damping: prefersReducedMotion ? 100 : 22,
    mass: 0.5,
    restDelta: 0.001,
    });

  // --- CAMERA KEYFRAMES ---
  // [0-15%] Hero: full room, no zoom
  // [15-35%] About: zoom to piano (LEFT side of room) — held a bit longer so it
  //           doesn't drift toward Works after just one extra scroll tick
  // [35-60%] Works: zoom to computer desk (RIGHT side of room)
  // [60-65%] Contact: fast pan/zoom to the mailpost, framed toward the top
  // [65-100%] Hold on the mailpost — no zoom back out to the full room

    const scale = useTransform(
    smoothProgress,
    [0, 0.10, 0.2, 0.35, 0.45, 0.6, 0.65, 1],
    [1.2, 1.2, 2, 2, 2, 2, 2.2, 2.2]
    );

    const x = useTransform(
    smoothProgress,
    [0, 0.10, 0.2, 0.35, 0.45, 0.6, 0.65, 1],
    ['0%', '0%', '35%', '35%', '-35%', '-35%', '15%', '15%']
    );

    const y = useTransform(
    smoothProgress,
    [0, 0.10, 0.2, 0.35, 0.45, 0.6, 0.65, 1],
    ['0%', '0%', '-5%', '-5%', '-3%', '-3%', '-55%', '-55%']
    );

    const brightness = useTransform(
    smoothProgress,
    [0, 0.2, 0.35, 0.5, 0.65, 1],
    [1, 1, 0.9, 0.9, 0.95, 0.95]
    );
    const filter = useTransform(brightness, (v) => `brightness(${v})`);

    return (
    <div ref={containerRef} className="relative bg-[#1a1035]">
      {/* FIXED 3D ROOM — Background Layer */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-auto">
        <motion.div
            style={{ scale, x, y, filter }}
            className="w-full h-full origin-center will-change-transform"
        >
            <motion.div
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: sceneLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <Spline
                    scene={SCENE_URL}
                    className="w-full h-full"
                    onLoad={() => setSceneLoaded(true)}
                />
            </motion.div>
        </motion.div>

        {/* Subtle pulse while the 3D room is still streaming in */}
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: sceneLoaded ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.div
                className="w-3 h-3 rounded-full bg-purple-300/60"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(26,16,53,0.4) 100%)' }} />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="relative z-10 pointer-events-none">
        
            {/* HERO */}
            <section className="h-screen relative pointer-events-none">
                <HeroContent />
            </section>

            {/* ABOUT — Text pinned to FAR LEFT like Hero's "Welcome" */}
            <section className="h-[120vh] relative pointer-events-none">
            {/* Remove the max-w-7xl container — use absolute positioning instead */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-8 md:left-20 -translate-y-1/2 pointer-events-auto">
                        <AboutContent />
                    </div>
                </div>
            </section>

            {/* WORKS — Text FAR RIGHT */}
            <section className="h-[120vh] relative pointer-events-none">
                <div className="absolute top-1/3 right-8 md:right-20 -translate-y-1/2 pointer-events-auto">
                    <WorksContent />
                </div>
            </section>

            {/* CONTACT — Text FAR LEFT. Kept to viewport height (not 120vh like the
                other sections) so the page's scroll range ends right as the camera
                settles on the mailpost, instead of leaving dead space to scroll through. */}
            <section className="h-screen relative pointer-events-none">
                <div className="absolute top-1/2 left-8 md:left-20 -translate-y-1/2 pointer-events-auto">
                    <ContactContent />
                </div>
            </section>
        </div>
    </div>
    );
}