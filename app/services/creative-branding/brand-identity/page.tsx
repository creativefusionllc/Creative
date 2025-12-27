import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { Layers } from "lucide-react"

export const metadata: Metadata = {
  title: "Brand Identity Design Dubai | Complete Visual Identity System | Creative Fusion LLC",
  description:
    "Complete brand identity design services in Dubai UAE. Logo, color palette, typography, imagery style, and comprehensive brand systems. Professional visual branding for businesses across Dubai, Sharjah, Abu Dhabi.",
  keywords: [
    "brand identity dubai",
    "visual identity design uae",
    "corporate identity dubai",
    "brand design sharjah",
    "brand identity system",
    "brand development dubai",
    "visual branding uae",
    "corporate branding services",
    "brand identity design sharjah",
    "professional brand identity",
    "brand identity abu dhabi",
    "complete brand system",
    "brand development services",
    "visual identity system",
    "corporate brand identity",
    "brand guidelines creation",
    "identity design services",
    "professional branding dubai",
    "creative brand design",
    "brand identity solutions",
  ],
  openGraph: {
    title: "Brand Identity Design Dubai | Complete Visual Identity | Creative Fusion LLC",
    description: "Complete brand identity systems that define your business personality and set you apart.",
    images: ["/images/brand-identity-service.jpg"],
  },
}

export default function BrandIdentityPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Creative Branding",
          href: "/services/creative-branding",
        }}
        title="Brand Identity"
        subtitle="Complete visual identity systems"
        description="We develop comprehensive brand identity systems that encompass every visual touchpoint of your business. From logo to color palette, typography to imagery style, we create cohesive identities that resonate with your audience across Dubai, Sharjah, and the UAE."
        heroImage="/images/brand-identity-service.jpg"
        icon={Layers}
        features={[
          {
            title: "Logo & Variations",
            description: "Primary logo with horizontal, vertical, and icon-only variations for all applications.",
            icon: "🎯",
          },
          {
            title: "Color Palette",
            description: "Primary and secondary colors with exact specifications for print and digital use.",
            icon: "🎨",
          },
          {
            title: "Typography System",
            description: "Carefully selected font families for headlines, body text, and accents.",
            icon: "🔤",
          },
          {
            title: "Imagery Style",
            description: "Photography and illustration guidelines that maintain visual consistency.",
            icon: "📷",
          },
          {
            title: "Pattern & Textures",
            description: "Custom patterns and textures that add depth to your brand applications.",
            icon: "✨",
          },
          {
            title: "Brand Voice",
            description: "Tone and messaging guidelines that complement the visual identity.",
            icon: "💬",
          },
        ]}
        pricing={[
          {
            name: "Essential Identity",
            price: "AED 5,000",
            features: ["Logo Design", "Color Palette", "Typography", "Basic Guidelines", "7 Day Delivery"],
          },
          {
            name: "Complete Identity",
            price: "AED 12,000",
            features: [
              "Full Logo System",
              "Extended Colors",
              "Typography System",
              "Patterns",
              "Comprehensive Guidelines",
              "Business Card Design",
            ],
            popular: true,
          },
          {
            name: "Enterprise Identity",
            price: "AED 25,000",
            features: [
              "Everything in Complete",
              "Brand Strategy",
              "Full Stationery Set",
              "Social Media Templates",
              "Brand Video Intro",
              "1 Year Support",
            ],
          },
        ]}
        relatedSubServices={[
          { title: "Logo Design", href: "/services/creative-branding/logo-design" },
          { title: "Brand Guidelines", href: "/services/creative-branding/brand-guidelines" },
          { title: "Company Profile", href: "/services/creative-branding/company-profile" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
