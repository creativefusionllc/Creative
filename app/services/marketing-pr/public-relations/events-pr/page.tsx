import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Events PR Dubai | Event Publicity UAE | Creative Fusion",
  description:
    "Generate buzz for your events in Dubai UAE. Pre-event publicity, media coverage, and post-event reporting services.",
}

export default function EventsPRPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Public Relations", href: "/services/marketing-pr/public-relations" }}
        title="Events PR"
        subtitle="Generate buzz for your events"
        description="We create comprehensive PR campaigns for your events, from pre-event publicity to live coverage and post-event amplification."
        heroImage="/event-publicity-media-coverage.jpg"
        brandColor="purple"
        benefits={[
          "Pre-event buzz",
          "Media invitations",
          "Live coverage",
          "Social amplification",
          "Post-event reports",
          "Content creation",
        ]}
        processSteps={[
          { title: "Strategy", description: "Plan event PR approach" },
          { title: "Pre-Event", description: "Build anticipation" },
          { title: "Live", description: "Manage media coverage" },
          { title: "Post-Event", description: "Amplify results" },
        ]}
        pricingTiers={[
          {
            name: "Basic Event PR",
            price: "AED 8,000",
            description: "Per event",
            features: ["Press release", "Media invites", "Social coverage", "Post-event report"],
          },
          {
            name: "Full Event PR",
            price: "AED 20,000",
            description: "Per event",
            features: [
              "PR strategy",
              "Media management",
              "Influencer invites",
              "Live coverage",
              "Content package",
              "ROI analysis",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Press Releases", href: "/services/marketing-pr/public-relations/press-releases" },
          { title: "Influencer Marketing", href: "/services/marketing-pr/influencer-marketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
