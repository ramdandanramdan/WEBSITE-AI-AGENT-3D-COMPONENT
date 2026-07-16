"use client";

import { ScrollReveal } from "./ScrollReveal";

export function Footer() {
  const productLinks = ["Kurikulum", "Modul", "Harga", "Tech Stack", "Proyek"];
  const companyLinks = ["Tentang Kami", "Blog", "Karir", "Press", "Mitra"];
  const legalLinks = ["Kebijakan Privasi", "Syarat Layanan", "Keamanan", "Kebijakan Cookie"];

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="pointer-events-auto">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 border border-[#4F8CFF] rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#4F8CFF] rounded-full" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">RamadanClass</span>
                <span className="text-[#4F8CFF]">.AI</span>
              </span>
            </a>
            <p className="text-sm text-[#BFC7D5] leading-relaxed max-w-sm mb-6">
              Platform pelatihan AI modern. Belajar membuat robot, AI agents, dan sistem otonom dari nol hingga mahir.
            </p>
          </div>

          {[
            { title: "Product", links: productLinks },
            { title: "Company", links: companyLinks },
            { title: "Legal", links: legalLinks },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[#BFC7D5] hover:text-white transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs text-[#BFC7D5]">&copy; {new Date().getFullYear()} RamadanClass.AI. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-[#BFC7D5]">Platform aktif</span>
          </div>
        </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
