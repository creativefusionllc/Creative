import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Email Marketing Dubai | Automated Campaigns | Creative Fusion LLC",
  description:
    "Professional email marketing in Dubai UAE. Automated campaigns, newsletters, drip sequences, and email design.",
  keywords: ["email marketing dubai", "email automation uae", "newsletter design dubai", "email campaigns sharjah"],
}

export default function EmailMarketingPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Digital Marketing", href: "/services/digital-marketing" }}
      title="Email Marketing"
      subtitle="Nurture & Convert"
      description="Automated email campaigns that nurture leads, boost retention, and drive repeat business."
      heroImage="/images/digital-marketing-strategy.png"
      features={[
        { title: "Email Strategy", description: "Campaign planning and audience segmentation" },
        { title: "Template Design", description: "Beautiful, responsive email templates" },
        { title: "Automation Flows", description: "Welcome, nurture, and re-engagement sequences" },
        { title: "Newsletter Management", description: "Regular updates to your audience" },
        { title: "A/B Testing", description: "Subject lines, content, and timing optimization" },
        { title: "Analytics & Reporting", description: "Open rates, clicks, and conversions" },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 1,500/mo",
          description: "Basic email marketing",
          features: ["4 campaigns/month", "Template design", "Basic automation", "Monthly report"],
        },
        {
          name: "Professional",
          price: "AED 3,500/mo",
          description: "Full automation",
          features: ["8 campaigns/month", "Advanced automation", "Segmentation", "A/B testing", "Weekly reports"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 7,000/mo",
          description: "Full service",
          features: [
            "Unlimited campaigns",
            "Custom integrations",
            "Advanced analytics",
            "Dedicated manager",
            "Strategy consulting",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
        { title: "PPC Advertising", href: "/services/digital-marketing/ppc" },
      ]}
    />
  )
}
