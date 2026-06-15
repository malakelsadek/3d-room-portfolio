'use client';

import { motion } from 'framer-motion';
import SplineScene from './SplineScene'; // Imports your room scene component

export default function HeroSection() {
    return (
    <section className="relative h-screen w-full overflow-hidden bg-[#5b64a8] text-white font-sans select-none">
        
      {/* 1. Interactive 3D Room Background Layer */}
        {/* FIXED: Removed standard 2D 'motion.div' mouse hooks.
        FIXED: Removed 'pointer-events-none' so Spline can feel the cursor hover!
      */}
        <div className="absolute inset-0 z-0 flex items-center justify-center w-full h-full scale-105">
        <SplineScene />
        </div>

      {/* 2. Text Overlay Layout (Matches screenshot position exactly) */}
      {/* Leaves 'pointer-events-none' on this invisible wrapper grid so you can hover "through" the empty space into the 3D room */}
        <div className="absolute inset-0 z-10 grid grid-cols-1 md:grid-cols-2 p-12 md:p-24 items-center pointer-events-none">
        
        {/* Bottom Left Title (Japanese Style Accent) */}
        <div className="self-end justify-self-start pointer-events-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-wide mb-2">
            Welcome
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light tracking-wider">
            To my room.
            </p>
        </div>

        {/* Mid/Right Portfolio Title */}
        <div className="self-center justify-self-end text-right md:text-left md:translate-x-[-10%] pointer-events-auto">
            <h1 className="text-4xl md:text-5xl font-light tracking-widest leading-relaxed text-slate-100">
            MALAK'S <br />
            <span className="font-medium tracking-widest">PORTFOLIO</span>
            </h1>
        </div>
        </div>

      {/* 3. Bottom Centered Animated Scroll Chevron */}
        <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
        <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-70 hover:opacity-100 transition-opacity"
        >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </motion.div>

    </section>
    );
}