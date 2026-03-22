'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { useCursorStore } from '@/store/cursorStore';
import { MagneticWrapper } from './MagneticWrapper';

interface SectionHeaderProps {
  number: string;
  title: string;
}

export function SectionHeader({ number, title }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-in');
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex items-center gap-4 mb-16 opacity-0 translate-y-4 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      <span className="text-overline text-accent-cyan">&lt; {number} &gt;</span>
      <div className="h-px w-16 bg-[var(--border-subtle)]" />
      <h2 className="text-h1 text-text-primary font-space-grotesk">{title}</h2>
    </div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accent?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function GlassCard({ children, className = '', accent, onMouseEnter, onMouseLeave }: GlassCardProps) {
  return (
    <div
      className={`glass-card p-8 transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.02] hover:-translate-y-2 ${className}`}
      style={{
        ['--card-accent' as string]: accent,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

interface TechPillProps {
  label: string;
  accent?: string;
}

export function TechPill({ label, accent = 'var(--accent-cyan)' }: TechPillProps) {
  return (
    <span
      className="inline-block px-3 py-1 rounded text-xs font-jetbrains-mono"
      style={{
        color: accent,
        backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${accent} 20%, transparent)`,
      }}
    >
      {label}
    </span>
  );
}

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  download?: boolean | string;
}

export function GradientButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  download,
}: GradientButtonProps) {
  const { setCursorState } = useCursorStore();

  const baseClasses =
    'inline-flex items-center gap-2 px-8 py-4 font-jetbrains-mono text-sm uppercase tracking-wider transition-all duration-300 rounded';
  const primaryClasses =
    'bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-magenta text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]';
  const secondaryClasses =
    'bg-transparent border border-[var(--border-hover)] text-text-primary hover:bg-[rgba(0,240,255,0.1)] hover:border-accent-cyan';

  const classes = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`;

  const handleEnter = () => setCursorState('HOVER_LINK');
  const handleLeave = () => setCursorState('DEFAULT');

  if (href) {
    return (
      <MagneticWrapper strength={0.3}>
        <a
          href={href}
          className={classes}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          download={download}
        >
          {children}
        </a>
      </MagneticWrapper>
    );
  }

  return (
    <MagneticWrapper strength={0.3}>
      <button
        onClick={onClick}
        className={classes}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </button>
    </MagneticWrapper>
  );
}

export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

export { NeuralBackground } from './NeuralBackground';
export { MagneticWrapper } from './MagneticWrapper';
export { ScrollReveal, StaggerContainer, StaggerItem, SectionDivider } from './ScrollReveal';
