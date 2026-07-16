"use client";

import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { label: "Kurikulum", href: "#features" },
  { label: "Modul", href: "#agents" },
  { label: "Jalur Belajar", href: "#workflow" },
  { label: "Harga", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("00:00:00");
  const [glitchText, setGlitchText] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // Random glitch text
  useEffect(() => {
    const words = ["SYS.OK", "AI.READY", "NET.SYNC", "BOT.ACTIVE", "CORE.RUN", "NODE.UP"];
    let idx = 0;
    const tick = () => {
      setGlitchText(words[idx % words.length]);
      idx++;
    };
    tick();
    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-auto"
      style={{
        background: scrolled ? "rgba(5, 8, 22, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(30px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(30px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(79, 140, 255, 0.12)"
          : "1px solid transparent",
      }}
    >
      {/* Top scan line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: scrolled
            ? "linear-gradient(90deg, transparent, rgba(79,140,255,0.4), rgba(107,232,255,0.3), rgba(79,140,255,0.4), transparent)"
            : "transparent",
          transition: "background 0.5s",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 pointer-events-auto">
          <div className="relative w-9 h-9">
            {/* Outer hexagon */}
            <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full">
              <polygon
                points="18,1 33,9.5 33,26.5 18,35 3,26.5 3,9.5"
                fill="none"
                stroke="rgba(79,140,255,0.5)"
                strokeWidth="1.2"
              />
              <polygon
                points="18,5 29,11 29,25 18,31 7,25 7,11"
                fill="none"
                stroke="rgba(107,232,255,0.25)"
                strokeWidth="0.8"
                strokeDasharray="3 2"
              />
            </svg>
            {/* Center glow node */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-2 h-2 rounded-full bg-[#4F8CFF]"
                style={{ boxShadow: "0 0 10px rgba(79,140,255,0.9), 0 0 20px rgba(79,140,255,0.4)" }}
              />
            </div>
            {/* Orbiting dot */}
            <div className="absolute inset-[-4px] animate-spin-slow" style={{ borderRadius: "50%" }}>
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6BE8FF]"
                style={{ boxShadow: "0 0 6px rgba(107,232,255,0.8)" }}
              />
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">Ramdan</span>
            <span className="text-[#4F8CFF]">Clss</span>
            <span className="text-[#6BE8FF]">.AI</span>
          </span>
        </a>

        {/* Nav links - desktop */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm text-[#BFC7D5] hover:text-white transition-colors duration-300 pointer-events-auto group"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-1 left-4 right-4 h-px bg-[#4F8CFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* Status bar - desktop */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[rgba(79,140,255,0.5)] tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse" />
            <span>{glitchText}</span>
          </div>
          <div className="text-[10px] font-mono text-[rgba(107,232,255,0.3)] tracking-wider">
            {time}
          </div>
          <a
            href="#"
            className="px-5 py-2 text-sm font-medium text-white rounded-lg transition-all duration-300 pointer-events-auto"
            style={{
              background: "linear-gradient(135deg, rgba(79,140,255,0.2), rgba(107,232,255,0.1))",
              border: "1px solid rgba(79,140,255,0.3)",
              boxShadow: "0 0 15px rgba(79,140,255,0.1)",
            }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2 pointer-events-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className="w-full h-px bg-[#4F8CFF] block transition-all duration-300"
              style={{
                transform: mobileOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
              }}
            />
            <span
              className="w-full h-px bg-[#4F8CFF] block transition-all duration-300"
              style={{
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="w-full h-px bg-[#4F8CFF] block transition-all duration-300"
              style={{
                transform: mobileOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden mx-4 mt-2 rounded-2xl p-6 pointer-events-auto"
          style={{
            background: "rgba(5, 8, 22, 0.95)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(79, 140, 255, 0.15)",
          }}
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#BFC7D5] hover:text-white hover:bg-[rgba(79,140,255,0.08)] py-3 px-4 rounded-lg transition-all duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(79,140,255,0.1)" }}>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[rgba(79,140,255,0.5)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse" />
              {glitchText}
            </div>
            <div className="text-[10px] font-mono text-[rgba(107,232,255,0.3)]">{time}</div>
          </div>
        </div>
      )}
    </nav>
  );
}
