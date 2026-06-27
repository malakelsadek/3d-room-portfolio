'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'Project One',
    description: 'A short description of what this project does and the tech used.',
    tags: ['Python', 'ML'],
  },
  {
    title: 'Project Two',
    description: 'A short description of what this project does and the tech used.',
    tags: ['React', 'Next.js'],
  },
  {
    title: 'Project Three',
    description: 'A short description of what this project does and the tech used.',
    tags: ['Data Viz', 'SQL'],
  },
];

export default function WorksContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-45% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      className="text-white"
    >
      <h2 className="text-lg uppercase tracking-[0.3em] text-purple-300 mb-4">
        My Works
      </h2>
      <h3 className="text-4xl md:text-5xl font-bold mb-10">
        Things I've Built
      </h3>

      <div className="space-y-4 max-w-lg">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
            className="bg-purple-950/50 border border-purple-400/20 rounded-xl p-5 backdrop-blur-md hover:border-purple-300/50 transition-all cursor-pointer group"
          >
            <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
              {project.title}
            </h4>
            <p className="text-purple-200/80 text-sm mb-3">
              {project.description}
            </p>
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-purple-400/10 text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}