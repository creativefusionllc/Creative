import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Truck } from "lucide-react"

export const metadata = {
  title: "Supply Chain Management | Creative Fusion",
  description: "Custom supply chain solutions for procurement, logistics, and vendor management.",
}

export default function SupplyChainPage() {
  return (
    <CategoryPageTemplate
      title="Supply Chain Management"
      subtitle="End-to-end supply chain control"
      description="Custom supply chain management systems for procurement, vendor management, logistics tracking, and demand forecasting to optimize your entire supply chain."
      heroIcon={<Truck className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "ERP Systems", href: "/services/software-apps/erp-systems" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Procurement", description: "PO and vendor management" },
        { title: "Logistics", description: "Shipment tracking" },
        { title: "Vendor Portal", description: "Supplier collaboration" },
        { title: "Demand Planning", description: "Forecasting tools" },
        { title: "Cost Tracking", description: "Total cost visibility" },
        { title: "Analytics", description: "Supply chain insights" },
      ]}
      process={[
        { step: 1, title: "Mapping", description: "Map supply chain" },
        { step: 2, title: "Design", description: "System architecture" },
        { step: 3, title: "Development", description: "Build SCM modules" },
        { step: 4, title: "Integration", description: "Connect vendors" },
        { step: 5, title: "Testing", description: "End-to-end testing" },
        { step: 6, title: "Launch", description: "Phased rollout" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 35,000", features: ["Procurement", "Basic tracking", "5 vendors", "Reports"] },
        {
          name: "Professional",
          price: "AED 80,000",
          features: ["Full SCM", "Vendor portal", "Logistics", "Analytics"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Global supply chain", "AI forecasting", "Unlimited vendors", "Custom integrations"],
        },
      ]}
      faqs={[
        {
          question: "Can vendors access the system?",
          answer: "Yes, vendor portal allows suppliers to view POs, update delivery status, and submit invoices.",
        },
        {
          question: "Does it track shipments?",
          answer: "Yes, integrates with major carriers and freight forwarders for real-time tracking.",
        },
      ]}
      relatedCategories={[
        { name: "Inventory", href: "/services/software-apps/erp-systems/inventory" },
        { name: "Manufacturing", href: "/services/software-apps/erp-systems/manufacturing" },
      ]}
    />
  )
}
