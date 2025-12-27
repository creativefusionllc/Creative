import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Business Stationery Design Dubai | Business Cards & Letterheads | Creative Fusion LLC",
  description:
    "Professional business stationery design in Dubai UAE. Business cards, letterheads, envelopes, folders, and complete corporate stationery sets that reinforce your brand.",
  keywords: [
    "business stationery dubai",
    "business card design uae",
    "letterhead design dubai",
    "corporate stationery sharjah",
    "envelope design",
  ],
  openGraph: {
    title: "Business Stationery Design Dubai | Creative Fusion LLC",
    description: "Professional business stationery design that reinforces your brand at every touchpoint.",
    images: ["/images/business-stationery-service.jpg"],
  },
}

export default function BusinessStationeryPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Creative Branding",
          href: "/services/creative-branding",
        }}
        title="Business Stationery"
        subtitle="Professional corporate collateral"
        description="Every touchpoint with your customers is an opportunity to reinforce your brand. We design premium business stationery that makes lasting impressions and elevates your professional image."
        heroImage="/images/business-stationery-service.jpg"
        icon={FileText}
        features={[
          {
            title: "Business Cards",
            description: "Premium business card designs with various finishing options including foil and embossing.",
            icon: "💳",
          },
          {
            title: "Letterheads",
            description: "Professional letterhead designs for official correspondence and documents.",
            icon: "📄",
          },
          {
            title: "Envelopes",
            description: "Matching envelope designs in various sizes for complete brand consistency.",
            icon: "✉️",
          },
          {
            title: "Presentation Folders",
            description: "Custom folder designs for proposals, contracts, and marketing materials.",
            icon: "📁",
          },
          {
            title: "Notepads & Forms",
            description: "Branded notepads, invoices, quotations, and other business forms.",
            icon: "📝",
          },
          {
            title: "ID Cards & Badges",
            description: "Employee ID cards and event badges that maintain brand consistency.",
            icon: "🪪",
          },
        ]}
        pricing={[
          {
            name: "Essentials Pack",
            price: "AED 2,000",
            features: ["Business Card (2 sides)", "Letterhead", "Envelope", "Print-Ready Files"],
          },
          {
            name: "Professional Pack",
            price: "AED 4,500",
            features: [
              "Business Card",
              "Letterhead",
              "2 Envelope Sizes",
              "Presentation Folder",
              "Invoice Template",
              "Email Signature",
            ],
            popular: true,
          },
          {
            name: "Complete Pack",
            price: "AED 8,000",
            features: [
              "Full Stationery Set",
              "Notepad Design",
              "ID Card",
              "All Business Forms",
              "Printing Coordination",
              "Digital Templates",
            ],
          },
        ]}
        relatedSubServices={[
          { title: "Logo Design", href: "/services/creative-branding/logo-design" },
          { title: "Brand Identity", href: "/services/creative-branding/brand-identity" },
          { title: "Company Profile", href: "/services/creative-branding/company-profile" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
