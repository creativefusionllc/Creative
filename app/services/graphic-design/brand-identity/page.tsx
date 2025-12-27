import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Palette } from "lucide-react"

export const metadata: Metadata = {
  title: "Brand Identity Design Dubai | Corporate Visual Identity | Creative Fusion LLC",
  description:
    "Professional brand identity design services in Dubai. Complete visual identity systems including logos, color palettes, typography, and brand guidelines.",
  keywords: ["brand identity dubai", "corporate identity design", "visual identity uae", "brand design sharjah"],
}

export default function BrandIdentityPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ title: "Graphic Design", href: "/services/graphic-design" }}
        title="Brand Identity Design"
        subtitle="Complete Visual Identity Systems"
        description="Create a powerful, cohesive brand identity that resonates with your audience and sets you apart from competitors."
        heroImage="/images/brand-identity-design.jpg"
        icon={Palette}
        features={[
          "Logo design and variations",
          "Color palette development",
          "Typography selection",
          "Brand pattern design",
          "Icon and illustration systems",
          "Brand voice guidelines",
        ]}
        pricingTiers={[
          { name: "Starter", price: "AED 3,500", features: ["Logo design", "Color palette", "Basic guidelines"] },
          {
            name: "Professional",
            price: "AED 8,000",
            features: ["Full identity system", "Stationery design", "Social media kit"],
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "AED 15,000+",
            features: ["Complete rebrand", "Brand strategy", "Multi-platform assets"],
          },
        ]}
        relatedSubServices={[
          { title: "Social Media Design", href: "/services/graphic-design/social-media-design" },
          { title: "Marketing Collateral", href: "/services/graphic-design/marketing-collateral" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
