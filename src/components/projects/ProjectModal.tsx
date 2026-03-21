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
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-12 overflow-y-auto overflow-x-hidden bg-bg-primary/90 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            onMouseEnter={() => setCursorState('HOVER_LINK')}
            onMouseLeave={() => setCursorState('DEFAULT')}
            className="fixed top-8 right-8 z-[10001] w-12 h-12 rounded-full bg-bg-secondary border border-[var(--border-subtle)] flex items-center justify-center text-text-primary hover:border-accent-cyan hover:text-accent-cyan transition-colors"
          >
            ✕
          </button>

          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl bg-bg-secondary border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
          >
            {/* Modal Header / Media Area */}
            <div className="relative w-full aspect-video bg-bg-tertiary flex items-center justify-center border-b border-[var(--border-subtle)] overflow-hidden">
               {/* Grid background */}
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Animated Gradient overlay */}
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
                  className="relative z-10 font-space-grotesk text-3xl md:text-5xl font-bold text-text-primary/20 tracking-widest text-center"
                >
                  {project.title.toUpperCase()}
                  <br/>
                  <span className="text-sm font-jetbrains-mono tracking-normal block mt-4 text-text-tertiary">LIVE PREVIEW SIMULATION</span>
                </motion.div>
            </div>

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                <div>
                  <h2 className="text-h2 font-space-grotesk text-text-primary mb-2">
                    {project.title}
                  </h2>
                  <p className="text-lg text-text-secondary">{project.subtitle}</p>
                </div>
                <div className="flex gap-4">
                   {project.github && (
                    <GradientButton href={project.github} variant="secondary">
                       GitHub ↗
                    </GradientButton>
                   )}
                   {project.live && (
                     <GradientButton href={project.live} variant="primary">
                       Live Demo ↗
                     </GradientButton>
                   )}
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-10">
                <p className="text-text-secondary leading-relaxed text-lg">
                  {project.description || 'Detailed case study coming soon. This project focuses on high-performance architecture, immersive user experiences, and scalable solutions.'}
                </p>
                {/* Simulated deep dive content */}
                <h3 className="text-xl font-space-grotesk text-text-primary mt-8 mb-4">Technical Approach</h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  The architecture was designed from the ground up to handle high concurrency while maintaining sub-50ms response times. By leveraging cutting-edge frameworks and optimizing the critical rendering path, we achieved a perfect 100 Lighthouse score.
                </p>
                
                <h3 className="text-xl font-space-grotesk text-text-primary mt-8 mb-4">Core Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map(t => (
                    <TechPill key={t} label={t} accent={project.accent} />
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
