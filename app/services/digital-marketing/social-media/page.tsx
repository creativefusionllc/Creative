import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Social Media Marketing Dubai | Instagram & Facebook Ads | Creative Fusion LLC",
  description:
    "Professional social media marketing in Dubai UAE. Instagram, Facebook, LinkedIn, TikTok management and advertising.",
  keywords: [
    "social media marketing dubai",
    "instagram marketing uae",
    "facebook ads dubai",
    "linkedin marketing sharjah",
  ],
}

export default function SocialMediaPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Digital Marketing", href: "/services/digital-marketing" }}
      title="Social Media Marketing"
      subtitle="Engage Your Audience"
      description="Engage your audience on Instagram, Facebook, LinkedIn, TikTok, and more with strategic content and community management."
      heroImage="/images/digital-marketing-strategy.png"
      features={[
        { title: "Content Strategy", description: "Platform-specific content planning" },
        { title: "Community Management", description: "Engagement and response management" },
        { title: "Paid Social Ads", description: "Targeted advertising campaigns" },
        { title: "Influencer Marketing", description: "Influencer partnerships and collaborations" },
        { title: "Analytics & Reporting", description: "Performance tracking and insights" },
        { title: "Content Creation", description: "Graphics, videos, and copy" },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 3,000/mo",
          description: "2 platforms",
          features: ["2 platforms", "12 posts/month", "Basic engagement", "Monthly report"],
        },
        {
          name: "Professional",
          price: "AED 6,000/mo",
          description: "4 platforms",
          features: ["4 platforms", "20 posts/month", "Daily engagement", "Paid ads management", "Weekly reporting"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 12,000/mo",
          description: "Full management",
          features: [
            "All platforms",
            "Daily posting",
            "24/7 engagement",
            "Influencer outreach",
            "Video content",
            "Real-time reporting",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "SEO Services", href: "/services/digital-marketing/seo" },
        { title: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
      ]}
    />
  )
}
