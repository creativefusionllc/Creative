"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Palette,
  Camera,
  Video,
  TrendingUp,
  Code,
  Box,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  Megaphone,
  Boxes,
  Gift,
  Briefcase,
  PenTool,
  MessageSquare,
  Cpu,
  Globe,
  ShoppingCart,
} from "lucide-react"
import { useState } from "react"

const services = [
  {
    number: "01",
    icon: Briefcase,
    title: "Business Consulting",
    description: "Digital transformation, marketing strategy, brand positioning, and business operations consulting.",
    href: "/services/consulting",
    color: "#C4D600",
  },
  {
    number: "02",
    icon: Palette,
    title: "Creative Branding",
    description: "Logo design, brand identity, corporate profiles, and social media creative design.",
    href: "/services/creative-branding",
    color: "#3B82F6",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Graphic Design",
    description: "Brand identity, social media content, animation, motion graphics, and UI/UX design.",
    href: "/services/graphic-design",
    color: "#8B5CF6",
  },
  {
    number: "04",
    icon: Camera,
    title: "Photography Services",
    description: "Professional corporate, product, event, wedding, and sports photography.",
    href: "/services/photography",
    color: "#10B981",
  },
  {
    number: "05",
    icon: Video,
    title: "Videography",
    description: "TV commercials, corporate videos, reels, podcasts, and event coverage.",
    href: "/services/videography",
    color: "#F59E0B",
  },
  {
    number: "06",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "SEO, social media marketing, digital ads, and influencer marketing.",
    href: "/services/digital-marketing",
    color: "#EC4899",
  },
  {
    number: "07",
    icon: MessageSquare,
    title: "WhatsApp Marketing",
    description: "WhatsApp Business API, automated support, broadcast campaigns, and chatbot development.",
    href: "/services/whatsapp-marketing",
    color: "#25D366",
  },
  {
    number: "08",
    icon: Megaphone,
    title: "Marketing & PR",
    description: "Public relations, media buying, press releases, and corporate communications.",
    href: "/services/marketing-pr",
    color: "#14B8A6",
  },
  {
    number: "09",
    icon: Code,
    title: "Web Development",
    description: "Corporate websites, e-commerce stores, landing pages, UI/UX design.",
    href: "/services/web-development",
    color: "#6366F1",
  },
  {
    number: "10",
    icon: Globe,
    title: "Domain & Hosting",
    description: "Domain registration, web hosting, SSL certificates, email hosting.",
    href: "/services/domain-hosting",
    color: "#F97316",
  },
  {
    number: "11",
    icon: Cpu,
    title: "Software & Apps",
    description: "Custom software, ERP systems, mobile app development.",
    href: "/services/software-apps",
    color: "#EF4444",
  },
  {
    number: "12",
    icon: Boxes,
    title: "Exhibition Stands",
    description: "Custom exhibition stand design and build for trade shows and events.",
    href: "/services/exhibition-stands",
    color: "#64748B",
  },
  {
    number: "13",
    icon: Box,
    title: "Print & Exhibitions",
    description: "Billboards, vehicle branding, brochures, banners, and print design.",
    href: "/services/print-exhibitions",
    color: "#0EA5E9",
  },
  {
    number: "14",
    icon: Gift,
    title: "Corporate Gift Items",
    description: "Premium corporate gifts, promotional products, and branded merchandise.",
    href: "/services/gift-items",
    color: "#A855F7",
  },
  {
    number: "15",
    icon: Wrench,
    title: "Support & Maintenance",
    description: "IT support, software maintenance, website security services.",
    href: "/services/support-maintenance",
    color: "#78716C",
  },
  {
    number: "16",
    icon: ShoppingCart,
    title: "Sales & Retail",
    description: "Sales representation, exhibition management, logistics solutions.",
    href: "/services/sales-retail",
    color: "#84CC16",
  },
]

export function AllServicesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#C4D600]/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#C4D600] rounded-full" />
            <span className="text-[#1C1C1C] text-sm font-medium">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-6">
            Comprehensive Solutions for
            <span className="text-[#C4D600]"> Your Growth</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From creative design to technical solutions, we provide end-to-end services to transform your business
            vision into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.number}
              href={service.href}
              className="group relative bg-[#1C1C1C] rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 50%, ${service.color}, transparent 70%)` }}
              />

              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "url('/images/counter-one-pattern.png')",
                  backgroundRepeat: "repeat",
                }}
              />

              <div className="relative z-10">
                {/* Number Badge */}
                <span className="absolute top-0 right-0 font-mono text-xs font-bold px-2 py-1 rounded bg-white/10 text-white/50">
                  {service.number}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#C4D600] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">{service.description}</p>

                {/* Learn More */}
                <div className="flex items-center gap-2 text-sm font-semibold text-[#C4D600]">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: service.color }}
              />
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#1C1C1C] to-[#2a2a2a] rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "url('/images/counter-one-pattern.png')",
              backgroundRepeat: "repeat",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Can't find what you're looking for?</h3>
              <p className="text-white/60 max-w-xl">
                We offer custom solutions tailored to your specific business needs. Let's discuss your project.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-[#C4D600] text-[#1C1C1C] hover:bg-[#b0c200] font-semibold h-14 px-8"
                asChild
              >
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
