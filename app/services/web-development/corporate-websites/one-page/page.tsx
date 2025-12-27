import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "One-page Website Design Dubai | Single Page Sites | Creative Fusion LLC",
  description:
    "Professional one-page website design in Dubai. Sleek, modern single-page websites with smooth scrolling and engaging content.",
}

export default function OnePagePage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Corporate Websites", href: "/services/web-development/corporate-websites" }}
        title="One-page Websites"
        subtitle="Sleek single-page solutions"
        description="Create impactful one-page websites with smooth scrolling, engaging animations, and focused content that converts visitors."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Smooth scrolling",
          "Fast loading",
          "Mobile first",
          "Focused content",
          "High conversion",
          "Easy navigation",
          "Modern design",
          "Quick launch",
        ]}
        process={[
          { title: "Content", description: "Section planning" },
          { title: "Design", description: "Visual flow" },
          { title: "Build", description: "Development" },
          { title: "Polish", description: "Animations & launch" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "1,500",
            description: "5 sections",
            features: ["Custom design", "Mobile responsive", "Contact form", "Basic animations"],
          },
          {
            name: "Standard",
            price: "3,000",
            description: "8 sections",
            features: ["Everything in Basic", "Advanced animations", "Video background", "Analytics"],
            popular: true,
          },
          {
            name: "Premium",
            price: "5,000",
            description: "12 sections",
            features: ["Everything in Standard", "Custom interactions", "CMS", "Integrations"],
          },
        ]}
        relatedCategories={[
          { title: "Landing Pages", href: "/services/web-development/landing-pages" },
          { title: "Portfolio Sites", href: "/services/web-development/corporate-websites/portfolio-sites" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
