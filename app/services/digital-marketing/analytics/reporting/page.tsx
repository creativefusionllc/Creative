import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Marketing Reports Dubai | Analytics Dashboards | Creative Fusion",
  description:
    "Marketing reporting services in Dubai. Custom dashboards, monthly reports, and executive summaries for clear marketing insights.",
}

export default function ReportingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Reporting"
        subtitle="Clear Marketing Insights"
        description="Get clear, actionable reports on your marketing performance. We create custom dashboards and reports that show what matters most."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Analytics & Reporting", href: "/services/digital-marketing/analytics" }}
        benefits={[
          "Custom dashboards",
          "Monthly reports",
          "Executive summaries",
          "KPI tracking",
          "ROI analysis",
          "Competitor benchmarking",
        ]}
        process={[
          { step: "01", title: "KPI Definition", description: "Define key metrics" },
          { step: "02", title: "Dashboard Setup", description: "Create custom views" },
          { step: "03", title: "Automation", description: "Set up automated reports" },
          { step: "04", title: "Review & Insights", description: "Regular analysis sessions" },
        ]}
        pricing={{ startingAt: "AED 1,500", unit: "per month" }}
        relatedCategories={[
          { name: "Google Analytics", href: "/services/digital-marketing/analytics/google-analytics" },
          { name: "Conversion Tracking", href: "/services/digital-marketing/analytics/conversion-tracking" },
          { name: "SEO Services", href: "/services/digital-marketing/seo" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
