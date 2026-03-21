'use client';

import { useState, useEffect } from 'react';
import { useCursorStore } from '@/store/cursorStore';
import { useNavigationStore } from '@/store/navigationStore';
import { NAV_LINKS } from '@/lib/constants';

function HoverLink({ label, href, isActive }: { label: string; href: string; isActive: boolean }) {
  const { setCursorState } = useCursorStore();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setCursorState('HOVER_LINK')}
      onMouseLeave={() => setCursorState('DEFAULT')}
      className="relative group block overflow-hidden"
      style={{ height: '1.2em', lineHeight: '1.2em' }}
    >
      <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
        <span
          className={`block font-jetbrains-mono text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-300 ${
            isActive ? 'text-accent-cyan' : 'text-text-secondary'
          }`}
          style={{ lineHeight: '1.2em' }}
        >
          {label}
        </span>
        <span
          className="block font-jetbrains-mono text-xs uppercase tracking-[0.15em] whitespace-nowrap text-accent-cyan"
          style={{ lineHeight: '1.2em' }}
        >
          {label}
        </span>
      </div>
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
      )}
    </a>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { activeSection } = useNavigationStore();
  const { setCursorState } = useCursorStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const { setActiveSection } = useNavigationStore.getState();
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] md:h-[72px] flex items-center transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-[var(--border-subtle)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between w-full">
          {/* Logo */}
          <div
            className="flex items-center gap-3"
            onMouseEnter={() => setCursorState('HOVER_LINK')}
            onMouseLeave={() => setCursorState('DEFAULT')}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-space-grotesk text-bg-primary"
              style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))' }}
            >
              UK
            </div>
            <span className="hidden sm:block font-space-grotesk text-sm font-semibold tracking-[0.1em] uppercase text-text-primary">
              UJJWAL KUMAR
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <HoverLink
                key={link.href}
                label={link.label}
                href={link.href}
                isActive={activeSection === link.href.replace('#', '')}
              />
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileOpen(true)}
            onMouseEnter={() => setCursorState('HOVER_LINK')}
            onMouseLeave={() => setCursorState('DEFAULT')}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-text-primary" />
            <span className="block w-6 h-0.5 bg-text-primary" />
            <span className="block w-4 h-0.5 bg-text-primary" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[2000] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-6 right-6 p-2 text-text-primary"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="font-space-grotesk text-3xl font-semibold text-text-primary hover:text-accent-cyan transition-colors"
              style={{
                transitionDelay: `${i * 100}ms`,
                opacity: isMobileOpen ? 1 : 0,
                transform: isMobileOpen ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 0.5s cubic-bezier(0.76,0,0.24,1)',
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileOpen(false);
                setTimeout(() => {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
