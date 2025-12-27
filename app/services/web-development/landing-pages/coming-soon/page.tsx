import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Coming Soon Pages Dubai | Pre-launch Landing Pages | Creative Fusion LLC",
  description:
    "Professional coming soon and pre-launch landing pages in Dubai. Build anticipation and capture early interest.",
}

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Landing Pages", href: "/services/web-development/landing-pages" }}
        title="Coming Soon Pages"
        subtitle="Build anticipation"
        description="Create excitement with coming soon pages that build anticipation, capture email signups, and create buzz before launch."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Countdown timer",
          "Email capture",
          "Social sharing",
          "Teaser content",
          "Progress updates",
          "Early access",
          "Referral system",
          "Brand building",
        ]}
        process={[
          { title: "Tease", description: "Create mystery" },
          { title: "Design", description: "Build excitement" },
          { title: "Capture", description: "Email collection" },
          { title: "Engage", description: "Pre-launch nurture" },
        ]}
        pricing={[
          {
            name: "Simple",
            price: "800",
            description: "Basic page",
            features: ["Countdown timer", "Email signup", "Social links", "Mobile responsive"],
          },
          {
            name: "Enhanced",
            price: "2,000",
            description: "Full featured",
            features: ["Everything in Simple", "Animated content", "Progress bar", "Referral system"],
            popular: true,
          },
          {
            name: "Campaign",
            price: "4,500",
            description: "Complete solution",
            features: ["Everything in Enhanced", "Email sequence", "Social integration", "Analytics"],
          },
        ]}
        relatedCategories={[
          { title: "Product Launch", href: "/services/web-development/landing-pages/product-launch" },
          { title: "Lead Generation", href: "/services/web-development/landing-pages/lead-generation" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
