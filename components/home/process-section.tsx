"use client"

import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Research",
    description: "We dive deep into understanding your brand, audience, and goals to create a solid foundation.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy & Planning",
    description: "Our team crafts a comprehensive strategy tailored to your unique needs and market position.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Creation & Execution",
    description: "We bring your vision to life with stunning visuals, powerful content, and seamless development.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Growth & Optimization",
    description: "We continuously monitor, analyze, and optimize to ensure long-term success and ROI.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C4D600] font-medium tracking-widest uppercase text-sm mb-4">How We Work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white text-balance">
            Partnering to Achieve Creative & Business Goals
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            We believe great content is a collaboration. At Creative Fusion LLC, we work closely with clients to
            understand their vision and translate it into powerful media that delivers real results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-white/10">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#C4D600] rounded-full" />
                </div>
              )}

              <div className="relative z-10 text-center">
                {/* Number & Icon */}
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#C4D600] group-hover:border-[#C4D600] transition-all duration-300">
                    <step.icon className="w-10 h-10 text-[#C4D600] group-hover:text-[#1C1C1C] transition-colors" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#C4D600] rounded-full flex items-center justify-center text-[#1C1C1C] text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                <h3 className="font-semibold text-xl mb-3 text-white">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
