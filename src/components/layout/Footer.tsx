'use client';

import { useState, useEffect } from 'react';
import { useCursorStore } from '@/store/cursorStore';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const MARQUEE_TEXT =
  'GAME DEVELOPER • ML ENGINEER • BACKEND ARCHITECT • WORLD BUILDER • SYSTEM DESIGNER • CODE WARRIOR • ';

export default function Footer() {
  const { setCursorState } = useCursorStore();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-secondary border-t border-[var(--border-subtle)]">
      {/* Marquee */}
      <div className="py-8 overflow-hidden group">
        <div
          className="flex whitespace-nowrap"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        >
          <div className="animate-marquee group-hover:animate-marquee-slow flex">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="font-space-grotesk text-4xl md:text-6xl font-extrabold text-text-tertiary group-hover:text-accent-cyan transition-colors duration-500 mr-4"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container-custom py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-space-grotesk text-bg-primary"
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              }}
            >
              UK
            </div>
            <div>
              <p className="font-space-grotesk text-sm font-semibold text-text-primary">
                UJJWAL KUMAR
              </p>
              <p className="font-jetbrains-mono text-xs text-text-tertiary">
                © 2025 All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Center — Built with */}
          <p className="font-jetbrains-mono text-xs text-text-tertiary text-center">
            Built with Next.js + Three.js + GSAP
          </p>

          {/* Right — Social + Back to top */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Github className="w-4 h-4" />, href: 'https://github.com/UJJWAL16895/' },
              {
                icon: <Linkedin className="w-4 h-4" />,
                href: 'https://linkedin.com/in/ujjwalkumar16895',
              },
              {
                icon: <Mail className="w-4 h-4" />,
                href: 'mailto:ujjwalkumar16895@gmail.com',
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-accent-cyan transition-colors"
                onMouseEnter={() => setCursorState('HOVER_LINK')}
                onMouseLeave={() => setCursorState('DEFAULT')}
              >
                {item.icon}
              </a>
            ))}

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className={`ml-4 flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--border-subtle)] font-jetbrains-mono text-xs text-text-secondary hover:text-accent-cyan hover:border-accent-cyan transition-all duration-300 ${
                showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onMouseEnter={() => setCursorState('HOVER_LINK')}
              onMouseLeave={() => setCursorState('DEFAULT')}
              aria-label="Back to top"
            >
              <ArrowUp className="w-3 h-3" />
              TOP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
