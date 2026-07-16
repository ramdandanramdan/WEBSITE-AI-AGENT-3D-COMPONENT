"use client";

import { ArrowRight } from "lucide-react";
import { ScrollRevealRobot } from "./ScrollReveal";

export function CTA() {
  return (
    <section className="py-24 md:py-32 px-6 pointer-events-auto">
      <div className="max-w-4xl mx-auto text-center relative">
        <ScrollRevealRobot>
          <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-white mb-3">Siap Memulai</span>
            <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">Perjalanan AI-mu?</span>
          </h2>
          <p className="text-lg text-[#BFC7D5] max-w-xl mx-auto mb-10 leading-relaxed">
            Bergabung dengan 500+ siswa yang sudah memulai karir AI-nya. Daftar sekarang dan dapatkan akses ke materi eksklusif.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-white rounded-full transition-all duration-300 hover:scale-105 pointer-events-auto" style={{ background: "linear-gradient(135deg, #4F8CFF, #6BE8FF)", boxShadow: "0 0 30px rgba(79,140,255,0.3)" }}>
              Daftar Sekarang <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="inline-flex items-center px-8 py-3.5 text-sm font-medium text-white rounded-full transition-all duration-300 hover:scale-105 pointer-events-auto" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
              Konsultasi Gratis
            </a>
          </div>
          <p className="text-xs text-[#BFC7D5] mt-6 opacity-60">Garansi uang kembali 7 hari · Tanpa kartu kredit · Bisa cancel kapan saja</p>
          </div>
        </ScrollRevealRobot>
      </div>
    </section>
  );
}
