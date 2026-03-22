'use client';

import { Html, useProgress } from '@react-three/drei';

export function ModelLoader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-cyan transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-jetbrains-mono text-[10px] text-accent-cyan tracking-widest uppercase">
          INIT_SYSTEM... {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}
