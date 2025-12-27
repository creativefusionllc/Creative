import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Product Launch Events Dubai | Launch Campaign UAE | Creative Fusion",
  description:
    "Product launch event planning in Dubai UAE. Create memorable launches that generate buzz and drive sales.",
}

export default function ProductLaunchesPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Event Marketing", href: "/services/marketing-pr/event-marketing" }}
        title="Product Launches"
        subtitle="Create buzz for new products"
        description="We plan and execute product launch events that generate media coverage, influencer buzz, and customer excitement."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Launch strategy",
          "Venue selection",
          "Media invitations",
          "Influencer attendance",
          "Content creation",
          "Sales activation",
        ]}
        processSteps={[
          { title: "Strategize", description: "Plan launch approach" },
          { title: "Invite", description: "Curate guest list" },
          { title: "Execute", description: "Deliver memorable event" },
          { title: "Amplify", description: "Extend reach post-event" },
        ]}
        pricingTiers={[
          {
            name: "Intimate Launch",
            price: "AED 40,000",
            description: "Up to 50 guests",
            features: ["Venue", "Catering", "Basic AV", "Photography", "Social coverage"],
          },
          {
            name: "Grand Launch",
            price: "AED 150,000",
            description: "Up to 200 guests",
            features: [
              "Premium venue",
              "Full production",
              "Media management",
              "Influencer hosting",
              "Live streaming",
              "Full content package",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Events PR", href: "/services/marketing-pr/public-relations/events-pr" },
          { title: "Brand Activations", href: "/services/marketing-pr/event-marketing/activations" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
