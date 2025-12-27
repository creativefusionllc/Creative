import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Brand Application Examples Dubai | Brand Guidelines | Creative Fusion LLC",
  description:
    "Real-world brand application examples showing correct usage across stationery, marketing materials, digital platforms, and more.",
  keywords: ["brand application examples dubai", "brand usage examples uae", "brand guidelines applications"],
}

export default function ApplicationExamplesPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Brand Guidelines"
        subcategoryHref="/services/creative-branding/brand-guidelines"
        title="Application Examples"
        description="Real-world examples showing how to apply your brand across various media"
        heroImage="/brand-application-mockups-stationery-marketing.jpg"
        features={[
          { title: "Stationery Examples", description: "Business cards, letterheads, envelopes", icon: "📄" },
          { title: "Marketing Materials", description: "Brochures, flyers, advertisements", icon: "📰" },
          { title: "Digital Applications", description: "Website, email signatures, social media", icon: "💻" },
          { title: "Signage", description: "Office signage, vehicle graphics, banners", icon: "🏢" },
          { title: "Product Packaging", description: "Boxes, labels, bags", icon: "📦" },
          { title: "Apparel", description: "Uniforms, promotional clothing", icon: "👕" },
        ]}
        process={[
          { step: "Touchpoint Identification", description: "List all brand touchpoints" },
          { step: "Example Creation", description: "Design mockups for key applications" },
          { step: "Specification", description: "Add technical details to each example" },
          { step: "Documentation", description: "Compile comprehensive application guide" },
        ]}
        benefits={[
          "Clear visual reference for proper brand application",
          "Reduces errors and inconsistencies",
          "Inspires creative applications of the brand",
          "Speeds up design and production processes",
        ]}
        pricing={{
          starting: "AED 2,500",
          description: "Comprehensive application examples",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
