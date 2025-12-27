import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Brand Guidelines Design Dubai | Brand Style Guide | Creative Fusion LLC",
  description:
    "Professional brand guidelines and style guide design in Dubai UAE. Comprehensive documentation to ensure consistent brand application across all touchpoints.",
  keywords: [
    "brand guidelines dubai",
    "brand style guide uae",
    "brand book design",
    "brand manual dubai",
    "corporate guidelines",
  ],
  openGraph: {
    title: "Brand Guidelines Design Dubai | Creative Fusion LLC",
    description: "Comprehensive brand guidelines that ensure consistent brand application.",
    images: ["/images/brand-guidelines-service.jpg"],
  },
}

export default function BrandGuidelinesPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Creative Branding",
          href: "/services/creative-branding",
        }}
        title="Brand Guidelines"
        subtitle="Your brand's rulebook"
        description="Brand guidelines ensure everyone in your organization applies the brand correctly and consistently. We create comprehensive, easy-to-follow documentation that protects your brand integrity."
        heroImage="/images/brand-guidelines-service.jpg"
        icon={BookOpen}
        features={[
          {
            title: "Logo Usage Rules",
            description: "Clear specifications for logo placement, sizing, spacing, and what to avoid.",
            icon: "📐",
          },
          {
            title: "Color Specifications",
            description: "Exact color codes for CMYK, RGB, HEX, and Pantone for consistent reproduction.",
            icon: "🎨",
          },
          {
            title: "Typography Guidelines",
            description: "Font specifications, hierarchy, and usage examples for all applications.",
            icon: "🔤",
          },
          {
            title: "Imagery Standards",
            description: "Photography style, illustration guidelines, and image treatment rules.",
            icon: "📷",
          },
          {
            title: "Application Examples",
            description: "Real-world examples showing how to apply the brand across various media.",
            icon: "📱",
          },
          {
            title: "Digital & Print Specs",
            description: "Technical specifications for both digital and print applications.",
            icon: "🖨️",
          },
        ]}
        pricing={[
          {
            name: "Basic Guidelines",
            price: "AED 3,000",
            features: ["Logo Usage", "Color Palette", "Typography", "15-20 Pages", "PDF Format"],
          },
          {
            name: "Standard Guidelines",
            price: "AED 6,000",
            features: [
              "Complete Visual Identity",
              "Application Examples",
              "Do's & Don'ts",
              "30-40 Pages",
              "Editable Files",
            ],
            popular: true,
          },
          {
            name: "Comprehensive Manual",
            price: "AED 12,000",
            features: [
              "Full Brand Book",
              "Voice & Tone",
              "Digital Guidelines",
              "Social Media Rules",
              "60+ Pages",
              "Interactive PDF",
            ],
          },
        ]}
        relatedSubServices={[
          { title: "Brand Identity", href: "/services/creative-branding/brand-identity" },
          { title: "Logo Design", href: "/services/creative-branding/logo-design" },
          { title: "Social Media Design", href: "/services/creative-branding/social-media-design" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
