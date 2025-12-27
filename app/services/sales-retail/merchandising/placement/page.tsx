import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Product Placement Services Dubai | Retail Positioning UAE GCC",
  description:
    "Professional product placement services in Dubai, UAE & GCC. Strategic shelf positioning, eye-level placement, and category management for retail success.",
  keywords: ["product placement dubai", "shelf positioning uae", "retail placement gcc", "category management dubai"],
}

export default function PlacementPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Merchandising", href: "/services/sales-retail/merchandising" },
          }}
          title="Product Placement"
          subtitle="Strategic Positioning"
          description="Maximize product visibility with strategic placement services in Dubai, UAE & GCC. We position your products where customers can see and reach them easily."
          heroImage="/product-placement-retail-dubai.jpg"
          benefits={[
            "Eye-level positioning strategies",
            "End-cap and promotional placement",
            "Category adjacency optimization",
            "Cross-merchandising opportunities",
            "Competition analysis",
            "Placement compliance audits",
          ]}
          process={[
            { step: 1, title: "Category Analysis", description: "Understanding product category dynamics" },
            { step: 2, title: "Position Strategy", description: "Developing placement recommendations" },
            { step: 3, title: "Implementation", description: "Executing product placement changes" },
            { step: 4, title: "Monitoring", description: "Tracking sales impact and compliance" },
          ]}
          pricing={{
            startingFrom: "AED 2,000/store",
            includes: ["Analysis", "Recommendations", "Implementation", "Follow-up"],
          }}
          faqs={[
            {
              question: "Do you negotiate with retailers for better placement?",
              answer:
                "Yes, we work with retailer category managers to secure optimal shelf positioning for your products.",
            },
            {
              question: "How do you measure placement effectiveness?",
              answer:
                "We track sales velocity, share of shelf, and compare performance across different placement positions.",
            },
          ]}
          relatedCategories={[
            { title: "Visual Merchandising", href: "/services/sales-retail/merchandising/visual" },
            { title: "Planograms", href: "/services/sales-retail/merchandising/planograms" },
            { title: "In-Store Branding", href: "/services/sales-retail/merchandising/in-store-branding" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
