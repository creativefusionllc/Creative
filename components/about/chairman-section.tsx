"use client"
import { Linkedin, Mail, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

const expertise = [
  "Business Leadership",
  "Organizational Management",
  "Strategic Planning",
  "Industry Operations",
  "Business Growth",
  "Executive Strategy",
]

export function ChairmanSection() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <img
                src="/images/munir-anjum.jpg"
                alt="Mr. Munir Anjum - Chairman"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />

              {/* Name Card */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-3xl font-bold text-white mb-1">Mr. Munir Anjum</h3>
                <p className="text-[#C4D600] font-medium">Chairman</p>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#C4D600]/30 rounded-3xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#C4D600]/10 rounded-3xl -z-10" />
          </div>

          {/* Right - Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4D600]/10 rounded-full px-4 py-2 mb-6">
              <Trophy className="w-4 h-4 text-[#C4D600]" />
              <span className="text-[#1C1C1C] text-sm font-medium">Leadership</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-6">
              Meet Our <span className="text-[#C4D600]">Chairman</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Creative Fusion LLC is guided by over 40 years of leadership experience across multiple industries,
                under the strategic direction of our Chairman, Mr. Munir Anjum. His decades of hands-on expertise in
                business management, operations, and organizational growth form the bedrock of the company's
                professional values and long-term trajectory.
              </p>
              <p>
                <strong className="text-[#1C1C1C]">Our Vision:</strong> To establish Creative Fusion LLC as a
                professionally managed organization that delivers creative and digital solutions defined by consistency,
                integrity, and measurable results.
              </p>
              <p>
                <strong className="text-[#1C1C1C]">Our Approach:</strong> By synergizing experience-driven
                decision-making with modern technology and innovation, we empower our clients to strengthen their brand
                presence, optimize operational efficiency, and achieve sustainable, long-term growth.
              </p>
              <p>
                At Creative Fusion LLC, we believe that strong leadership, clear strategy, and adaptability are the
                pillars of lasting success. Leveraging profound business insight and a future-focused mindset, we are
                committed to serving as a trusted strategic partner for businesses across the UAE and international
                markets.
              </p>
            </div>

            {/* Expertise Tags */}
            <div className="mb-8">
              <h4 className="font-semibold text-[#1C1C1C] mb-4">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {expertise.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200 hover:border-[#C4D600]/50 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-xl border-gray-200 hover:border-[#C4D600] hover:bg-[#C4D600]/10 bg-transparent"
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-xl border-gray-200 hover:border-[#C4D600] hover:bg-[#C4D600]/10 bg-transparent"
                asChild
              >
                <a href="mailto:munir@creativefusion.llc">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
