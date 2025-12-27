import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Marketing Dashboards Dubai | Data Visualization | Creative Fusion",
  description:
    "Marketing dashboard services in Dubai. Real-time dashboards that consolidate all your marketing data in one place for easy monitoring.",
}

export default function DashboardsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Dashboards"
        subtitle="Real-Time Data Visualization"
        description="See all your marketing data in one place. We create custom dashboards that give you real-time visibility into performance."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Analytics & Reporting", href: "/services/digital-marketing/analytics" }}
        benefits={[
          "Real-time data",
          "Multi-channel view",
          "Custom widgets",
          "Automated updates",
          "Mobile access",
          "Team sharing",
        ]}
        process={[
          { step: "01", title: "Requirements", description: "Define dashboard needs" },
          { step: "02", title: "Data Integration", description: "Connect all data sources" },
          { step: "03", title: "Design & Build", description: "Create custom dashboard" },
          { step: "04", title: "Training", description: "Team onboarding" },
        ]}
        pricing={{ startingAt: "AED 3,000", unit: "per dashboard" }}
        relatedCategories={[
          { name: "Reporting", href: "/services/digital-marketing/analytics/reporting" },
          { name: "Google Analytics", href: "/services/digital-marketing/analytics/google-analytics" },
          { name: "Web Applications", href: "/services/web-development/web-applications" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
