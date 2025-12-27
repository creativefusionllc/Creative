import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Roadshow Marketing Dubai | Multi-City Campaigns UAE | Creative Fusion",
  description:
    "Roadshow and multi-location marketing campaigns in Dubai UAE. Take your brand across multiple cities and venues.",
}

export default function RoadshowsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Event Marketing", href: "/services/marketing-pr/event-marketing" }}
        title="Roadshows"
        subtitle="Multi-location campaigns"
        description="We plan and execute roadshow campaigns that take your brand to multiple locations, maximizing reach and local engagement."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Multi-city planning",
          "Logistics management",
          "Local customization",
          "Consistent branding",
          "Lead aggregation",
          "Scalable execution",
        ]}
        processSteps={[
          { title: "Route", description: "Plan locations and timing" },
          { title: "Setup", description: "Create modular activation" },
          { title: "Execute", description: "Tour across locations" },
          { title: "Report", description: "Consolidated results" },
        ]}
        pricingTiers={[
          {
            name: "3-City Tour",
            price: "AED 80,000",
            description: "UAE coverage",
            features: ["Dubai, Abu Dhabi, Sharjah", "Modular setup", "Local staffing", "Combined report"],
          },
          {
            name: "GCC Tour",
            price: "AED 250,000",
            description: "Regional coverage",
            features: [
              "6 GCC cities",
              "Full production",
              "Local adaptation",
              "Centralized management",
              "Comprehensive analytics",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Brand Activations", href: "/services/marketing-pr/event-marketing/activations" },
          { title: "Trade Shows", href: "/services/marketing-pr/event-marketing/trade-shows" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
