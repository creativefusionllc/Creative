import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Interface Design Services Dubai | UI Design | Creative Fusion LLC",
  description:
    "Professional interface design services in Dubai. Beautiful, intuitive UI designs for web and mobile applications.",
}

export default function InterfaceDesignPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "UI/UX Design", href: "/services/web-development/ui-ux-design" }}
        title="Interface Design"
        subtitle="Beautiful & functional"
        description="Create stunning interface designs that combine visual appeal with intuitive usability for exceptional user experiences."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Visual design",
          "Component library",
          "Design system",
          "Responsive layouts",
          "Icon design",
          "Animation specs",
          "Developer handoff",
          "Style guide",
        ]}
        process={[
          { title: "Explore", description: "Visual direction" },
          { title: "Design", description: "UI creation" },
          { title: "Refine", description: "Pixel perfection" },
          { title: "Handoff", description: "Developer specs" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "3,000",
            description: "5 screens",
            features: ["High-fidelity UI", "Responsive design", "Basic components", "Figma delivery"],
          },
          {
            name: "Pro",
            price: "7,500",
            description: "15 screens",
            features: ["Everything in Basic", "Component library", "Style guide", "Developer specs"],
            popular: true,
          },
          {
            name: "Design System",
            price: "20,000",
            description: "Complete system",
            features: ["Everything in Pro", "Full design system", "Documentation", "Team training"],
          },
        ]}
        relatedCategories={[
          { title: "Prototyping", href: "/services/web-development/ui-ux-design/prototyping" },
          { title: "Design Systems", href: "/services/graphic-design/visual-design-systems" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
