'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { SectionHeader, TechPill } from '@/components/shared';
import type { TimelineItem } from '@/types/timeline';
import dynamic from 'next/dynamic';

const ExperienceDNACanvas = dynamic(
  () => import('./ExperienceDNACanvas').then((mod) => mod.ExperienceDNACanvas),
  { ssr: false, loading: () => <div className="hidden lg:block w-64 h-[800px]" /> }
);

const timelineData: TimelineItem[] = [
  {
    id: 'eduniketan',
    year: '2025',
    title: 'Software Engineer Intern',
    organization: 'Eduniketan Pvt Ltd.',
    description:
      'Building TheEducode — a full-stack educational platform with role-based auth, secure exam environments, interactive coding challenges, and real-time analytics dashboards.',
    tech: ['Node.js', 'React', 'Python', 'Supabase', 'Firebase'],
    accent: 'var(--accent-green)',
    type: 'work',
  },
  {
    id: 'nptel',
    year: '2025',
    title: 'Cloud Computing Certification',
    organization: 'NPTEL',
    description: 'Completed cloud computing certification covering distributed systems, virtualization, and cloud architectures.',
    accent: 'var(--accent-purple)',
    type: 'certification',
  },
  {
    id: 'dsa',
    year: '2025',
    title: 'Advanced DSA Training',
    organization: 'Programming Pathshala',
    description: 'Intensive training in advanced data structures and algorithms, competitive programming techniques.',
    accent: 'var(--accent-purple)',
    type: 'certification',
  },
  {
    id: 'lpu',
    year: '2023 — Present',
    title: 'B.Tech Computer Science & Engineering',
    organization: 'Lovely Professional University',
    description: 'Pursuing B.Tech CSE with CGPA: 7.57. Focused on game development, machine learning, and backend engineering.',
    accent: 'var(--accent-cyan)',
    type: 'education',
  },
  {
    id: '12th',
    year: '2021 — 2023',
    title: '12th Grade (Intermediate)',
    organization: 'Lal Bahadur Shastri Sr. Sec. School',
    description: 'Completed intermediate education with 71% marks.',
    accent: 'var(--accent-orange)',
    type: 'education',
  },
  {
    id: '10th',
    year: '2020 — 2021',
    title: '10th Grade (Matriculation)',
    organization: 'Christ Church Diocesan School',
    description: 'Completed matriculation with 72.56% marks.',
    accent: 'var(--accent-orange)',
    type: 'education',
  },
];

const ACCENT_HEX: Record<string, string> = {
  'var(--accent-green)': '#00FF88',
  'var(--accent-cyan)': '#00F0FF',
  'var(--accent-purple)': '#8B5CF6',
  'var(--accent-orange)': '#FF8C00',
  'var(--accent-magenta)': '#FF006E',
};

const TYPE_ICONS: Record<string, string> = {
  work: '⚡',
  education: '🎓',
  certification: '🏆',
};

// Removed static DNAHelix component
// ─── Timeline Card ────────────────────────────────────────────────────────────
function TimelineCard({ item, index, side }: { item: TimelineItem; index: number; side: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hex = ACCENT_HEX[item.accent] || '#00F0FF';

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${side === 'left' ? '-translate-x-16' : 'translate-x-16'}`}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Node dot (left side for medium+) */}
      <div
        className="absolute left-[-37px] top-6 w-4 h-4 rounded-full border-2 z-10 hidden md:block"
        style={{
          borderColor: hex,
          background: '#050505',
          boxShadow: `0 0 10px ${hex}80`,
        }}
      />

      {/* Card */}
      <div
        className="glass-card p-6 relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]"
        style={{ borderColor: `${hex}25` }}
      >
        {/* Accent left bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: `linear-gradient(to bottom, ${hex}, transparent)` }}
        />

        {/* Top glow on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to right, transparent, ${hex}, transparent)` }}
        />

        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 mt-1"
            style={{ background: `${hex}15`, border: `1px solid ${hex}30` }}
          >
            {TYPE_ICONS[item.type] ?? '◉'}
          </div>
          <div className="flex-1 min-w-0">
            <span
              className="inline-block font-jetbrains-mono text-[11px] px-2 py-0.5 rounded-full mb-2"
              style={{ color: hex, background: `${hex}15`, border: `1px solid ${hex}30` }}
            >
              {item.year}
            </span>
            <h3 className="font-space-grotesk text-lg font-semibold text-text-primary leading-tight">
              {item.title}
            </h3>
            <p className="text-sm text-text-secondary mt-0.5">{item.organization}</p>
            <p className="text-sm text-text-secondary leading-relaxed mt-2">{item.description}</p>
            {item.tech && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tech.map((t) => (
                  <TechPill key={t} label={t} accent={item.accent} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: "200px" });
  const [hasRenderedDNA, setHasRenderedDNA] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (isSectionInView && !hasRenderedDNA) {
      setHasRenderedDNA(true);
    }
  }, [isSectionInView, hasRenderedDNA]);

  useEffect(() => {
    const handleScroll = () => {
      const el = lineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      if (rect.top < wh && rect.bottom > 0) {
        const progress = Math.min(1, Math.max(0, (wh - rect.top) / (rect.height + wh * 0.5)));
        setLineHeight(progress * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative">
      <div className="container-custom">
        <SectionHeader number="04" title="EXPERIENCE" />

        <p className="font-inter text-text-secondary mb-12 text-lg italic text-center">
          &ldquo;Evolution of my journey — encoded in life&apos;s double helix.&rdquo;
        </p>

        {/* Layout: DNA helix on left, timeline on right */}
        <div className="flex gap-8 max-w-4xl mx-auto" ref={lineRef}>

          {/* ── DNA Helix (3D Model, left) ── */}
          <div className="hidden lg:block w-[400px] flex-shrink-0 relative -ml-16">
            {hasRenderedDNA && <ExperienceDNACanvas inView={isSectionInView} />}
          </div>

          {/* ── Timeline ── */}
          <div className="flex-1 relative">
            {/* Vertical glowing line */}
            <div className="absolute left-0 top-0 bottom-0 w-px ml-[-2px] hidden md:block">
              <div className="absolute inset-0 bg-[var(--bg-tertiary)]" />
              <div
                className="absolute top-0 w-full transition-all duration-200"
                style={{
                  height: `${lineHeight}%`,
                  background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-purple), var(--accent-magenta))',
                  boxShadow: '0 0 8px var(--accent-cyan)',
                }}
              />
            </div>

            {/* Cards */}
            <div className="space-y-6 pl-6 md:pl-8">
              {timelineData.map((item, i) => (
                <TimelineCard key={item.id} item={item} index={i} side="right" />
              ))}
            </div>

            {/* Bottom arrow */}
            <div className="flex justify-start pl-6 md:pl-8 mt-6">
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-accent-purple opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
