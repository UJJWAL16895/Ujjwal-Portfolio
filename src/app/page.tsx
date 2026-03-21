'use client';

import dynamic from 'next/dynamic';
import { NoiseOverlay } from '@/components/shared';

const CustomCursor = dynamic(() => import('@/components/cursor/CustomCursor'), { ssr: false });
const Preloader = dynamic(() => import('@/components/preloader/Preloader'), { ssr: false });
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const NeuralBackground = dynamic(() => import('@/components/shared').then(mod => mod.NeuralBackground), { ssr: false });
const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/about/AboutSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/projects/ProjectsSection'), { ssr: false });
const SkillsSection = dynamic(() => import('@/components/skills/SkillsSection'), { ssr: false });
const ExperienceSection = dynamic(() => import('@/components/experience/ExperienceSection'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });

export default function Portfolio() {
  return (
    <>
      {/* Deep Space Static Background */}
      <div 
        className="fixed inset-0 z-[-10] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{ backgroundImage: "url('/bg-blackhole.png')", backgroundPosition: 'center 30%' }}
      />
      {/* Base void color so the image blends well */}
      <div className="fixed inset-0 z-[-20] bg-[#050505]" />

      <Preloader />
      <CustomCursor />
      <NoiseOverlay />
      <NeuralBackground />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
