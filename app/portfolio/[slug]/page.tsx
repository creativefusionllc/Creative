import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, Tag } from "lucide-react"

const portfolioItems = {
  "brand-identity-tech-startup": {
    title: "Tech Startup Brand Identity",
    category: "Branding",
    date: "2024",
    description:
      "Complete brand identity design for an innovative tech startup, including logo, color palette, typography, and brand guidelines.",
    challenge:
      "Create a modern, tech-forward brand identity that stands out in the competitive startup ecosystem while remaining approachable and professional.",
    solution:
      "We developed a clean, geometric logo with bold typography and a vibrant color scheme that balances innovation with trust.",
    results: [
      "50% increase in brand recognition",
      "Featured in 3 tech publications",
      "Successfully raised Series A funding",
    ],
    image: "/modern-tech-startup-brand-identity-logo-design.jpg",
  },
  "ecommerce-platform-development": {
    title: "E-commerce Platform Development",
    category: "Web Development",
    date: "2024",
    description:
      "Custom e-commerce platform built with Next.js, featuring advanced product management and payment integration.",
    challenge:
      "Build a scalable e-commerce solution that handles high traffic and provides seamless shopping experience.",
    solution:
      "Developed a headless e-commerce platform with Stripe integration, inventory management, and real-time analytics.",
    results: ["300% increase in online sales", "99.9% uptime", "Average page load under 2 seconds"],
    image: "/modern-ecommerce-website-design-shopping-platform.jpg",
  },
  "product-photography-campaign": {
    title: "Product Photography Campaign",
    category: "Photography",
    date: "2024",
    description: "Professional product photography for luxury jewelry brand with studio and lifestyle shots.",
    challenge: "Capture the intricate details and luxurious feel of high-end jewelry pieces for both web and print.",
    solution:
      "Conducted a comprehensive photo shoot with macro photography, creative lighting, and lifestyle staging to showcase products.",
    results: [
      "45% increase in product page conversions",
      "Featured in luxury magazine",
      "Instagram engagement up 200%",
    ],
    image: "/luxury-jewelry-product-photography-studio-lighting.jpg",
  },
  "social-media-marketing-campaign": {
    title: "Social Media Marketing Campaign",
    category: "Digital Marketing",
    date: "2024",
    description:
      "Comprehensive social media strategy and content creation for hospitality brand across multiple platforms.",
    challenge: "Increase brand awareness and engagement for a new luxury hotel in competitive Dubai market.",
    solution:
      "Created a 3-month content calendar with professional photography, video content, and influencer partnerships.",
    results: [
      "500% growth in followers",
      "2M+ content impressions",
      "85% increase in direct bookings from social media",
    ],
    image: "/luxury-hotel-social-media-marketing-content-instag.jpg",
  },
  "corporate-video-production": {
    title: "Corporate Video Production",
    category: "Videography",
    date: "2024",
    description:
      "Professional corporate video showcasing company culture, values, and achievements for Fortune 500 client.",
    challenge: "Tell a compelling brand story that resonates with both B2B clients and potential employees.",
    solution: "Produced a 3-minute cinematic corporate video with drone footage, interviews, and dynamic editing.",
    results: ["Featured on company homepage", "Shared by 50+ partners", "30% increase in job applications"],
    image: "/corporate-video-production-office-business-profess.jpg",
  },
  "mobile-app-ui-ux-design": {
    title: "Mobile App UI/UX Design",
    category: "Design",
    date: "2024",
    description: "Complete UI/UX design for fintech mobile app with focus on user experience and accessibility.",
    challenge: "Design an intuitive financial management app that makes complex features simple for everyday users.",
    solution:
      "Created user-centered design with clear information architecture, intuitive navigation, and delightful micro-interactions.",
    results: ["4.8 star rating on app stores", "40% increase in daily active users", "Featured by Apple"],
    image: "/mobile-app-ui-ux-design-fintech-banking-interface.jpg",
  },
}

export async function generateStaticParams() {
  return Object.keys(portfolioItems).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = portfolioItems[slug as keyof typeof portfolioItems]

  if (!item) {
    return {
      title: "Portfolio Item Not Found",
    }
  }

  return {
    title: item.title,
    description: item.description,
  }
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = portfolioItems[slug as keyof typeof portfolioItems]

  if (!item) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center text-[#C4D600] hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {item.category}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {item.date}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.title}</h1>
            <p className="text-xl text-gray-600">{item.description}</p>
          </div>

          <div className="mb-12">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              width={1200}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
              <p className="text-gray-700">{item.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h2>
              <p className="text-gray-700">{item.solution}</p>
            </div>
          </div>

          <div className="bg-[#C4D600]/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>
            <ul className="space-y-3">
              {item.results.map((result, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#C4D600] mr-3 text-xl">✓</span>
                  <span className="text-gray-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
