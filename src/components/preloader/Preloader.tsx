'use client';

import { useEffect, useState, useRef } from 'react';
import { useLoadingStore } from '@/store/loadingStore';

const STATUS_LINES = [
  { label: 'Rendering Engine', delay: 400 },
  { label: 'Neural Networks', delay: 800 },
  { label: '3D Environment', delay: 1500 },
  { label: 'Project Database', delay: 2200 },
];

const MARQUEE_TEXT =
  'GAME DEVELOPER • ML ENGINEER • BACKEND ARCHITECT • WORLD BUILDER • SYSTEM DESIGNER • CODE WARRIOR • ';

export default function Preloader() {
  const { isLoading, setLoading } = useLoadingStore();
  const [progress, setProgress] = useState(0);
  const [statusStates, setStatusStates] = useState<boolean[]>([false, false, false, false]);
  const [initText, setInitText] = useState('');
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fullInitText = '< INITIALIZING PORTFOLIO SYSTEMS >';

  // Typewriter for init text
  useEffect(() => {
    if (!isLoading) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullInitText.length) {
        setInitText(fullInitText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Progress bar animation
  useEffect(() => {
    if (!isLoading) return;
    const duration = 3000;
    const start = Date.now();

    const update = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }, [isLoading]);

  // Status line animations
  useEffect(() => {
    if (!isLoading) return;
    STATUS_LINES.forEach((line, i) => {
      setTimeout(() => {
        setStatusStates((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, line.delay);
    });
  }, [isLoading]);

  // Exit after progress reaches 100
  useEffect(() => {
    if (progress >= 100 && isLoading) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }, 500);
    }
  }, [progress, isLoading, setLoading]);

  if (!isLoading && !isExiting) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-bg-primary transition-transform duration-700 ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    >
      {/* Logo Mark */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-12 opacity-0 animate-[fadeIn_0.3s_ease_forwards]"
        style={{
          background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
        }}
      >
        <span className="font-space-grotesk text-xl font-bold text-bg-primary">UK</span>
      </div>

      {/* Progress Bar */}
      <div className="w-80 max-w-[80vw] mb-4">
        <div className="relative h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100 relative"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
              boxShadow: '0 0 20px rgba(0,240,255,0.5)',
            }}
          >
            {/* Scanline on progress bar */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                animation: 'shimmer 1.5s infinite',
              }}
            />
          </div>
        </div>
        <div className="text-right mt-2">
          <span className="font-space-grotesk text-5xl font-bold text-text-primary">
            {progress}
          </span>
          <span className="font-jetbrains-mono text-lg text-text-secondary ml-1">%</span>
        </div>
      </div>

      {/* Init Text */}
      <p className="font-jetbrains-mono text-xs tracking-[0.3em] uppercase text-accent-cyan mb-8">
        {initText}
        <span className="animate-pulse">_</span>
      </p>

      {/* Marquee */}
      <div className="w-full max-w-lg overflow-hidden mb-10">
        <div
          className="flex whitespace-nowrap"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          <div className="animate-marquee flex gap-4">
            <span className="font-jetbrains-mono text-xs text-text-tertiary tracking-wider">
              {MARQUEE_TEXT}
            </span>
            <span className="font-jetbrains-mono text-xs text-text-tertiary tracking-wider">
              {MARQUEE_TEXT}
            </span>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="w-80 max-w-[80vw] space-y-2 mb-10">
        <p className="font-jetbrains-mono text-xs text-text-tertiary mb-3">System Status:</p>
        {STATUS_LINES.map((line, i) => (
          <div key={line.label} className="flex items-center gap-3 font-jetbrains-mono text-xs">
            <span
              className={`transition-all duration-300 ${
                statusStates[i] ? 'text-accent-green' : 'text-text-tertiary'
              }`}
            >
              {statusStates[i] ? '✓' : '◌'}
            </span>
            <span className="text-text-secondary flex-1">
              {line.label}
              <span className="text-text-tertiary">
                {' '}
                {'·'.repeat(Math.max(0, 24 - line.label.length))}{' '}
              </span>
            </span>
            <span
              className={`text-xs transition-colors duration-300 ${
                statusStates[i] ? 'text-accent-green' : 'text-text-tertiary'
              }`}
            >
              {statusStates[i] ? 'LOADED' : i === statusStates.filter(Boolean).length ? 'LOADING' : 'STANDBY'}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 md:px-16">
        <span className="font-jetbrains-mono text-xs text-text-tertiary">[v1.0.0]</span>
        <span className="font-jetbrains-mono text-xs text-text-tertiary">[PATNA, BIHAR]</span>
        <span className="font-jetbrains-mono text-xs text-text-tertiary">[2025]</span>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
