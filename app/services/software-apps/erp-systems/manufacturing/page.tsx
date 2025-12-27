import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Factory } from "lucide-react"

export const metadata = {
  title: "Manufacturing ERP | Creative Fusion",
  description: "Custom manufacturing software for production planning, BOM, and shop floor control.",
}

export default function ManufacturingPage() {
  return (
    <CategoryPageTemplate
      title="Manufacturing ERP"
      subtitle="Production management solution"
      description="Custom manufacturing software for Bill of Materials, production planning, shop floor control, quality management, and manufacturing analytics."
      heroIcon={<Factory className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "ERP Systems", href: "/services/software-apps/erp-systems" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "BOM Management", description: "Multi-level bill of materials" },
        { title: "Production Planning", description: "MRP and scheduling" },
        { title: "Shop Floor", description: "Real-time tracking" },
        { title: "Quality Control", description: "QC checkpoints" },
        { title: "Costing", description: "Accurate product costing" },
        { title: "Traceability", description: "Lot and serial tracking" },
      ]}
      process={[
        { step: 1, title: "Process Analysis", description: "Map manufacturing flows" },
        { step: 2, title: "Design", description: "Configure BOM structure" },
        { step: 3, title: "Development", description: "Build manufacturing modules" },
        { step: 4, title: "Shop Floor Setup", description: "Workstation configuration" },
        { step: 5, title: "Testing", description: "Production simulation" },
        { step: 6, title: "Go-Live", description: "Parallel run then cutover" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 45,000",
          features: ["BOM", "Basic planning", "Inventory link", "Single facility"],
        },
        {
          name: "Professional",
          price: "AED 100,000",
          features: ["Full MRP", "Shop floor", "Quality", "Multi-facility"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Advanced planning", "IoT integration", "AI optimization", "Global operations"],
        },
      ]}
      faqs={[
        {
          question: "Can it handle complex BOMs?",
          answer: "Yes, supports multi-level BOMs with variants, alternates, and phantom assemblies.",
        },
        {
          question: "Does it integrate with machines?",
          answer: "Yes, we can integrate with PLCs and IoT devices for real-time production data.",
        },
      ]}
      relatedCategories={[
        { name: "Inventory", href: "/services/software-apps/erp-systems/inventory" },
        { name: "Supply Chain", href: "/services/software-apps/erp-systems/supply-chain" },
      ]}
    />
  )
}
