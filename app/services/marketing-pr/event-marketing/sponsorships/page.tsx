import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Event Sponsorship Dubai | Sponsorship Management UAE | Creative Fusion",
  description:
    "Event sponsorship strategy and management in Dubai UAE. Maximize ROI from your sponsorship investments.",
}

export default function SponsorshipsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Event Marketing", href: "/services/marketing-pr/event-marketing" }}
        title="Sponsorships"
        subtitle="Strategic event partnerships"
        description="We identify, negotiate, and activate sponsorship opportunities that align with your brand values and deliver measurable ROI."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Opportunity identification",
          "Negotiation support",
          "Rights maximization",
          "Activation planning",
          "ROI measurement",
          "Relationship management",
        ]}
        processSteps={[
          { title: "Identify", description: "Find right opportunities" },
          { title: "Negotiate", description: "Secure best terms" },
          { title: "Activate", description: "Maximize visibility" },
          { title: "Measure", description: "Track ROI" },
        ]}
        pricingTiers={[
          {
            name: "Advisory",
            price: "AED 8,000",
            description: "Per sponsorship",
            features: ["Opportunity research", "Negotiation support", "Contract review", "Basic activation"],
          },
          {
            name: "Full Management",
            price: "AED 20,000",
            description: "Per sponsorship",
            features: [
              "End-to-end management",
              "Activation campaign",
              "On-site execution",
              "PR integration",
              "ROI reporting",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Media Buying", href: "/services/marketing-pr/media-buying" },
          { title: "Public Relations", href: "/services/marketing-pr/public-relations" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
