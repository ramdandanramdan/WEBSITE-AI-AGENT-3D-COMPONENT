"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AGENT_COUNT = 8;

interface AgentData {
  angle: number;
  radius: number;
  y: number;
  speed: number;
  orbitTilt: number;
  size: number;
}

function AgentNode({ data, index }: { data: AgentData; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const a = data.angle + t * data.speed;
    const wobble = Math.sin(t * 0.6 + index * 2) * 0.4;

    groupRef.current.position.set(
      Math.cos(a) * data.radius,
      data.y + wobble,
      Math.sin(a) * data.radius
    );

    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.8 + index;
      ringRef.current.rotation.y = t * 0.5;
      const s = 1 + Math.sin(t * 2 + index) * 0.2;
      ringRef.current.scale.setScalar(s);
    }

    if (dotRef.current) {
      const s = 0.8 + Math.sin(t * 3 + index * 1.5) * 0.3;
      dotRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef}>
        <torusGeometry args={[data.size * 3, 0.01, 16, 32]} />
        <meshBasicMaterial
          color="#4F8CFF"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[data.size, 16, 16]} />
        <meshStandardMaterial
          color="#6BE8FF"
          emissive="#6BE8FF"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight color="#4F8CFF" intensity={0.5} distance={3} decay={2} />
    </group>
  );
}

function ParticlesField() {
  const ref = useRef<THREE.Points>(null);
  const count = 400;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.015;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.3 + i * 0.05) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4F8CFF"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function FloatingAgents() {
  const agents = useMemo<AgentData[]>(
    () =>
      Array.from({ length: AGENT_COUNT }).map((_, i) => ({
        angle: (i / AGENT_COUNT) * Math.PI * 2,
        radius: 5 + Math.random() * 3,
        y: (Math.random() - 0.5) * 4,
        speed: 0.15 + Math.random() * 0.1,
        orbitTilt: (Math.random() - 0.5) * 0.3,
        size: 0.08 + Math.random() * 0.08,
      })),
    []
  );

  return (
    <group>
      {agents.map((a, i) => (
        <AgentNode key={i} data={a} index={i} />
      ))}
      <ParticlesField />
    </group>
  );
}
