import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Trade Show Marketing Dubai | Exhibition Marketing UAE | Creative Fusion",
  description:
    "Trade show marketing services in Dubai UAE. Stand design, lead generation, and exhibition support for maximum ROI.",
}

export default function TradeShowsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Event Marketing", href: "/services/marketing-pr/event-marketing" }}
        title="Trade Shows"
        subtitle="Stand out at industry events"
        description="We help you maximize ROI from trade shows with strategic planning, stunning stand design, and effective lead generation tactics."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Stand design",
          "Pre-show marketing",
          "Lead capture",
          "Staff training",
          "Follow-up strategy",
          "ROI measurement",
        ]}
        processSteps={[
          { title: "Plan", description: "Define goals and strategy" },
          { title: "Design", description: "Create compelling stand" },
          { title: "Execute", description: "Manage show presence" },
          { title: "Follow-up", description: "Convert leads to sales" },
        ]}
        pricingTiers={[
          {
            name: "Basic Package",
            price: "AED 30,000",
            description: "Per show",
            features: ["Stand concept", "Basic collateral", "Lead forms", "Post-show report"],
          },
          {
            name: "Premium Package",
            price: "AED 80,000",
            description: "Per show",
            features: [
              "Custom stand",
              "Full collateral",
              "Digital lead capture",
              "Staff training",
              "Marketing campaign",
              "Sales follow-up",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Exhibition Stands", href: "/services/print-exhibitions/exhibition-stands" },
          { title: "Product Launches", href: "/services/marketing-pr/event-marketing/product-launches" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
