import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Brochure Design Dubai | Corporate Brochures UAE | Creative Fusion LLC",
  description:
    "Professional brochure design services in Dubai. Tri-fold brochures, bi-fold, product catalogs, corporate brochures. Print-ready designs that convert.",
  keywords: ["brochure design dubai", "corporate brochure uae", "catalog design", "product brochure sharjah"],
}

export default function BrochuresPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Marketing Collateral",
          href: "/services/graphic-design/marketing-collateral",
        }}
        title="Brochure Design"
        subtitle="Professional Marketing Brochures"
        description="Create stunning brochures that showcase your products and services with compelling design and persuasive copy."
        heroImage="/professional-business-brochure-design-layout.jpg"
        icon={BookOpen}
        features={[
          "Tri-fold brochures",
          "Bi-fold brochures",
          "Corporate brochures",
          "Product catalogs",
          "Service brochures",
          "Print-ready files",
        ]}
        pricingTiers={[
          {
            name: "Single Brochure",
            price: "AED 1,200",
            features: ["One design", "Print-ready PDF", "2 revisions"],
          },
          {
            name: "Professional",
            price: "AED 2,500",
            features: ["Up to 3 designs", "Multiple sizes", "Unlimited revisions"],
            highlighted: true,
          },
          {
            name: "Complete Set",
            price: "AED 5,000+",
            features: ["Full brochure series", "Copywriting included", "Print management"],
          },
        ]}
        relatedSubServices={[
          { title: "Flyer Design", href: "/services/graphic-design/marketing-collateral/flyers" },
          { title: "Catalog Design", href: "/services/graphic-design/marketing-collateral/catalogs" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
