import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Brand Ambassador Programs Dubai | Ambassador Marketing UAE | Creative Fusion",
  description:
    "Brand ambassador program management in Dubai UAE. Long-term partnerships with influencers and personalities.",
}

export default function BrandAmbassadorsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Influencer Marketing", href: "/services/marketing-pr/influencer-marketing" }}
        title="Brand Ambassadors"
        subtitle="Long-term partnership programs"
        description="Build lasting relationships with brand ambassadors who become authentic advocates for your brand over extended partnerships."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Long-term advocacy",
          "Deeper integration",
          "Authentic connection",
          "Exclusive rights",
          "Multiple touchpoints",
          "Brand loyalty",
        ]}
        processSteps={[
          { title: "Select", description: "Choose ideal ambassadors" },
          { title: "Onboard", description: "Immerse in brand values" },
          { title: "Activate", description: "Execute ongoing content" },
          { title: "Nurture", description: "Build lasting relationship" },
        ]}
        pricingTiers={[
          {
            name: "6-Month Program",
            price: "AED 60,000",
            description: "Per ambassador",
            features: ["Monthly content", "Event attendance", "Exclusive rights", "Performance tracking"],
          },
          {
            name: "Annual Program",
            price: "AED 100,000",
            description: "Per ambassador",
            features: ["Weekly content", "All events", "Commercial use", "Product collaboration", "Co-creation rights"],
          },
        ]}
        relatedCategories={[
          { title: "Celebrity Endorsements", href: "/services/marketing-pr/influencer-marketing/celebrity" },
          { title: "Affiliate Programs", href: "/services/marketing-pr/influencer-marketing/affiliate" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
