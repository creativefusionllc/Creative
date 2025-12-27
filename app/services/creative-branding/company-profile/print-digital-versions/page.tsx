import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Print & Digital Company Profiles Dubai | Multi-Format Design | Creative Fusion LLC",
  description:
    "Optimized company profiles for both high-quality printing and digital sharing. Perfect for all distribution channels.",
  keywords: [
    "print company profile dubai",
    "digital company profile uae",
    "multi-format design",
    "print digital profiles",
  ],
}

export default function PrintDigitalVersionsPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Company Profile"
        subcategoryHref="/services/creative-branding/company-profile"
        title="Print & Digital Versions"
        description="Optimized versions for both high-quality printing and digital sharing"
        heroImage="/print-and-digital-company-profile-formats.jpg"
        features={[
          { title: "Print-Ready PDF", description: "CMYK, bleed, high resolution for printing", icon: "🖨️" },
          { title: "Digital PDF", description: "RGB, web-optimized, smaller file size", icon: "💻" },
          { title: "Interactive PDF", description: "Clickable links, bookmarks, navigation", icon: "🔗" },
          { title: "Mobile-Optimized", description: "Readable on smartphones and tablets", icon: "📱" },
          { title: "Print Specifications", description: "Ready to send to any printer", icon: "📋" },
          { title: "Email-Friendly", description: "Compressed for easy email sharing", icon: "📧" },
        ]}
        process={[
          { step: "Master Design", description: "Create the master profile design" },
          { step: "Print Version", description: "Optimize for high-quality printing" },
          { step: "Digital Version", description: "Create web-optimized version" },
          { step: "Testing", description: "Test on various devices and printers" },
        ]}
        benefits={[
          "Perfect quality in both print and digital",
          "Easy to share via email or download",
          "Professional printing results",
          "Accessible on all devices",
        ]}
        pricing={{
          starting: "AED 1,500",
          description: "Print and digital optimization",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
