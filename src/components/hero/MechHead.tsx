'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

export function MechHead() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/Head.glb');

  // Clone the scene to avoid issues if reused
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Target rotation for lerping
  const targetRotation = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  // Mouse move handler is actually best handled at the window level 
  // or passed down, but for R3F 'state.mouse' is available in useFrame.

  useFrame((state) => {
    if (!group.current) return;

    // Get normalized mouse position (-1 to 1)
    const { x, y } = state.mouse;

    // Update target rotation based on mouse
    // rotation.y follows mouse.x (looking left/right)
    // rotation.x follows mouse.y (looking up/down)
    targetRotation.current.y = x * 0.6; // Not inverted, slightly more range
    targetRotation.current.x = -y * 0.3; // Tilt

    // Add slow idle sway (not a full spin)
    const time = state.clock.getElapsedTime();
    const idleSwayY = Math.sin(time * 0.2) * 0.2; // Suble side-to-side sway

    // Smoothly interpolate current rotation toward target
    // Use a slightly higher lerp factor (0.08) to decrease floatiness
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotation.current.y + idleSwayY,
      0.08
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotation.current.x,
      0.08
    );

    // Add subtle idle breathing - decreased range to reduce floatiness
    group.current.position.y = Math.sin(time * 0.5) * 0.05;
    group.current.rotation.z = Math.sin(time * 0.3) * 0.01;
  });

  return (
    <group ref={group}>
      <primitive
        object={clonedScene}
        scale={14}
        position={[0.5, -4, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

// Pre-load the model
useGLTF.preload('/Head.glb');
