import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Usability Testing Services Dubai | UX Testing | Creative Fusion LLC",
  description:
    "Professional usability testing services in Dubai. Test your designs with real users to improve user experience.",
}

export default function UsabilityTestingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "UI/UX Design", href: "/services/web-development/ui-ux-design" }}
        title="Usability Testing"
        subtitle="Test with real users"
        description="Conduct usability testing with real users to identify issues, validate designs, and improve the user experience."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Moderated testing",
          "Remote testing",
          "Task analysis",
          "Error identification",
          "User feedback",
          "Video recordings",
          "Heatmaps",
          "Recommendations",
        ]}
        process={[
          { title: "Plan", description: "Test design" },
          { title: "Recruit", description: "Find participants" },
          { title: "Test", description: "Conduct sessions" },
          { title: "Report", description: "Analysis & fixes" },
        ]}
        pricing={[
          {
            name: "Quick Test",
            price: "2,500",
            description: "5 users",
            features: ["Moderated sessions", "Task completion", "Video recordings", "Summary report"],
          },
          {
            name: "Standard",
            price: "6,000",
            description: "10 users",
            features: ["Everything in Quick Test", "Heatmaps", "Detailed analysis", "Recommendations"],
            popular: true,
          },
          {
            name: "Comprehensive",
            price: "12,000",
            description: "20 users",
            features: ["Everything in Standard", "Multiple rounds", "A/B comparison", "Implementation support"],
          },
        ]}
        relatedCategories={[
          { title: "User Research", href: "/services/web-development/ui-ux-design/user-research" },
          { title: "Analytics", href: "/services/digital-marketing/analytics" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
