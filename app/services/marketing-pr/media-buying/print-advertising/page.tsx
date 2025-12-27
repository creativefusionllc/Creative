import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Print Advertising Dubai | Newspaper Magazine Ads UAE | Creative Fusion",
  description:
    "Print advertising services in Dubai UAE. Newspaper and magazine ad placement for brand awareness and credibility.",
}

export default function PrintAdvertisingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Media Buying", href: "/services/marketing-pr/media-buying" }}
        title="Print Advertising"
        subtitle="Newspapers and magazines"
        description="Print advertising builds credibility and reaches engaged readers. We place your ads in leading newspapers, magazines, and trade publications."
        heroImage="/print-advertising-newspaper-magazine.jpg"
        brandColor="purple"
        benefits={[
          "Premium placements",
          "Rate negotiation",
          "Design support",
          "Publication selection",
          "Insertion scheduling",
          "Readership data",
        ]}
        processSteps={[
          { title: "Research", description: "Identify publications" },
          { title: "Negotiate", description: "Secure best rates" },
          { title: "Design", description: "Create compelling ads" },
          { title: "Place", description: "Execute insertions" },
        ]}
        pricingTiers={[
          {
            name: "Local Print",
            price: "AED 10,000",
            description: "Monthly budget",
            features: ["UAE publications", "Design included", "2 insertions", "Placement report"],
          },
          {
            name: "Premium Print",
            price: "AED 35,000",
            description: "Monthly budget",
            features: [
              "Premium positions",
              "Multiple publications",
              "Custom sizes",
              "Advertorial options",
              "ROI tracking",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Outdoor Advertising", href: "/services/marketing-pr/media-buying/outdoor" },
          { title: "Graphic Design", href: "/services/graphic-design" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
