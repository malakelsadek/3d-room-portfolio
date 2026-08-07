'use client';

import { motion } from 'framer-motion';

export default function HeroContent() {
  return (
    <div className="absolute inset-0 text-white select-none">
      
      {/* Bottom Left: Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-28 sm:bottom-20 left-4 sm:left-8 md:left-20 right-4 sm:right-auto pointer-events-auto bg-purple-950/50 backdrop-blur-md rounded-2xl px-5 py-4 sm:bg-transparent sm:backdrop-blur-none sm:rounded-none sm:px-0 sm:py-0"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide mb-2">
          Welcome,
        </h2>
        <p className="text-white/70 text-base md:text-xl font-light tracking-wider">
          To my virtual bedroom
        </p>
      </motion.div>

      {/* Mid Right: Portfolio Title */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-[12%] sm:top-1/2 right-4 sm:right-8 md:right-20 left-4 sm:left-auto sm:-translate-y-1/2 pointer-events-auto bg-purple-950/50 backdrop-blur-md rounded-2xl px-5 py-4 sm:bg-transparent sm:backdrop-blur-none sm:rounded-none sm:px-0 sm:py-0"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-widest leading-relaxed text-slate-100 text-right">
          MALAK'S <br />
          <span className="font-medium tracking-widest">PORTFOLIO</span>
        </h1>
      </motion.div>

      {/* Bottom Center: Scroll Chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer"
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
    </div>
  );
}