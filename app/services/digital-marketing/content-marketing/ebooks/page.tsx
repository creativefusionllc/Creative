import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "E-book Creation Dubai | Lead Magnets | Creative Fusion",
  description:
    "E-book creation services in Dubai. Professional e-books and lead magnets that capture leads and establish thought leadership.",
}

export default function EbooksPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="E-books"
        subtitle="Lead Generation Assets"
        description="Create valuable e-books that capture leads and establish authority. We write, design, and produce professional e-books for your business."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Content Marketing", href: "/services/digital-marketing/content-marketing" }}
        benefits={[
          "Lead generation",
          "Thought leadership",
          "Brand authority",
          "Professional design",
          "Multiple formats",
          "Landing page included",
        ]}
        process={[
          { step: "01", title: "Topic Selection", description: "Choose high-value topic" },
          { step: "02", title: "Content Writing", description: "Research and write content" },
          { step: "03", title: "Design & Layout", description: "Professional e-book design" },
          { step: "04", title: "Launch", description: "Set up lead capture" },
        ]}
        pricing={{ startingAt: "AED 5,000", unit: "per e-book" }}
        relatedCategories={[
          { name: "Blog Writing", href: "/services/digital-marketing/content-marketing/blog-writing" },
          { name: "Email Marketing", href: "/services/digital-marketing/email-marketing" },
          { name: "Landing Pages", href: "/services/web-development/landing-pages" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
