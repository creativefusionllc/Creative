import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Grid3X3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Visual Design Systems Dubai | Brand Guidelines | Creative Fusion LLC",
  description:
    "Professional visual design systems and brand guidelines. Create consistent, scalable design systems for your organization.",
  keywords: ["design systems dubai", "brand guidelines uae", "visual design systems", "style guide dubai"],
}

export default function VisualDesignSystemsPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ title: "Graphic Design", href: "/services/graphic-design" }}
        title="Visual Design Systems"
        subtitle="Consistent Brand Guidelines"
        description="Build scalable, consistent design systems that ensure brand coherence across all touchpoints and empower your team."
        heroImage="/images/design-systems.jpg"
        icon={Grid3X3}
        features={[
          "Component libraries",
          "Style guides",
          "Color & typography systems",
          "Icon libraries",
          "Pattern documentation",
          "Design tokens",
        ]}
        pricingTiers={[
          { name: "Basic", price: "AED 5,000", features: ["Style guide", "Color system", "Typography"] },
          {
            name: "Professional",
            price: "AED 15,000",
            features: ["Full design system", "Component library", "Documentation"],
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "AED 30,000+",
            features: ["Multi-brand system", "Team training", "Ongoing support"],
          },
        ]}
        relatedSubServices={[
          { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
          { title: "UI/UX Design", href: "/services/graphic-design/ui-ux-design" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
