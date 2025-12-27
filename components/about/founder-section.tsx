"use client"
import { Linkedin, Mail, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

const expertise = [
  "Media Production",
  "Digital Strategy",
  "Brand Development",
  "Business Leadership",
  "Creative Direction",
  "Innovation",
]

export function FounderSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <img
                src="/images/naveed-anjum.jpg"
                alt="Naveed Anjum - Founder"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />

              {/* Name Card */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-3xl font-bold text-white mb-1">Naveed Anjum</h3>
                <p className="text-[#C4D600] font-medium">Founder & Creative Director</p>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#C4D600]/30 rounded-3xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#C4D600]/10 rounded-3xl -z-10" />
          </div>

          {/* Right - Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4D600]/10 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-[#C4D600]" />
              <span className="text-[#1C1C1C] text-sm font-medium">Leadership</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-6">
              Meet Our <span className="text-[#C4D600]">Founder</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                In a marketplace defined by noise, standing out is no longer enough—you must dominate. My vision for
                Creative Fusion LLC is absolute: to engineer brands that do not just compete, but lead.
              </p>
              <p>
                We are built on a rare philosophy. We honor the roots of traditional artistic craftsmanship—the soul,
                the storytelling, and the human connection that business has relied on for decades. But we arm that
                heritage with the explosive power of modern technology and Artificial Intelligence.
              </p>
              <p>
                This fusion is our competitive edge, and it will become yours. While others chase trends, we focus on
                Growth and ROI. We deploy a unified arsenal of high-impact media, intelligent web solutions, and
                strategic branding to ensure your presence is felt across every platform. We use AI not to replace
                creativity, but to sharpen it—giving your brand the precision to outperform competitors and the depth to
                captivate audiences.
              </p>
              <p>
                You deserve to operate at the pinnacle of your industry. We are here to fuse the wisdom of the past with
                the innovation of the future to make you prominent, profitable, and powerful. Let's build your legacy.
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
                <a href="https://linkedin.com/in/naveedanjum" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-xl border-gray-200 hover:border-[#C4D600] hover:bg-[#C4D600]/10 bg-transparent"
                asChild
              >
                <a href="mailto:naveed@creativefusion.llc">
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
