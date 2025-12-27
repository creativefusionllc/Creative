import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Reputation Management Dubai | Online Reputation UAE | Creative Fusion",
  description:
    "Professional reputation management services in Dubai UAE. Monitor, protect, and enhance your brand's online and offline reputation.",
}

export default function ReputationPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Public Relations", href: "/services/marketing-pr/public-relations" }}
        title="Reputation Management"
        subtitle="Build and protect your brand reputation"
        description="We monitor, protect, and enhance your brand's reputation across all channels, ensuring positive perception among your stakeholders."
        heroImage="/reputation-management-brand-trust.jpg"
        brandColor="purple"
        benefits={[
          "Brand monitoring",
          "Review management",
          "Social listening",
          "SEO reputation",
          "Competitor analysis",
          "Sentiment tracking",
        ]}
        processSteps={[
          { title: "Audit", description: "Assess current reputation" },
          { title: "Monitor", description: "Track brand mentions" },
          { title: "Respond", description: "Address negative content" },
          { title: "Build", description: "Create positive presence" },
        ]}
        pricingTiers={[
          {
            name: "Monitor",
            price: "AED 4,000",
            description: "Monthly service",
            features: ["Brand monitoring", "Weekly reports", "Alert notifications", "Basic response"],
          },
          {
            name: "Protect",
            price: "AED 10,000",
            description: "Monthly service",
            features: [
              "24/7 monitoring",
              "Review management",
              "SEO optimization",
              "Content creation",
              "Crisis support",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Crisis Management", href: "/services/marketing-pr/public-relations/crisis-management" },
          { title: "Social Media", href: "/services/digital-marketing/social-media" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
