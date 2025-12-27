import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Event Marketing Dubai | Experiential Marketing UAE | Creative Fusion",
  description:
    "Event marketing and experiential campaigns in Dubai UAE. Trade shows, product launches, and brand activations.",
}

export default function EventMarketingPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        title="Event Marketing"
        subtitle="Create memorable brand experiences"
        description="We design and execute impactful event marketing campaigns that create memorable brand experiences and drive meaningful engagement."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        features={[
          {
            title: "Trade Shows",
            description: "Stand out at industry events",
            href: "/services/marketing-pr/event-marketing/trade-shows",
          },
          {
            title: "Product Launches",
            description: "Create buzz for new products",
            href: "/services/marketing-pr/event-marketing/product-launches",
          },
          {
            title: "Corporate Events",
            description: "Professional business gatherings",
            href: "/services/marketing-pr/event-marketing/corporate-events",
          },
          {
            title: "Brand Activations",
            description: "Interactive brand experiences",
            href: "/services/marketing-pr/event-marketing/activations",
          },
          {
            title: "Sponsorships",
            description: "Strategic event partnerships",
            href: "/services/marketing-pr/event-marketing/sponsorships",
          },
          {
            title: "Roadshows",
            description: "Multi-location campaigns",
            href: "/services/marketing-pr/event-marketing/roadshows",
          },
        ]}
        pricingTiers={[
          {
            name: "Single Event",
            price: "AED 25,000",
            period: "/event",
            features: ["Concept development", "Basic activation", "Staffing", "Post-event report"],
            popular: false,
          },
          {
            name: "Full Production",
            price: "AED 75,000",
            period: "/event",
            features: [
              "Full creative",
              "Premium activation",
              "Technology integration",
              "Content capture",
              "Lead generation",
            ],
            popular: true,
          },
          {
            name: "Campaign Series",
            price: "Custom",
            period: "",
            features: [
              "Multiple events",
              "Consistent branding",
              "Dedicated team",
              "Integrated marketing",
              "Full analytics",
            ],
            popular: false,
          },
        ]}
        relatedServices={[
          { title: "Exhibition Stands", href: "/services/print-exhibitions/exhibition-stands" },
          { title: "Events PR", href: "/services/marketing-pr/public-relations/events-pr" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
