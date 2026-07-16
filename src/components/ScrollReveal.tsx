"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

// === CYBER CARD with cursor-following glow + corner brackets ===
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
  const isInView = useInView(ref, { once: true, margin: "-40px" });
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
    background: `radial-gradient(350px circle at ${mouse.x}px ${mouse.y}px, rgba(79,140,255,0.12), transparent 60%)`,
    pointerEvents: "none",
    zIndex: 0,
  };

  const borderStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    padding: "1px",
    background: hovering
      ? `radial-gradient(250px circle at ${mouse.x}px ${mouse.y}px, rgba(79,140,255,0.5), rgba(107,232,255,0.2) 40%, transparent 70%)`
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
  const cornerColor = hovering ? "rgba(79,140,255,0.6)" : "transparent";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.96 }
      }
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`relative rounded-2xl p-6 overflow-hidden ${className}`}
      style={{
        background: "rgba(13,18,36,0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        borderColor: hovering ? "rgba(79,140,255,0.2)" : "rgba(255,255,255,0.06)",
        boxShadow: hovering
          ? "0 0 30px rgba(79,140,255,0.1), inset 0 1px 0 rgba(107,232,255,0.08)"
          : "none",
      }}
    >
      {/* Cursor glow */}
      <div style={glowStyle} />
      {/* Gradient border */}
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
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(79,140,255,0.2), transparent)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3 }}>
        {children}
      </div>
    </motion.div>
  );
}

// === SCROLL REVEAL - Robotic boot sequence ===
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
      initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 35, filter: "blur(4px)" }
      }
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
      initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" }
      }
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Keep ScrollRevealCard as alias for CyberCard
export const ScrollRevealCard = CyberCard;
