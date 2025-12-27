import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Micro Influencer Marketing Dubai | Nano Influencers UAE | Creative Fusion",
  description:
    "Micro influencer marketing in Dubai UAE. High engagement rates and authentic connections with niche audiences.",
}

export default function MicroInfluencersPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Influencer Marketing", href: "/services/marketing-pr/influencer-marketing" }}
        title="Micro Influencers"
        subtitle="Authentic engagement with niche audiences"
        description="Micro influencers (1K-100K followers) deliver higher engagement rates and more authentic connections with their dedicated communities."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Higher engagement",
          "Authentic voice",
          "Cost-effective",
          "Niche targeting",
          "Multiple creators",
          "Genuine reviews",
        ]}
        processSteps={[
          { title: "Identify", description: "Find relevant micro influencers" },
          { title: "Vet", description: "Verify authenticity and fit" },
          { title: "Brief", description: "Align on messaging" },
          { title: "Execute", description: "Launch and monitor" },
        ]}
        pricingTiers={[
          {
            name: "Micro Pack",
            price: "AED 8,000",
            description: "5 influencers",
            features: ["1K-50K followers", "Instagram/TikTok", "Stories + posts", "Performance report"],
          },
          {
            name: "Scale Pack",
            price: "AED 20,000",
            description: "15 influencers",
            features: ["Mixed following", "Multi-platform", "Content rights", "Paid boost", "Detailed analytics"],
          },
        ]}
        relatedCategories={[
          { title: "Macro Influencers", href: "/services/marketing-pr/influencer-marketing/macro-influencers" },
          { title: "UGC Campaigns", href: "/services/marketing-pr/influencer-marketing/ugc" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
