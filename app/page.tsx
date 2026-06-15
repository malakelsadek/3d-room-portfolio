'use client';

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WorksSection from '@/components/WorksSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />

      <div className="relative z-10 bg-[#5b64a8]"> 
        <AboutSection />
        <WorksSection />
        <ContactSection />
      </div>
    </main>
  );
}