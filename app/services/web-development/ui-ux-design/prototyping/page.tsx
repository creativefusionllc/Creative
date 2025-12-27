import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Prototyping Services Dubai | Interactive Prototypes | Creative Fusion LLC",
  description:
    "Professional prototyping services in Dubai. Create interactive prototypes to test and validate your designs.",
}

export default function PrototypingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "UI/UX Design", href: "/services/web-development/ui-ux-design" }}
        title="Prototyping"
        subtitle="Test before you build"
        description="Create interactive prototypes that simulate real user experiences, allowing you to test and validate designs before development."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Interactive demos",
          "Click-through flows",
          "Animation preview",
          "User testing ready",
          "Stakeholder buy-in",
          "Reduced dev costs",
          "Faster iteration",
          "Mobile prototypes",
        ]}
        process={[
          { title: "Design", description: "High-fidelity screens" },
          { title: "Connect", description: "Link interactions" },
          { title: "Animate", description: "Add transitions" },
          { title: "Test", description: "User validation" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "2,000",
            description: "5 screens",
            features: ["High-fidelity screens", "Basic interactions", "Click-through prototype", "Figma prototype"],
          },
          {
            name: "Advanced",
            price: "5,000",
            description: "15 screens",
            features: ["Everything in Basic", "Animations", "Mobile prototype", "User testing"],
            popular: true,
          },
          {
            name: "Full App",
            price: "12,000",
            description: "Complete app",
            features: ["Everything in Advanced", "Complex interactions", "Multiple flows", "Documentation"],
          },
        ]}
        relatedCategories={[
          { title: "Wireframing", href: "/services/web-development/ui-ux-design/wireframing" },
          { title: "Interface Design", href: "/services/web-development/ui-ux-design/interface-design" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
