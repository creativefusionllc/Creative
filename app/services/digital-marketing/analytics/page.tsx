import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Marketing Analytics Dubai | Data-Driven Insights | Creative Fusion LLC",
  description:
    "Professional marketing analytics in Dubai UAE. Google Analytics, reporting dashboards, and data-driven marketing optimization.",
  keywords: [
    "marketing analytics dubai",
    "google analytics uae",
    "data analytics dubai",
    "reporting dashboard sharjah",
  ],
}

export default function AnalyticsPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Digital Marketing", href: "/services/digital-marketing" }}
      title="Analytics & Reporting"
      subtitle="Data-Driven Decisions"
      description="Data-driven insights with comprehensive reporting to measure, analyze, and improve marketing performance."
      heroImage="/images/digital-marketing-strategy.png"
      features={[
        { title: "Google Analytics Setup", description: "Proper tracking and goal configuration" },
        { title: "Custom Dashboards", description: "Real-time performance monitoring" },
        { title: "Conversion Tracking", description: "Attribution and funnel analysis" },
        { title: "Competitor Analysis", description: "Market and competitor insights" },
        { title: "ROI Reporting", description: "Clear return on investment metrics" },
        { title: "Strategic Recommendations", description: "Data-backed action items" },
      ]}
      pricingTiers={[
        {
          name: "Setup",
          price: "AED 2,000",
          description: "One-time setup",
          features: ["GA4 setup", "Goal configuration", "Basic dashboard", "Training session"],
        },
        {
          name: "Monthly",
          price: "AED 2,500/mo",
          description: "Ongoing analytics",
          features: ["Custom dashboards", "Monthly reports", "Performance analysis", "Recommendations"],
          popular: true,
        },
        {
          name: "Advanced",
          price: "AED 5,000/mo",
          description: "Full analytics suite",
          features: [
            "All integrations",
            "Custom reports",
            "Predictive analytics",
            "Weekly insights",
            "Strategy sessions",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "SEO Services", href: "/services/digital-marketing/seo" },
        { title: "PPC Advertising", href: "/services/digital-marketing/ppc" },
      ]}
    />
  )
}
