'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export default function ContactContent() {
  const ref = useRef(null);
  // Unlike About/Works, this content is anchored to the bottom of the
  // viewport rather than the vertical center, so it can never satisfy a
  // center-crossing margin — trigger on visible-amount instead.
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -80 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      className="text-white bg-purple-950/50 backdrop-blur-md rounded-2xl px-5 py-3 -mx-5 sm:mx-0 sm:bg-transparent sm:backdrop-blur-none sm:rounded-none sm:px-0 sm:py-0"
    >
      <h2 className="hidden sm:block text-lg uppercase tracking-[0.3em] text-purple-300 mb-4">
        Contact
      </h2>
      <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-6">
        Let's Talk
      </h3>
      <p className="text-purple-100/90 leading-relaxed text-sm sm:text-base mb-3 sm:mb-8 max-w-md">
        Eager to connect?
        Send me a message and let's talk.
      </p>

      <div className="flex flex-col gap-1.5 sm:gap-4">
        {[
          {
            icon: <span className="text-base sm:text-lg">✉</span>,
            label: 'elsadek.malak@gmail.com',
            href: 'mailto:elsadek.malak@gmail.com',
          },
          {
            icon: <GitHubIcon />,
            label: 'GitHub',
            href: 'https://github.com/malakelsadek',
          },
          {
            icon: <LinkedInIcon />,
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
            <span className="flex w-5 justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5">{link.icon}</span>
            <span className="text-sm sm:text-lg group-hover:translate-x-1 transition-transform">
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}