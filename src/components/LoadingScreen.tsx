"use client";

import { useState, useEffect } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#050816" }}
    >
      <div className="relative mb-6">
        <div className="w-12 h-12 border border-[rgba(79,140,255,0.4)] rotate-45 animate-spin-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" />
        </div>
      </div>
      <h1 className="text-xl font-bold tracking-tight">
        <span className="text-white">RamadanClass</span>
        <span className="text-[#4F8CFF]">.AI</span>
      </h1>
    </div>
  );
}
