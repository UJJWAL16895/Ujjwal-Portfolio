'use client';

import { useEffect, useRef } from 'react';
import { useCursorStore } from '@/store/cursorStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { cursorState } = useCursorStore();
  const isMobile = useMediaQuery('(pointer: coarse)');

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trails = trailRefs.current;

    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    const trailPositions = trails.map(() => ({ x: 0, y: 0 }));

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Dot follows exactly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      // Ring follows with easing
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      // Trails with increasing delay
      trails.forEach((trail, i) => {
        if (!trail) return;
        const speed = 0.1 - i * 0.025;
        trailPositions[i].x += (mouseX - trailPositions[i].x) * speed;
        trailPositions[i].y += (mouseY - trailPositions[i].y) * speed;
        trail.style.transform = `translate(${trailPositions[i].x}px, ${trailPositions[i].y}px) translate(-50%, -50%)`;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const getDotStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 99999,
      mixBlendMode: 'difference',
      transition: 'width 0.3s, height 0.3s, opacity 0.3s, background 0.3s',
      borderRadius: '50%',
    };

    switch (cursorState) {
      case 'HOVER_LINK':
        return { ...base, width: 4, height: 4, background: '#00F0FF' };
      case 'HOVER_PROJECT':
        return { ...base, width: 0, height: 0, opacity: 0 };
      case 'HOVER_DISABLED':
        return { ...base, width: 8, height: 8, background: '#FF006E' };
      case 'TEXT_CURSOR':
        return { ...base, width: 2, height: 20, borderRadius: 1, background: '#00F0FF' };
      case 'HIDDEN':
        return { ...base, width: 8, height: 8, background: '#00F0FF', opacity: 0 };
      default:
        return { ...base, width: 8, height: 8, background: '#00F0FF' };
    }
  };

  const getRingStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 99998,
      borderRadius: '50%',
      transition: 'width 0.3s, height 0.3s, opacity 0.3s, border 0.3s, background 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    switch (cursorState) {
      case 'HOVER_LINK':
        return {
          ...base,
          width: 80,
          height: 80,
          border: '2px solid #00F0FF',
          background: 'rgba(0,240,255,0.1)',
          boxShadow: '0 0 20px rgba(0,240,255,0.5), inset 0 0 10px rgba(0,240,255,0.3)',
        };
      case 'HOVER_PROJECT':
        return {
          ...base,
          width: 120,
          height: 120,
          border: '1px solid #00F0FF',
          background: 'rgba(0,240,255,0.08)',
          boxShadow: '0 0 30px rgba(0,240,255,0.3), inset 0 0 20px rgba(0,240,255,0.2)',
        };
      case 'HOVER_DISABLED':
        return {
          ...base,
          width: 40,
          height: 40,
          border: '1px dashed #FF006E',
        };
      case 'TEXT_CURSOR':
        return { ...base, width: 0, height: 0, opacity: 0, border: 'none' };
      case 'HIDDEN':
        return {
          ...base,
          width: 40,
          height: 40,
          border: '1px solid #00F0FF',
          opacity: 0,
        };
      default:
        return {
          ...base,
          width: 40,
          height: 40,
          border: '1px solid #00F0FF',
        };
    }
  };

  return (
    <>
      {/* Trail ghosts */}
      {[0, 1, 2].map((i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => { trailRefs.current[i] = el; }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#00F0FF',
            opacity: 0.3 - i * 0.1,
            pointerEvents: 'none',
            zIndex: 99997,
          }}
        />
      ))}

      {/* Main dot */}
      <div ref={dotRef} style={getDotStyle()} />

      {/* Ring */}
      <div ref={ringRef} style={getRingStyle()}>
        {cursorState === 'HOVER_PROJECT' && (
          <span
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            VIEW
          </span>
        )}
      </div>
    </>
  );
}
