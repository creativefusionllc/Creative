import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Presentation } from "lucide-react"

export const metadata: Metadata = {
  title: "Presentation Design Dubai | PowerPoint Design UAE | Creative Fusion LLC",
  description:
    "Professional presentation design services. Corporate presentations, sales decks, investor pitch decks, training presentations that engage and persuade.",
  keywords: [
    "presentation design dubai",
    "powerpoint design uae",
    "pitch deck design",
    "corporate presentation sharjah",
  ],
}

export default function PresentationsPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Marketing Collateral",
          href: "/services/graphic-design/marketing-collateral",
        }}
        title="Presentation Design"
        subtitle="Engaging PowerPoint & Keynote Presentations"
        description="Transform your presentations into powerful visual stories that captivate audiences and deliver your message with impact."
        heroImage="/professional-business-presentation-design.jpg"
        icon={Presentation}
        features={[
          "Corporate presentations",
          "Sales decks",
          "Pitch decks",
          "Training presentations",
          "PowerPoint/Keynote",
          "Animated slides",
        ]}
        pricingTiers={[
          {
            name: "Basic",
            price: "AED 1,500",
            features: ["Up to 10 slides", "Professional design", "2 revisions"],
          },
          {
            name: "Professional",
            price: "AED 4,000",
            features: ["Up to 30 slides", "Custom graphics", "Animations"],
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "AED 8,000+",
            features: ["50+ slides", "Full template", "Video integration"],
          },
        ]}
        relatedSubServices={[
          { title: "Brochure Design", href: "/services/graphic-design/marketing-collateral/brochures" },
          { title: "Infographics", href: "/services/graphic-design/marketing-collateral/infographics" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
