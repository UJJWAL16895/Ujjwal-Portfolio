'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { MechHead } from './MechHead';
import { ModelLoader } from './ModelLoader';

export const MechHeadCanvas = React.memo(function MechHeadCanvas({ inView = true }: { inView?: boolean }) {
  return (
    <div className="w-full h-[400px] md:h-[600px] relative">
      <Canvas
        frameloop={inView ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<ModelLoader />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={2} 
            color="#00f0ff" 
          />

          {/* Effects */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={1} 
              mipmapBlur 
              intensity={0.5} 
              radius={0.4} 
            />
            <ToneMapping adaptive={true} />
          </EffectComposer>

          {/* Model */}
          <MechHead />

          {/* Environment */}
          <Environment preset="city" />

          {/* Optional: Add orbit controls but disabled if you want pure mouse look-at */}
          {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
});
