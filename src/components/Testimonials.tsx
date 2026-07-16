"use client";

import { ScrollReveal, CyberCard, GlitchText } from "./ScrollReveal";

const testimonials = [
  { name: "Ahmad Rizky", role: "Fresh Graduate", company: "Universitas Indonesia", content: "Dari zero knowledge sampai bisa bikin AI agent yang auto-respons customer. Portfolioku sekarang jadi senjata utama melamar kerja." },
  { name: "Siti Nurhaliza", role: "Career Switcher", company: "Ex-Marketing", content: "Awalnya takut pindah ke tech, tapi RamdanClss.AI bikin perjalanan belajar jadi menyenangkan. Sekarang jadi ML Engineer!" },
  { name: "Budi Santoso", role: "Mahasiswa TI", company: "ITB", content: "Proyek robot otonom yang dibuat di kelas ini langsung dipresentasikan di konferensi nasional. Materinya out of the box banget." },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "transparent", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" />
              <span className="text-xs font-medium tracking-widest uppercase text-[#BFC7D5]">Testimoni</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              <GlitchText intensity="low">Dipercaya </GlitchText>
              <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">
                <GlitchText intensity="high">500+ Siswa</GlitchText>
              </span>
            </h2>
            <p className="text-base md:text-lg text-[#BFC7D5] leading-relaxed">
              Cerita nyata dari mereka yang sudah memulai perjalanan AI-nya bersama kami.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <CyberCard key={i} delay={i * 0.1}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-[#4F8CFF]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ))}
              </div>
              <p className="text-[#BFC7D5] leading-relaxed mb-6 text-sm">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: "transparent", border: "1px solid rgba(79,140,255,0.3)" }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-[#BFC7D5]">{t.role}, {t.company}</div>
                </div>
              </div>
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
}
