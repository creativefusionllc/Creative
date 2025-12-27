import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "TV Advertising Dubai | Television Commercials UAE | Creative Fusion",
  description:
    "TV advertising and commercial placement in Dubai UAE. Prime time slots, channel selection, and campaign optimization.",
}

export default function TVAdvertisingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Media Buying", href: "/services/marketing-pr/media-buying" }}
        title="TV Advertising"
        subtitle="Prime time slots on top channels"
        description="We secure premium TV advertising slots on leading channels across UAE and GCC, ensuring your commercials reach the right audience at the right time."
        heroImage="/tv-advertising-commercial-broadcast.jpg"
        brandColor="purple"
        benefits={[
          "Prime time slots",
          "Channel negotiation",
          "Audience targeting",
          "Rate optimization",
          "Performance tracking",
          "Creative guidance",
        ]}
        processSteps={[
          { title: "Plan", description: "Define audience and channels" },
          { title: "Negotiate", description: "Secure best rates" },
          { title: "Schedule", description: "Optimize time slots" },
          { title: "Monitor", description: "Track performance" },
        ]}
        pricingTiers={[
          {
            name: "Local TV",
            price: "AED 30,000",
            description: "Minimum spend",
            features: ["UAE channels", "30-second spots", "Prime time access", "Monthly reporting"],
          },
          {
            name: "Regional TV",
            price: "AED 100,000",
            description: "Minimum spend",
            features: ["GCC coverage", "Multiple channels", "Peak slots", "Dedicated buyer", "Weekly optimization"],
          },
        ]}
        relatedCategories={[
          { title: "Radio Advertising", href: "/services/marketing-pr/media-buying/radio-advertising" },
          { title: "TV Commercials", href: "/services/videography/tv-commercials" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
