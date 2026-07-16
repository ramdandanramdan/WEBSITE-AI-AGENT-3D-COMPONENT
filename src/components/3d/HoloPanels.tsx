"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HoloPanel({
  position,
  rotation,
  width,
  height,
  speed,
  delay,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  speed: number;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const borderRef = useRef<THREE.LineSegments>(null);

  const edgeGeo = useMemo(() => {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    const r = 0.05;
    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    const points = shape.getPoints(40);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [width, height]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const y = position[1] + Math.sin(t * speed + delay) * 0.3;
    ref.current.position.y = y;
    ref.current.rotation.z = Math.sin(t * speed * 0.5 + delay) * 0.05;
    const o = 0.04 + Math.sin(t * 1.5 + delay) * 0.02;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = o;
    if (borderRef.current) {
      borderRef.current.position.y = y;
      borderRef.current.rotation.z = ref.current.rotation.z;
      (borderRef.current.material as THREE.LineBasicMaterial).opacity = 0.15 + Math.sin(t * 2 + delay) * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={ref} position={position} rotation={rotation}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color="#4F8CFF"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <lineSegments ref={borderRef} position={position} rotation={rotation} geometry={edgeGeo}>
        <lineBasicMaterial
          color="#6BE8FF"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export function HoloPanels() {
  return (
    <group>
      <HoloPanel position={[4, 1, -3]} rotation={[0, -0.4, 0.1]} width={2} height={1.2} speed={0.4} delay={0} />
      <HoloPanel position={[-4.5, 0.5, -2]} rotation={[0, 0.3, -0.08]} width={1.8} height={1} speed={0.35} delay={1.5} />
      <HoloPanel position={[3, -1.5, -4]} rotation={[0.1, -0.2, 0.05]} width={1.5} height={0.8} speed={0.45} delay={3} />
      <HoloPanel position={[-3.5, 2, -5]} rotation={[-0.1, 0.5, 0]} width={2.2} height={1} speed={0.3} delay={2} />
      <HoloPanel position={[5, -0.5, -5]} rotation={[0, -0.6, -0.05]} width={1.6} height={0.9} speed={0.38} delay={4} />
    </group>
  );
}
