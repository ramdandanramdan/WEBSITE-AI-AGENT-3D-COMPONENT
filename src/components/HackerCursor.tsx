"use client";

import { useEffect, useRef, useCallback } from "react";

const CODE_CHARS = ["0", "1", "{", "}", "<", ">", "/", "\\", ";", "=", "#", "[", "]", "█", "▓", "░"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  char: string;
  size: number;
}

export function HackerCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const prevMouse = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const particles = useRef<Particle[]>([]);
  const rafId = useRef<number>(0);

  const spawnParticle = useCallback((x: number, y: number) => {
    if (particles.current.length > 30) return;
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.3 + Math.random() * 1.2;
    particles.current.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.5,
      life: 1,
      maxLife: 40 + Math.random() * 30,
      char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
      size: 8 + Math.random() * 6,
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mx = mouse.current.x;
    const my = mouse.current.y;

    smoothPos.current.x += (mx - smoothPos.current.x) * 0.12;
    smoothPos.current.y += (my - smoothPos.current.y) * 0.12;

    const sx = smoothPos.current.x;
    const sy = smoothPos.current.y;

    const dx = mx - prevMouse.current.x;
    const dy = my - prevMouse.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    prevMouse.current.x = mx;
    prevMouse.current.y = my;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Horizontal line through cursor
    ctx.strokeStyle = "rgba(79, 140, 255, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx - 28, sy);
    ctx.lineTo(sx - 8, sy);
    ctx.moveTo(sx + 8, sy);
    ctx.lineTo(sx + 28, sy);
    ctx.stroke();

    // Vertical line through cursor
    ctx.beginPath();
    ctx.moveTo(sx, sy - 28);
    ctx.lineTo(sx, sy - 8);
    ctx.moveTo(sx, sy + 8);
    ctx.lineTo(sx, sy + 28);
    ctx.stroke();

    // Corner brackets
    const bSize = 12;
    ctx.strokeStyle = "rgba(107, 232, 255, 0.4)";
    ctx.lineWidth = 1.5;
    // top-left
    ctx.beginPath();
    ctx.moveTo(sx - 20, sy - 14);
    ctx.lineTo(sx - 20, sy - 20);
    ctx.lineTo(sx - 14, sy - 20);
    ctx.stroke();
    // top-right
    ctx.beginPath();
    ctx.moveTo(sx + 14, sy - 20);
    ctx.lineTo(sx + 20, sy - 20);
    ctx.lineTo(sx + 20, sy - 14);
    ctx.stroke();
    // bottom-left
    ctx.beginPath();
    ctx.moveTo(sx - 20, sy + 14);
    ctx.lineTo(sx - 20, sy + 20);
    ctx.lineTo(sx - 14, sy + 20);
    ctx.stroke();
    // bottom-right
    ctx.beginPath();
    ctx.moveTo(sx + 14, sy + 20);
    ctx.lineTo(sx + 20, sy + 20);
    ctx.lineTo(sx + 20, sy + 14);
    ctx.stroke();

    // Center dot
    ctx.fillStyle = "rgba(107, 232, 255, 0.9)";
    ctx.fillRect(sx - 1.5, sy - 1.5, 3, 3);

    // Trail lines (motion)
    if (speed > 2) {
      const trailLen = Math.min(speed * 0.8, 30);
      const angle = Math.atan2(dy, dx);
      ctx.strokeStyle = `rgba(79, 140, 255, ${Math.min(speed * 0.01, 0.3)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx - Math.cos(angle) * trailLen, sy - Math.sin(angle) * trailLen);
      ctx.stroke();
    }

    // Spawn particles on movement
    if (speed > 3 && Math.random() > 0.4) {
      spawnParticle(mx, my);
    }

    // Draw & update particles
    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.life++;

      const alpha = 1 - p.life / p.maxLife;
      if (alpha <= 0) {
        particles.current.splice(i, 1);
        continue;
      }

      ctx.font = `${p.size}px monospace`;
      ctx.fillStyle = `rgba(79, 140, 255, ${alpha * 0.6})`;
      ctx.fillText(p.char, p.x, p.y);
    }

    // Scan line
    ctx.fillStyle = "rgba(79, 140, 255, 0.03)";
    ctx.fillRect(0, sy - 0.5, canvas.width, 1);

    rafId.current = requestAnimationFrame(animate);
  }, [spawnParticle]);

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
