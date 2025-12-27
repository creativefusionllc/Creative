import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Flag } from "lucide-react"

export const metadata: Metadata = {
  title: "Banner Design Dubai | Trade Show Banners UAE | Creative Fusion LLC",
  description:
    "Professional banner design services. Roll-up banners, pull-up banners, trade show banners, retail banners, web banners that stand out.",
  keywords: ["banner design dubai", "roll up banner uae", "trade show banner", "display banner sharjah"],
}

export default function BannersPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Marketing Collateral",
          href: "/services/graphic-design/marketing-collateral",
        }}
        title="Banner Design"
        subtitle="Stand-Out Display Banners"
        description="Create impactful banners for trade shows, retail spaces, events, and online campaigns that capture attention and communicate your message clearly."
        heroImage="/professional-trade-show-banner-design.jpg"
        icon={Flag}
        features={[
          "Roll-up banners",
          "Pull-up banners",
          "Trade show banners",
          "Retail banners",
          "Web banners",
          "All standard sizes",
        ]}
        pricingTiers={[
          {
            name: "Single Banner",
            price: "AED 500",
            features: ["One design", "Standard size", "Print-ready"],
          },
          {
            name: "Event Set",
            price: "AED 1,800",
            features: ["5 banner designs", "Multiple sizes", "Unlimited revisions"],
            highlighted: true,
          },
          {
            name: "Complete Kit",
            price: "AED 4,000+",
            features: ["Full event set", "Premium design", "Print & delivery"],
          },
        ]}
        relatedSubServices={[
          { title: "Poster Design", href: "/services/graphic-design/marketing-collateral/posters" },
          { title: "Trade Show Design", href: "/services/exhibition-stands" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
