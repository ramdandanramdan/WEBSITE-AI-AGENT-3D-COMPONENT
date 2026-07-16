"use client";

import { ScrollReveal, CyberCard, GlitchText } from "./ScrollReveal";

const agents = [
  { name: "AI Reasoning Agent", role: "Logika & Keputusan", desc: "Bangun agent yang bisa menganalisis masalah, membuat rencana, dan mengambil keputusan secara otonom.", caps: ["Natural Language", "Goal Decomposition", "Problem Solving"], color: "#4F8CFF" },
  { name: "Code Agent", role: "Development", desc: "Kembangkan agent yang bisa menulis, review, dan deploy kode production-quality di stack apapun.", caps: ["Multi-language", "Auto-debugging", "Test Generation"], color: "#6BE8FF" },
  { name: "Data Agent", role: "Analytics", desc: "Pelajari cara membangun agent yang memproses, mentransformasi, dan mengekstrak insight dari data.", caps: ["ETL Pipelines", "Pattern Recognition", "Anomaly Detection"], color: "#7DD3FC" },
  { name: "Orchestrator Agent", role: "Koordinasi", desc: "Kuasai cara mengelola workflow multi-agent dengan seamless task handoffs.", caps: ["Task Routing", "Parallel Execution", "Load Balancing"], color: "#4F8CFF" },
  { name: "Interface Agent", role: "Integrasi", desc: "Bangun agent yang berinteraksi dengan API, database, dan service eksternal secara context-aware.", caps: ["API Integration", "Form Filling", "Web Scraping"], color: "#6BE8FF" },
  { name: "Robot Agent", role: "Fisik & Otonom", desc: "Integrasikan AI ke robot fisik - navigasi, manipulasi objek, dan pengambilan keputusan real-time.", caps: ["Sensor Fusion", "Path Planning", "Object Manipulation"], color: "#7DD3FC" },
];

export function AgentCards() {
  return (
    <section id="agents" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: "transparent", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" />
              <span className="text-xs font-medium tracking-widest uppercase text-[#BFC7D5]">Modul Belajar</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              <GlitchText intensity="low">Jenis </GlitchText>
              <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">
                <GlitchText intensity="high">AI Agents</GlitchText>
              </span>
              <GlitchText intensity="low"> yang Dipelajari</GlitchText>
            </h2>
            <p className="text-base md:text-lg text-[#BFC7D5] leading-relaxed">
              Setiap modul dirancang untuk memberikan pemahaman mendalam tentang spesialisasi AI tertentu.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((a, i) => (
            <CyberCard key={i} delay={i * 0.08}>
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "transparent", border: `1px solid ${a.color}30` }}
                >
                  <div className="w-5 h-5 rounded-full" style={{ background: a.color }} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{a.name}</h3>
                  <span className="text-xs font-medium" style={{ color: a.color }}>{a.role}</span>
                </div>
              </div>
              <p className="text-sm text-[#BFC7D5] leading-relaxed mb-4">{a.desc}</p>
              <div className="flex flex-wrap gap-2">
                {a.caps.map((c, j) => (
                  <span key={j} className="text-[11px] px-2.5 py-1 rounded-full text-[#BFC7D5]" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
}
