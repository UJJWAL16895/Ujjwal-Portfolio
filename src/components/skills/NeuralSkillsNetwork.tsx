'use client';

import { useEffect, useRef, useState } from 'react';
import { skillCategories } from '@/components/skills/SkillData';

interface SkillNode {
  id: string;
  label: string;
  proficiency: number;
  category: string;
  accent: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
  hovered: boolean;
  animProgress: number; // 0 → 1 on entry
  pulseOffset: number; // Random offset for continuous pulsing glow
}

interface Edge {
  from: string;
  to: string;
}

interface Particle {
  edge: Edge;
  progress: number;
  speed: number;
}

// Domain -> domain connections (cross-domain relationships)
const CROSS_EDGES: [string, string][] = [
  ['Python', 'Scikit-Learn'],
  ['Python', 'Pandas'],
  ['Python', 'NumPy'],
  ['Python', 'Hugging Face'],
  ['Python', 'NLTK'],
  ['Python', 'FastAPI'],
  ['C#', 'Unity'],
  ['C#', 'Cinemachine'],
  ['JavaScript', 'Node.js'],
  ['Node.js', 'Express'],
  ['Node.js', 'REST APIs'],
  ['PostgreSQL', 'Firebase'],
  ['Firebase', 'Supabase'],
  ['Unity', 'Blender'],
  ['Pandas', 'NumPy'],
  ['Scikit-Learn', 'XGBoost'],
  ['Git', 'VS Code'],
  ['Jupyter', 'Pandas'],
];

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 240;
  const b = parseInt(hex.slice(5, 7), 16) || 255;
  return `${r}, ${g}, ${b}`;
}

const ACCENT_MAP: Record<string, string> = {
  'var(--accent-cyan)': '#00F0FF',
  'var(--accent-purple)': '#8B5CF6',
  'var(--accent-magenta)': '#FF006E',
  'var(--accent-green)': '#00FF88',
  'var(--accent-orange)': '#FF8C00',
};

export function NeuralSkillsNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<SkillNode[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const hoveredNodeRef = useRef<SkillNode | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: SkillNode } | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);
    const cx = W / 2;
    const cy = H / 2;

    // Build nodes
    const nodes: SkillNode[] = [];

    skillCategories.forEach((cat, catI) => {
      const angle = (catI / skillCategories.length) * Math.PI * 2 - Math.PI / 2;
      const clusterX = cx + Math.cos(angle) * (W * 0.28);
      const clusterY = cy + Math.sin(angle) * (H * 0.3);
      const hexAccent = ACCENT_MAP[cat.accent] || '#00F0FF';

      cat.skills.forEach((skill, skillI) => {
        const spread = 75;
        const sAngle = (skillI / cat.skills.length) * Math.PI * 2;
        const tx = clusterX + Math.cos(sAngle) * spread;
        const ty = clusterY + Math.sin(sAngle) * spread;
        const prof = skill.proficiency ?? 70;

        nodes.push({
          id: skill.name,
          label: skill.name,
          proficiency: prof,
          category: cat.name,
          accent: hexAccent,
          x: cx + (Math.random() - 0.5) * W,
          y: cy + (Math.random() - 0.5) * H,
          vx: 0,
          vy: 0,
          targetX: tx,
          targetY: ty,
          radius: 6 + (prof - 60) / 10,
          hovered: false,
          animProgress: 0,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      });
    });
    nodesRef.current = nodes;

    // Build edges
    const edges: Edge[] = [];
    skillCategories.forEach((cat) => {
      for (let i = 0; i < cat.skills.length - 1; i++) {
        edges.push({ from: cat.skills[i].name, to: cat.skills[i + 1].name });
      }
    });
    CROSS_EDGES.forEach(([a, b]) => {
      if (nodes.find((n) => n.id === a) && nodes.find((n) => n.id === b)) {
        edges.push({ from: a, to: b });
      }
    });
    edgesRef.current = edges;

    // Initialize data particles
    const particles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
        const randomEdge = edges[Math.floor(Math.random() * edges.length)];
        particles.push({
            edge: randomEdge,
            progress: Math.random(),
            speed: 0.005 + Math.random() * 0.01
        });
    }
    particlesRef.current = particles;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) isVisibleRef.current = true;
      },
      { threshold: 0.2 }
    );
    observer.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouseMove);

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      const mouse = mouseRef.current;
      let newHovered: SkillNode | null = null;
      let overallProgress = 0;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        if (isVisibleRef.current && node.animProgress < 1) {
          node.animProgress = Math.min(1, node.animProgress + 0.01 + i * 0.0002);
        }
        overallProgress += node.animProgress;

        // Spring toward target
        const ease = 0.04;
        node.vx += (node.targetX - node.x) * ease;
        node.vy += (node.targetY - node.y) * ease;
        node.vx *= 0.85;
        node.vy *= 0.85;

        // Interactive mouse repel
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
           const force = (100 - dist) * 0.02;
           node.vx += (dx / dist) * force;
           node.vy += (dy / dist) * force;
        }

        node.x = node.x + node.vx;
        node.y = node.y + node.vy;

        // Hover check
        if (dist < node.radius + 15 && node.animProgress > 0.8) {
          newHovered = node;
          node.hovered = true;
        } else {
          node.hovered = false;
        }
      });
      
      const isFullyLoaded = (overallProgress / nodes.length) > 0.9;

      // Draw edges (animated line draw based on node progress)
      edges.forEach((edge) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return;
        
        const minProg = Math.min(fromNode.animProgress, toNode.animProgress);
        if (minProg <= 0) return;

        const isHighlighted = fromNode.hovered || toNode.hovered;
        
        ctx.beginPath();
        // Line stretch animation
        const currentToX = fromNode.x + (toNode.x - fromNode.x) * minProg;
        const currentToY = fromNode.y + (toNode.y - fromNode.y) * minProg;

        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(currentToX, currentToY);

        if (isHighlighted) {
          ctx.strokeStyle = `rgba(${hexToRgb(fromNode.accent)}, 0.8)`;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 12;
          ctx.shadowColor = fromNode.accent;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${minProg * 0.15})`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Draw active particles running along edges
      if (isFullyLoaded) {
          particles.forEach((p) => {
             p.progress += p.speed;
             if (p.progress >= 1) {
                 p.progress = 0;
                 p.edge = edges[Math.floor(Math.random() * edges.length)]; // Pick new edge
             }
             const fromNode = nodes.find((n) => n.id === p.edge.from);
             const toNode = nodes.find((n) => n.id === p.edge.to);
             if (!fromNode || !toNode) return;

             const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
             const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

             ctx.beginPath();
             ctx.arc(px, py, 2, 0, Math.PI * 2);
             ctx.fillStyle = fromNode.accent;
             ctx.shadowBlur = 8;
             ctx.shadowColor = fromNode.accent;
             ctx.fill();
             ctx.shadowBlur = 0;
          });
      }

      // Draw nodes
      nodes.forEach((node) => {
        if (node.animProgress <= 0) return;
        const rgb = hexToRgb(node.accent);
        const displayRadius = node.radius * node.animProgress;
        const pulse = (Math.sin(frame * 0.05 + node.pulseOffset) + 1) / 2; // 0 to 1

        // Pulsing glow (constant) + Hover glow
        const glowOpacity = node.hovered ? 0.6 : 0.15 + pulse * 0.2;
        const glowRadius = node.hovered ? displayRadius * 5 : displayRadius * 2.5 + pulse * displayRadius;
        
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        glow.addColorStop(0, `rgba(${rgb}, ${glowOpacity})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, displayRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.hovered ? `rgba(${rgb}, 1)` : `rgba(${rgb}, ${0.4 + pulse * 0.4})`;
        ctx.shadowBlur = node.hovered ? 20 : 0;
        ctx.shadowColor = node.accent;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Border ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, displayRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb}, 0.9)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label for visible, non-tiny nodes
        if (node.animProgress > 0.9) {
          ctx.font = `${node.hovered ? 'bold ' : ''}11px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(234, 234, 234, ${node.hovered ? 1 : 0.6})`;
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + displayRadius + 18);
        }
      });

      hoveredNodeRef.current = newHovered;

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  // Update tooltip from hovered node
  useEffect(() => {
    const interval = setInterval(() => {
      const node = hoveredNodeRef.current;
      if (node) {
        setTooltip({ x: node.x, y: node.y, node });
      } else {
        setTooltip(null);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <canvas ref={canvasRef} className="w-full" style={{ height: 560 }} />
      {tooltip && (
        <div
          className="absolute pointer-events-none transition-all duration-75 z-20"
          style={{
            left: tooltip.x + 20,
            top: tooltip.y - 30,
          }}
        >
          <div
            className="px-4 py-3 rounded-lg text-xs font-jetbrains-mono backdrop-blur-md"
            style={{
              background: 'rgba(5, 5, 10, 0.85)',
              border: `1px solid ${tooltip.node.accent}50`,
              color: tooltip.node.accent,
              boxShadow: `0 0 20px ${tooltip.node.accent}30`,
            }}
          >
            <div className="font-bold text-[14px] text-white tracking-wide">{tooltip.node.label}</div>
            <div className="text-text-tertiary text-[10px] mt-1 uppercase tracking-wider">{tooltip.node.category}</div>
            <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden w-28 relative">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${tooltip.node.proficiency}%`,
                  background: `linear-gradient(90deg, transparent, ${tooltip.node.accent})`,
                  boxShadow: `0 0 10px ${tooltip.node.accent}`,
                }}
              />
            </div>
            <div className="text-[11px] text-right mt-1.5 font-bold" style={{ color: tooltip.node.accent }}>
              {tooltip.node.proficiency}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
