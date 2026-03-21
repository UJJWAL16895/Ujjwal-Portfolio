'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHeader, GlassCard, TechPill } from '@/components/shared';

function StatsCounter({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = Date.now();

          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-space-grotesk text-4xl font-bold text-accent-cyan">
        {count}+
      </div>
      <div className="font-jetbrains-mono text-xs text-text-tertiary uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}

const DO_CARDS = [
  {
    icon: '🎮',
    title: 'Game Development',
    description:
      'Multiplayer worlds with real physics, cross-platform combat arenas, and addictive arcade mechanics built in Unity.',
    tech: ['Unity', 'C#', 'Blender', 'Multiplayer'],
    accent: 'var(--accent-cyan)',
  },
  {
    icon: '🧠',
    title: 'Machine Learning & NLP',
    description:
      'From route optimization with K-Means to multilingual sentiment analysis across 22 Indian languages using Transformers.',
    tech: ['Python', 'Scikit-Learn', 'Hugging Face', 'Pandas'],
    accent: 'var(--accent-purple)',
  },
  {
    icon: '⚙️',
    title: 'Backend Engineering',
    description:
      'Scalable REST APIs, role-based auth, real-time databases, and performance-optimized architectures for ed-tech platforms.',
    tech: ['Node.js', 'PostgreSQL', 'Firebase', 'JWT'],
    accent: 'var(--accent-green)',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative">
      <div className="container-custom">
        <SectionHeader number="01" title="ABOUT ME" />

        <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start mb-20">
          {/* Photo */}
          <div
            className={`relative group transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-32'
            }`}
          >
            {/* Stylized placeholder for portrait */}
            <div className="relative w-full aspect-[4/5] bg-bg-tertiary border-2 border-[var(--border-subtle)] overflow-hidden">
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-accent-cyan opacity-50" />
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-accent-cyan opacity-50" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-accent-cyan opacity-50" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-accent-cyan opacity-50" />

              {/* Avatar placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--gradient-card)' }}
                >
                  <span className="font-space-grotesk text-6xl font-bold gradient-text">UK</span>
                </div>
              </div>

              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent" />

              {/* Glitch effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen">
                <div className="absolute inset-0 bg-accent-cyan/5 translate-x-0.5" />
                <div className="absolute inset-0 bg-accent-magenta/5 -translate-x-0.5" />
              </div>
            </div>
            <p className="font-jetbrains-mono text-xs text-text-tertiary mt-3 text-center">
              UJJWAL KUMAR — PATNA, BIHAR
            </p>
          </div>

          {/* Bio */}
          <div
            className={`space-y-6 transition-all duration-1000 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'
            }`}
          >
            <p className="text-body-lg text-text-primary leading-relaxed">
              I&apos;m <span className="text-accent-cyan font-semibold">Ujjwal Kumar</span>, a
              B.Tech Computer Science student at{' '}
              <span className="text-accent-purple font-semibold">Lovely Professional University</span>{' '}
              with a passion that spans three powerful domains. I build immersive multiplayer games
              in Unity where physics feels real and competition is fierce. I train machine learning
              models that optimize real-world systems — from waste collection routes to financial
              sentiment analysis across 22 Indian languages. And I engineer robust backend systems
              that power educational platforms serving hundreds of students.
            </p>

            <p className="text-body text-text-secondary">
              Currently, I&apos;m working as a{' '}
              <span className="text-accent-green font-semibold">Software Engineer Intern</span> at
              Eduniketan, where I&apos;m building &apos;TheEducode&apos; — a comprehensive learning
              platform with secure exams, interactive coding challenges, and a complete C
              programming curriculum.
            </p>

            <p className="text-body text-text-secondary">
              When I&apos;m not coding, I&apos;m probably designing game mechanics, exploring NLP
              papers, or architecting database schemas for my ed-tech startup.
            </p>

            {/* Stats */}
            <div className="flex gap-12 pt-6">
              <StatsCounter value={4} label="PROJECTS SHIPPED" />
              <StatsCounter value={3} label="DOMAINS MASTERED" />
              <StatsCounter value={1} label="STARTUP BUILDING" />
            </div>
          </div>
        </div>

        {/* What I Do Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {DO_CARDS.map((card, i) => (
            <GlassCard
              key={card.title}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              }`}
              accent={card.accent}
            >
              <div
                className="text-4xl mb-4 transition-transform duration-300 hover:scale-110"
                style={{ filter: `drop-shadow(0 0 10px ${card.accent})` }}
              >
                {card.icon}
              </div>
              <h3 className="font-space-grotesk text-xl font-semibold text-text-primary mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">{card.description}</p>
              <div className="flex flex-wrap gap-2">
                {card.tech.map((t) => (
                  <TechPill key={t} label={t} accent={card.accent} />
                ))}
              </div>

              <style jsx>{`
                div:hover {
                  transition-delay: ${i * 0.2}s;
                }
              `}</style>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
