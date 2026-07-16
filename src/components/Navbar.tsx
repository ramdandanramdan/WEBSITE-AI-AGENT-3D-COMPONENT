"use client";

import { useState, useEffect } from "react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-auto"
      style={{
        background: "transparent",
        backdropFilter: scrolled ? "blur(40px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(40px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border border-[#4F8CFF] rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#4F8CFF] rounded-full" style={{boxShadow:"0 0 10px rgba(79,140,255,0.8)"}} />
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">RamadanClass</span>
            <span className="text-[#4F8CFF]">.AI</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#BFC7D5] hover:text-white transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="px-5 py-2 text-sm text-[#BFC7D5] hover:text-white transition-colors">
            Log In
          </a>
          <a
            href="#"
            className="px-5 py-2 text-sm font-medium text-white rounded-full transition-all duration-300"
            style={{             background: "transparent" }}
          >
            Get Started
          </a>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden mx-4 mt-2 rounded-2xl p-6"
          style={{
            background: "transparent",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#BFC7D5] hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
