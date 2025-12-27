import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Google Analytics Services Dubai | GA4 Setup | Creative Fusion",
  description:
    "Google Analytics services in Dubai. GA4 setup, configuration, custom reports, and data analysis for informed marketing decisions.",
}

export default function GoogleAnalyticsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Google Analytics"
        subtitle="GA4 Setup & Analysis"
        description="Get actionable insights from your website data. We set up, configure, and analyze Google Analytics to drive data-informed decisions."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Analytics & Reporting", href: "/services/digital-marketing/analytics" }}
        benefits={[
          "GA4 setup",
          "Custom reports",
          "Goal tracking",
          "E-commerce tracking",
          "User behavior analysis",
          "Data visualization",
        ]}
        process={[
          { step: "01", title: "Audit", description: "Review current setup" },
          { step: "02", title: "Configuration", description: "Set up GA4 properly" },
          { step: "03", title: "Custom Setup", description: "Create reports and goals" },
          { step: "04", title: "Training", description: "Teach your team" },
        ]}
        pricing={{ startingAt: "AED 2,000", unit: "setup + monthly" }}
        relatedCategories={[
          { name: "Conversion Tracking", href: "/services/digital-marketing/analytics/conversion-tracking" },
          { name: "Reporting", href: "/services/digital-marketing/analytics/reporting" },
          { name: "SEO Services", href: "/services/digital-marketing/seo" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
