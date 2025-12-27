import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Print Materials | Print & Exhibitions",
  description: "Professional printing services for brochures, flyers, catalogs, and marketing materials.",
}

export default function PrintMaterialsPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Print & Exhibitions", serviceHref: "/services/print-exhibitions" }}
      title="Print Materials"
      subtitle="Commercial Printing"
      description="High-quality printing services for all your marketing and business material needs."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Brochures",
          description: "Folded marketing materials",
          href: "/services/print-exhibitions/print-materials/brochures",
        },
        {
          title: "Flyers",
          description: "Single-sheet handouts",
          href: "/services/print-exhibitions/print-materials/flyers",
        },
        {
          title: "Catalogs",
          description: "Product catalogs",
          href: "/services/print-exhibitions/print-materials/catalogs",
        },
        {
          title: "Posters",
          description: "Large format prints",
          href: "/services/print-exhibitions/print-materials/posters",
        },
        {
          title: "Packaging",
          description: "Product packaging",
          href: "/services/print-exhibitions/print-materials/packaging",
        },
        {
          title: "Stickers",
          description: "Labels and stickers",
          href: "/services/print-exhibitions/print-materials/stickers",
        },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 500",
          features: ["500 flyers", "A5 size", "Standard paper", "3-day delivery"],
          popular: false,
        },
        {
          name: "Business",
          price: "AED 2,000",
          features: ["1000 brochures", "Premium paper", "Custom finishing", "Design included"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Large volume", "Multiple items", "Warehousing", "Fulfillment"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "What's the minimum order?", answer: "Varies by product, typically starting at 100 units." },
        {
          question: "Do you offer eco-friendly options?",
          answer: "Yes, we have recycled and sustainable paper options.",
        },
      ]}
    />
  )
}
