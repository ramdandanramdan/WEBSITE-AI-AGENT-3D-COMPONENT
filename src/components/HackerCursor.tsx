"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export function HackerCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const [hovering, setHovering] = useState(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, 0.1);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.1);

    const el = containerRef.current;
    if (el) {
      el.style.setProperty("--px", `${pos.current.x}px`);
      el.style.setProperty("--py", `${pos.current.y}px`);
      el.style.setProperty("--tx", `${target.current.x}px`);
      el.style.setProperty("--ty", `${target.current.y}px`);
    }

    if (scanLineRef.current) {
      scanLineRef.current.style.transform = `translateY(${pos.current.y}px)`;
    }
    if (coordsRef.current) {
      coordsRef.current.style.transform = `translate(${target.current.x + 20}px, ${target.current.y - 10}px)`;
      coordsRef.current.textContent = `[${Math.round(target.current.x)},${Math.round(target.current.y)}]`;
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

  const ring = hovering
    ? { borderColor: "rgba(107, 232, 255, 0.8)", boxShadow: "0 0 24px rgba(107, 232, 255, 0.35), 0 0 48px rgba(79, 140, 255, 0.15)" }
    : { borderColor: "rgba(79, 140, 255, 0.4)", boxShadow: "0 0 12px rgba(79, 140, 255, 0.15)" };

  const glow = hovering
    ? { background: "radial-gradient(circle, #fff 0%, #6BE8FF 30%, #4F8CFF 60%, transparent 100%)", boxShadow: "0 0 14px rgba(107, 232, 255, 0.8), 0 0 35px rgba(79, 140, 255, 0.5)" }
    : { background: "radial-gradient(circle, #6BE8FF 0%, #4F8CFF 50%, transparent 100%)", boxShadow: "0 0 8px rgba(79, 140, 255, 0.6), 0 0 20px rgba(79, 140, 255, 0.3)" };

  const corner = (pos: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    width: 10,
    height: 10,
    ...pos,
    transition: "border-color 0.3s",
    borderColor: hovering ? "rgba(107, 232, 255, 0.7)" : "rgba(79, 140, 255, 0.5)",
  });

  return (
    <>
      <style>{`
        .hc-ring { transform: translate(calc(var(--px) - 22px), calc(var(--py) - 22px)); transition: border-color 0.3s, box-shadow 0.3s; }
        .hc-dot { transform: translate(calc(var(--tx) - 4px), calc(var(--ty) - 4px)); transition: background 0.3s, box-shadow 0.3s; }
        .hc-core { transform: translate(calc(var(--tx) - 2px), calc(var(--ty) - 2px)); }
        .hc-glow { transform: translate(calc(var(--px) - 36px), calc(var(--py) - 36px)); transition: width 0.4s, height 0.4s, border-color 0.3s, box-shadow 0.3s; }
        .hc-crosshair { transform: translate(calc(var(--px) - 20px), calc(var(--py) - 20px)); }
        .hc-corners { transform: translate(calc(var(--px) - 22px), calc(var(--py) - 22px)); }
      `}</style>

      <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none">
        {/* Outer glow trail */}
        <div
          className="hc-glow absolute"
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: "1px solid rgba(79, 140, 255, 0.08)",
            boxShadow: "0 0 30px rgba(79, 140, 255, 0.05), inset 0 0 30px rgba(79, 140, 255, 0.02)",
          }}
        />

        {/* Crosshair target */}
        <div
          className="hc-crosshair absolute"
          style={{
            width: 40,
            height: 40,
            border: "1px solid rgba(107, 232, 255, 0.2)",
            clipPath: "polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)",
            filter: "drop-shadow(0 0 6px rgba(107, 232, 255, 0.4))",
          }}
        />

        {/* Main ring */}
        <div
          className="hc-ring absolute"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `1.5px solid ${ring.borderColor}`,
            boxShadow: ring.boxShadow,
          }}
        />

        {/* Corner brackets */}
        <div className="hc-corners absolute" style={{ width: 44, height: 44 }}>
          <div style={corner({ top: 0, left: 0, borderTop: "2px solid", borderLeft: "2px solid" })} />
          <div style={corner({ top: 0, right: 0, borderTop: "2px solid", borderRight: "2px solid" })} />
          <div style={corner({ bottom: 0, left: 0, borderBottom: "2px solid", borderLeft: "2px solid" })} />
          <div style={corner({ bottom: 0, right: 0, borderBottom: "2px solid", borderRight: "2px solid" })} />
        </div>

        {/* Inner glow */}
        <div
          className="hc-dot absolute"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            ...glow,
          }}
        />

        {/* Center dot */}
        <div
          className="hc-core absolute"
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 5px rgba(255,255,255,0.9)",
          }}
        />

        {/* Scan line */}
        <div
          ref={scanLineRef}
          className="absolute left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(79, 140, 255, 0.12) 30%, rgba(107, 232, 255, 0.18) 50%, rgba(79, 140, 255, 0.12) 70%, transparent 100%)",
          }}
        />

        {/* Coords readout */}
        <div
          ref={coordsRef}
          className="absolute hidden md:block"
          style={{
            fontSize: 9,
            fontFamily: "monospace",
            color: "rgba(107, 232, 255, 0.45)",
            letterSpacing: "0.05em",
            textShadow: "0 0 6px rgba(79, 140, 255, 0.3)",
          }}
        />
      </div>
    </>
  );
}
