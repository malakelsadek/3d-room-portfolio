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
      <h2 className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-4">
        03 — Contact
      </h2>
      <h3 className="text-4xl md:text-5xl font-bold mb-6">
        Let's Talk
      </h3>
      <p className="text-purple-100/90 leading-relaxed mb-8 max-w-md">
        [Your invitation message — keep it warm and open. Mention what kind of 
        opportunities you're looking for.]
      </p>

      <div className="flex flex-col gap-4">
        {[
          { icon: '✉', label: 'your@email.com', href: 'mailto:your@email.com' },
          { icon: '→', label: 'GitHub', href: '#' },
          { icon: '→', label: 'LinkedIn', href: '#' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
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