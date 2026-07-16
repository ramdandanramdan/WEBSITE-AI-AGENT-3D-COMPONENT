"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 30;

interface NodeData {
  angle: number;
  radius: number;
  y: number;
  speed: number;
  size: number;
}

function generateNodes(): NodeData[] {
  const nodes: NodeData[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      angle: (i / NODE_COUNT) * Math.PI * 2 + Math.random() * 0.5,
      radius: 3.5 + Math.random() * 4,
      y: (Math.random() - 0.5) * 6,
      speed: 0.1 + Math.random() * 0.15,
      size: 0.04 + Math.random() * 0.06,
    });
  }
  return nodes;
}

export function NeuralNet() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodes = useMemo(() => generateNodes(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const linePositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].radius - nodes[j].radius;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 4) {
          const ai = nodes[i].angle;
          const aj = nodes[j].angle;
          const ri = nodes[i].radius;
          const rj = nodes[j].radius;
          positions.push(
            Math.cos(ai) * ri, nodes[i].y, Math.sin(ai) * ri,
            Math.cos(aj) * rj, nodes[j].y, Math.sin(aj) * rj
          );
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.03;
    }

    if (nodesRef.current) {
      nodes.forEach((node, i) => {
        const a = node.angle + t * node.speed;
        const wobble = Math.sin(t * 0.8 + i) * 0.3;
        dummy.position.set(
          Math.cos(a) * node.radius,
          node.y + wobble,
          Math.sin(a) * node.radius
        );
        const pulse = 1 + Math.sin(t * 3 + i * 0.7) * 0.4;
        dummy.scale.setScalar(pulse);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color="#6BE8FF"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4F8CFF"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
