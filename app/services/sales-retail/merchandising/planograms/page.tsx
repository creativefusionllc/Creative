import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Planogram Services Dubai | Shelf Planning UAE GCC",
  description:
    "Professional planogram and shelf planning services in Dubai, UAE & GCC. Data-driven space optimization, category management, and retail layout planning.",
  keywords: ["planograms dubai", "shelf planning uae", "space optimization gcc", "category management dubai"],
}

export default function PlanogramsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Merchandising", href: "/services/sales-retail/merchandising" },
          }}
          title="Planograms"
          subtitle="Data-Driven Shelf Planning"
          description="Optimize your shelf space with professional planogram services in Dubai, UAE & GCC. We create data-driven layouts that maximize sales per square foot."
          heroImage="/planogram-shelf-planning-dubai.jpg"
          benefits={[
            "Data-driven shelf layouts",
            "Space-to-sales optimization",
            "SKU rationalization",
            "Category flow planning",
            "Compliance tracking",
            "Regular planogram updates",
          ]}
          process={[
            { step: 1, title: "Data Analysis", description: "Analyzing sales data and space metrics" },
            { step: 2, title: "Planogram Design", description: "Creating optimized shelf layouts" },
            { step: 3, title: "Implementation", description: "Rolling out planograms to stores" },
            { step: 4, title: "Compliance Audit", description: "Ensuring planogram adherence" },
          ]}
          pricing={{
            startingFrom: "AED 3,000/planogram",
            includes: ["Analysis", "Design", "Documentation", "Training"],
          }}
          faqs={[
            {
              question: "Which software do you use for planograms?",
              answer:
                "We use industry-standard tools including JDA Space Planning, DotActiv, and can adapt to retailer systems.",
            },
            {
              question: "How do you measure planogram success?",
              answer: "We track sales per linear foot, out-of-stocks, category growth, and compliance rates.",
            },
          ]}
          relatedCategories={[
            { title: "Product Placement", href: "/services/sales-retail/merchandising/placement" },
            { title: "Visual Merchandising", href: "/services/sales-retail/merchandising/visual" },
            { title: "Retail Analytics", href: "/services/sales-retail/retail-management/analytics" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
