'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function HeroOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const [mounted, setMounted] = useState(false);

  const mouseX = useSpring(0, { stiffness: 40, damping: 18 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 18 });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    mouseX.set(((mouse.x - cx) / (width / 2)) * 0.6);
    mouseY.set(((mouse.y - cy) / (height / 2)) * 0.6);
  }, [mouse, mounted, mouseX, mouseY]);

  // Tilt the whole blackhole system with mouse
  const rotateY = useTransform(mouseX, [-1, 1], [-18, 18]);
  const rotateX = useTransform(mouseY, [-1, 1], [12, -12]);

  // Fine-tune parallax per layer
  const diskX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const diskY = useTransform(mouseY, [-1, 1], [-8, 8]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] md:h-[580px] flex items-center justify-center"
      style={{ perspective: '900px' }}
    >
      {/* ── Outermost ambient nebula glow ── */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(180,120,0,0.18) 0%, rgba(139,60,0,0.10) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Main 3D system ── */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d', width: 380, height: 380, rotateY, rotateX }}
      >
        {/* Distant glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 360, height: 360,
            border: '1px solid rgba(210,150,30,0.12)',
            boxShadow: '0 0 30px rgba(210,150,30,0.06)',
          }}
        />

        {/* Outer photon ring – slow */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full"
          style={{
            width: 310, height: 310,
            border: '2px solid transparent',
            background:
              'conic-gradient(from 0deg, rgba(255,180,30,0.5) 0%, rgba(255,100,10,0.2) 30%, transparent 55%, rgba(255,180,30,0.4) 75%, transparent 100%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent 78%, black 82%)',
            mask: 'radial-gradient(farthest-side, transparent 78%, black 82%)',
            filter: 'blur(2px)',
          }}
        />

        {/* ── Golden accretion disk ── */}
        <motion.div
          className="absolute"
          style={{
            x: diskX, y: diskY,
            width: 340,
            height: 90,
            borderRadius: '50%',
            background:
              'conic-gradient(from 200deg, rgba(255,200,40,0.9) 0%, rgba(255,120,10,0.7) 15%, rgba(150,60,0,0.3) 35%, rgba(0,0,0,0) 50%, rgba(150,60,0,0.2) 65%, rgba(255,160,20,0.8) 82%, rgba(255,200,40,0.9) 100%)',
            filter: 'blur(6px)',
            boxShadow:
              '0 0 60px rgba(255,160,20,0.5), 0 0 120px rgba(200,100,0,0.3), inset 0 0 20px rgba(255,200,40,0.2)',
            transform: 'rotateX(80deg)',
            zIndex: 2,
          }}
        />

        {/* ── EVENT HORIZON — pure black sphere ── */}
        <div
          className="absolute rounded-full z-10"
          style={{
            width: 200,
            height: 200,
            background: 'radial-gradient(circle at 38% 38%, #0a0005 0%, #000000 60%, #000000 100%)',
            boxShadow:
              '0 0 0 6px rgba(255,160,20,0.15), 0 0 40px rgba(255,160,20,0.25), 0 0 80px rgba(160,80,0,0.2)',
          }}
        >
          {/* Very subtle internal lensing rim */}
          <div
            className="absolute inset-3 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, rgba(255,180,80,0.04) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* ── Inner bright accretion ring (close to horizon) ── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute z-10"
          style={{
            width: 220,
            height: 60,
            borderRadius: '50%',
            background:
              'conic-gradient(from 90deg, rgba(255,220,100,1) 0%, rgba(255,140,20,0.7) 20%, rgba(100,40,0,0.1) 45%, rgba(255,140,20,0.6) 70%, rgba(255,220,100,0.9) 100%)',
            filter: 'blur(4px)',
            transform: 'rotateX(78deg)',
            mixBlendMode: 'screen',
          }}
        />

        {/* ── Light streak hot spots ── */}
        {[0, 120, 240].map((deg, i) => (
          <motion.div
            key={i}
            animate={{ rotate: [deg, deg + 360] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear' }}
            className="absolute z-20 pointer-events-none"
            style={{ width: 230, height: 64, transform: 'rotateX(78deg)' }}
          >
            <div
              style={{
                position: 'absolute',
                left: '5%',
                top: '50%',
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'rgba(255,240,180,0.95)',
                transform: 'translateY(-50%)',
                boxShadow: '0 0 12px 6px rgba(255,200,60,0.8), 0 0 30px 10px rgba(255,150,20,0.4)',
                filter: 'blur(1px)',
              }}
            />
          </motion.div>
        ))}

        {/* ── Relativistic jet (subtle upward beam) ── */}
        <div
          className="absolute z-5 pointer-events-none"
          style={{
            width: 2,
            height: 120,
            bottom: '58%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to top, rgba(140,140,255,0.4), transparent)',
            filter: 'blur(3px)',
            borderRadius: '999px',
          }}
        />
        <div
          className="absolute z-5 pointer-events-none"
          style={{
            width: 2,
            height: 80,
            top: '58%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, rgba(140,140,255,0.3), transparent)',
            filter: 'blur(3px)',
            borderRadius: '999px',
          }}
        />
      </motion.div>

      {/* ── Label ── */}
      <div
        className="absolute bottom-4 font-jetbrains-mono text-[10px] tracking-[0.25em] uppercase pointer-events-none"
        style={{ color: 'rgba(210,150,30,0.5)' }}
      >
        Sagittarius A* · Mass 4M☉
      </div>
    </div>
  );
}
