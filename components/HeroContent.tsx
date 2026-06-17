'use client';

import { motion } from 'framer-motion';

export default function HeroContent() {
  return (
    <div className="absolute inset-0 text-white select-none">
      
      {/* Bottom Left: Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-20 left-8 md:left-20 pointer-events-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-wide mb-2">
          Welcome
        </h2>
        <p className="text-white/70 text-sm md:text-base font-light tracking-wider">
          To my room.
        </p>
      </motion.div>

      {/* Mid Right: Portfolio Title */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 right-8 md:right-20 -translate-y-1/2 pointer-events-auto"
      >
        <h1 className="text-4xl md:text-5xl font-light tracking-widest leading-relaxed text-slate-100 text-right">
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