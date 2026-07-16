"use client";

import dynamic from "next/dynamic";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AgentCards } from "@/components/AgentCards";
import { Workflow } from "@/components/Workflow";
import { Integrations } from "@/components/Integrations";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const SplineBackground = dynamic(
  () => import("@/components/SplineBackground"),
  { ssr: false }
);

const BackgroundPaths = dynamic(
  () => import("@/components/BackgroundPaths").then((m) => m.BackgroundPaths),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Fixed backgrounds - z-0 and z-10, behind everything */}
      <div className="fixed inset-0 z-0">
        <BackgroundPaths />
      </div>
      <SplineBackground />

      {/* Content on top - pointer-events-none so Spline receives cursor across whole page */}
      <div className="relative z-20 pointer-events-none">
        <Navbar />
        <Hero />
        <Features />
        <AgentCards />
        <Workflow />
        <Integrations />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
