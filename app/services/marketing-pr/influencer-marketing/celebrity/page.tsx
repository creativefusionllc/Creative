import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Celebrity Endorsement Dubai | Celebrity Marketing UAE | Creative Fusion",
  description:
    "Celebrity endorsement and marketing services in Dubai UAE. Partner with A-list celebrities for premium brand positioning.",
}

export default function CelebrityPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Influencer Marketing", href: "/services/marketing-pr/influencer-marketing" }}
        title="Celebrity Endorsements"
        subtitle="High-profile brand ambassadors"
        description="Partner with regional and international celebrities to elevate your brand with premium endorsements and high-visibility campaigns."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Premium positioning",
          "Mass awareness",
          "Media coverage",
          "Event appearances",
          "Commercial rights",
          "Global reach",
        ]}
        processSteps={[
          { title: "Strategy", description: "Define celebrity criteria" },
          { title: "Approach", description: "Negotiate partnerships" },
          { title: "Contract", description: "Secure rights and terms" },
          { title: "Activate", description: "Execute campaigns" },
        ]}
        pricingTiers={[
          {
            name: "Regional Celebrity",
            price: "AED 150,000",
            description: "Per campaign",
            features: ["GCC celebrity", "Social content", "Event appearance", "3-month term"],
          },
          {
            name: "International Celebrity",
            price: "AED 500,000+",
            description: "Per campaign",
            features: ["Global star", "Full commercial rights", "Multiple activations", "12-month term", "PR support"],
          },
        ]}
        relatedCategories={[
          { title: "Macro Influencers", href: "/services/marketing-pr/influencer-marketing/macro-influencers" },
          { title: "Events PR", href: "/services/marketing-pr/public-relations/events-pr" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
