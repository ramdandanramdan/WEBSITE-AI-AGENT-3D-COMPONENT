"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { GlitchText } from "./ScrollReveal";

const faqs = [
  { q: "Apakah perlu basic coding sebelum ikut?", a: "Tidak perlu! Kami mulai dari nol. Modul pertama membahas dasar Python dan konsep programming yang dibutuhkan untuk AI." },
  { q: "Berapa lama satu sesi kelas?", a: "Setiap sesi berlangsung 2-3 jam, termasuk teori singkat (30 menit) dan praktik hands-on (1.5-2 jam)." },
  { q: "Apakah dapat sertifikat?", a: "Ya! Setelah menyelesaikan semua modul dan proyek akhir, kamu akan mendapatkan sertifikat RamadanClass.AI yang diakui industri." },
  { q: "Bagaimana jika tertinggal kelas?", a: "Semua sesi direkam dan bisa diakses kapan saja. Plus, ada session review mingguan untuk mengejar materi yang tertinggal." },
  { q: "Apakah ada jaminan kerja?", a: "Untuk paket Enterprise, kami menyediakan job guarantee dengan partner perusahaan tech terkemuka di Indonesia." },
];

function FAQItem({ f, index }: { f: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative rounded-xl overflow-hidden"
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        background: "rgba(13,18,36,0.6)",
        backdropFilter: "blur(20px)",
        border: hovering ? "1px solid rgba(79,140,255,0.2)" : "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovering ? "0 0 20px rgba(79,140,255,0.08)" : "none",
      }}
    >
      {/* Cursor glow */}
      {hovering && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(79,140,255,0.1), transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Corner brackets on hover */}
      {hovering && (
        <>
          <div style={{ position: "absolute", top: 6, left: 6, width: 10, height: 10, borderTop: "1.5px solid rgba(79,140,255,0.4)", borderLeft: "1.5px solid rgba(79,140,255,0.4)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 6, right: 6, width: 10, height: 10, borderTop: "1.5px solid rgba(79,140,255,0.4)", borderRight: "1.5px solid rgba(79,140,255,0.4)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 6, left: 6, width: 10, height: 10, borderBottom: "1.5px solid rgba(79,140,255,0.4)", borderLeft: "1.5px solid rgba(79,140,255,0.4)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 6, right: 6, width: 10, height: 10, borderBottom: "1.5px solid rgba(79,140,255,0.4)", borderRight: "1.5px solid rgba(79,140,255,0.4)", pointerEvents: "none" }} />
        </>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <button
          className="w-full flex items-center justify-between p-5 text-left pointer-events-auto"
          onClick={() => setOpen(!open)}
        >
          <span className="text-sm font-medium text-white pr-4">{f.q}</span>
          <svg className="w-4 h-4 text-[#BFC7D5] shrink-0 transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        <div className="overflow-hidden transition-all duration-400 ease-in-out" style={{ maxHeight: open ? "200px" : "0" }}>
          <div className="px-5 pb-5 text-sm text-[#BFC7D5] leading-relaxed">{f.a}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "transparent", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#BFC7D5]">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            <GlitchText intensity="low">Pertanyaan </GlitchText>
            <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">
              <GlitchText intensity="high">Umum</GlitchText>
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#BFC7D5] leading-relaxed">
            Semua yang perlu kamu tahu tentang RamadanClass.AI.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FAQItem key={i} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
