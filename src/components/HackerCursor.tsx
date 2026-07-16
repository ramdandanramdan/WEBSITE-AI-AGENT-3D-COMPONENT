"use client";

import { useEffect, useRef, useCallback } from "react";

export function HackerCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const smooth = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.15;
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.15;

    const x = smooth.current.x;
    const y = smooth.current.y;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Horizontal line
    ctx.strokeStyle = "rgba(79, 140, 255, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 24, y);
    ctx.lineTo(x - 6, y);
    ctx.moveTo(x + 6, y);
    ctx.lineTo(x + 24, y);
    ctx.stroke();

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(x, y - 24);
    ctx.lineTo(x, y - 6);
    ctx.moveTo(x, y + 6);
    ctx.lineTo(x, y + 24);
    ctx.stroke();

    // Center dot
    ctx.fillStyle = "rgba(79, 140, 255, 0.7)";
    ctx.fillRect(x - 1, y - 1, 2, 2);

    // Glitch offset lines (subtle)
    const t = Date.now() * 0.003;
    const glitchX = Math.sin(t * 1.7) * 2;
    const glitchY = Math.cos(t * 2.3) * 1.5;

    ctx.strokeStyle = "rgba(107, 232, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 20 + glitchX, y - 1);
    ctx.lineTo(x + 20 + glitchX, y - 1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - 16 - glitchX, y + 2 + glitchY);
    ctx.lineTo(x + 16 - glitchX, y + 2 + glitchY);
    ctx.stroke();

    // Random error lines on movement
    const dx = mx - x;
    const dy = my - y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 4 && Math.random() > 0.7) {
      const len = 8 + Math.random() * 20;
      const ox = (Math.random() - 0.5) * 30;
      const oy = (Math.random() - 0.5) * 30;
      ctx.strokeStyle = `rgba(79, 140, 255, ${0.1 + Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.moveTo(mx + ox - len / 2, my + oy);
      ctx.lineTo(mx + ox + len / 2, my + oy);
      ctx.stroke();
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}
