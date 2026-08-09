'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import HeroContent from './HeroContent';
import AboutContent from './AboutContent';
import WorksContent from './WorksContent';
import ContactContent from './ContactContent';

// Spline pulls in a large WebGL/WASM runtime — load it only on the client,
// after the rest of the page has hydrated, instead of blocking the initial bundle.
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
});

const SCENE_URL = 'https://prod.spline.design/vEfWrRD-zL3z9TdR/scene.splinecode';

// Below the `sm` breakpoint (640px) the room is framed differently — see
// isMobile logic below.
const MOBILE_BREAKPOINT = '(max-width: 639px)';

export default function ScrollingPortfolio() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sceneLoaded, setSceneLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Desktop viewing is untouched by this — it only swaps which keyframe
    // array feeds the camera transforms below.
    useEffect(() => {
        const mq = window.matchMedia(MOBILE_BREAKPOINT);
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    // Inertial smooth scrolling for the whole page — Lenis wraps native
    // scroll (not a virtual/transform scroller), so Framer Motion's
    // window-based useScroll below picks up the smoothed position for free.
    useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let rafId: number;
    function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
    };
    }, [prefersReducedMotion]);

    const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
    });

    // Lenis already lerps the raw scroll position, so this spring only needs
    // to take the edge off — a heavy spring on top of Lenis's own smoothing
    // would double the lag and make the camera feel like it's swimming.
    const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 200,
    damping: prefersReducedMotion ? 100 : 30,
    mass: 0.5,
    restDelta: 0.001,
    });

  // --- CAMERA KEYFRAMES ---
  // Section heights: Hero 100vh, About 120vh, Works 200vh, Contact 100vh = 520vh total.
  // [0-13.5%] Hero: full room, no zoom — a longer dead-zone up top so scrolling
  //            in doesn't immediately yank the camera
  // [13.5-23%] transition into About
  // [23-36.5%] About: hold on the piano (LEFT side of room)
  // [36.5-46%] transition into Works
  // [46-77%] Works: hold on the computer desk (RIGHT side of room) — a long
  //           hold so the Works section has real room to breathe
  // [77-83%] Contact: fast pan/zoom to the mailpost, framed toward the top
  // [83-100%] Hold on the mailpost — no zoom back out to the full room

    const CAMERA_INPUT = [0, 0.135, 0.231, 0.365, 0.462, 0.769, 0.827, 1];
    const SCALE_DESKTOP = [1.2, 1.2, 2, 2, 2, 2, 2.2, 2.2];
    const X_DESKTOP = ['0%', '0%', '35%', '35%', '-35%', '-35%', '15%', '15%'];
    const Y_DESKTOP = ['0%', '0%', '-5%', '-5%', '-3%', '-3%', '-55%', '-55%'];

    // The Spline scene's camera is composed for a wide desktop aspect ratio;
    // on a narrow portrait viewport its native framing already crops the
    // sides. Scaling below 100% reveals more of the room but leaves visible
    // dead space (the page background) where the canvas no longer reaches —
    // that trade-off isn't fixable from CSS, only from the camera itself
    // inside Spline's own editor. So mobile stays at/near the scene's native
    // 100% fill (no dead space) and only zooms in modestly for each hold,
    // instead of the desktop's much heavier 1.2–2.2 zoom range.
    // A pan offset needs zoom headroom to cover — panning by f% of the
    // viewport without exposing the background edge roughly needs
    // scale >= 1 + 2f. 1.15 wasn't enough for an 18% pan, which is why the
    // background peeked through on the left (About) and right (Works)
    // edges for the entire hold, not just the transition.
    const SCALE_MOBILE = [1, 1, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4];
    const X_MOBILE = ['0%', '0%', '12%', '12%', '-12%', '-12%', '8%', '8%'];
    const Y_MOBILE = ['0%', '0%', '-3%', '-3%', '-2%', '-2%', '-20%', '-20%'];

    const scale = useTransform(
    smoothProgress,
    CAMERA_INPUT,
    isMobile ? SCALE_MOBILE : SCALE_DESKTOP
    );

    const x = useTransform(
    smoothProgress,
    CAMERA_INPUT,
    isMobile ? X_MOBILE : X_DESKTOP
    );

    const y = useTransform(
    smoothProgress,
    CAMERA_INPUT,
    isMobile ? Y_MOBILE : Y_DESKTOP
    );

    const brightness = useTransform(
    smoothProgress,
    [0, 0.231, 0.365, 0.462, 0.827, 1],
    [1, 1, 0.9, 0.9, 0.95, 0.95]
    );
    const filter = useTransform(brightness, (v) => `brightness(${v})`);

    return (
    <div ref={containerRef} className="relative bg-[#1a1035]">
      {/* FIXED 3D ROOM — Background Layer */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-auto">
        <motion.div
            style={{ scale, x, y, filter }}
            className="w-full h-full origin-center will-change-transform"
        >
            <motion.div
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: sceneLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <Spline
                    scene={SCENE_URL}
                    className="w-full h-full"
                    onLoad={() => setSceneLoaded(true)}
                />
            </motion.div>
        </motion.div>

        {/* Subtle pulse while the 3D room is still streaming in */}
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: sceneLoaded ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.div
                className="w-3 h-3 rounded-full bg-purple-300/60"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(26,16,53,0.4) 100%)' }} />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="relative z-10 pointer-events-none">
        
            {/* HERO */}
            <section className="h-dvh relative pointer-events-none">
                <HeroContent />
            </section>

            {/* ABOUT — Text pinned to FAR LEFT like Hero's "Welcome" */}
            <section className="h-[120dvh] relative pointer-events-none">
            {/* Remove the max-w-7xl container — use absolute positioning instead */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-4 right-4 sm:left-8 sm:right-auto md:left-20 -translate-y-1/2 pointer-events-auto">
                        <AboutContent />
                    </div>
                </div>
            </section>

            {/* WORKS — Text FAR RIGHT. Extra-tall section (200vh vs. the usual
                120vh) so there's real breathing room before and after the
                camera settles on the desk, instead of rushing straight through. */}
            <section className="h-[200dvh] relative pointer-events-none">
                <div className="absolute top-1/3 left-4 right-4 sm:left-auto sm:right-8 md:right-20 -translate-y-1/2 pointer-events-auto">
                    <WorksContent />
                </div>
            </section>

            {/* CONTACT — Text FAR LEFT, anchored to the bottom of the viewport
                so it lands at the bottom-left of the page once you've scrolled
                all the way down, instead of sitting vertically centered. Kept to
                viewport height (not 120vh like the other sections) so the page's
                scroll range ends right as the camera settles on the mailpost,
                instead of leaving dead space to scroll through. */}
            <section className="h-dvh relative pointer-events-none">
                <div className="absolute bottom-4 sm:bottom-14 md:bottom-20 left-4 sm:left-8 md:left-20 right-4 sm:right-auto pointer-events-auto">
                    <ContactContent />
                </div>
            </section>
        </div>
    </div>
    );
}