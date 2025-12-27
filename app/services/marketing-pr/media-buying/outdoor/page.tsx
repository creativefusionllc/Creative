import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Outdoor Advertising Dubai | Billboards OOH UAE | Creative Fusion",
  description:
    "Outdoor advertising services in Dubai UAE. Billboards, transit ads, street furniture, and digital OOH for maximum visibility.",
}

export default function OutdoorPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Media Buying", href: "/services/marketing-pr/media-buying" }}
        title="Outdoor Advertising"
        subtitle="Billboards and out-of-home media"
        description="Outdoor advertising delivers massive reach and brand visibility. We secure prime billboard locations, transit ads, and digital OOH placements across UAE."
        heroImage="/billboard-outdoor-advertising-city.jpg"
        brandColor="purple"
        benefits={[
          "Prime locations",
          "High visibility",
          "Digital OOH",
          "Transit advertising",
          "Street furniture",
          "Event displays",
        ]}
        processSteps={[
          { title: "Scout", description: "Identify premium locations" },
          { title: "Negotiate", description: "Secure best rates" },
          { title: "Design", description: "Create impactful visuals" },
          { title: "Install", description: "Execute and monitor" },
        ]}
        pricingTiers={[
          {
            name: "Standard OOH",
            price: "AED 25,000",
            description: "Per month",
            features: ["Single location", "Static billboard", "Design included", "Installation"],
          },
          {
            name: "Premium OOH",
            price: "AED 75,000",
            description: "Per month",
            features: ["Prime locations", "Digital options", "Multiple sites", "Campaign rotation", "Traffic data"],
          },
        ]}
        relatedCategories={[
          { title: "Print Advertising", href: "/services/marketing-pr/media-buying/print-advertising" },
          { title: "Billboards", href: "/services/print-exhibitions/billboards" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
