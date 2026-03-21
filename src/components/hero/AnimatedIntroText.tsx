'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_LINES = [
  { text: 'I build intelligent systems.', color: 'var(--accent-cyan)' },
  { text: 'I design immersive experiences.', color: 'var(--accent-purple)' },
  { text: 'I create the future.', color: 'var(--accent-magenta)' },
];

export function AnimatedIntroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % INTRO_LINES.length);
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 md:h-10 overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center"
        >
          <span
            className="font-jetbrains-mono text-lg md:text-xl font-medium"
            style={{ color: INTRO_LINES[index].color }}
          >
            {INTRO_LINES[index].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
