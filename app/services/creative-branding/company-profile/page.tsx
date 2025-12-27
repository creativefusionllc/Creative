import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Company Profile Design Dubai | Corporate Profile | Creative Fusion LLC",
  description:
    "Professional company profile design in Dubai UAE. Corporate brochures, capability statements, and business profiles that tell your brand story effectively.",
  keywords: [
    "company profile design dubai",
    "corporate profile uae",
    "business profile design",
    "capability statement dubai",
    "corporate brochure design",
  ],
  openGraph: {
    title: "Company Profile Design Dubai | Creative Fusion LLC",
    description: "Professional company profile design that tells your brand story effectively.",
    images: ["/images/company-profile-service.jpg"],
  },
}

export default function CompanyProfilePage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Creative Branding",
          href: "/services/creative-branding",
        }}
        title="Company Profile"
        subtitle="Tell your brand story"
        description="A well-designed company profile is your business's calling card. We create compelling corporate profiles that showcase your capabilities, achievements, and unique value proposition."
        heroImage="/images/company-profile-service.jpg"
        icon={FileText}
        features={[
          {
            title: "Professional Copywriting",
            description: "Compelling copy that tells your story and engages your target audience.",
            icon: "✍️",
          },
          {
            title: "Custom Layout Design",
            description: "Unique layouts that reflect your brand personality and stand out from competitors.",
            icon: "📐",
          },
          {
            title: "Infographics",
            description: "Visual data representation that makes complex information easy to understand.",
            icon: "📊",
          },
          {
            title: "Print & Digital Versions",
            description: "Optimized versions for both high-quality printing and digital sharing.",
            icon: "📱",
          },
          {
            title: "Multiple Languages",
            description: "Arabic and English versions with proper RTL layout for Arabic content.",
            icon: "🌐",
          },
          {
            title: "Interactive PDF",
            description: "Clickable links, navigation, and multimedia for digital distribution.",
            icon: "🔗",
          },
        ]}
        pricing={[
          {
            name: "Standard Profile",
            price: "AED 4,000",
            features: ["Up to 12 Pages", "Professional Copy", "Custom Design", "Print-Ready PDF", "1 Language"],
          },
          {
            name: "Premium Profile",
            price: "AED 7,500",
            features: [
              "Up to 24 Pages",
              "Professional Copywriting",
              "Custom Photography Direction",
              "Infographics",
              "2 Languages",
              "Interactive PDF",
            ],
            popular: true,
          },
          {
            name: "Enterprise Profile",
            price: "AED 15,000",
            features: [
              "Unlimited Pages",
              "Full Copywriting",
              "Photo Shoot Included",
              "Custom Illustrations",
              "3 Languages",
              "Video Integration",
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
