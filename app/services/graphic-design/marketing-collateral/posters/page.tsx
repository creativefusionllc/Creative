import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ImageIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Poster Design Dubai | Event Posters UAE | Creative Fusion LLC",
  description:
    "Creative poster design services. Event posters, promotional posters, advertising posters, retail posters that capture attention and drive action.",
  keywords: ["poster design dubai", "event poster uae", "promotional poster design", "advertising posters sharjah"],
}

export default function PostersPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Marketing Collateral",
          href: "/services/graphic-design/marketing-collateral",
        }}
        title="Poster Design"
        subtitle="Eye-Catching Promotional Posters"
        description="Design bold, attention-grabbing posters that make an impact, whether for events, promotions, or brand awareness campaigns."
        heroImage="/bold-colorful-event-poster-design.jpg"
        icon={ImageIcon}
        features={[
          "Event posters",
          "Promotional posters",
          "Advertising posters",
          "Retail posters",
          "All sizes (A0-A4)",
          "Indoor & outdoor",
        ]}
        pricingTiers={[
          {
            name: "Single Poster",
            price: "AED 800",
            features: ["One design", "Standard size", "Print-ready"],
          },
          {
            name: "Campaign Set",
            price: "AED 2,500",
            features: ["5 poster designs", "Multiple sizes", "Unlimited revisions"],
            highlighted: true,
          },
          {
            name: "Large Format",
            price: "AED 5,000+",
            features: ["Billboard size", "Premium design", "Installation support"],
          },
        ]}
        relatedSubServices={[
          { title: "Flyer Design", href: "/services/graphic-design/marketing-collateral/flyers" },
          { title: "Banner Design", href: "/services/graphic-design/marketing-collateral/banners" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
