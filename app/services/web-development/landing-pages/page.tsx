import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Landing Page Design Dubai | High-Converting Pages | Creative Fusion LLC",
  description:
    "Professional landing page design in Dubai UAE. High-converting pages for lead generation, product launches, and marketing campaigns.",
  keywords: [
    "landing page dubai",
    "lead generation page uae",
    "conversion optimization dubai",
    "landing page design sharjah",
  ],
}

export default function LandingPagesPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Web Development", href: "/services/web-development" }}
      title="Landing Pages"
      subtitle="Convert Visitors to Leads"
      description="High-converting landing pages optimized for lead generation, product launches, and marketing campaigns."
      heroImage="/images/ecommerce-website-mockup.jpg"
      features={[
        { title: "Conversion Focused", description: "Design optimized for conversions" },
        { title: "A/B Testing Ready", description: "Built for continuous optimization" },
        { title: "Lead Capture Forms", description: "Integrated form builders" },
        { title: "Speed Optimized", description: "Fast loading for better results" },
        { title: "Mobile First", description: "Perfect on all devices" },
        { title: "Analytics Integration", description: "Track every conversion" },
      ]}
      pricingTiers={[
        {
          name: "Single Page",
          price: "AED 2,500",
          description: "1 landing page",
          features: ["1 landing page", "Custom design", "Lead capture form", "Mobile responsive", "Analytics setup"],
        },
        {
          name: "Campaign Pack",
          price: "AED 6,000",
          description: "3 landing pages",
          features: ["3 landing pages", "A/B variations", "CRM integration", "Tracking pixels", "Performance report"],
          popular: true,
        },
        {
          name: "Funnel",
          price: "AED 12,000",
          description: "Complete funnel",
          features: [
            "5+ pages",
            "Full funnel design",
            "Email integration",
            "Retargeting setup",
            "Conversion optimization",
            "Ongoing support",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Corporate Websites", href: "/services/web-development/corporate-websites" },
        { title: "UI/UX Design", href: "/services/web-development/ui-ux-design" },
      ]}
    />
  )
}
