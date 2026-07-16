"use client";

import { ReactNode } from "react";
import { ScrollReveal, ScrollRevealCard } from "./ScrollReveal";

function SectionHeading({
  badge,
  title,
  description,
}: {
  badge?: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      {badge && (
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: "transparent",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" />
          <span className="text-xs font-medium tracking-widest uppercase text-[#BFC7D5]">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-[#BFC7D5] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

const FEATURES = [
  {
    icon: "brain",
    title: "AI Reasoning",
    desc: "Pelajari cara membangun sistem AI yang bisa berpikir logis, membuat keputusan, dan menyelesaikan masalah secara otonom.",
  },
  {
    icon: "workflow",
    title: "Multi-Agent Systems",
    desc: "Kuasai arsitektur multi-agent di mana beberapa AI bekerja sama menyelesaikan tugas kompleks secara paralel.",
  },
  {
    icon: "zap",
    title: "Real-Time Processing",
    desc: "Bangun sistem AI dengan kecepatan inferensi tinggi menggunakan arsitektur transformer yang optimal.",
  },
  {
    icon: "code",
    title: "Hands-on Coding",
    desc: "Setiap sesi diawali dengan coding langsung. Tidak hanya teori, tapi praktik membangun robot dan AI dari nol.",
  },
  {
    icon: "robot",
    title: "Robot Otonom",
    desc: "Pelajari integrasi AI ke dalam robot fisik - sensor, aktuator, navigasi, dan pengambilan keputusan real-time.",
  },
  {
    icon: "chart",
    title: "MLOps & Deployment",
    desc: "Kuasai pipeline dari training model hingga deployment produksi - monitoring, scaling, dan iterasi model.",
  },
];

function CardGlass({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(79,140,255,0.08)] ${className}`}
      style={{
        background: "transparent",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

const ICONS: Record<string, string> = {
  brain: "M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7.5L12 20l3-3.5c2-2 4-4.5 4-7.5a7 7 0 0 0-7-7z",
  workflow: "M4 6h4v4H4zM14 6h4v4h-4zM9 14h4v4H9zM14 14h4v4h-4z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  robot: "M12 2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1l2 3h-2l-2-3h-2l-2 3H9l-2-3H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2z",
  chart: "M3 20h18M6 16v-4M10 16V8M14 16V6M18 16V4",
};

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            badge="Kurikulum"
            title={<>Materi <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">Hands-on</span> Terlengkap</>}
            description="Semua yang kamu butuhkan untuk menguasai AI agents dan robotika otonom."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <ScrollRevealCard key={i} delay={i * 0.08}>
              <CardGlass>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "transparent", border: "1px solid rgba(79,140,255,0.2)" }}
              >
                <svg className="w-5 h-5 text-[#4F8CFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICONS[f.icon]} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">{f.title}</h3>
              <p className="text-sm text-[#BFC7D5] leading-relaxed">{f.desc}</p>
            </CardGlass>
            </ScrollRevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
