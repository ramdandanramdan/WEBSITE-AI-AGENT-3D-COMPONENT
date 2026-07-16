"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden pointer-events-auto">
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "rgba(13,18,36,0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#4F8CFF]" />
          <span className="text-xs font-medium tracking-widest uppercase text-[#BFC7D5]">
            Kelas AI Agent 2025
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8">
          <span className="block text-white mb-3">Belajar Membuat</span>
          <span className="block bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">
            Robot & AI Agent
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#BFC7D5] max-w-2xl mx-auto mb-12 leading-relaxed">
          Platform pelatihan AI interaktif. Pelajari cara membangun robot otonom,
          AI agents, dan sistem cerdas dari nol hingga mahir.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-white rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #4F8CFF, #6BE8FF)",
              boxShadow: "0 0 30px rgba(79,140,255,0.3)",
            }}
          >
            Mulai Belajar
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#workflow"
            className="inline-flex items-center px-8 py-3.5 text-sm font-medium text-white rounded-full transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Lihat Kurikulum
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 md:gap-12 text-sm text-[#BFC7D5]">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">500+</div>
            <div>Siswa</div>
          </div>
          <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">50+</div>
            <div>Proyek</div>
          </div>
          <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">100%</div>
            <div>Hands-on</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-8 rounded-full flex justify-center pt-1.5" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
          <div className="w-1 h-2 bg-[#4F8CFF] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
