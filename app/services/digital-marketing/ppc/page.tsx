import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "PPC Advertising Dubai | Google Ads & Meta Ads | Creative Fusion LLC",
  description:
    "Professional PPC advertising in Dubai UAE. Google Ads, Meta Ads, LinkedIn Ads campaigns designed to maximize ROI.",
  keywords: ["ppc advertising dubai", "google ads uae", "meta ads dubai", "linkedin ads sharjah"],
}

export default function PPCPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Digital Marketing", href: "/services/digital-marketing" }}
      title="Pay-Per-Click Advertising"
      subtitle="Maximize Your ROI"
      description="Google Ads, Meta Ads, and LinkedIn Ads campaigns designed to maximize ROI and drive qualified traffic."
      heroImage="/images/digital-marketing-strategy.png"
      features={[
        { title: "Google Ads", description: "Search, display, and shopping campaigns" },
        { title: "Meta Ads", description: "Facebook and Instagram advertising" },
        { title: "LinkedIn Ads", description: "B2B lead generation campaigns" },
        { title: "Remarketing", description: "Re-engage website visitors" },
        { title: "A/B Testing", description: "Continuous optimization for better results" },
        { title: "Conversion Tracking", description: "ROI measurement and attribution" },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 2,000/mo",
          description: "+ ad spend",
          features: ["1 platform", "Campaign setup", "Basic optimization", "Monthly reporting"],
        },
        {
          name: "Professional",
          price: "AED 4,000/mo",
          description: "+ ad spend",
          features: ["2 platforms", "Advanced targeting", "A/B testing", "Remarketing", "Bi-weekly reporting"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 8,000/mo",
          description: "+ ad spend",
          features: [
            "All platforms",
            "Full funnel strategy",
            "Custom audiences",
            "Landing pages",
            "Daily optimization",
            "Real-time dashboard",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "SEO Services", href: "/services/digital-marketing/seo" },
        { title: "Email Marketing", href: "/services/digital-marketing/email-marketing" },
      ]}
    />
  )
}
