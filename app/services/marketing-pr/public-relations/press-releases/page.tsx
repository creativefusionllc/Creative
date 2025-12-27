import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Press Release Writing & Distribution Dubai | Creative Fusion",
  description:
    "Professional press release writing and distribution services in Dubai UAE. Get media coverage for your brand announcements.",
}

export default function PressReleasesPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Public Relations", href: "/services/marketing-pr/public-relations" }}
        title="Press Releases"
        subtitle="Newsworthy announcements that get coverage"
        description="Our expert writers craft compelling press releases that capture media attention and generate coverage for your brand announcements, product launches, and company news."
        heroImage="/press-release-news-media.jpg"
        brandColor="purple"
        benefits={[
          "Professional writing",
          "Media distribution",
          "SEO optimization",
          "Multimedia integration",
          "Performance tracking",
          "Quick turnaround",
        ]}
        processSteps={[
          { title: "Brief", description: "Understand your announcement and goals" },
          { title: "Draft", description: "Write compelling, newsworthy content" },
          { title: "Review", description: "Refine with your feedback" },
          { title: "Distribute", description: "Send to targeted media outlets" },
        ]}
        pricingTiers={[
          {
            name: "Basic Release",
            price: "AED 1,500",
            description: "Single press release",
            features: ["500-word release", "1 revision", "Local distribution", "PDF format"],
          },
          {
            name: "Premium Release",
            price: "AED 3,500",
            description: "Full distribution package",
            features: [
              "800-word release",
              "3 revisions",
              "Regional distribution",
              "Multimedia assets",
              "Follow-up pitch",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Media Relations", href: "/services/marketing-pr/public-relations/media-relations" },
          { title: "Events PR", href: "/services/marketing-pr/public-relations/events-pr" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
