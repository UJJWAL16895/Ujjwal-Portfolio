'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number; // depth layer (1-3)
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
  twinkleBase: number;
  twinkleSpeed: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Initialize stars
    const initStars = () => {
      const numStars = w > 1024 ? 400 : 200;
      starsRef.current = Array.from({ length: numStars }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 2 + 1, // depth 1 to 3
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        twinkleBase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
      }));
    };
    initStars();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initStars();
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove);

    let frame = 0;

    const draw = () => {
      frame++;
      
      const scrollY = scrollRef.current;
      const zoom = 1 + scrollY * 0.0003; // Slight scale up as user scrolls down
      const panY = scrollY * 0.08;       // Base scroll parallax

      // Clear the canvas to be transparent so the deep CSS background image shows through
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // ── Outer Nebula Clouds (Scroll affected) ──
      const gradient1 = ctx.createRadialGradient(
        w * 0.2 + panY * 0.2, h * 0.3 - panY * 0.3, 0,
        w * 0.2, h * 0.3, w * 0.5 + panY * 0.1
      );
      gradient1.addColorStop(0, 'rgba(0, 240, 255, 0.03)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      const gradient2 = ctx.createRadialGradient(
        w * 0.8 - panY * 0.1, h * 0.7 - panY * 0.3, 0,
        w * 0.8, h * 0.7, w * 0.5 + panY * 0.1
      );
      gradient2.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, w, h);

      // ── Faint Deep Grid ──
      ctx.save();
      // Apply scale from center for grid zoom
      ctx.translate(w / 2, h / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-w / 2, -h / 2);
      
      ctx.beginPath();
      // Extended bounds because of zoom
      for (let x = -w / 2; x < w * 1.5; x += 60) {
         ctx.moveTo(x, -h / 2); ctx.lineTo(x, h * 1.5);
      }
      for (let y = -h / 2; y < h * 1.5; y += 60) {
         ctx.moveTo(-w / 2, y); ctx.lineTo(w * 1.5, y);
      }
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.015)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // ── Cursor Aurora & Gravitational Lensing ──
      // This gradient warps space visually
      const aurora = ctx.createRadialGradient(mx, my, 0, mx, my, 350);
      aurora.addColorStop(0, 'rgba(0, 240, 255, 0.04)');
      aurora.addColorStop(0.4, 'rgba(139, 92, 246, 0.02)');
      aurora.addColorStop(1, 'transparent');
      ctx.fillStyle = aurora;
      ctx.beginPath();
      ctx.arc(mx, my, 350, 0, Math.PI * 2);
      ctx.fill();

      // ── Galaxy Stars ──
      ctx.save();
      // Base zoom & drift for all stars
      ctx.translate(w / 2, h / 2 + panY * 0.5);
      ctx.scale(zoom, zoom);
      ctx.translate(-w / 2, -h / 2);

      starsRef.current.forEach((star) => {
        // Continuous slow wander
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around bounds (extended slightly to hide pop-in during zoom)
        if (star.x < -100) star.x = w + 100;
        if (star.x > w + 100) star.x = -100;
        if (star.y < -100) star.y = h + 100;
        if (star.y > h + 100) star.y = -100;

        let px = star.x;
        // Deep stars scroll slower
        let py = star.y - panY / star.z;

        // Map abstract coords to zoomed screen space to compute proper distance to mouse
        const worldX = w / 2 + (px - w / 2) * zoom;
        const worldY = h / 2 + panY * 0.5 + (py - h / 2) * zoom;

        // Gravitational Repel logic
        const dx = worldX - mx;
        const dy = worldY - my;
        const distSq = dx * dx + dy * dy;
        const repelRadius = 200;

        if (distSq < repelRadius * repelRadius) {
          const dist = Math.sqrt(distSq);
          const force = (repelRadius - dist) / repelRadius;
          // Deeper stars (high z) get repelled slightly more or less depending on visual preference
          // Let's make foreground stars (z=1) warp heavily, background (z=3) warp less
          const warp = force * 20 * (4 - star.z);
          px += (dx / dist) * warp;
          py += (dy / dist) * warp;
        }

        // Twinkling & Opacity
        const t = Math.sin(frame * star.twinkleSpeed + star.twinkleBase) * 0.5 + 0.5;
        // Lower z = brighter, higher z = dimmer
        const baseOpacity = (0.3 + t * 0.7) / star.z * 1.5;

        // Draw
        ctx.beginPath();
        ctx.arc(px, py, star.radius, 0, Math.PI * 2);

        // Color shift based on radius and depth
        if (star.radius > 1.2) {
          ctx.fillStyle = `rgba(0, 240, 255, ${baseOpacity})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#00F0FF';
        } else if (star.radius > 0.8) {
          ctx.fillStyle = `rgba(139, 92, 246, ${baseOpacity})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#8B5CF6';
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${baseOpacity})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
