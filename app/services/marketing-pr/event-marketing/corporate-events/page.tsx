import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Corporate Event Management Dubai | Business Events UAE | Creative Fusion",
  description:
    "Corporate event management in Dubai UAE. Conferences, seminars, galas, and business gatherings professionally executed.",
}

export default function CorporateEventsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Event Marketing", href: "/services/marketing-pr/event-marketing" }}
        title="Corporate Events"
        subtitle="Professional business gatherings"
        description="We manage corporate events from intimate board meetings to large-scale conferences, ensuring professional execution and brand alignment."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Full planning",
          "Venue sourcing",
          "Speaker management",
          "AV production",
          "Catering coordination",
          "Registration systems",
        ]}
        processSteps={[
          { title: "Brief", description: "Understand objectives" },
          { title: "Plan", description: "Develop event plan" },
          { title: "Manage", description: "Coordinate all elements" },
          { title: "Execute", description: "Flawless delivery" },
        ]}
        pricingTiers={[
          {
            name: "Meeting Management",
            price: "AED 15,000",
            description: "Up to 30 attendees",
            features: ["Venue booking", "Catering", "Basic AV", "Materials"],
          },
          {
            name: "Conference Management",
            price: "AED 100,000+",
            description: "100+ attendees",
            features: [
              "Full production",
              "Speaker management",
              "Registration",
              "Networking",
              "Event app",
              "Post-event report",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Trade Shows", href: "/services/marketing-pr/event-marketing/trade-shows" },
          { title: "Corporate Photography", href: "/services/photography/corporate" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
