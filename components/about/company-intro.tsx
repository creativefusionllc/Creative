"use client"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const highlights = [
  "State-of-the-art equipment including cinema-grade 8K cameras",
  "Professional-grade drones for aerial content",
  "Full in-house production capabilities",
  "Experienced team of creative professionals",
]

export function CompanyIntro() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="/creative-team-brainstorming-modern-office.jpg"
                    alt="Team Brainstorming"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/professional-camera-equipment-studio.jpg"
                    alt="Professional Equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/video-production-studio-professional.jpg"
                    alt="Production Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src="/digital-marketing-team-computers-office.jpg" alt="Digital Team" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1C1C1C] rounded-2xl p-6 shadow-2xl">
              <p className="text-5xl font-bold text-[#C4D600] text-center">15+</p>
              <p className="text-white/80 text-sm text-center uppercase tracking-wider">Years of Excellence</p>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4D600]/10 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#C4D600] rounded-full" />
              <span className="text-[#1C1C1C] text-sm font-medium">Who We Are</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-6 leading-tight">
              A Full-Service Creative Agency in the
              <span className="text-[#C4D600]"> Heart of UAE</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Creative Fusion LLC is a premier 360° digital agency and media production company headquartered in
                Sharjah Media City (SHAMS), UAE. We specialize in delivering comprehensive creative solutions that
                elevate brands and drive business growth.
              </p>
              <p>
                Our team combines artistic vision with technical expertise to create stunning visual content,
                cutting-edge websites, and impactful digital marketing campaigns. From high-end photography and
                videography to web development and brand strategy, we offer everything your brand needs under one roof.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#C4D600] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-[#1C1C1C] text-white hover:bg-[#2a2a2a] font-semibold h-14 px-8" asChild>
              <Link href="/services">
                Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
