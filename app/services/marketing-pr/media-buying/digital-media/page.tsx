import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Digital Media Buying Dubai | Programmatic Advertising UAE | Creative Fusion",
  description:
    "Digital media buying services in Dubai UAE. Programmatic advertising, display ads, and video campaigns for targeted reach.",
}

export default function DigitalMediaPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Media Buying", href: "/services/marketing-pr/media-buying" }}
        title="Digital Media Buying"
        subtitle="Online display and video advertising"
        description="Our digital media buying leverages programmatic technology and data-driven targeting to place your ads on premium websites and apps."
        heroImage="/digital-advertising-programmatic-display.jpg"
        brandColor="purple"
        benefits={[
          "Programmatic buying",
          "Audience targeting",
          "Real-time bidding",
          "Cross-device reach",
          "Viewability tracking",
          "Brand safety",
        ]}
        processSteps={[
          { title: "Target", description: "Define audience segments" },
          { title: "Plan", description: "Select inventory sources" },
          { title: "Execute", description: "Launch campaigns" },
          { title: "Optimize", description: "Improve performance" },
        ]}
        pricingTiers={[
          {
            name: "Display Ads",
            price: "AED 10,000",
            description: "Monthly minimum",
            features: ["Banner ads", "Audience targeting", "Basic reporting", "Monthly optimization"],
          },
          {
            name: "Full Digital",
            price: "AED 30,000",
            description: "Monthly minimum",
            features: [
              "Display + video",
              "Advanced targeting",
              "A/B testing",
              "Real-time reporting",
              "Weekly optimization",
            ],
          },
        ]}
        relatedCategories={[
          { title: "PPC Advertising", href: "/services/digital-marketing/ppc" },
          { title: "Social Media", href: "/services/digital-marketing/social-media" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
