import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "UGC Marketing Dubai | User Generated Content UAE | Creative Fusion",
  description:
    "User generated content campaigns in Dubai UAE. Authentic content from real users and creators at scale.",
}

export default function UGCPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Influencer Marketing", href: "/services/marketing-pr/influencer-marketing" }}
        title="UGC Campaigns"
        subtitle="User-generated content at scale"
        description="Leverage authentic user-generated content from real customers and UGC creators to build trust and drive conversions."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Authentic content",
          "Cost-effective",
          "High volume",
          "Ad creative",
          "Social proof",
          "Rights included",
        ]}
        processSteps={[
          { title: "Brief", description: "Define content needs" },
          { title: "Source", description: "Recruit UGC creators" },
          { title: "Create", description: "Generate content" },
          { title: "Deploy", description: "Use across channels" },
        ]}
        pricingTiers={[
          {
            name: "Starter UGC",
            price: "AED 5,000",
            description: "10 pieces",
            features: ["Photos or videos", "Full rights", "Quick delivery", "Basic editing"],
          },
          {
            name: "Scale UGC",
            price: "AED 15,000",
            description: "30 pieces",
            features: [
              "Mixed formats",
              "Multiple creators",
              "Ad-ready edits",
              "Revisions included",
              "Performance variants",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Micro Influencers", href: "/services/marketing-pr/influencer-marketing/micro-influencers" },
          { title: "Social Media Content", href: "/services/videography/social-media-content" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
