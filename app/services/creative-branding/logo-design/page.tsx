import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { Palette } from "lucide-react"

export const metadata: Metadata = {
  title: "Logo Design Services Dubai | Professional Logo Designer | Creative Fusion LLC",
  description:
    "Professional logo design services in Dubai UAE. Custom logo creation, brand marks, wordmarks, and complete visual identity systems. Get a memorable logo that defines your brand.",
  keywords: [
    "logo design dubai",
    "logo designer uae",
    "custom logo design",
    "brand logo dubai",
    "professional logo design",
    "logo design sharjah",
  ],
  openGraph: {
    title: "Logo Design Services Dubai | Creative Fusion LLC",
    description: "Custom logo design services that create memorable, versatile, and timeless brand marks.",
    images: ["/images/logo-design-service.jpg"],
  },
}

export default function LogoDesignPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Creative Branding",
          href: "/services/creative-branding",
        }}
        title="Logo Design"
        subtitle="Your brand's visual identity starts here"
        description="We create custom logos that are memorable, versatile, and timeless. Our logo design process combines strategic thinking with creative excellence to deliver brand marks that truly represent your business."
        heroImage="/images/logo-design-service.jpg"
        icon={Palette}
        features={[
          {
            title: "Custom Logo Creation",
            description: "100% original designs tailored specifically to your brand personality and industry.",
            icon: "🎨",
          },
          {
            title: "Multiple Concepts",
            description: "We provide 3-5 unique logo concepts for you to choose from and refine.",
            icon: "💡",
          },
          {
            title: "Unlimited Revisions",
            description: "We work with you until you're completely satisfied with your logo.",
            icon: "🔄",
          },
          {
            title: "All File Formats",
            description: "Receive your logo in AI, PSD, PNG, SVG, PDF, and other formats you need.",
            icon: "📁",
          },
          {
            title: "Brand Guidelines",
            description: "Basic usage guidelines included to ensure consistent logo application.",
            icon: "📋",
          },
          {
            title: "Trademark Ready",
            description: "Original designs that can be registered as trademarks for legal protection.",
            icon: "™️",
          },
        ]}
        pricing={[
          {
            name: "Starter Logo",
            price: "AED 1,500",
            features: ["2 Logo Concepts", "3 Revisions", "PNG & JPG Files", "5 Day Delivery"],
          },
          {
            name: "Professional Logo",
            price: "AED 3,500",
            features: [
              "5 Logo Concepts",
              "Unlimited Revisions",
              "All File Formats",
              "Brand Color Palette",
              "3 Day Delivery",
            ],
            popular: true,
          },
          {
            name: "Premium Logo",
            price: "AED 6,000",
            features: [
              "7 Logo Concepts",
              "Unlimited Revisions",
              "All Formats",
              "Full Brand Guidelines",
              "Social Media Kit",
              "Priority Support",
            ],
          },
        ]}
        relatedSubServices={[
          { title: "Brand Identity", href: "/services/creative-branding/brand-identity" },
          { title: "Business Stationery", href: "/services/creative-branding/business-stationery" },
          { title: "Brand Guidelines", href: "/services/creative-branding/brand-guidelines" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
