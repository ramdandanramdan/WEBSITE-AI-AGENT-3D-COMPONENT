"use client";

const steps = [
  { step: "01", title: "Dasar AI & Python", desc: "Mulai dari fundamental - Python, linear algebra, probability, dan pengenalan machine learning." },
  { step: "02", title: "Bangun AI Agent Pertama", desc: "Pelajari arsitektur agent, reasoning loops, dan buat agent pertama yang bisa menjawab pertanyaan." },
  { step: "03", title: "Multi-Agent Systems", desc: "Kembangkan sistem multi-agent yang bisa berkolaborasi menyelesaikan tugas kompleks." },
  { step: "04", title: "Robot Otonom", desc: "Integrasikan AI ke robot fisik - sensor, navigasi, dan pengambilan keputusan real-time." },
];

export function Workflow() {
  return (
    <section id="workflow" className="py-24 md:py-32 px-6 pointer-events-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "transparent", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#BFC7D5]">Jalur Belajar</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Dari <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">Pemula</span> hingga Mahir
          </h2>
          <p className="text-base md:text-lg text-[#BFC7D5] leading-relaxed">
            4 tahap terstruktur untuk menguasai AI agents dan robotika otonom.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-px hidden md:block" style={{ background: "linear-gradient(to bottom, #4F8CFF, #6BE8FF, transparent)" }} />

          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-6 md:gap-10">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10" style={{ background: "transparent", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="text-lg font-bold bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">{s.step}</span>
                  </div>
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-[#BFC7D5] leading-relaxed max-w-lg text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
