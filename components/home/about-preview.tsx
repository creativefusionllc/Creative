"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Target, Lightbulb, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-[#1C1C1C] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C4D600]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image & Experience Badge */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thoughtful-female-boss-sitting-on-armchair-in-mode-2025-03-26-18-03-22-utc-bwHifxr986rWnAb8auBZBApbVZIraG.jpg"
                alt="Creative Fusion Team Collaboration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#C4D600] rounded-2xl p-6 shadow-xl">
              <div className="text-4xl font-bold text-[#1C1C1C]">15+</div>
              <div className="text-sm text-[#1C1C1C]/70 font-medium">
                Years of
                <br />
                Excellence
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#C4D600]/30 rounded-2xl" />
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <p className="text-[#C4D600] font-semibold tracking-wide uppercase text-sm mb-3">About Creative Fusion</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Where Creativity
                <br />
                <span className="text-[#C4D600]">Meets Strategy</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Founded in 2009 and headquartered in Sharjah Media City (SHAMS), Creative Fusion LLC has evolved into
                one of UAE's most trusted full-service creative agencies.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              {[
                { icon: Target, text: "Strategic approach tailored to your business goals" },
                { icon: Lightbulb, text: "Creative excellence with data-driven insights" },
                { icon: Rocket, text: "End-to-end solutions from concept to execution" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C4D600]/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#C4D600]" />
                  </div>
                  <p className="text-gray-300 pt-2">{item.text}</p>
                </div>
              ))}
            </div>

            {/* License Info */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <CheckCircle className="w-6 h-6 text-[#C4D600]" />
              <div>
                <p className="text-white font-medium">SHAMS Licensed Agency</p>
                <p className="text-gray-500 text-sm">License No: 2430411.01</p>
              </div>
            </div>

            <Button
              size="lg"
              className="gap-2 bg-transparent border-2 border-[#C4D600] text-[#C4D600] hover:bg-[#C4D600] hover:text-[#1C1C1C] font-semibold h-14 px-8 rounded-full"
              asChild
            >
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
