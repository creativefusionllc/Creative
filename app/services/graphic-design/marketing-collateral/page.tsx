import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Marketing Collateral Design Dubai | Brochures & Flyers | Creative Fusion LLC",
  description:
    "Professional marketing collateral design. Brochures, flyers, catalogs, presentations, and promotional materials that drive results.",
  keywords: ["marketing collateral dubai", "brochure design uae", "flyer design", "catalog design dubai"],
}

export default function MarketingCollateralPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ title: "Graphic Design", href: "/services/graphic-design" }}
        title="Marketing Collateral"
        subtitle="Print & Digital Materials"
        description="Create impactful marketing materials that communicate your brand message and drive action across print and digital channels."
        heroImage="/images/marketing-collateral.jpg"
        icon={FileText}
        features={[
          "Brochure design",
          "Flyer & poster design",
          "Catalog design",
          "Presentation design",
          "Sales sheets",
          "Trade show materials",
        ]}
        pricingTiers={[
          { name: "Single Item", price: "AED 800", features: ["One design", "Print-ready files", "2 revisions"] },
          {
            name: "Package",
            price: "AED 3,000",
            features: ["5 designs", "Multiple formats", "Unlimited revisions"],
            highlighted: true,
          },
          {
            name: "Complete Kit",
            price: "AED 8,000+",
            features: ["Full collateral set", "Print management", "Ongoing updates"],
          },
        ]}
        relatedSubServices={[
          { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
          { title: "Social Media Design", href: "/services/graphic-design/social-media-design" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
