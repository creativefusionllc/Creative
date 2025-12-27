import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Digital & Print Specifications Dubai | Technical Guidelines | Creative Fusion LLC",
  description:
    "Technical specifications for digital and print applications. File formats, resolutions, color modes, and production requirements.",
  keywords: ["print specifications dubai", "digital specifications uae", "technical guidelines", "file formats"],
}

export default function DigitalPrintSpecsPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Brand Guidelines"
        subcategoryHref="/services/creative-branding/brand-guidelines"
        title="Digital & Print Specifications"
        description="Technical specifications for both digital and print applications"
        heroImage="/technical-specifications-document-design.jpg"
        features={[
          { title: "Print Specifications", description: "CMYK, resolution, bleed, trim requirements", icon: "🖨️" },
          { title: "Digital Specifications", description: "RGB, web resolutions, file sizes", icon: "💻" },
          { title: "File Formats", description: "When to use PDF, EPS, PNG, JPG, SVG", icon: "📁" },
          { title: "Color Modes", description: "CMYK for print, RGB for digital", icon: "🎨" },
          { title: "Resolution Guide", description: "300dpi print, 72-150dpi web", icon: "🔍" },
          { title: "Production Notes", description: "Paper stocks, finishes, substrates", icon: "📋" },
        ]}
        process={[
          { step: "Requirements Gathering", description: "Identify all production scenarios" },
          { step: "Specifications Definition", description: "Define technical requirements" },
          { step: "Format Guidelines", description: "Specify file formats for each use" },
          { step: "Documentation", description: "Create comprehensive technical guide" },
        ]}
        benefits={[
          "Perfect reproduction in all media",
          "Prevents production errors and delays",
          "Clear instructions for vendors and printers",
          "Consistent quality across all applications",
        ]}
        pricing={{
          starting: "AED 1,800",
          description: "Complete technical specifications guide",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
