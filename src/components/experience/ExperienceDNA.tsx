'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function ExperienceDNA() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/dna.glb');
  
  // Clone to avoid mutations if used multiple times
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Apply holographic/emissive materials to the DNA
  useMemo(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          // Creating a new material so we don't accidentally mutate the original globally
          const oldMat = child.material;
          const newMat = new THREE.MeshStandardMaterial({
            color: oldMat.color || new THREE.Color('#00f0ff'),
            emissive: new THREE.Color('#8b5cf6'),
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.9,
            metalness: 0.8,
            roughness: 0.2,
          });
          child.material = newMat;
        }
      }
    });
  }, [clonedScene]);

  const targetRotationY = useRef(0);

  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.getElapsedTime();
    
    // Calculate scroll contribution to rotation
    // Scroll down -> positive rotation (clockwise).
    const scrollDelta = (window.scrollY * Math.PI * 2) / 2000; 

    // Calculate continuous slow idle rotation
    const idleRotation = time * 0.2; 
    
    // Target rotation is scroll + idle
    targetRotationY.current = scrollDelta;

    // Smoothly interpolate current rotation toward target
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotationY.current + idleRotation,
      0.05
    );
    
    // Add subtle pulsing glow effect
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
         if (child.material && child.material instanceof THREE.MeshStandardMaterial) {
             child.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.3;
         }
      }
    });
  });

  return (
    <group ref={group}>
      <primitive 
        object={clonedScene} 
        /* Adjusting initial rotation to stand perfectly upright */
        rotation={[0, 0, Math.PI / 2]} 
        scale={12} 
        position={[0, 0, 0]} 
      />
    </group>
  );
}

useGLTF.preload('/dna.glb');
