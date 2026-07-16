"use client";

import { useFrame } from "@react-three/fiber";

export function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const x = Math.sin(t * 0.08) * 2.5;
    const y = 1.5 + Math.cos(t * 0.06) * 0.8;
    const z = 12 + Math.sin(t * 0.04) * 1.5;
    state.camera.position.set(x, y, z);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}
