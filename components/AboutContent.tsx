'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  'Python',
  'Machine Learning',
  'JavaScript',
  'TypeScript',
  'Java',
  'C++',
  'SQL',
  'React',
  'Git',
  'Unity',
  'Blender',
];
export default function AboutContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-45% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -80 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      className="text-white bg-purple-950/50 backdrop-blur-md rounded-2xl px-5 py-5 -mx-5 sm:mx-0 sm:bg-transparent sm:backdrop-blur-none sm:rounded-none sm:px-0 sm:py-0"
    >
      <h2 className="text-lg uppercase tracking-[0.3em] text-purple-300 mb-4">
        About Me
      </h2>
      <h3 className="text-4xl md:text-5xl font-bold mb-6">
        Hello, I'm Malak
      </h3>
      <p className="text-purple-100/80 leading-relaxed text-lg mb-10 max-w-md">
        I'm a 19-year-old Computer Science student specializing in Data Science, with a passion for
        turning complex data and code into seamless interactive experiences.
        From building predictive models to programming mechanics for 3D games,
        I love exploring the intersection of logic, data, and human interaction.
      </p>

      <div className="flex flex-wrap gap-3 max-w-md">
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