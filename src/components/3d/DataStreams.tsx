"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STREAM_COUNT = 12;
const POINTS_PER_STREAM = 40;

function DataStream({ startIndex, color }: { startIndex: number; color: string }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, baseAngle } = useMemo(() => {
    const pos = new Float32Array(POINTS_PER_STREAM * 3);
    const angle = (startIndex / STREAM_COUNT) * Math.PI * 2;
    const radius = 3 + (startIndex % 3) * 1.5;
    for (let i = 0; i < POINTS_PER_STREAM; i++) {
      const y = (i / POINTS_PER_STREAM) * 14 - 7;
      const spread = (1 - i / POINTS_PER_STREAM) * 2;
      pos[i * 3] = Math.cos(angle) * (radius + spread);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * (radius + spread);
    }
    return { positions: pos, baseAngle: angle };
  }, [startIndex]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = ref.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const radius = 3 + (startIndex % 3) * 1.5;

    for (let i = 0; i < POINTS_PER_STREAM; i++) {
      const phase = t * 1.5 + i * 0.3 + startIndex * 0.5;
      const yNorm = i / POINTS_PER_STREAM;
      const flowOffset = (phase % 14) - 7;
      const spiralAngle = baseAngle + t * 0.15 + yNorm * 0.5;
      const spread = (1 - yNorm) * 2;
      const r = radius + spread + Math.sin(phase * 2) * 0.3;

      arr[i * 3] = Math.cos(spiralAngle) * r;
      arr[i * 3 + 1] = flowOffset;
      arr[i * 3 + 2] = Math.sin(spiralAngle) * r;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function DataStreams() {
  return (
    <group>
      {Array.from({ length: STREAM_COUNT }).map((_, i) => (
        <DataStream
          key={i}
          startIndex={i}
          color={i % 3 === 0 ? "#4F8CFF" : i % 3 === 1 ? "#6BE8FF" : "#7DD3FC"}
        />
      ))}
    </group>
  );
}
