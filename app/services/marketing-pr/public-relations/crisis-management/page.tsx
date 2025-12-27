import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Crisis Management PR Dubai | Reputation Protection UAE | Creative Fusion",
  description:
    "Expert crisis management and reputation protection services in Dubai UAE. 24/7 crisis response and strategic communication.",
}

export default function CrisisManagementPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Public Relations", href: "/services/marketing-pr/public-relations" }}
        title="Crisis Management"
        subtitle="Protect your reputation when it matters most"
        description="Our crisis management team provides rapid response and strategic communication to protect your brand reputation during challenging situations."
        heroImage="/crisis-management-business-protection.jpg"
        brandColor="purple"
        benefits={[
          "24/7 response team",
          "Crisis planning",
          "Media training",
          "Message development",
          "Stakeholder communication",
          "Recovery strategy",
        ]}
        processSteps={[
          { title: "Assess", description: "Evaluate the crisis situation" },
          { title: "Plan", description: "Develop response strategy" },
          { title: "Execute", description: "Implement crisis communication" },
          { title: "Recover", description: "Rebuild reputation post-crisis" },
        ]}
        pricingTiers={[
          {
            name: "Crisis Planning",
            price: "AED 15,000",
            description: "One-time setup",
            features: ["Crisis audit", "Response protocols", "Media training", "Contact list", "Simulation exercise"],
          },
          {
            name: "Crisis Retainer",
            price: "AED 25,000",
            description: "Monthly retainer",
            features: [
              "24/7 availability",
              "Rapid response",
              "Media management",
              "Stakeholder comms",
              "Recovery support",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Reputation Management", href: "/services/marketing-pr/public-relations/reputation" },
          { title: "Media Relations", href: "/services/marketing-pr/public-relations/media-relations" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
