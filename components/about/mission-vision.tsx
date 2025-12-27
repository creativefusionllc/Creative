"use client"

import { Target, Eye, Rocket, Heart } from "lucide-react"

const items = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower businesses across the UAE with exceptional creative solutions that combine artistic excellence with strategic thinking. We strive to be the trusted partner that transforms visions into reality.",
    color: "lime",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become the leading creative agency in the Middle East, recognized for our commitment to quality, innovation, and client success through exceptional visual storytelling.",
    color: "white",
  },
  {
    icon: Rocket,
    title: "Our Approach",
    description:
      "We believe in a collaborative approach, working closely with our clients to understand their unique needs and deliver tailored solutions that exceed expectations.",
    color: "white",
  },
  {
    icon: Heart,
    title: "Our Promise",
    description:
      "We promise to deliver excellence in every project, treating your brand as our own and ensuring every deliverable meets the highest standards of quality.",
    color: "lime",
  },
]

export function MissionVision() {
  return (
    <section className="py-24 lg:py-32 bg-[#1C1C1C] relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/counter-one-pattern.png')",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#C4D600] rounded-full" />
            <span className="text-white/80 text-sm font-medium">What Drives Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Foundation for <span className="text-[#C4D600]">Excellence</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className={`p-8 md:p-10 rounded-3xl transition-all duration-300 hover:scale-[1.02] ${
                item.color === "lime" ? "bg-[#C4D600] text-[#1C1C1C]" : "bg-white/5 border border-white/10 text-white"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  item.color === "lime" ? "bg-[#1C1C1C]/10" : "bg-white/10"
                }`}
              >
                <item.icon className={`h-7 w-7 ${item.color === "lime" ? "text-[#1C1C1C]" : "text-[#C4D600]"}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className={`leading-relaxed ${item.color === "lime" ? "text-[#1C1C1C]/80" : "text-white/70"}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
