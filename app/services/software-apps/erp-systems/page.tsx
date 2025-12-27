import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { Database } from "lucide-react"

export const metadata = {
  title: "ERP Systems Development | Creative Fusion",
  description: "Custom ERP solutions for inventory, accounting, HR, and business management.",
}

export default function ERPSystemsPage() {
  return (
    <SubServicePageTemplate
      title="ERP Systems"
      subtitle="Integrated business management"
      description="Custom Enterprise Resource Planning systems that integrate all your business processes - inventory, accounting, HR, sales, and operations - into one unified platform."
      heroIcon={<Database className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      features={[
        {
          title: "Inventory Management",
          description: "Stock and warehouse control",
          href: "/services/software-apps/erp-systems/inventory",
        },
        {
          title: "Accounting",
          description: "Financial management",
          href: "/services/software-apps/erp-systems/accounting",
        },
        {
          title: "HR Management",
          description: "Employee and payroll",
          href: "/services/software-apps/erp-systems/hr-management",
        },
        {
          title: "Supply Chain",
          description: "Procurement and logistics",
          href: "/services/software-apps/erp-systems/supply-chain",
        },
        {
          title: "Manufacturing",
          description: "Production planning",
          href: "/services/software-apps/erp-systems/manufacturing",
        },
        {
          title: "Business Intelligence",
          description: "Reports and dashboards",
          href: "/services/software-apps/erp-systems/business-intelligence",
        },
      ]}
      pricingTiers={[
        {
          name: "Small Business",
          price: "From AED 50,000",
          features: ["3 modules", "Up to 10 users", "6-month implementation", "1-year support"],
        },
        {
          name: "Mid-Market",
          price: "From AED 150,000",
          features: ["6 modules", "Up to 50 users", "9-month implementation", "2-year support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["All modules", "Unlimited users", "Phased rollout", "Ongoing partnership"],
        },
      ]}
      faqs={[
        {
          question: "Custom ERP vs SAP/Oracle?",
          answer:
            "Custom ERP fits your exact processes. Off-shelf requires adapting your processes. Custom is often more cost-effective for SMBs.",
        },
        {
          question: "How long to implement?",
          answer: "Typically 6-18 months depending on scope. We use phased approach for faster value delivery.",
        },
      ]}
    />
  )
}
