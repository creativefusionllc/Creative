import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "A/B Testing Services Dubai | Conversion Optimization | Creative Fusion",
  description:
    "A/B testing services in Dubai. Test headlines, designs, CTAs, and more to optimize conversion rates and improve marketing performance.",
}

export default function ABTestingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="A/B Testing"
        subtitle="Data-Driven Optimization"
        description="Make decisions based on data, not guesses. We design and run A/B tests to continuously improve your conversion rates."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Analytics & Reporting", href: "/services/digital-marketing/analytics" }}
        benefits={[
          "Hypothesis development",
          "Test design",
          "Statistical analysis",
          "Winner implementation",
          "Multivariate testing",
          "Continuous improvement",
        ]}
        process={[
          { step: "01", title: "Hypothesis", description: "Identify test opportunities" },
          { step: "02", title: "Test Setup", description: "Create test variations" },
          { step: "03", title: "Run Test", description: "Collect statistically significant data" },
          { step: "04", title: "Implement", description: "Deploy winning variation" },
        ]}
        pricing={{ startingAt: "AED 2,500", unit: "per test" }}
        relatedCategories={[
          { name: "Heatmaps", href: "/services/digital-marketing/analytics/heatmaps" },
          { name: "Landing Pages", href: "/services/web-development/landing-pages" },
          { name: "Conversion Tracking", href: "/services/digital-marketing/analytics/conversion-tracking" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
