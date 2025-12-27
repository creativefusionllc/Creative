"use client"

import { Shield, Award, Clock, Headphones, CheckCircle, Globe } from "lucide-react"

const badges = [
  { icon: Shield, label: "ISO Certified" },
  { icon: Award, label: "Award Winning" },
  { icon: Clock, label: "24/7 Support" },
  { icon: Headphones, label: "Dedicated Team" },
  { icon: CheckCircle, label: "100% Satisfaction" },
  { icon: Globe, label: "UAE & Global" },
]

export function TrustBadgesSection() {
  return (
    <section className="py-6 bg-[#1C1C1C] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <badge.icon className="h-5 w-5 text-[#C4D600]" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
