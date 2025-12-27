"use client"

import { Sparkles, Award, Users, Eye, Clock, Shield } from "lucide-react"

const values = [
  {
    icon: Sparkles,
    title: "Creativity",
    description: "We push boundaries and explore innovative solutions to make your brand stand out.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "Excellence is non-negotiable. We deliver only the highest standard of work.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work as an extension of your team, ensuring seamless communication.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Open and honest partnerships built on trust and mutual understanding.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We respect deadlines and deliver projects on time, every time.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We conduct business with honesty, respect, and ethical standards.",
  },
]

export function CoreValues() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#C4D600]/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#C4D600] rounded-full" />
            <span className="text-[#1C1C1C] text-sm font-medium">Our Values</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-6">
            Principles That <span className="text-[#C4D600]">Guide Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values shape everything we do, from how we work with clients to the quality of our deliverables.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {values.map((value) => (
            <div
              key={value.title}
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#C4D600]/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#C4D600]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C4D600]/20 transition-colors">
                <value.icon className="h-7 w-7 text-[#C4D600]" />
              </div>
              <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* License Banner */}
        <div className="bg-[#1C1C1C] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "url('/images/counter-one-pattern.png')",
              backgroundRepeat: "repeat",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#C4D600] rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-[#1C1C1C]" />
              </div>
              <div>
                <p className="text-[#C4D600] font-semibold mb-1">Licensed & Registered</p>
                <p className="text-white/70">Creative Fusion LLC operates under Sharjah Media City (SHAMS)</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <p className="text-white/60 text-sm">License Number</p>
              <p className="text-white font-bold text-lg">2430411.01</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
