'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import HeroContent from './HeroContent';
import AboutContent from './AboutContent';
import WorksContent from './WorksContent';
import ContactContent from './ContactContent';

const SCENE_URL = 'https://prod.spline.design/vEfWrRD-zL3z9TdR/scene.splinecode';

export default function ScrollingPortfolio() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
    });

  // --- CAMERA KEYFRAMES ---
  // [0-15%] Hero: full room, no zoom
  // [15-35%] About: zoom to piano (LEFT side of room)
  // [35-60%] Works: zoom to computer desk (RIGHT side of room)
  // [60-85%] Contact: zoom to porch/entrance (LEFT side, lower)
  // [85-100%] Exit/fade

    const scale = useTransform(
    smoothProgress,
    [0, 0.10, 0.2, 0.30, 0.4, 0.6, 0.65, 0.85, 0.9, 1],
    [1.2, 1.2, 2, 2, 2, 2, 2, 2, 1.2, 1.2]
    );

    const x = useTransform(
    smoothProgress,
    [0, 0.10, 0.2, 0.30, 0.4, 0.6, 0.65, 0.85, 0.9, 1],
    ['0%', '0%', '35%', '35%', '-35%', '-35%', '15%', '15%', '0%', '0%']
    );

    const y = useTransform(
    smoothProgress,
    [0, 0.10, 0.2, 0.30, 0.4, 0.6, 0.65, 0.85, 0.9, 1],
    ['0%', '0%', '-5%', '-5%', '-3%', '-3%', '-35%', '-35%', '0%', '0%']
    );

    const brightness = useTransform(
    smoothProgress,
    [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
    [1, 1, 0.9, 0.9, 0.95, 0.95, 1]
    );

    return (
    <div ref={containerRef} className="relative bg-[#1a1035]">
      {/* FIXED 3D ROOM — Background Layer */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-auto">
        <motion.div
            style={{ 
                scale, 
                x, 
                y, 
                filter: useTransform(brightness, v => `brightness(${v})`) 
            }}
            className="w-full h-full origin-center will-change-transform"
        >
            <Spline scene={SCENE_URL} className="w-full h-full" />
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
            <section className="h-[150vh] relative pointer-events-none">
            {/* Remove the max-w-7xl container — use absolute positioning instead */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-8 md:left-20 -translate-y-1/2 pointer-events-auto">
                        <AboutContent />
                    </div>
                </div>
            </section>

            {/* WORKS — Text FAR RIGHT */}
            <section className="h-[300vh] relative pointer-events-none">
                <div className="absolute top-1/2 right-8 md:right-20 -translate-y-1/2 pointer-events-auto">
                    <WorksContent />
                </div>
            </section>

            {/* CONTACT — Text FAR LEFT */}
            <section className="h-[300vh] relative pointer-events-none">
                <div className="absolute top-1/2 left-8 md:left-20 -translate-y-1/2 pointer-events-auto">
                    <ContactContent />
                </div>
            </section>
        </div>
    </div>
    );
}