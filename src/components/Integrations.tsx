"use client";

const tools = [
  { name: "Python", category: "Bahasa Program" },
  { name: "TensorFlow", category: "Deep Learning" },
  { name: "PyTorch", category: "ML Framework" },
  { name: "ROS", category: "Robotika" },
  { name: "OpenCV", category: "Computer Vision" },
  { name: "LangChain", category: "LLM Agents" },
  { name: "Hugging Face", category: "Model Hub" },
  { name: "Arduino", category: "Hardware" },
];

export function Integrations() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "transparent", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse-glow" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#BFC7D5]">Tech Stack</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Tools <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">Industry-Standard</span>
          </h2>
          <p className="text-base md:text-lg text-[#BFC7D5] leading-relaxed">
            Pelajari tools yang digunakan oleh engineer AI di seluruh dunia.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {tools.map((int, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-500 cursor-pointer"
              style={{
                background: "transparent",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "transparent" }}>
                <div className="w-5 h-5 rounded bg-[#4F8CFF] opacity-60" />
              </div>
              <span className="text-sm font-medium text-white">{int.name}</span>
              <span className="text-[11px] text-[#BFC7D5]">{int.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
