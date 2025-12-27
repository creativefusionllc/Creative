import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Logo Usage Guidelines Dubai | Logo Standards | Creative Fusion LLC",
  description:
    "Professional logo usage guidelines and standards. Clear specifications for logo placement, sizing, spacing, and proper applications across all media.",
  keywords: ["logo usage guidelines dubai", "logo standards uae", "logo spacing rules", "logo placement dubai"],
}

export default function LogoUsagePage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Brand Guidelines"
        subcategoryHref="/services/creative-branding/brand-guidelines"
        title="Logo Usage Guidelines"
        description="Comprehensive logo usage rules that ensure consistent, professional brand application"
        heroImage="/professional-logo-usage-guidelines-document.jpg"
        features={[
          { title: "Clear Space Rules", description: "Minimum spacing around logo for optimal visibility", icon: "📏" },
          {
            title: "Minimum Size Specs",
            description: "Smallest acceptable logo sizes for print and digital",
            icon: "🔍",
          },
          { title: "Color Variations", description: "Full color, monochrome, and reversed logo versions", icon: "🎨" },
          { title: "Incorrect Usage", description: "What not to do - common mistakes to avoid", icon: "⛔" },
          { title: "Background Rules", description: "Approved backgrounds and color combinations", icon: "🖼️" },
          { title: "File Formats", description: "Vector and raster formats for different applications", icon: "📁" },
        ]}
        process={[
          { step: "Logo Audit", description: "Review existing logo applications" },
          { step: "Standards Creation", description: "Define clear usage rules" },
          { step: "Examples Creation", description: "Show correct and incorrect usage" },
          { step: "Documentation", description: "Compile comprehensive guidelines" },
        ]}
        benefits={[
          "Consistent brand appearance across all touchpoints",
          "Prevents logo misuse by internal teams and partners",
          "Professional brand presentation",
          "Easy reference for designers and vendors",
        ]}
        pricing={{
          starting: "AED 1,500",
          description: "Comprehensive logo usage guidelines",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
