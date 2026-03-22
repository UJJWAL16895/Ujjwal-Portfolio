'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useCursorStore } from '@/store/cursorStore';
import dynamic from 'next/dynamic';
import { GradientButton } from '@/components/shared';
import { AnimatedIntroText } from './AnimatedIntroText';

// Dynamic import for R3F Canvas component to avoid SSR issues
const MechHeadCanvas = dynamic(
  () => import('./MechHeadCanvas').then((mod) => mod.MechHeadCanvas),
  { ssr: false, loading: () => <div className="w-full h-[600px]" /> }
);

export default function HeroSection() {
  const { setCursorState } = useCursorStore();
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isHeroInView = useInView(heroRef);

  // Scroll parallax effects for the entire hero section
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.9]);
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 w-full h-full flex items-center"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        {/* Perspective Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,240,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            perspective: '500px',
            transform: 'rotateX(60deg)',
            transformOrigin: 'bottom',
          }}
        />

        <div className="container-custom relative z-10 grid lg:grid-cols-[55%_45%] gap-8 items-center pt-24 lg:pt-0">
          {/* Left Column — Text */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
          {/* Overline */}
          <p className="font-jetbrains-mono text-xs tracking-[0.3em] uppercase text-accent-cyan">
            WELCOME TO MY UNIVERSE
          </p>

          {/* Name */}
          <div>
            <p className="font-space-grotesk text-xl md:text-2xl font-normal text-text-secondary">
              I&apos;M
            </p>
            <h1
              className="text-display"
              onMouseEnter={() => setCursorState('TEXT_CURSOR')}
              onMouseLeave={() => setCursorState('DEFAULT')}
            >
              <span className="gradient-text-animate block">
                UJJWAL
              </span>
              <span className="gradient-text-animate block" style={{ animationDelay: '1s' }}>
                KUMAR
              </span>
            </h1>
          </div>

          {/* Typed Roles */}
          <div className="h-8">
            <AnimatedIntroText />
          </div>

          {/* Intro */}
          <p className="text-body text-text-secondary max-w-lg">
            Building multiplayer worlds, training intelligent systems, and engineering scalable
            backends from Patna to the cloud.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <GradientButton href="#work" variant="primary">
              VIEW MY WORK ↓
            </GradientButton>
            <GradientButton href="/documents/Ujjwal_Kumar_CV.pdf" variant="secondary">
              DOWNLOAD CV ↗
            </GradientButton>
          </div>
        </div>

        {/* Right Column — Model/Visual */}
        <div
          className={`hidden lg:flex items-center justify-center transition-all duration-1000 delay-500 overflow-visible ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="relative w-[120%] h-[700px] flex items-center justify-center -translate-x-16">
            {/* Ambient glow background for the head */}
            <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none scale-150" />
            <MechHeadCanvas inView={isHeroInView} />
          </div>
        </div>
      </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-6 h-10 rounded-full border border-[var(--border-subtle)] flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-accent-cyan animate-bounce" />
        </div>
        <span className="font-jetbrains-mono text-[0.6rem] text-text-tertiary tracking-widest uppercase">
          SCROLL DOWN
        </span>
      </div>
    </section>
  );
}
