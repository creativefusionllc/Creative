import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Portfolio Website Design Dubai | Showcase Your Work | Creative Fusion LLC",
  description:
    "Professional portfolio website design in Dubai. Showcase your creative work, projects, and achievements with stunning web design.",
}

export default function PortfolioSitesPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Corporate Websites", href: "/services/web-development/corporate-websites" }}
        title="Portfolio Sites"
        subtitle="Showcase your work beautifully"
        description="Create stunning portfolio websites that highlight your best work and attract new clients with engaging visuals and intuitive navigation."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Gallery layouts",
          "Project filtering",
          "Image optimization",
          "Video integration",
          "Case studies",
          "Testimonials",
          "Contact forms",
          "Social links",
        ]}
        process={[
          { title: "Curate", description: "Select best work" },
          { title: "Design", description: "Visual showcase" },
          { title: "Build", description: "Development" },
          { title: "Optimize", description: "Performance tuning" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "2,500",
            description: "20 projects",
            features: ["Grid gallery", "Project pages", "Contact form", "Mobile responsive"],
          },
          {
            name: "Pro",
            price: "5,000",
            description: "50 projects",
            features: ["Everything in Basic", "Filtering", "Case studies", "Blog"],
            popular: true,
          },
          {
            name: "Premium",
            price: "10,000",
            description: "Unlimited",
            features: ["Everything in Pro", "Video hosting", "Client portal", "Analytics"],
          },
        ]}
        relatedCategories={[
          { title: "Company Websites", href: "/services/web-development/corporate-websites/company-websites" },
          { title: "One-page", href: "/services/web-development/corporate-websites/one-page" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
