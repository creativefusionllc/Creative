import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Media Buying Services Dubai | Advertising Agency UAE | Creative Fusion",
  description:
    "Strategic media buying services in Dubai UAE. TV, radio, print, outdoor, and digital advertising placement for maximum ROI.",
}

export default function MediaBuyingPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        title="Media Buying"
        subtitle="Strategic advertising placement for maximum impact"
        description="Our media buying experts negotiate the best rates and placements across TV, radio, print, outdoor, and digital channels to maximize your advertising ROI."
        heroImage="/media-buying-advertising-billboard.jpg"
        brandColor="purple"
        features={[
          {
            title: "TV Advertising",
            description: "Prime time slots on top channels",
            href: "/services/marketing-pr/media-buying/tv-advertising",
          },
          {
            title: "Radio Advertising",
            description: "Reach audiences on the go",
            href: "/services/marketing-pr/media-buying/radio-advertising",
          },
          {
            title: "Print Advertising",
            description: "Newspapers and magazines",
            href: "/services/marketing-pr/media-buying/print-advertising",
          },
          {
            title: "Outdoor Advertising",
            description: "Billboards and transit ads",
            href: "/services/marketing-pr/media-buying/outdoor",
          },
          {
            title: "Digital Media",
            description: "Online display and video",
            href: "/services/marketing-pr/media-buying/digital-media",
          },
          {
            title: "Cinema Advertising",
            description: "Big screen impact",
            href: "/services/marketing-pr/media-buying/cinema",
          },
        ]}
        pricingTiers={[
          {
            name: "Local Campaign",
            price: "AED 50,000",
            period: "/campaign",
            features: ["Single channel", "1 month duration", "Creative support", "Performance report"],
            popular: false,
          },
          {
            name: "Multi-Channel",
            price: "AED 150,000",
            period: "/campaign",
            features: ["3+ channels", "3 month duration", "Full creative", "Weekly optimization", "Detailed analytics"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "",
            features: ["All channels", "Annual planning", "Dedicated team", "Real-time reporting", "Full integration"],
            popular: false,
          },
        ]}
        relatedServices={[
          { title: "Public Relations", href: "/services/marketing-pr/public-relations" },
          { title: "Digital Marketing", href: "/services/digital-marketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
