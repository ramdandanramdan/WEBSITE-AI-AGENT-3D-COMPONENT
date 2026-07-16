"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AIBrain } from "./AIBrain";
import { DataStreams } from "./DataStreams";
import { NeuralNet } from "./NeuralNet";
import { HoloPanels } from "./HoloPanels";
import { FloatingAgents } from "./FloatingAgents";
import { CameraRig } from "./CameraRig";

function SceneContents() {
  return (
    <>
      <CameraRig />
      <fog attach="fog" args={["#050816", 8, 35]} />
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 8, 5]} intensity={0.15} color="#4F8CFF" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#4F8CFF" distance={15} decay={2} />
      <pointLight position={[-4, 3, -2]} intensity={1} color="#6BE8FF" distance={12} decay={2} />
      <pointLight position={[4, -2, 3]} intensity={0.8} color="#7DD3FC" distance={10} decay={2} />

      <AIBrain />
      <NeuralNet />
      <DataStreams />
      <HoloPanels />
      <FloatingAgents />
    </>
  );
}

export function AIScene() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 2, 12], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
