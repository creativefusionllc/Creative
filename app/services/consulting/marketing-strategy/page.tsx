import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { TrendingUp } from "lucide-react"

export const dynamic = "force-static"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Marketing Strategy Consulting Dubai | Campaign Planning UAE | Creative Fusion LLC",
  description:
    "Expert marketing strategy consulting in Dubai UAE. Go-to-market strategies, campaign planning, and growth marketing blueprints for business success.",
  keywords: [
    "marketing strategy dubai",
    "campaign planning uae",
    "go-to-market strategy dubai",
    "growth marketing consulting",
  ],
}

export default function MarketingStrategyPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="11.2"
        title="Marketing Strategy"
        subtitle="Growth Planning & Execution"
        description="Comprehensive marketing blueprints and campaign strategies designed to accelerate your business growth, increase market share, and maximize ROI."
        heroImage="/images/creative-team-brainstorming.jpg"
        icon={TrendingUp}
        brandColor="coral"
        features={[
          {
            title: "Go-to-Market Strategy",
            description: "Launch planning and market entry strategies for new products.",
            icon: "🚀",
            href: "/services/consulting/marketing-strategy/go-to-market",
          },
          {
            title: "Campaign Planning",
            description: "Integrated marketing campaign development and execution.",
            icon: "📋",
            href: "/services/consulting/marketing-strategy/campaign-planning",
          },
          {
            title: "Market Research",
            description: "In-depth market analysis and competitive intelligence.",
            icon: "🔍",
            href: "/services/consulting/marketing-strategy/market-research",
          },
          {
            title: "Growth Marketing",
            description: "Data-driven strategies for rapid business growth.",
            icon: "📈",
            href: "/services/consulting/marketing-strategy/growth-marketing",
          },
          {
            title: "Customer Journey Mapping",
            description: "Understanding and optimizing customer touchpoints.",
            icon: "🗺️",
            href: "/services/consulting/marketing-strategy/customer-journey",
          },
          {
            title: "Marketing Analytics",
            description: "Performance measurement and ROI optimization.",
            icon: "📊",
            href: "/services/consulting/marketing-strategy/marketing-analytics",
          },
        ]}
        process={[
          { number: "01", title: "Research", description: "Analyze market, competitors, and target audience." },
          { number: "02", title: "Strategy", description: "Develop comprehensive marketing plan and tactics." },
          { number: "03", title: "Execution", description: "Implement campaigns across selected channels." },
          { number: "04", title: "Optimization", description: "Track performance and refine for better results." },
        ]}
        benefits={[
          "Data-driven marketing decisions",
          "Increased market share",
          "Higher customer acquisition",
          "Improved brand awareness",
          "Measurable ROI tracking",
          "Competitive market positioning",
        ]}
        relatedServices={[
          { title: "Digital Marketing", href: "/services/digital-marketing" },
          { title: "Brand Strategy", href: "/services/consulting/brand-strategy" },
          { title: "Creative Branding", href: "/services/creative-branding" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
