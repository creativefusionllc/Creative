"use client"

import Link from "next/link"
import {
  Fingerprint,
  Video,
  LineChart,
  Megaphone,
  Globe,
  Smartphone,
  TrendingUp,
  Briefcase,
  ArrowRight,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: 1,
    icon: Fingerprint,
    title: "Branding & Identity Architecture",
    description:
      "Define your unique market position and build a recognizable, resilient brand identity that connects deeply with your ideal audience.",
    bullets: [
      "Corporate Identity System Development",
      "Brand Strategy & Positioning",
      "Visual Design Systems",
      "UI/UX Design & Digital Experience",
    ],
    highlighted: false,
  },
  {
    id: 2,
    icon: Video,
    title: "Creative Content Production",
    description:
      "Transform your brand narrative into high-impact visual media—from cinematic video to compelling photography and motion graphics.",
    bullets: [
      "Professional Photoshoots",
      "Videography & Post-Production",
      "Animation & Motion Graphics",
      "Social Media Content Design",
    ],
    highlighted: false,
  },
  {
    id: 3,
    icon: LineChart,
    title: "Digital Strategy & Intelligence",
    description:
      "The foundational planning layer. We use data to create a focused, high-ROI roadmap for all your digital investments.",
    bullets: [
      "Digital Transformation Roadmapping",
      "Conversion Rate Optimization (CRO)",
      "Audience & Competitive Intelligence",
      "Digital Analytics & Performance Audits",
    ],
    highlighted: true,
  },
  {
    id: 4,
    icon: Megaphone,
    title: "Integrated Marketing Campaigns",
    description:
      "Executing cohesive, multi-channel campaigns that seamlessly blend content, social, and direct communication to build lasting relationships.",
    bullets: [
      "Strategic Content Marketing",
      "Social Media Management",
      "Influencer Marketing Strategy",
      "Radio Marketing & Traditional Media Integration",
    ],
    highlighted: false,
  },
  {
    id: 5,
    icon: Globe,
    title: "Web Development & Solutions",
    description:
      "Building the technical infrastructure—high-performance, secure, and responsive—that serves as your primary digital storefront and sales engine.",
    bullets: [
      "Responsive Website Design & Development",
      "Sales Funnel Landing Page Optimization",
      "Website Maintenance & Hosting",
      "Domain & Business Email Services",
    ],
    highlighted: false,
  },
  {
    id: 6,
    icon: Smartphone,
    title: "Application Development & Software",
    description:
      "Developing custom, scalable software solutions and mobile applications that automate business processes and enhance service delivery.",
    bullets: [
      "Mobile App Development (Native & Cross-Platform)",
      "Custom Software & ERP Solutions",
      "Enterprise & CRM Solution Integration",
    ],
    highlighted: false,
  },
  {
    id: 7,
    icon: TrendingUp,
    title: "Digital Marketing (Performance)",
    description:
      "Focusing on targeted paid media and search optimization to drive immediate traffic, generate qualified leads, and maximize advertising return.",
    bullets: [
      "Search Engine Optimization (SEO)",
      "SEM / PPC Advertising",
      "Leads Generation via Paid Media",
      "Omni-Channel Direct Messaging",
    ],
    highlighted: false,
  },
  {
    id: 8,
    icon: Briefcase,
    title: "Business & Technology Consulting",
    description:
      "Strategic advisory services led by top minds to optimize internal operations, eliminate friction points, and ensure future-proof technological alignment.",
    bullets: ["Strategy Consulting", "IT/Technology Consulting", "Operations Consulting"],
    highlighted: false,
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#C4D600] font-semibold tracking-wide uppercase text-sm mb-3">Our Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Full-Spectrum Digital Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From brand strategy to technical execution, we deliver integrated services that drive measurable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${
                service.highlighted ? "border-t-[3px] border-t-[#C4D600] bg-gray-50" : ""
              }`}
            >
              {/* Icon and Title Row */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#C4D600]/10 rounded-lg flex items-center justify-center shrink-0">
                  <service.icon className="h-5 w-5 text-[#C4D600]" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 leading-tight">{service.title}</h3>
              </div>

              {/* Lime Divider */}
              <div className="h-[2px] w-12 bg-[#C4D600] mb-4" />

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{service.description}</p>

              {/* Ordered Bullet Points */}
              <ul className="space-y-2.5">
                {service.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-gray-700">
                    <Check className="h-3.5 w-3.5 text-[#C4D600] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="gap-2 bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold" asChild>
            <Link href="/services">
              Explore All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
