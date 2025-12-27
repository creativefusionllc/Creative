import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Radio Advertising Dubai | Radio Commercials UAE | Creative Fusion",
  description:
    "Radio advertising services in Dubai UAE. Reach commuters and listeners with targeted radio commercials on top stations.",
}

export default function RadioAdvertisingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Media Buying", href: "/services/marketing-pr/media-buying" }}
        title="Radio Advertising"
        subtitle="Reach audiences on the go"
        description="Radio remains one of the most cost-effective ways to reach commuters and active listeners. We place your ads on top-rated stations across UAE."
        heroImage="/radio-advertising-broadcast-studio.jpg"
        brandColor="purple"
        benefits={[
          "Drive time slots",
          "Station selection",
          "Jingle production",
          "Live reads",
          "Sponsorships",
          "Performance tracking",
        ]}
        processSteps={[
          { title: "Audience", description: "Identify target listeners" },
          { title: "Stations", description: "Select optimal stations" },
          { title: "Creative", description: "Produce compelling ads" },
          { title: "Air", description: "Execute and optimize" },
        ]}
        pricingTiers={[
          {
            name: "Starter Radio",
            price: "AED 15,000",
            description: "Monthly package",
            features: ["Single station", "20 spots/week", "Production included", "Monthly report"],
          },
          {
            name: "Multi-Station",
            price: "AED 40,000",
            description: "Monthly package",
            features: ["3+ stations", "50 spots/week", "Drive time priority", "Live reads", "Weekly optimization"],
          },
        ]}
        relatedCategories={[
          { title: "TV Advertising", href: "/services/marketing-pr/media-buying/tv-advertising" },
          { title: "Digital Media", href: "/services/marketing-pr/media-buying/digital-media" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
