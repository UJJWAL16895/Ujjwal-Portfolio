'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHeader, GradientButton } from '@/components/shared';
import { useCursorStore } from '@/store/cursorStore';
import { Github, Linkedin, Mail, FileDown, MapPin, Phone } from 'lucide-react';

function MagneticButton({
  children,
  href,
  label,
  download,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  download?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { setCursorState } = useCursorStore();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 80) {
        el.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
      } else {
        el.style.transform = 'translate(0, 0)';
      }
    };

    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      setTimeout(() => {
        el.style.transition = 'transform 0.15s ease-out';
      }, 500);
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={download}
      className="flex flex-col items-center gap-2 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] transition-all duration-300 hover:bg-gradient-to-br hover:from-accent-cyan/10 hover:to-accent-purple/10 hover:border-[var(--border-hover)] group"
      style={{ transition: 'transform 0.15s ease-out' }}
      onMouseEnter={() => setCursorState('HOVER_LINK')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      <div className="text-text-secondary group-hover:text-accent-cyan transition-colors">
        {children}
      </div>
      <span className="font-jetbrains-mono text-xs text-text-tertiary group-hover:text-text-primary transition-colors">
        {label}
      </span>
    </a>
  );
}

function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('ujjwalkumar16895@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 glass-card p-8 relative">
      {/* Toast */}
      <div
        className={`absolute top-4 right-4 font-jetbrains-mono text-xs px-3 py-1.5 rounded bg-accent-green/20 text-accent-green border border-accent-green/30 transition-all duration-300 ${
          copied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        Email copied! 📋
      </div>

      <div
        className="flex items-center gap-4 group cursor-pointer"
        onClick={copyEmail}
      >
        <Mail className="w-5 h-5 text-accent-cyan" />
        <div>
          <p className="font-jetbrains-mono text-xs text-text-tertiary uppercase">EMAIL</p>
          <p className="font-inter text-sm text-text-primary group-hover:text-accent-cyan transition-colors">
            ujjwalkumar16895@gmail.com
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Phone className="w-5 h-5 text-accent-purple" />
        <div>
          <p className="font-jetbrains-mono text-xs text-text-tertiary uppercase">PHONE</p>
          <p className="font-inter text-sm text-text-primary">+91 6203140535</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MapPin className="w-5 h-5 text-accent-magenta" />
        <div>
          <p className="font-jetbrains-mono text-xs text-text-tertiary uppercase">LOCATION</p>
          <p className="font-inter text-sm text-text-primary">Patna, Bihar, India</p>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const { setCursorState } = useCursorStore();

  return (
    <form className="space-y-8 glass-card p-8" onSubmit={(e) => e.preventDefault()}>
      {['YOUR NAME', 'YOUR EMAIL'].map((label) => (
        <div key={label} className="relative">
          <input
            type={label.includes('EMAIL') ? 'email' : 'text'}
            placeholder={label}
            className="w-full bg-transparent border-b-2 border-[var(--border-subtle)] py-3 font-inter text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-cyan transition-colors"
            onFocus={() => setCursorState('TEXT_CURSOR')}
            onBlur={() => setCursorState('DEFAULT')}
          />
        </div>
      ))}

      <div className="relative">
        <textarea
          placeholder="YOUR MESSAGE"
          rows={4}
          className="w-full bg-transparent border-b-2 border-[var(--border-subtle)] py-3 font-inter text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-cyan transition-colors resize-none"
          onFocus={() => setCursorState('TEXT_CURSOR')}
          onBlur={() => setCursorState('DEFAULT')}
        />
      </div>

      <GradientButton variant="primary" onClick={() => {}}>
        SEND MESSAGE →
      </GradientButton>
    </form>
  );
}

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="container-custom">
        <SectionHeader number="05" title="LET'S CONNECT" />

        {/* Big CTA Text */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-h1 md:text-display gradient-text leading-tight">
            LET&apos;S BUILD
            <br />
            SOMETHING
            <br />
            AMAZING
            <br />
            TOGETHER.
          </h2>
          <p className="text-body text-text-secondary mt-6 max-w-lg">
            Have a project in mind? Want to collaborate on a game, an ML model, or a platform?
            Let&apos;s talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <ContactInfo />
          <ContactForm />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
          <MagneticButton href="https://github.com/UJJWAL16895/" label="GitHub">
            <Github className="w-7 h-7" />
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/ujjwal-kumar-6c18/" label="LinkedIn">
            <Linkedin className="w-7 h-7" />
          </MagneticButton>
          <MagneticButton href="mailto:ujjwalkumar16895@gmail.com" label="Email">
            <Mail className="w-7 h-7" />
          </MagneticButton>
          <MagneticButton href="/Specialized CV.pdf" label="Resume" download="Ujjwal_Kumar_CV.pdf">
            <FileDown className="w-7 h-7" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
