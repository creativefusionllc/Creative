"use client"

import { Play, Award, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Globe, value: "UAE", label: "Nationwide" },
]

export function AboutHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#1C1C1C]">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/counter-one-pattern.png')",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#C4D600]/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#C4D600]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#C4D600] rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">About Creative Fusion LLC</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              <span className="text-white">We Create</span>
              <br />
              <span className="text-[#C4D600]">Extraordinary</span>
              <br />
              <span className="text-white">Digital Experiences</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
              A UAE-based 360° digital agency and media production company, dedicated to transforming brands through
              cinematic visuals and powerful digital strategies since 2009.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                className="bg-[#C4D600] text-[#1C1C1C] hover:bg-[#b0c200] font-semibold h-14 px-8"
                asChild
              >
                <Link href="/contact">Work With Us</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent h-14 px-8"
                asChild
              >
                <Link href="/portfolio">
                  <Play className="mr-2 h-5 w-5" /> Watch Showreel
                </Link>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-[#C4D600]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image/Video Area */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img src="/modern-creative-agency-office-team-working-profess.jpg" alt="Creative Fusion Team" className="w-full h-full object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent" />

              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#C4D600] rounded-xl flex items-center justify-center">
                    <Award className="h-7 w-7 text-[#1C1C1C]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">SHAMS Licensed</p>
                    <p className="text-white/60 text-sm">Sharjah Media City Free Zone</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#C4D600]/30 rounded-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-[#C4D600]/20 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
