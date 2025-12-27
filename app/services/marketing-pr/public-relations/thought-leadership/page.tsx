import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Thought Leadership PR Dubai | Executive Positioning UAE | Creative Fusion",
  description:
    "Position your executives as industry thought leaders in Dubai UAE. Speaking opportunities, byline articles, and expert positioning.",
}

export default function ThoughtLeadershipPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Public Relations", href: "/services/marketing-pr/public-relations" }}
        title="Thought Leadership"
        subtitle="Position executives as industry experts"
        description="We help establish your executives as respected thought leaders through strategic content, speaking opportunities, and expert commentary."
        heroImage="/thought-leader-executive-speaking.jpg"
        brandColor="purple"
        benefits={[
          "Expert positioning",
          "Byline articles",
          "Speaking opportunities",
          "Podcast placements",
          "Award submissions",
          "LinkedIn optimization",
        ]}
        processSteps={[
          { title: "Profile", description: "Define expertise areas" },
          { title: "Content", description: "Create thought leadership content" },
          { title: "Platform", description: "Secure speaking opportunities" },
          { title: "Amplify", description: "Maximize visibility" },
        ]}
        pricingTiers={[
          {
            name: "Emerging Leader",
            price: "AED 10,000",
            description: "Monthly program",
            features: ["2 byline articles", "LinkedIn content", "Award research", "Monthly coaching"],
          },
          {
            name: "Industry Expert",
            price: "AED 20,000",
            description: "Monthly program",
            features: [
              "4 byline articles",
              "Speaking bookings",
              "Podcast placements",
              "Media training",
              "Full support",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Media Relations", href: "/services/marketing-pr/public-relations/media-relations" },
          { title: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
