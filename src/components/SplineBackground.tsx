"use client";

import dynamic from "next/dynamic";

const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((m) => m.SplineScene),
  { ssr: false }
);

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 z-10">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
