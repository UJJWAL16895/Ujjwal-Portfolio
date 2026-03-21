'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  blur?: boolean;
  stagger?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  blur = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  const initialOffset = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
    none: { y: 0, x: 0 },
  }[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...initialOffset,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        x: 0,
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered container that reveals children one by one
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Child item for use inside StaggerContainer
export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Section divider with animated gradient line sweep
export function SectionDivider({ flipped = false }: { flipped?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -20px 0px' });

  return (
    <div ref={ref} className="relative w-full flex items-center justify-center py-8 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          originX: flipped ? 1 : 0,
          background: flipped
            ? 'linear-gradient(to left, var(--accent-cyan), var(--accent-purple), transparent)'
            : 'linear-gradient(to right, var(--accent-cyan), var(--accent-purple), transparent)',
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.6, ease: 'backOut' }}
        className="relative z-10 w-2 h-2 rounded-full bg-accent-cyan"
        style={{ boxShadow: '0 0 12px var(--accent-cyan)' }}
      />
    </div>
  );
}
