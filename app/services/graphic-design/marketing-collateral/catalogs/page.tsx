import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Book } from "lucide-react"

export const metadata: Metadata = {
  title: "Catalog Design Dubai | Product Catalogs UAE | Creative Fusion LLC",
  description:
    "Professional catalog design services. Product catalogs, service catalogs, lookbooks, sales catalogs with stunning layouts and compelling presentations.",
  keywords: ["catalog design dubai", "product catalog uae", "lookbook design", "sales catalog sharjah"],
}

export default function CatalogsPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Marketing Collateral",
          href: "/services/graphic-design/marketing-collateral",
        }}
        title="Catalog Design"
        subtitle="Professional Product Catalogs"
        description="Create comprehensive catalogs that showcase your offerings with beautiful layouts, professional photography, and persuasive content."
        heroImage="/professional-product-catalog-design.jpg"
        icon={Book}
        features={[
          "Product catalogs",
          "Service catalogs",
          "Lookbooks",
          "Price lists",
          "Multi-page layouts",
          "Print & digital versions",
        ]}
        pricingTiers={[
          {
            name: "Basic Catalog",
            price: "AED 3,000",
            features: ["8-16 pages", "Product layout", "Print-ready"],
          },
          {
            name: "Professional",
            price: "AED 8,000",
            features: ["20-40 pages", "Custom design", "Photography included"],
            highlighted: true,
          },
          {
            name: "Premium",
            price: "AED 15,000+",
            features: ["40+ pages", "Full production", "Print management"],
          },
        ]}
        relatedSubServices={[
          { title: "Brochure Design", href: "/services/graphic-design/marketing-collateral/brochures" },
          { title: "Presentations", href: "/services/graphic-design/marketing-collateral/presentations" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
