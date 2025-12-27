import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Flyer Design Dubai | Promotional Flyers UAE | Creative Fusion LLC",
  description:
    "Eye-catching flyer design services in Dubai. Event flyers, promotional flyers, real estate flyers, business flyers that get noticed and drive action.",
  keywords: ["flyer design dubai", "promotional flyers uae", "event flyer design", "business flyers sharjah"],
}

export default function FlyersPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Marketing Collateral",
          href: "/services/graphic-design/marketing-collateral",
        }}
        title="Flyer Design"
        subtitle="High-Impact Promotional Flyers"
        description="Design attention-grabbing flyers that communicate your message effectively and drive response rates."
        heroImage="/colorful-promotional-flyer-design.jpg"
        icon={FileText}
        features={[
          "Event flyers",
          "Promotional flyers",
          "Real estate flyers",
          "Business flyers",
          "Sale flyers",
          "A4/A5 sizes",
        ]}
        pricingTiers={[
          {
            name: "Single Flyer",
            price: "AED 600",
            features: ["One design", "Print-ready PDF", "2 revisions"],
          },
          {
            name: "Multi-Pack",
            price: "AED 1,800",
            features: ["5 flyer designs", "Multiple formats", "Unlimited revisions"],
            highlighted: true,
          },
          {
            name: "Campaign",
            price: "AED 4,000+",
            features: ["Full campaign set", "Copywriting", "Print management"],
          },
        ]}
        relatedSubServices={[
          { title: "Brochure Design", href: "/services/graphic-design/marketing-collateral/brochures" },
          { title: "Poster Design", href: "/services/graphic-design/marketing-collateral/posters" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
