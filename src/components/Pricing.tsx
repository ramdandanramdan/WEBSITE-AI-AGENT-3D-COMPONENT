"use client";

const plans = [
  {
    name: "Starter",
    price: "Rp 299K",
    period: "/bulan",
    desc: "Cocok untuk pemula yang ingin belajar dasar AI agents.",
    features: ["Akses 3 Modul Dasar", "Proyek Praktik", "Video Tutorial", "Community Access", "SertifikatCompletion"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "Rp 799K",
    period: "/bulan",
    desc: "Untuk yang serius ingin menguasai AI agents dan robotika.",
    features: ["Akses Semua Modul", "30+ Proyek Hands-on", "Live Session Weekly", "Mentoring 1-on-1", "Robot Kit Included", "Portfolio Review"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Pelatihan khusus untuk tim dan organisasi.",
    features: ["Custom Curriculum", "Dedicated Mentor", "On-site Training", "Corporate License", "Project Consulting", "Job Guarantee"],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "transparent", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#BFC7D5]">Paket Harga</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Investasi <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">Masa Depan</span>
          </h2>
          <p className="text-base md:text-lg text-[#BFC7D5] leading-relaxed">
            Mulai dari yang kecil, scale sesuai progress belajarmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 relative transition-all duration-500"
              style={{
                background: "transparent",
                backdropFilter: "blur(20px)",
                border: p.highlighted ? "1px solid rgba(79,140,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: p.highlighted ? "0 0 40px rgba(79,140,255,0.08)" : "none",
              }}
            >
              {p.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: "transparent", border: "1px solid rgba(79,140,255,0.3)" }}
                >
                  Paling Populer
                </div>
              )}
              <h3 className="text-lg font-semibold text-white mb-2">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-white">{p.price}</span>
                {p.period && <span className="text-sm text-[#BFC7D5]">{p.period}</span>}
              </div>
              <p className="text-sm text-[#BFC7D5] mb-6 leading-relaxed">{p.desc}</p>
              <ul className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-[#BFC7D5]">
                    <svg className="w-4 h-4 text-[#4F8CFF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="block w-full text-center px-8 py-3.5 text-sm font-medium text-white rounded-full transition-all duration-300"
                style={
                  p.highlighted
                    ? { background: "linear-gradient(135deg, #4F8CFF, #6BE8FF)", boxShadow: "0 0 30px rgba(79,140,255,0.3)" }
                    : { border: "1px solid rgba(255,255,255,0.15)" }
                }
              >
                {p.highlighted ? "Mulai Sekarang" : "Pilih Paket"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
