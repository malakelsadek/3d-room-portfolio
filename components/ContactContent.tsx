'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ContactContent() {
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
      <h2 className="text-lg uppercase tracking-[0.3em] text-purple-300 mb-4">
        Contact
      </h2>
      <h3 className="text-4xl md:text-5xl font-bold mb-6">
        Let's Talk
      </h3>
      <p className="text-purple-100/90 leading-relaxed mb-8 max-w-md">
        I'm always happy to connect — whether that's an internship, a freelance
        project, or just a conversation about data, code, or your latest build.
        Send me a message and let's talk.
      </p>

      <div className="flex flex-col gap-4">
        {[
          {
            icon: '✉',
            label: 'elsadek.malak@gmail.com',
            href: 'mailto:elsadek.malak@gmail.com',
          },
          {
            icon: '→',
            label: 'GitHub',
            href: 'https://github.com/malakelsadek',
          },
          {
            icon: '→',
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/malakelsadek/',
          },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-3 text-purple-200 hover:text-white transition-colors group"
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-lg group-hover:translate-x-1 transition-transform">
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}