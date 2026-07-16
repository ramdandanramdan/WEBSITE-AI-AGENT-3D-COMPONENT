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
        <svg viewBox="0 0 36 36" className="w-12 h-12 animate-spin-slow">
          <polygon points="18,1 33,9.5 33,26.5 18,35 3,26.5 3,9.5" fill="none" stroke="rgba(79,140,255,0.5)" strokeWidth="1.2" />
          <polygon points="18,5 29,11 29,25 18,31 7,25 7,11" fill="none" stroke="rgba(107,232,255,0.25)" strokeWidth="0.8" strokeDasharray="3 2" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" style={{ boxShadow: "0 0 12px rgba(79,140,255,0.8)" }} />
        </div>
      </div>
      <h1 className="text-xl font-bold tracking-tight">
        <span className="text-white">Ramdan</span>
        <span className="text-[#4F8CFF]">Clss</span>
        <span className="text-[#6BE8FF]">.AI</span>
      </h1>
    </div>
  );
}
