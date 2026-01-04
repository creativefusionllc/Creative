"use client"

import { Target, TrendingUp, Users, Zap, Shield, HeartHandshake } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Strategic Approach",
    description: "Data-driven strategies tailored to your unique business goals and market position.",
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI",
    description: "Every campaign is designed to deliver trackable results that impact your bottom line.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "40+ years combined experience across creative, digital, and technology disciplines.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Efficient workflows deliver quality results without compromising timelines.",
  },
  {
    icon: Shield,
    title: "Full Ownership",
    description: "Complete project ownership with transparent communication at every stage.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term Partnership",
    description: "We invest in your success with ongoing support and continuous improvement.",
  },
]

export function WhyChooseSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-[#C4D600] font-medium tracking-widest uppercase text-sm mb-3">Why Creative Fusion</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{"We Merge Art\n with Technology"}</h2>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C4D600] mb-6">to Deliver Results</h2>
            <p className="text-white/70 text-sm lg:text-base leading-relaxed mb-8">
              Partnering to Achieve Creative & Business Goals
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.slice(0, 4).map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#C4D600]/20 rounded-lg flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5 text-[#C4D600]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                    <p className="text-xs text-white/60 mt-1 line-clamp-2">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="bg-[#1C1C1C] border border-white/10 text-white p-6 rounded-2xl hover:border-[#C4D600]/50 transition-colors">
                <div className="text-3xl lg:text-4xl font-bold text-[#C4D600] mb-2">98%</div>
                <p className="text-sm text-white/60">Client Satisfaction Rate</p>
              </div>
              <div className="bg-[#C4D600] text-[#1C1C1C] p-6 rounded-2xl">
                <div className="text-3xl lg:text-4xl font-bold mb-2">24/7</div>
                <p className="text-sm text-[#1C1C1C]/70">Support Available</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-[#C4D600] text-[#1C1C1C] p-6 rounded-2xl">
                <div className="text-3xl lg:text-4xl font-bold mb-2">3x</div>
                <p className="text-sm text-[#1C1C1C]/70">Average ROI Increase</p>
              </div>
              <div className="bg-[#1C1C1C] border border-white/10 text-white p-6 rounded-2xl hover:border-[#C4D600]/50 transition-colors">
                <div className="text-3xl lg:text-4xl font-bold text-[#C4D600] mb-2">100%</div>
                <p className="text-sm text-white/60">Project Delivery Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
