import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Influencer Marketing Dubai | Influencer Agency UAE | Creative Fusion",
  description:
    "Strategic influencer marketing services in Dubai UAE. Connect with micro, macro, and celebrity influencers for authentic brand promotion.",
}

export default function InfluencerMarketingPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        title="Influencer Marketing"
        subtitle="Authentic connections with your audience"
        description="We connect your brand with the right influencers who authentically resonate with your target audience, driving awareness, engagement, and conversions."
        heroImage="/influencer-marketing-social-media-content-creator.jpg"
        brandColor="purple"
        features={[
          {
            title: "Micro Influencers",
            description: "Authentic engagement with niche audiences",
            href: "/services/marketing-pr/influencer-marketing/micro-influencers",
          },
          {
            title: "Macro Influencers",
            description: "Broad reach with established creators",
            href: "/services/marketing-pr/influencer-marketing/macro-influencers",
          },
          {
            title: "Celebrity Endorsements",
            description: "High-profile brand ambassadors",
            href: "/services/marketing-pr/influencer-marketing/celebrity",
          },
          {
            title: "Brand Ambassadors",
            description: "Long-term partnership programs",
            href: "/services/marketing-pr/influencer-marketing/brand-ambassadors",
          },
          {
            title: "UGC Campaigns",
            description: "User-generated content at scale",
            href: "/services/marketing-pr/influencer-marketing/ugc",
          },
          {
            title: "Affiliate Programs",
            description: "Performance-based partnerships",
            href: "/services/marketing-pr/influencer-marketing/affiliate",
          },
        ]}
        pricingTiers={[
          {
            name: "Starter",
            price: "AED 15,000",
            period: "/campaign",
            features: ["5 micro influencers", "Campaign strategy", "Content review", "Performance report"],
            popular: false,
          },
          {
            name: "Growth",
            price: "AED 40,000",
            period: "/campaign",
            features: [
              "10 influencers mix",
              "Content creation",
              "Paid amplification",
              "Detailed analytics",
              "ROI tracking",
            ],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "AED 100,000",
            period: "/campaign",
            features: [
              "Celebrity + influencers",
              "Full production",
              "Event activation",
              "Always-on program",
              "Dedicated team",
            ],
            popular: false,
          },
        ]}
        relatedServices={[
          { title: "Social Media Marketing", href: "/services/digital-marketing/social-media" },
          { title: "Public Relations", href: "/services/marketing-pr/public-relations" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
