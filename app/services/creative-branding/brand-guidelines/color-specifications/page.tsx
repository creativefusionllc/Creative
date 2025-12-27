import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Brand Color Specifications Dubai | Color Palette Guide | Creative Fusion LLC",
  description:
    "Professional brand color specifications with exact codes for CMYK, RGB, HEX, and Pantone. Ensure consistent color reproduction across all media.",
  keywords: ["brand colors dubai", "color palette guide uae", "pantone colors", "cmyk rgb hex specifications"],
}

export default function ColorSpecificationsPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Brand Guidelines"
        subcategoryHref="/services/creative-branding/brand-guidelines"
        title="Color Specifications"
        description="Exact color codes and specifications for consistent brand color reproduction"
        heroImage="/professional-brand-color-palette-specifications.jpg"
        features={[
          {
            title: "CMYK Values",
            description: "Print color specifications for offset and digital printing",
            icon: "🖨️",
          },
          { title: "RGB Values", description: "Screen color codes for web and digital applications", icon: "💻" },
          { title: "HEX Codes", description: "Web-safe hexadecimal color codes for digital design", icon: "#️⃣" },
          {
            title: "Pantone Matching",
            description: "Exact Pantone color references for specialty printing",
            icon: "🎨",
          },
          { title: "Color Hierarchy", description: "Primary, secondary, and accent color usage rules", icon: "📊" },
          { title: "Accessibility", description: "WCAG compliant color contrast ratios", icon: "♿" },
        ]}
        process={[
          { step: "Color Audit", description: "Review existing brand colors" },
          { step: "Code Generation", description: "Create exact color values for all formats" },
          { step: "Usage Guidelines", description: "Define when and how to use each color" },
          { step: "Documentation", description: "Comprehensive color specification guide" },
        ]}
        benefits={[
          "Perfect color matching across print and digital",
          "No color confusion between teams and vendors",
          "Professional, consistent brand appearance",
          "Accessibility compliance for digital applications",
        ]}
        pricing={{
          starting: "AED 1,200",
          description: "Complete color specification guide",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
