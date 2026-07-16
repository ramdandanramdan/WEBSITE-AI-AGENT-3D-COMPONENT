"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// === GLITCH TEXT - Random character corruption on interval ===
export function GlitchText({
  children,
  className = "",
  intensity = "medium",
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const intervals = { low: 8000, medium: 4000, high: 2000 };
    const durations = { low: 80, medium: 120, high: 180 };

    const id = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), durations[intensity]);
    }, intervals[intensity]);

    return () => clearInterval(id);
  }, [intensity]);

  const offsets = {
    low: { x: 1, y: 0, shadow: "1px 0 rgba(79,140,255,0.3), -1px 0 rgba(107,232,255,0.2)" },
    medium: { x: 2, y: 1, shadow: "2px 0 rgba(79,140,255,0.5), -2px 0 rgba(107,232,255,0.3), 0 1px rgba(255,100,100,0.2)" },
    high: { x: 3, y: 2, shadow: "3px 0 rgba(79,140,255,0.6), -3px 0 rgba(107,232,255,0.4), 2px 1px rgba(255,100,100,0.3)" },
  };

  const o = offsets[intensity];

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        position: "relative",
        textShadow: glitching ? o.shadow : "none",
        transform: glitching ? `translate(${o.x}px, ${o.y}px) skewX(${intensity === "high" ? 2 : 1}deg)` : "none",
        transition: "none",
        clipPath: glitching && intensity === "high" ? "polygon(0 0, 100% 0, 100% 45%, 0 45%, 0 55%, 100% 55%, 100% 100%, 0 100%)" : "none",
      }}
    >
      {children}
      {/* Color channel split overlay */}
      {glitching && (
        <>
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              color: "rgba(79,140,255,0.4)",
              clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 40%)",
              transform: `translate(${o.x + 1}px, ${-o.y - 1}px)`,
              pointerEvents: "none",
            }}
          >
            {children}
          </span>
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              color: "rgba(107,232,255,0.3)",
              clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)",
              transform: `translate(${-o.x}px, ${o.y}px)`,
              pointerEvents: "none",
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// === CYBER CARD with cursor-following glow + corner brackets + BRUTAL entrance ===
export function CyberCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const glowStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    opacity: hovering ? 1 : 0,
    transition: "opacity 0.3s",
    background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(79,140,255,0.18), transparent 55%)`,
    pointerEvents: "none",
    zIndex: 0,
  };

  const borderStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    padding: "1.5px",
    background: hovering
      ? `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(79,140,255,0.7), rgba(107,232,255,0.3) 40%, transparent 70%)`
      : "transparent",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    opacity: hovering ? 1 : 0,
    transition: "opacity 0.3s",
    pointerEvents: "none",
    zIndex: 1,
  };

  const cornerSize = 14;
  const cornerThickness = 2;
  const cornerColor = hovering ? "rgba(79,140,255,0.7)" : "transparent";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.88, rotateX: 12 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
          : { opacity: 0, y: 80, scale: 0.88, rotateX: 12 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
        rotateX: -2,
        rotateY: 2,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`relative rounded-2xl p-6 overflow-hidden ${className}`}
      style={{
        perspective: "800px",
        transformStyle: "preserve-3d",
        background: "rgba(13,18,36,0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        borderColor: hovering ? "rgba(79,140,255,0.3)" : "rgba(255,255,255,0.06)",
        boxShadow: hovering
          ? "0 0 40px rgba(79,140,255,0.15), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(107,232,255,0.1)"
          : "0 4px 30px rgba(0,0,0,0.2)",
      }}
    >
      <div style={glowStyle} />
      <div style={borderStyle} />

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 8, left: 8, width: cornerSize, height: cornerSize, borderTop: `${cornerThickness}px solid ${cornerColor}`, borderLeft: `${cornerThickness}px solid ${cornerColor}`, transition: "border-color 0.3s", pointerEvents: "none", zIndex: 2 }} />
      <div style={{ position: "absolute", top: 8, right: 8, width: cornerSize, height: cornerSize, borderTop: `${cornerThickness}px solid ${cornerColor}`, borderRight: `${cornerThickness}px solid ${cornerColor}`, transition: "border-color 0.3s", pointerEvents: "none", zIndex: 2 }} />
      <div style={{ position: "absolute", bottom: 8, left: 8, width: cornerSize, height: cornerSize, borderBottom: `${cornerThickness}px solid ${cornerColor}`, borderLeft: `${cornerThickness}px solid ${cornerColor}`, transition: "border-color 0.3s", pointerEvents: "none", zIndex: 2 }} />
      <div style={{ position: "absolute", bottom: 8, right: 8, width: cornerSize, height: cornerSize, borderBottom: `${cornerThickness}px solid ${cornerColor}`, borderRight: `${cornerThickness}px solid ${cornerColor}`, transition: "border-color 0.3s", pointerEvents: "none", zIndex: 2 }} />

      {/* Scan line on hover */}
      {hovering && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: mouse.y - 1,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(79,140,255,0.4), rgba(107,232,255,0.3), rgba(79,140,255,0.4), transparent)",
            pointerEvents: "none",
            zIndex: 2,
            boxShadow: "0 0 10px rgba(79,140,255,0.3)",
          }}
        />
      )}

      {/* Scan line animation */}
      {hovering && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(79,140,255,0.015) 3px, rgba(79,140,255,0.015) 4px)",
            pointerEvents: "none",
            zIndex: 2,
            animation: "scanlines-scroll 8s linear infinite",
          }}
        />
      )}

      <div style={{ position: "relative", zIndex: 3 }}>
        {children}
      </div>
    </motion.div>
  );
}

// === SCROLL REVEAL - BRUTAL boot sequence ===
export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50, filter: "blur(8px)", rotateX: 6 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }
          : { opacity: 0, y: 50, filter: "blur(8px)", rotateX: 6 }
      }
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}

// === SCROLL REVEAL ROBOT - Hero-level dramatic entrance ===
export function ScrollRevealRobot({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(10px)", rotateX: 10 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotateX: 0 }
          : { opacity: 0, y: 60, scale: 0.92, filter: "blur(10px)", rotateX: 10 }
      }
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}

export const ScrollRevealCard = CyberCard;
