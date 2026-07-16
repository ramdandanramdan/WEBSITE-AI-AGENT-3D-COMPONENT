"use client";

import { useState } from "react";

const faqs = [
  { q: "Apakah perlu basic coding sebelum ikut?", a: "Tidak perlu! Kami mulai dari nol. Modul pertama membahas dasar Python dan konsep programming yang dibutuhkan untuk AI." },
  { q: "Berapa lama satu sesi kelas?", a: "Setiap sesi berlangsung 2-3 jam, termasuk teori singkat (30 menit) dan praktik hands-on (1.5-2 jam)." },
  { q: "Apakah dapat sertifikat?", a: "Ya! Setelah menyelesaikan semua modul dan proyek akhir, kamu akan mendapatkan sertifikat RamadanClass.AI yang diakui industri." },
  { q: "Bagaimana jika tertinggal kelas?", a: "Semua sesi direkam dan bisa diakses kapan saja. Plus, ada session review mingguan untuk mengejar materi yang tertinggal." },
  { q: "Apakah ada jaminan kerja?", a: "Untuk paket Enterprise, kami menyediakan job guarantee dengan partner perusahaan tech terkemuka di Indonesia." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 px-6 pointer-events-auto">
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "transparent", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#BFC7D5]">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Pertanyaan <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">Umum</span>
          </h2>
          <p className="text-base md:text-lg text-[#BFC7D5] leading-relaxed">
            Semua yang perlu kamu tahu tentang RamadanClass.AI.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ background: "transparent", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer pointer-events-auto"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-sm font-medium text-white pr-4">{f.q}</span>
                <svg className="w-4 h-4 text-[#BFC7D5] shrink-0 transition-transform duration-300" style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div className="overflow-hidden transition-all duration-400 ease-in-out" style={{ maxHeight: openIndex === i ? "200px" : "0" }}>
                <div className="px-5 pb-5 text-sm text-[#BFC7D5] leading-relaxed">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
