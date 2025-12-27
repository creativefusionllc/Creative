import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Retail Analytics Dubai | Store Performance Data UAE GCC",
  description:
    "Professional retail analytics services in Dubai, UAE & GCC. Sales data analysis, customer insights, inventory metrics, and performance dashboards for retail success.",
  keywords: ["retail analytics dubai", "store data uae", "sales analytics gcc", "retail insights dubai"],
}

export default function AnalyticsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Retail Management", href: "/services/sales-retail/retail-management" },
          }}
          title="Retail Analytics"
          subtitle="Data-Driven Retail"
          description="Make smarter retail decisions with comprehensive analytics services in Dubai, UAE & GCC. We transform your retail data into actionable insights that drive growth."
          heroImage="/retail-analytics-dashboard-dubai.jpg"
          benefits={[
            "Sales performance dashboards",
            "Customer behavior analytics",
            "Inventory turnover analysis",
            "Staff productivity metrics",
            "Foot traffic analysis",
            "Predictive forecasting",
          ]}
          process={[
            { step: 1, title: "Data Integration", description: "Connecting all retail data sources" },
            { step: 2, title: "Dashboard Setup", description: "Creating customized analytics dashboards" },
            { step: 3, title: "Analysis", description: "Regular analysis and insight generation" },
            { step: 4, title: "Recommendations", description: "Actionable recommendations for improvement" },
          ]}
          pricing={{
            startingFrom: "AED 3,000/month",
            includes: ["Dashboard access", "Weekly reports", "Monthly analysis", "Recommendations"],
          }}
          faqs={[
            {
              question: "What data sources do you analyze?",
              answer:
                "We integrate POS data, inventory systems, foot traffic counters, customer feedback, and online sales data.",
            },
            {
              question: "How often do you provide reports?",
              answer: "We provide real-time dashboards, weekly summaries, and comprehensive monthly analysis reports.",
            },
          ]}
          relatedCategories={[
            { title: "POS Systems", href: "/services/sales-retail/retail-management/pos-systems" },
            { title: "Inventory Management", href: "/services/sales-retail/retail-management/inventory" },
            { title: "Store Operations", href: "/services/sales-retail/retail-management/store-operations" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
