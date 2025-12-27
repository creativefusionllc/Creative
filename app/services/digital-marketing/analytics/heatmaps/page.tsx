import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Heatmap Analysis Dubai | User Behavior | Creative Fusion",
  description:
    "Heatmap analysis services in Dubai. Understand how users interact with your website through click maps, scroll maps, and session recordings.",
}

export default function HeatmapsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Heatmaps"
        subtitle="Visual User Analysis"
        description="See exactly how users interact with your website. We use heatmaps and session recordings to identify UX issues and optimization opportunities."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Analytics & Reporting", href: "/services/digital-marketing/analytics" }}
        benefits={[
          "Click heatmaps",
          "Scroll maps",
          "Session recordings",
          "Form analytics",
          "Rage click detection",
          "UX recommendations",
        ]}
        process={[
          { step: "01", title: "Tool Setup", description: "Install heatmap software" },
          { step: "02", title: "Data Collection", description: "Gather user behavior data" },
          { step: "03", title: "Analysis", description: "Identify patterns and issues" },
          { step: "04", title: "Recommendations", description: "Provide actionable insights" },
        ]}
        pricing={{ startingAt: "AED 1,500", unit: "per month" }}
        relatedCategories={[
          { name: "A/B Testing", href: "/services/digital-marketing/analytics/ab-testing" },
          { name: "UI/UX Design", href: "/services/web-development/ui-ux-design" },
          { name: "Conversion Tracking", href: "/services/digital-marketing/analytics/conversion-tracking" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
