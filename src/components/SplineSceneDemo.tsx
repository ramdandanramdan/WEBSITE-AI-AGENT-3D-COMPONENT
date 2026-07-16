'use client'

import dynamic from 'next/dynamic'
import { Card } from "@/components/ui/card"

const Spotlight = dynamic(
  () => import("@/components/ui/spotlight").then((m) => m.Spotlight),
  { ssr: false }
)

const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((m) => m.SplineScene),
  { ssr: false }
)

export function SplineSceneDemo() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
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
              3D Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Interactive{" "}
            <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-[#6BE8FF] bg-clip-text text-transparent">
              3D World
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#BFC7D5] leading-relaxed">
            Bring your UI to life with beautiful 3D scenes. Create immersive
            experiences that capture attention.
          </p>
        </div>

        <Card className="w-full h-[500px] relative overflow-hidden rounded-2xl border border-white/[0.08]">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Interactive 3D
              </h3>
              <p className="mt-4 text-neutral-300 max-w-lg text-lg leading-relaxed">
                Bring your UI to life with beautiful 3D scenes. Create
                immersive experiences that capture attention and enhance your
                design.
              </p>
              <div className="mt-8 flex gap-4">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    background: "transparent",
                    boxShadow: "0 0 30px rgba(79,140,255,0.3)",
                  }}
                >
                  Explore Agents
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-full transition-all duration-300 hover:scale-105"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  Watch Video
                </a>
              </div>
            </div>

            {/* Right - 3D Spline Scene */}
            <div className="flex-1 relative hidden md:block">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
