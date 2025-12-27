import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Brand Imagery Standards Dubai | Photography Guidelines | Creative Fusion LLC",
  description:
    "Professional brand imagery standards. Photography style, illustration guidelines, and image treatment rules for consistent visual communication.",
  keywords: ["imagery guidelines dubai", "photography style guide uae", "brand photography", "visual standards"],
}

export default function ImageryStandardsPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Brand Guidelines"
        subcategoryHref="/services/creative-branding/brand-guidelines"
        title="Imagery Standards"
        description="Photography style, illustration guidelines, and image treatment rules for your brand"
        heroImage="/professional-brand-photography-style-guide.jpg"
        features={[
          { title: "Photography Style", description: "Color palette, lighting, composition guidelines", icon: "📷" },
          { title: "Subject Matter", description: "What to photograph and how to present it", icon: "🎯" },
          { title: "Image Treatment", description: "Filters, overlays, and editing specifications", icon: "✨" },
          { title: "Illustration Style", description: "Guidelines for custom illustrations", icon: "🎨" },
          { title: "Image Ratios", description: "Aspect ratios for different applications", icon: "📐" },
          { title: "Don'ts", description: "What imagery to avoid for brand consistency", icon: "⛔" },
        ]}
        process={[
          { step: "Visual Audit", description: "Review existing brand imagery" },
          { step: "Style Definition", description: "Define photography and illustration standards" },
          { step: "Treatment Rules", description: "Specify image editing guidelines" },
          { step: "Documentation", description: "Create comprehensive imagery guide" },
        ]}
        benefits={[
          "Consistent visual style across all platforms",
          "Professional, recognizable brand imagery",
          "Clear direction for photographers and designers",
          "Faster content creation with clear guidelines",
        ]}
        pricing={{
          starting: "AED 2,000",
          description: "Complete imagery standards guide",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
