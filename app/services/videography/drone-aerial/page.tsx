import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Plane } from "lucide-react"

export const metadata: Metadata = {
  title: "Drone & Aerial Videography Dubai | Aerial Footage UAE | Creative Fusion LLC",
  description:
    "Professional drone and aerial videography services. Stunning aerial footage for real estate, events, commercials, and cinematic productions.",
  keywords: ["drone videography dubai", "aerial footage uae", "drone filming", "aerial photography dubai"],
}

export default function DroneAerialPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ title: "Videography", href: "/services/videography" }}
        title="Drone & Aerial Footage"
        subtitle="Stunning Aerial Perspectives"
        description="Capture breathtaking aerial views with our professional drone videography services using DJI Inspire 3 for cinema-quality results."
        heroImage="/images/drone-videography.jpg"
        icon={Plane}
        features={[
          "4K/6K aerial footage",
          "Real estate flyovers",
          "Event coverage",
          "Construction progress",
          "Tourism & hospitality",
          "Cinematic sequences",
        ]}
        pricingTiers={[
          { name: "Basic", price: "AED 2,500", features: ["2 hours filming", "Basic editing", "HD delivery"] },
          {
            name: "Professional",
            price: "AED 5,000",
            features: ["Half day shoot", "Full editing", "4K delivery"],
            highlighted: true,
          },
          {
            name: "Premium",
            price: "AED 10,000+",
            features: ["Full day shoot", "Multiple locations", "Cinematic grade"],
          },
        ]}
        relatedSubServices={[
          { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
          { title: "Product Videos", href: "/services/videography/product-videos" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
