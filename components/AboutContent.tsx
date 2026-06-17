'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = ['Python', 'Machine Learning', 'JavaScript', 'React', 'SQL', 'C++', 'Git', 'Unity', 'Blender', 'Java'];

export default function AboutContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-45% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -80 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      className="text-white"
    >
      <h2 className="text-400x400 uppercase tracking-[0.3em] text-lg text-purple-300 mb-40">
        ABOUT ME
      </h2>
      <h3 className="text-4xl md:text-5xl mb-6">
        Hello, I'm Malak
      </h3>
      <p className="text-purple-100/80 leading-relaxed text-lg mb-10 max-w-md">
        I'm a Computer Science student specializing in Data Science, with a passion for 
        turning complex data and code into seamless interactive experiences. 
        From building predictive moddels to programming mechanics for 3D games, 
        I love exploring the intersection of logic, data, and human interaction.
      </p>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 text-sm rounded-full border border-purple-400/40 text-purple-200 backdrop-blur-sm bg-purple-950/30"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}