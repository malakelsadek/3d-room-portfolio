'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Project = {
  title: string;
  description: string;
  tags: string[];
  repo: string;
  image?: string;
  hidden?: boolean;
};

// GitHub Pages serves this repo at /3droomportfolio/, and next/image
// requires the basePath to be added to `src` manually (it isn't inferred).
const basePath = process.env.NODE_ENV === 'production' ? '/3droomportfolio' : '';

const projects: Project[] = [
  {
    title: '3D Room Portfolio',
    description:
      'This site, an interactive 3D bedroom scene that pans and zooms as you scroll, built with Next.js, Framer Motion, and a Spline 3D scene.',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', '3D / Spline'],
    repo: 'https://github.com/malakelsadek/3droomportfolio',
    image: '/thumbnails/3d-room-portfolio.png',
  },
  {
    title: 'Bank Dashboard',
    description:
      'Built during a data science internship at Banque Misr. Ran the full pipeline from raw customer data to a bank-wide analytics dashboard, plus an AI chatbot for querying portfolio insights.',
    tags: ['Data Science', 'Python', 'Dashboard', 'Chatbot'],
    repo: 'https://github.com/malakelsadek/bank-dashboard',
    image: '/thumbnails/bank-dashboard.png',
  },
  {
    title: 'Project Two',
    description: 'A short description of what this project does and the tech used.',
    tags: ['React', 'Next.js'],
    repo: '',
    hidden: true, // empty placeholder — flip to false once there's a real project here
  },
  {
    title: 'Project Three',
    description: 'A short description of what this project does and the tech used.',
    tags: ['Data Viz', 'SQL'],
    repo: '',
    hidden: true, // empty placeholder — flip to false once there's a real project here
  },
];

const visibleProjects = projects.filter((project) => !project.hidden);

function ProjectImagePlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg border border-dashed border-purple-400/30 bg-purple-400/5 text-purple-300/50 ${className}`}
    >
      <span className="text-xs">Image coming soon</span>
    </div>
  );
}

export default function WorksContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-45% 0px' });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject]);

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
        {visibleProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
            onClick={() => setActiveProject(project)}
            className="flex gap-4 bg-purple-950/50 border border-purple-400/20 rounded-xl p-5 backdrop-blur-md hover:border-purple-300/50 transition-all cursor-pointer group"
          >
            {project.image ? (
              <Image
                src={`${basePath}${project.image}`}
                alt={`${project.title} preview`}
                width={96}
                height={96}
                className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-lg border border-purple-400/20 object-cover"
              />
            ) : (
              <ProjectImagePlaceholder className="h-20 w-20 sm:h-24 sm:w-24" />
            )}
            <div className="min-w-0 flex-1">
              <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                {project.title}
              </h4>
              <p className="text-purple-200/80 text-sm mb-3">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-purple-400/10 text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeProject && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setActiveProject(null)}
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 20 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="relative z-10 w-full max-w-md bg-purple-950/90 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-purple-900/50"
                >
                  <button
                    onClick={() => setActiveProject(null)}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 rounded-full bg-purple-950/60 p-1.5 text-purple-300 hover:text-white transition-colors text-xl leading-none cursor-pointer"
                  >
                    &times;
                  </button>

                  {activeProject.image ? (
                    <Image
                      src={`${basePath}${activeProject.image}`}
                      alt={`${activeProject.title} preview`}
                      width={800}
                      height={450}
                      className="mb-5 aspect-video w-full rounded-lg border border-purple-400/20 object-cover"
                    />
                  ) : (
                    <ProjectImagePlaceholder className="mb-5 aspect-video w-full" />
                  )}

                  <h4 className="text-2xl font-semibold text-white mb-3 pr-6">
                    {activeProject.title}
                  </h4>
                  <p className="text-purple-100/90 leading-relaxed mb-5">
                    {activeProject.description}
                  </p>
                  <div className="flex gap-2 flex-wrap mb-7">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-purple-400/10 text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {activeProject.repo && (
                    <a
                      href={activeProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-purple-400/10 hover:bg-purple-400/20 border border-purple-400/30 text-purple-100 hover:text-white rounded-full px-5 py-2.5 text-sm transition-all group"
                    >
                      View on GitHub
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </a>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.div>
  );
}
