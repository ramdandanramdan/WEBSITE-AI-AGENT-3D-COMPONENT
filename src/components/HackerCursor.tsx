"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export function HackerCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const [hovering, setHovering] = useState(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${pos.current.x - 18}px, ${pos.current.y - 18}px)`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [role='button'], input, textarea, select"));
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseover", handleOver);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  const ringStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: `1px solid ${hovering ? "rgba(107, 232, 255, 0.7)" : "rgba(79, 140, 255, 0.35)"}`,
    boxShadow: hovering
      ? "0 0 16px rgba(107, 232, 255, 0.25)"
      : "0 0 8px rgba(79, 140, 255, 0.1)",
    transition: "border-color 0.3s, box-shadow 0.3s, width 0.3s, height 0.3s",
  };

  if (hovering) {
    ringStyle.width = 48;
    ringStyle.height = 48;
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Outer ring - smooth follow */}
      <div
        ref={ringRef}
        className="absolute"
        style={ringStyle}
      />

      {/* Center dot - instant follow */}
      <div
        ref={dotRef}
        className="absolute"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: hovering
            ? "#6BE8FF"
            : "#4F8CFF",
          boxShadow: hovering
            ? "0 0 10px rgba(107, 232, 255, 0.6)"
            : "0 0 6px rgba(79, 140, 255, 0.5)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      />
    </div>
  );
}
