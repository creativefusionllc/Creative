"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"

const highlights = ["15+ Years of Excellence", "500+ Projects Delivered", "UAE-Wide Coverage", "SHAMS Licensed"]

export function ServicesHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#1C1C1C]">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/counter-one-pattern.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C4D600]/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C4D600]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#C4D600]" />
              <span className="text-white/80 text-sm font-medium">18+ Service Categories</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="text-white">Transform Your</span>
              <br />
              <span className="text-[#C4D600]">Business Vision</span>
              <br />
              <span className="text-white">Into Reality</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
              From stunning media production to powerful digital solutions, we offer comprehensive services that elevate
              your brand and drive measurable results.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#C4D600] flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#C4D600] text-[#1C1C1C] hover:bg-[#b0c200] font-semibold h-14 px-8"
                asChild
              >
                <Link href="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent h-14 px-8"
                asChild
              >
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>

          {/* Right - Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
              <p className="text-5xl font-bold text-[#C4D600] mb-2">15+</p>
              <p className="text-white/60 text-sm uppercase tracking-wider">Years Experience</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
              <p className="text-5xl font-bold text-white mb-2">500+</p>
              <p className="text-white/60 text-sm uppercase tracking-wider">Projects Done</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
              <p className="text-5xl font-bold text-white mb-2">18</p>
              <p className="text-white/60 text-sm uppercase tracking-wider">Service Categories</p>
            </div>
            <div className="bg-[#C4D600]/10 backdrop-blur-sm border border-[#C4D600]/30 rounded-2xl p-8 text-center">
              <p className="text-5xl font-bold text-[#C4D600] mb-2">UAE</p>
              <p className="text-white/60 text-sm uppercase tracking-wider">Coverage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Explore Services</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
