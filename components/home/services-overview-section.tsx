"use client"

import Link from "next/link"
import {
  Palette,
  Camera,
  Video,
  TrendingUp,
  Code,
  Settings,
  Box,
  Megaphone,
  Gift,
  Wrench,
  ArrowRight,
  Globe,
} from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Creative Branding",
    description: "Logo design, brand identity, company profiles, and social media creative design.",
    href: "/services/creative-branding",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Corporate, product, wedding, event, real estate, and 360-degree photography.",
    href: "/services/photography",
  },
  {
    icon: Video,
    title: "Videography",
    description: "TV commercials, corporate videos, reels, podcasts, and cinematic production.",
    href: "/services/videography",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "SEO, social media marketing, Google & Meta ads, influencer campaigns.",
    href: "/services/digital-marketing",
  },
  {
    icon: Megaphone,
    title: "Marketing & PR",
    description: "Public relations, media buying, press releases, and crisis management.",
    href: "/services/marketing-pr",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Corporate websites, e-commerce, landing pages, UI/UX design, and hosting.",
    href: "/services/web-development",
  },
  {
    icon: Globe,
    title: "Domain & Hosting",
    description: "Domain registration, web hosting, SSL certificates, email hosting, and DNS management.",
    href: "/services/domain-hosting",
  },
  {
    icon: Settings,
    title: "Software & ERP",
    description: "Custom software, mobile apps, ERP systems, CRM, and cloud solutions.",
    href: "/services/software-apps",
  },
  {
    icon: Box,
    title: "Print & Exhibition",
    description: "Billboards, vehicle branding, exhibition stands, signage, and print design.",
    href: "/services/print-exhibitions",
  },
  {
    icon: Gift,
    title: "Corporate Gifts",
    description: "Executive gift sets, branded apparel, tech items, and event giveaways.",
    href: "/services/gift-items",
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    description: "IT support, software maintenance, website security, and updates.",
    href: "/services/support-maintenance",
  },
]

export function ServicesOverviewSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-28 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/images/counter-one-pattern.png')", backgroundRepeat: "repeat" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 h-[2px] bg-[#C4D600]" />
            <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-widest uppercase">Our Services</p>
            <div className="w-8 sm:w-12 h-[2px] bg-[#C4D600]" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            End-to-End Creative & Digital Solutions
          </h2>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            From brand strategy to digital execution, we deliver comprehensive services that transform your business
            vision into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-[#2a2a2a] border border-white/10 rounded-xl p-4 sm:p-5 hover:bg-[#333333] hover:border-[#C4D600]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-all bg-[#333333] group-hover:bg-[#C4D600]/10">
                  <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-[#C4D600] transition-colors" />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm group-hover:text-[#C4D600] transition-colors">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{service.description}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#C4D600] text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#b0c200] transition-colors text-sm sm:text-base"
          >
            View All Services
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
