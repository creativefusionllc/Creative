import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "User Research Services Dubai | UX Research | Creative Fusion LLC",
  description:
    "Professional user research services in Dubai. Understand your users through interviews, surveys, and testing.",
}

export default function UserResearchPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "UI/UX Design", href: "/services/web-development/ui-ux-design" }}
        title="User Research"
        subtitle="Understand your users"
        description="Conduct comprehensive user research to understand your audience's needs, behaviors, and pain points for informed design decisions."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "User interviews",
          "Surveys",
          "Persona creation",
          "Journey mapping",
          "Competitive analysis",
          "Usability testing",
          "Analytics review",
          "Insights report",
        ]}
        process={[
          { title: "Plan", description: "Research strategy" },
          { title: "Gather", description: "Data collection" },
          { title: "Analyze", description: "Find patterns" },
          { title: "Report", description: "Actionable insights" },
        ]}
        pricing={[
          {
            name: "Quick Study",
            price: "3,000",
            description: "Basic research",
            features: ["5 user interviews", "Survey design", "Persona development", "Summary report"],
          },
          {
            name: "Full Research",
            price: "8,000",
            description: "Comprehensive",
            features: ["Everything in Quick Study", "Competitive analysis", "Journey mapping", "Detailed report"],
            popular: true,
          },
          {
            name: "Ongoing",
            price: "15,000",
            description: "Monthly research",
            features: ["Everything in Full Research", "Monthly studies", "A/B test design", "Quarterly reviews"],
          },
        ]}
        relatedCategories={[
          { title: "Usability Testing", href: "/services/web-development/ui-ux-design/usability-testing" },
          { title: "Wireframing", href: "/services/web-development/ui-ux-design/wireframing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
