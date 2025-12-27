import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Cinema Advertising Dubai | Movie Theatre Ads UAE | Creative Fusion",
  description:
    "Cinema advertising services in Dubai UAE. Big screen impact with pre-show commercials and lobby activations.",
}

export default function CinemaPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Media Buying", href: "/services/marketing-pr/media-buying" }}
        title="Cinema Advertising"
        subtitle="Big screen impact"
        description="Cinema advertising captures undivided attention with immersive, big-screen experiences. We place your ads in premium theatres across UAE."
        heroImage="/cinema-advertising-movie-theatre.jpg"
        brandColor="purple"
        benefits={[
          "Captive audience",
          "Premium environment",
          "High recall",
          "Targeting by film",
          "Lobby activations",
          "Sampling opportunities",
        ]}
        processSteps={[
          { title: "Plan", description: "Select theatres and films" },
          { title: "Create", description: "Produce cinema-quality ad" },
          { title: "Book", description: "Secure screening slots" },
          { title: "Activate", description: "Add lobby experiences" },
        ]}
        pricingTiers={[
          {
            name: "Standard Cinema",
            price: "AED 20,000",
            description: "Per campaign",
            features: ["Single theatre chain", "30-second spot", "2-week run", "Attendance data"],
          },
          {
            name: "Premium Cinema",
            price: "AED 60,000",
            description: "Per campaign",
            features: [
              "All major chains",
              "60-second spot",
              "Premiere targeting",
              "Lobby activation",
              "Branded concessions",
            ],
          },
        ]}
        relatedCategories={[
          { title: "TV Advertising", href: "/services/marketing-pr/media-buying/tv-advertising" },
          { title: "TV Commercials", href: "/services/videography/tv-commercials" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
