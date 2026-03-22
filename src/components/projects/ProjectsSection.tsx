'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHeader, TechPill } from '@/components/shared';
import { useCursorStore } from '@/store/cursorStore';
import { projects } from '@/components/projects/ProjectData';
import type { Project } from '@/types/project';
import Tilt from 'react-parallax-tilt';

function ProjectPlaceholder({ project }: { project: Project }) {
  const patternMap: Record<string, string> = {
    'sumo-cars': 'M20,80 Q50,20 80,80 T140,80',
    'driving-simulator': 'M10,60 L50,60 L90,30 L130,60 L170,60',
    'finvani': 'M50,30 L80,60 M80,30 L50,60 M90,45 L120,45',
    'theeducode': 'M40,30 L40,70 M70,30 L70,70 M30,35 L50,35 M60,65 L80,65',
    'endless-runner': 'M40,70 L40,30 L50,25 L60,30 L60,70',
    'speed-flappy': 'M30,20 L30,80 M60,30 L60,70 M90,20 L90,80',
    'route-optimization': 'M20,50 L60,30 L100,60 L140,40',
  };

  return (
    <div className="relative w-full h-full bg-bg-tertiary overflow-hidden flex items-center justify-center">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${project.accent.includes('cyan') ? 'rgba(0,240,255,0.3)' : project.accent.includes('purple') ? 'rgba(139,92,246,0.3)' : project.accent.includes('magenta') ? 'rgba(255,0,110,0.3)' : project.accent.includes('green') ? 'rgba(0,255,136,0.3)' : 'rgba(255,140,0,0.3)'} 0%, transparent 60%)`,
        }}
      />

      {/* SVG pattern */}
      <svg className="w-40 h-20 opacity-20" viewBox="0 0 160 100">
        <path
          d={patternMap[project.id] || 'M20,50 L80,20 L140,50 L80,80 Z'}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-text-primary"
        />
      </svg>

      {/* Project title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-space-grotesk text-2xl md:text-3xl font-bold text-text-primary/20">
          {project.title.toUpperCase()}
        </span>
      </div>

      {/* Bottom caption */}
      <span className="absolute bottom-3 right-3 font-jetbrains-mono text-[0.6rem] text-text-tertiary opacity-50">
        SCREENSHOT COMING SOON
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { setCursorState } = useCursorStore();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isFullWidth = project.featured;

  const handleMouseEnter = () => {
    setCursorState('HOVER_PROJECT');
    if (videoRef.current && project.video) {
      videoRef.current.play().catch((e) => console.log('Video auto-play failed', e));
    }
  };

  const handleMouseLeave = () => {
    setCursorState('DEFAULT');
    if (videoRef.current && project.video) {
      videoRef.current.pause();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={ref}
      className={`${isFullWidth ? 'col-span-1 md:col-span-2' : 'col-span-1'} transition-all duration-1000 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={false}
        transitionSpeed={1500}
        scale={1.02}
        className="h-full"
      >
        <div
          className="group relative h-full bg-bg-tertiary border border-[var(--border-subtle)] rounded-xl overflow-hidden transition-all duration-300"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {/* Interactive Glow Border Layer */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), color-mix(in srgb, ${project.accent} 20%, transparent), transparent 40%)`
            }}
          />

          {/* Glow Border Outline */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20 rounded-xl"
            style={{
              boxShadow: `inset 0 0 20px -5px color-mix(in srgb, ${project.accent} 50%, transparent), 0 0 20px -5px color-mix(in srgb, ${project.accent} 50%, transparent)`,
              border: `1px solid color-mix(in srgb, ${project.accent} 50%, transparent)`
            }}
          />

        {/* Image area */}
        <div
          className={`relative overflow-hidden bg-bg-tertiary w-full aspect-[16/10] max-h-[220px] md:max-h-[500px] border-b border-[var(--border-subtle)]`}
        >
          <div className="w-full h-full transition-transform duration-700 group-hover:scale-100 relative">
            {project.image && !project.image.includes('hero.jpg') ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  project.video ? 'group-hover:opacity-0' : ''
                }`}
              />
            ) : (
              <div className={`w-full h-full transition-opacity duration-500 ${
                project.video ? 'group-hover:opacity-0' : ''
              }`}>
                <ProjectPlaceholder project={project} />
              </div>
            )}

            {project.video && (
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
          </div>

          {/* Scanline on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none scanline-overlay z-10" />
        </div>

        {/* Info */}
        <div className="p-5 relative z-30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-jetbrains-mono text-[10px] text-text-tertiary uppercase tracking-wider">
              {project.type || 'PROJECT'} • {project.number}
            </span>
            <span className="font-jetbrains-mono text-[10px] text-text-tertiary">{project.year}</span>
          </div>

          <h3
            className={`font-space-grotesk font-bold text-text-primary mb-1 ${
              isFullWidth ? 'text-xl md:text-2xl' : 'text-lg'
            }`}
          >
            {project.title}
          </h3>

          <p className="text-xs text-text-secondary font-medium mb-2">{project.subtitle}</p>

          {project.description && (
            <p className="text-xs text-text-secondary/80 line-clamp-2 leading-relaxed mb-4">
              {project.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <TechPill key={t} label={t} accent={project.accent} />
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] text-text-tertiary self-center ml-1">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-3 border-t border-[var(--border-subtle)] relative z-20">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jetbrains-mono text-xs text-text-secondary hover:text-accent-cyan transition-colors"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setCursorState('HOVER_LINK')}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setCursorState('HOVER_PROJECT');
                }}
              >
                GITHUB ↗
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jetbrains-mono text-xs text-text-secondary hover:text-accent-cyan transition-colors"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setCursorState('HOVER_LINK')}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setCursorState('HOVER_PROJECT');
                }}
              >
                LIVE DEMO ↗
              </a>
            )}
          </div>
        </div>
        </div>
      </Tilt>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="work" className="py-32 relative">
      <div className="container-custom">
        <SectionHeader number="02" title="SELECTED WORK" />

        <p className="font-inter text-text-secondary mb-12 text-lg italic">
          &ldquo;Each project is a universe of its own.&rdquo;
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
