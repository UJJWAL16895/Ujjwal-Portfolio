'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ExperienceDNA } from './ExperienceDNA';

export const ExperienceDNACanvas = React.memo(function ExperienceDNACanvas({ inView = true }: { inView?: boolean }) {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '800px' }}>
      <Canvas
        frameloop={inView ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          {/* Main directional light */}
          <directionalLight position={[5, 10, 5]} intensity={2} color="#00f0ff" />
          
          <ExperienceDNA />
          
          <Environment preset="city" />
          
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              intensity={1.5} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
});
