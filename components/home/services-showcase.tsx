"use client"

import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Camera,
  Video,
  TrendingUp,
  Code,
  Globe,
  Settings,
  Megaphone,
  Box,
  Gift,
  Wrench,
} from "lucide-react"
import { useState } from "react"

const services = [
  {
    icon: Palette,
    title: "Creative Branding",
    description: "Logo design, brand identity, and visual systems that define your market presence.",
    href: "/services/creative-branding",
    color: "#C4D600",
    featured: true,
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Professional photography for products, events, corporate, and real estate.",
    href: "/services/photography",
    color: "#3B82F6",
    featured: true,
  },
  {
    icon: Video,
    title: "Videography",
    description: "Cinematic production, commercials, corporate videos, and social content.",
    href: "/services/videography",
    color: "#8B5CF6",
    featured: true,
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "SEO, social media, paid advertising, and performance marketing.",
    href: "/services/digital-marketing",
    color: "#10B981",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Corporate websites, e-commerce platforms, and custom web applications.",
    href: "/services/web-development",
    color: "#F59E0B",
  },
  {
    icon: Globe,
    title: "Domain & Hosting",
    description: "Domain registration, web hosting, SSL certificates, and email solutions.",
    href: "/services/domain-hosting",
    color: "#EC4899",
  },
  {
    icon: Settings,
    title: "Software & ERP",
    description: "Custom software, mobile apps, ERP systems, and cloud solutions.",
    href: "/services/software-apps",
    color: "#6366F1",
  },
  {
    icon: Megaphone,
    title: "Marketing & PR",
    description: "Public relations, media buying, and integrated marketing campaigns.",
    href: "/services/marketing-pr",
    color: "#14B8A6",
  },
  {
    icon: Box,
    title: "Print & Exhibition",
    description: "Billboards, signage, exhibition stands, and vehicle branding.",
    href: "/services/print-exhibitions",
    color: "#F97316",
  },
  {
    icon: Gift,
    title: "Corporate Gifts",
    description: "Executive gift sets, branded merchandise, and promotional items.",
    href: "/services/gift-items",
    color: "#EF4444",
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    description: "IT support, website maintenance, and ongoing technical assistance.",
    href: "/services/support-maintenance",
    color: "#64748B",
  },
]

export function ServicesShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const featuredServices = services.filter((s) => s.featured)
  const otherServices = services.filter((s) => !s.featured)

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-[#C4D600] font-semibold tracking-wide uppercase text-sm mb-3">What We Do</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] leading-tight">
              End-to-End Creative
              <br />
              <span className="text-gray-400">& Our Solutions</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-md lg:text-left">
            From strategy to execution, we deliver comprehensive solutions that transform your business vision into
            reality.
          </p>
        </div>

        {/* Featured Solutions - Large Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredServices.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative bg-[#1C1C1C] rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 50%, ${service.color}, transparent 70%)` }}
              />

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon className="w-7 h-7" style={{ color: service.color }} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C4D600] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>

                <div className="flex items-center gap-2 text-sm font-semibold text-[#C4D600]">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Solutions - Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherServices.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-gray-50 hover:bg-[#1C1C1C] rounded-xl p-5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-5 h-5 transition-colors" style={{ color: service.color }} />
                </div>
              </div>
              <h3 className="font-semibold text-[#1C1C1C] group-hover:text-white text-sm transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-gray-500 group-hover:text-gray-400 mt-1 line-clamp-2 transition-colors">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#C4D600] text-[#1C1C1C] px-8 py-4 rounded-full font-semibold hover:bg-[#d4e600] transition-colors"
          >
            View All Solutions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
