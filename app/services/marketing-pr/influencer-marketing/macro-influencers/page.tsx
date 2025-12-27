import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Macro Influencer Marketing Dubai | Big Influencers UAE | Creative Fusion",
  description:
    "Macro influencer marketing in Dubai UAE. Broad reach campaigns with established content creators and personalities.",
}

export default function MacroInfluencersPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Influencer Marketing", href: "/services/marketing-pr/influencer-marketing" }}
        title="Macro Influencers"
        subtitle="Broad reach with established creators"
        description="Macro influencers (100K-1M followers) offer significant reach and established credibility, perfect for brand awareness campaigns."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Massive reach",
          "Established credibility",
          "Professional content",
          "Brand awareness",
          "Cross-platform",
          "Campaign scale",
        ]}
        processSteps={[
          { title: "Match", description: "Find brand-aligned creators" },
          { title: "Negotiate", description: "Secure partnerships" },
          { title: "Create", description: "Develop premium content" },
          { title: "Amplify", description: "Maximize campaign reach" },
        ]}
        pricingTiers={[
          {
            name: "Single Creator",
            price: "AED 25,000",
            description: "Per influencer",
            features: ["100K+ followers", "1 post + stories", "Content rights", "Performance data"],
          },
          {
            name: "Multi-Creator",
            price: "AED 80,000",
            description: "3 influencers",
            features: ["300K+ average", "Full campaign", "Video content", "Paid amplification", "ROI tracking"],
          },
        ]}
        relatedCategories={[
          { title: "Celebrity Endorsements", href: "/services/marketing-pr/influencer-marketing/celebrity" },
          { title: "Brand Ambassadors", href: "/services/marketing-pr/influencer-marketing/brand-ambassadors" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
