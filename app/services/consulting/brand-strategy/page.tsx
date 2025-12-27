import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Target } from "lucide-react"

export const dynamic = "force-static"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Brand Strategy Consulting Dubai | Brand Positioning UAE | Creative Fusion LLC",
  description:
    "Expert brand strategy consulting in Dubai UAE. Brand differentiation, identity positioning, and competitive analysis for memorable brand experiences.",
  keywords: [
    "brand strategy dubai",
    "brand positioning uae",
    "brand differentiation consulting",
    "brand identity strategy",
  ],
}

export default function BrandStrategyPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="11.3"
        title="Brand Strategy"
        subtitle="Identity & Positioning"
        description="Clear brand differentiation and identity positioning that creates memorable brand experiences and establishes your competitive advantage in the market."
        heroImage="/images/creative-team-brainstorming.jpg"
        icon={Target}
        brandColor="purple"
        features={[
          {
            title: "Brand Positioning",
            description: "Define your unique market position and value proposition.",
            icon: "🎯",
            href: "/services/consulting/brand-strategy/brand-positioning",
          },
          {
            title: "Brand Architecture",
            description: "Structure your brand portfolio for maximum impact.",
            icon: "🏗️",
            href: "/services/consulting/brand-strategy/brand-architecture",
          },
          {
            title: "Competitive Analysis",
            description: "Deep dive into competitor strategies and market gaps.",
            icon: "🔎",
            href: "/services/consulting/brand-strategy/competitive-analysis",
          },
          {
            title: "Brand Messaging",
            description: "Craft compelling narratives and key messages.",
            icon: "💬",
            href: "/services/consulting/brand-strategy/brand-messaging",
          },
          {
            title: "Brand Guidelines",
            description: "Comprehensive brand standards and usage rules.",
            icon: "📘",
            href: "/services/consulting/brand-strategy/brand-guidelines",
          },
          {
            title: "Brand Audit",
            description: "Evaluate brand health and identify opportunities.",
            icon: "📋",
            href: "/services/consulting/brand-strategy/brand-audit",
          },
        ]}
        process={[
          { number: "01", title: "Discovery", description: "Understand your brand essence and market context." },
          { number: "02", title: "Analysis", description: "Research competitors and identify opportunities." },
          { number: "03", title: "Strategy", description: "Develop positioning and messaging framework." },
          { number: "04", title: "Activation", description: "Implement brand strategy across touchpoints." },
        ]}
        benefits={[
          "Clear brand differentiation",
          "Strong market positioning",
          "Consistent brand experience",
          "Increased brand recognition",
          "Customer loyalty building",
          "Competitive advantage",
        ]}
        relatedServices={[
          { title: "Creative Branding", href: "/services/creative-branding" },
          { title: "Marketing Strategy", href: "/services/consulting/marketing-strategy" },
          { title: "Graphic Design", href: "/services/graphic-design" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
