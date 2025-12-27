import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Typography Guidelines Dubai | Font Specifications | Creative Fusion LLC",
  description:
    "Professional typography guidelines with font specifications, hierarchy, and usage examples. Ensure consistent typographic application across all brand materials.",
  keywords: ["typography guidelines dubai", "font specifications uae", "brand fonts", "typographic hierarchy"],
}

export default function TypographyGuidelinesPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Brand Guidelines"
        subcategoryHref="/services/creative-branding/brand-guidelines"
        title="Typography Guidelines"
        description="Comprehensive font specifications and usage rules for consistent brand typography"
        heroImage="/professional-typography-guidelines-document.jpg"
        features={[
          { title: "Font Families", description: "Primary and secondary typeface selections", icon: "🔤" },
          {
            title: "Font Weights",
            description: "Specific weights for headings, subheadings, and body text",
            icon: "💪",
          },
          { title: "Type Hierarchy", description: "Size, weight, and spacing for different text levels", icon: "📊" },
          { title: "Line Spacing", description: "Leading specifications for optimal readability", icon: "📏" },
          { title: "Usage Examples", description: "Real-world applications across different media", icon: "📱" },
          { title: "Web Fonts", description: "Font loading and fallback specifications", icon: "🌐" },
        ]}
        process={[
          { step: "Font Audit", description: "Review existing typography" },
          { step: "Hierarchy Definition", description: "Establish clear typographic system" },
          { step: "Specifications", description: "Document exact sizes, weights, spacing" },
          { step: "Examples", description: "Show typography in various contexts" },
        ]}
        benefits={[
          "Consistent typography across all communications",
          "Professional, readable content presentation",
          "Clear hierarchy improves user comprehension",
          "Easy reference for designers and developers",
        ]}
        pricing={{
          starting: "AED 1,500",
          description: "Complete typography guidelines",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
