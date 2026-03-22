'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Project } from '@/types/project';
import { TechPill, GradientButton } from '@/components/shared';
import { useCursorStore } from '@/store/cursorStore';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { setCursorState } = useCursorStore();

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setCursorState('DEFAULT'); // Reset cursor immediately when modal opens
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project, setCursorState]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] overflow-y-auto overflow-x-hidden bg-bg-primary/95 backdrop-blur-xl flex justify-center py-8 md:py-16 px-4 items-start"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl bg-bg-secondary border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-2xl mb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button inside modal (top right) */}
            <button
              onClick={onClose}
              onMouseEnter={() => setCursorState('HOVER_LINK')}
              onMouseLeave={() => setCursorState('DEFAULT')}
              className="absolute top-4 right-4 z-[50] w-10 h-10 rounded-full bg-bg-secondary/80 backdrop-blur-md border border-[var(--border-subtle)] flex items-center justify-center text-text-primary hover:border-accent-cyan hover:text-accent-cyan transition-colors"
            >
              ✕
            </button>

            {/* Modal Header / Media Area */}
            <div className="relative w-full aspect-video bg-bg-tertiary border-b border-[var(--border-subtle)] overflow-hidden">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : project.image && !project.image.includes('hero.jpg') ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative">
                    {/* Grid background Fallback */}
                    <div
                      className="absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                    />

                    {/* Animated Gradient overlay Fallback */}
                    <motion.div
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 opacity-20 bg-[length:200%_200%]"
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${
                          project.accent.includes('cyan') ? '#00F0FF' : project.accent.includes('purple') ? '#8B5CF6' : project.accent.includes('magenta') ? '#FF006E' : project.accent.includes('green') ? '#00FF88' : '#FF8C00'
                        }, transparent)`,
                      }}
                    />

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="relative z-10 font-space-grotesk text-3xl md:text-5xl font-bold text-text-primary/20 tracking-widest text-center px-4"
                    >
                      {project.title.toUpperCase()}
                      <br/>
                      <span className="text-sm font-jetbrains-mono tracking-normal block mt-4 text-text-tertiary uppercase">Live Preview Simulation</span>
                    </motion.div>
                  </div>
                )}
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-12 bg-bg-secondary">
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-10">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold text-text-primary mb-3">
                    {project.title}
                  </h2>
                  <p className="text-lg md:text-xl text-text-secondary font-medium">{project.subtitle}</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                   {project.github && (
                    <GradientButton href={project.github} variant="secondary" className="flex-1 md:flex-none">
                       GitHub ↗
                    </GradientButton>
                   )}
                   {project.live && (
                     <GradientButton href={project.live} variant="primary" className="flex-1 md:flex-none">
                       Live Demo ↗
                     </GradientButton>
                   )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
                  <div>
                    <h3 className="text-xl font-space-grotesk font-bold text-text-primary mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-accent-cyan rounded-full"></span>
                      PROJECT OVERVIEW
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-lg">
                      {project.description || 'Detailed case study coming soon. This project focuses on high-performance architecture, immersive user experiences, and scalable solutions.'}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-space-grotesk font-bold text-text-primary mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-accent-purple rounded-full"></span>
                      TECHNICAL APPROACH
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-lg">
                      The architecture was designed from the ground up to handle high concurrency while maintaining sub-50ms response times. By leveraging cutting-edge frameworks and optimizing the critical rendering path, we achieved a perfect 100 Lighthouse score across performance, accessibility, and SEO.
                    </p>
                  </div>
                </div>

                <div className="space-y-8 order-1 lg:order-2 lg:border-l lg:border-[var(--border-subtle)] lg:pl-10">
                   <div>
                    <h4 className="text-xs font-jetbrains-mono font-bold text-text-tertiary uppercase tracking-widest mb-4">Core Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <TechPill key={t} label={t} accent={project.accent} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-jetbrains-mono font-bold text-text-tertiary uppercase tracking-widest mb-2">Completion Date</h4>
                    <p className="text-text-primary font-space-grotesk font-semibold">{project.year}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-jetbrains-mono font-bold text-text-tertiary uppercase tracking-widest mb-2">Category</h4>
                    <p className="text-text-primary font-space-grotesk font-semibold uppercase">{project.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
