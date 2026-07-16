"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function RobotModel() {
  const { scene } = useGLTF("/models/robot.glb");
  const ref = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;
    const pointer = state.pointer;

    targetRotation.current.x = pointer.y * 0.3;
    targetRotation.current.y = pointer.x * 0.5;

    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetRotation.current.y,
      0.05
    );

    ref.current.position.y = Math.sin(t * 0.6) * 0.1;
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#4F8CFF" />
      <pointLight position={[0, 4, 3]} intensity={0.6} color="#6BE8FF" />

      <RobotModel />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.3}
        scale={8}
        blur={2.5}
        far={4}
        color="#4F8CFF"
      />

      <Environment preset="city" />
    </>
  );
}

export function RobotScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
