import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Wireframing Services Dubai | UX Design | Creative Fusion LLC",
  description:
    "Professional wireframing services in Dubai. Plan your website or app structure with detailed wireframes.",
}

export default function WireframingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "UI/UX Design", href: "/services/web-development/ui-ux-design" }}
        title="Wireframing"
        subtitle="Blueprint your vision"
        description="Create detailed wireframes that map out your website or app structure, user flows, and content hierarchy before design begins."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Page layouts",
          "User flows",
          "Content mapping",
          "Navigation structure",
          "Mobile wireframes",
          "Interactive prototypes",
          "Stakeholder alignment",
          "Cost savings",
        ]}
        process={[
          { title: "Research", description: "User analysis" },
          { title: "Structure", description: "Information architecture" },
          { title: "Wireframe", description: "Layout creation" },
          { title: "Review", description: "Feedback & iterate" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "1,500",
            description: "5 pages",
            features: ["Low-fidelity wireframes", "Desktop layout", "Basic user flow", "PDF delivery"],
          },
          {
            name: "Standard",
            price: "3,500",
            description: "15 pages",
            features: ["Everything in Basic", "Mobile wireframes", "Interactive prototype", "Figma files"],
            popular: true,
          },
          {
            name: "Complete",
            price: "7,500",
            description: "Full project",
            features: ["Everything in Standard", "User research", "Multiple iterations", "Documentation"],
          },
        ]}
        relatedCategories={[
          { title: "Prototyping", href: "/services/web-development/ui-ux-design/prototyping" },
          { title: "User Research", href: "/services/web-development/ui-ux-design/user-research" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
