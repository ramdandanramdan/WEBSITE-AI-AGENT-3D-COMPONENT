"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function AIBrain() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const mid = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const coreLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = t * 0.08;
      group.current.rotation.x = Math.sin(t * 0.05) * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.25;
      inner.current.rotation.z = t * 0.15;
      const s = 1 + Math.sin(t * 1.5) * 0.04;
      inner.current.scale.setScalar(s);
    }
    if (mid.current) {
      mid.current.rotation.y = t * 0.18;
      mid.current.rotation.x = -t * 0.12;
    }
    if (outer.current) {
      outer.current.rotation.y = -t * 0.1;
      outer.current.rotation.z = t * 0.06;
    }
    if (core.current) {
      const s = 0.35 + Math.sin(t * 2) * 0.06;
      core.current.scale.setScalar(s);
    }
    if (coreLight.current) {
      coreLight.current.intensity = 2.5 + Math.sin(t * 2) * 1;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.2, 3]} />
        <meshStandardMaterial
          color="#4F8CFF"
          emissive="#4F8CFF"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh ref={mid} scale={1.5}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#6BE8FF"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={outer} scale={2.0}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#7DD3FC"
          wireframe
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={core}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#4F8CFF"
          emissive="#4F8CFF"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>

      <pointLight ref={coreLight} color="#4F8CFF" intensity={2.5} distance={20} decay={2} />
    </group>
  );
}
