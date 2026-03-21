'use client';

import { SectionHeader } from '@/components/shared';
import { NeuralSkillsNetwork } from './NeuralSkillsNetwork';
import { skillCategories, keySkills } from './SkillData';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="container-custom">
        <SectionHeader number="03" title="SKILLS & ARSENAL" />

        <p className="font-inter text-text-secondary mb-4 text-lg italic">
          &ldquo;Technologies I wield to build, train, and ship.&rdquo;
        </p>

        <p className="font-jetbrains-mono text-xs text-text-tertiary mb-8 text-center uppercase tracking-widest">
          Hover nodes to explore · Nodes cluster by domain
        </p>

        {/* Neural Network Canvas */}
        <div className="relative mb-16 rounded-2xl border border-[var(--border-subtle)] overflow-hidden" style={{ background: 'rgba(10,10,20,0.4)', backdropFilter: 'blur(4px)' }}>
          <NeuralSkillsNetwork />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {skillCategories.map((cat) => {
            const hexAccent = cat.accent
              .replace('var(--accent-cyan)', '#00F0FF')
              .replace('var(--accent-purple)', '#8B5CF6')
              .replace('var(--accent-magenta)', '#FF006E')
              .replace('var(--accent-green)', '#00FF88')
              .replace('var(--accent-orange)', '#FF8C00');
            return (
              <div key={cat.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: hexAccent, boxShadow: `0 0 8px ${hexAccent}80` }}
                />
                <span className="font-jetbrains-mono text-xs text-text-secondary uppercase tracking-wider">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Key Proficiency Bars */}
        <div className="max-w-2xl mx-auto space-y-5">
          <h3 className="font-jetbrains-mono text-xs uppercase tracking-[0.2em] text-text-tertiary mb-6 text-center">
            KEY PROFICIENCIES
          </h3>
          {keySkills.map((skill, i) => (
            <ProficiencyBar key={skill.name} name={skill.name} proficiency={skill.proficiency} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';

function ProficiencyBar({ name, proficiency, delay = 0 }: { name: string; proficiency: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setWidth(proficiency), 200 + delay);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [proficiency, delay]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between">
        <span className="font-jetbrains-mono text-sm text-text-primary">{name}</span>
        <span className="font-jetbrains-mono text-sm text-accent-cyan">{width}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative">
        <div
          className="h-full rounded-full transition-all duration-[1.5s] ease-out"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
          }}
        />
        {/* Moving shimmer */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
            transform: `translateX(${width > 0 ? 100 : -100}%)`,
            transition: 'transform 1.5s ease-out',
          }}
        />
      </div>
    </div>
  );
}
