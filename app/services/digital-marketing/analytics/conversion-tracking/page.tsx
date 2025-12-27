import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Conversion Tracking Dubai | Goal Setup | Creative Fusion",
  description:
    "Conversion tracking services in Dubai. Track leads, sales, and conversions across all marketing channels for accurate ROI measurement.",
}

export default function ConversionTrackingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Conversion Tracking"
        subtitle="Measure What Matters"
        description="Track every conversion across your marketing channels. We set up comprehensive tracking to measure ROI and optimize performance."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Analytics & Reporting", href: "/services/digital-marketing/analytics" }}
        benefits={[
          "Goal setup",
          "Event tracking",
          "E-commerce tracking",
          "Phone call tracking",
          "Form submissions",
          "Cross-device tracking",
        ]}
        process={[
          { step: "01", title: "Conversion Mapping", description: "Identify key conversions" },
          { step: "02", title: "Tracking Setup", description: "Implement tracking codes" },
          { step: "03", title: "Testing", description: "Verify accurate tracking" },
          { step: "04", title: "Attribution", description: "Set up attribution models" },
        ]}
        pricing={{ startingAt: "AED 1,500", unit: "per setup" }}
        relatedCategories={[
          { name: "Google Analytics", href: "/services/digital-marketing/analytics/google-analytics" },
          { name: "Google Ads", href: "/services/digital-marketing/ppc/google-ads" },
          { name: "Reporting", href: "/services/digital-marketing/analytics/reporting" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
