import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Media Relations Services Dubai | Press Coverage UAE | Creative Fusion",
  description:
    "Build strong media relationships in Dubai UAE. Connect with journalists, secure interviews, and get press coverage for your brand.",
}

export default function MediaRelationsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Public Relations", href: "/services/marketing-pr/public-relations" }}
        title="Media Relations"
        subtitle="Connect with journalists and media outlets"
        description="We build and maintain relationships with key journalists, editors, and media outlets to secure consistent coverage and positive press for your brand."
        heroImage="/media-journalist-interview.jpg"
        brandColor="purple"
        benefits={[
          "Media list building",
          "Journalist outreach",
          "Interview coordination",
          "Story pitching",
          "Media monitoring",
          "Coverage reports",
        ]}
        processSteps={[
          { title: "Research", description: "Identify relevant media contacts" },
          { title: "Outreach", description: "Build relationships with journalists" },
          { title: "Pitch", description: "Present compelling story angles" },
          { title: "Secure", description: "Coordinate interviews and coverage" },
        ]}
        pricingTiers={[
          {
            name: "Local Media",
            price: "AED 6,000",
            description: "Monthly retainer",
            features: ["UAE media focus", "10 pitches/month", "Media list access", "Monthly reports"],
          },
          {
            name: "Regional Media",
            price: "AED 12,000",
            description: "Monthly retainer",
            features: [
              "GCC media coverage",
              "25 pitches/month",
              "Interview coordination",
              "Weekly updates",
              "Crisis monitoring",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Press Releases", href: "/services/marketing-pr/public-relations/press-releases" },
          { title: "Thought Leadership", href: "/services/marketing-pr/public-relations/thought-leadership" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
