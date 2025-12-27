import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Link } from "lucide-react"

export const metadata = {
  title: "System Integration Services | Creative Fusion",
  description: "Connect your business systems for seamless data flow and unified operations.",
}

export default function IntegrationsPage() {
  return (
    <CategoryPageTemplate
      title="System Integration"
      subtitle="Connect all your business systems"
      description="Integrate disparate systems, applications, and data sources into a unified ecosystem. Enable seamless data flow and eliminate silos across your organization."
      heroIcon={<Link className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Custom Software", href: "/services/software-apps/custom-software" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Unified Data", description: "Single source of truth" },
        { title: "Real-Time Sync", description: "Instant data updates" },
        { title: "Eliminate Silos", description: "Break down barriers" },
        { title: "Efficiency", description: "No manual data transfer" },
        { title: "Better Decisions", description: "Complete data visibility" },
        { title: "Flexibility", description: "Add new systems easily" },
      ]}
      process={[
        { step: 1, title: "Audit", description: "Map existing systems" },
        { step: 2, title: "Architecture", description: "Design integration approach" },
        { step: 3, title: "Development", description: "Build connectors" },
        { step: 4, title: "Testing", description: "Validate data accuracy" },
        { step: 5, title: "Migration", description: "Sync historical data" },
        { step: 6, title: "Go-Live", description: "Enable real-time sync" },
      ]}
      pricing={[
        {
          name: "Point-to-Point",
          price: "AED 8,000",
          features: ["2 systems", "Basic sync", "Daily updates", "3-month support"],
        },
        {
          name: "Hub Integration",
          price: "AED 30,000",
          features: ["5+ systems", "Real-time sync", "Custom logic", "1-year support"],
          isPopular: true,
        },
        {
          name: "Enterprise iPaaS",
          price: "Custom",
          features: ["Unlimited systems", "Full platform", "Monitoring", "Managed service"],
        },
      ]}
      faqs={[
        {
          question: "What systems can you integrate?",
          answer:
            "Any system with an API or database access - ERP, CRM, accounting, e-commerce, custom apps, and more.",
        },
        {
          question: "API vs direct database?",
          answer:
            "We prefer API integration for security and maintainability. Direct DB is used when APIs aren't available.",
        },
      ]}
      relatedCategories={[
        { name: "API Development", href: "/services/software-apps/custom-software/api-development" },
        { name: "Enterprise Software", href: "/services/software-apps/custom-software/enterprise-software" },
      ]}
    />
  )
}
