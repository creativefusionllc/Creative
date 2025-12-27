import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Package } from "lucide-react"

export const metadata = {
  title: "Inventory Management System | Creative Fusion",
  description: "Custom inventory and warehouse management solutions for complete stock control.",
}

export default function InventoryPage() {
  return (
    <CategoryPageTemplate
      title="Inventory Management"
      subtitle="Complete stock control solution"
      description="Custom inventory management systems for real-time stock tracking, warehouse management, order fulfillment, and automated reordering across multiple locations."
      heroIcon={<Package className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "ERP Systems", href: "/services/software-apps/erp-systems" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Real-Time Tracking", description: "Live stock levels" },
        { title: "Multi-Location", description: "Multiple warehouses" },
        { title: "Barcode/RFID", description: "Scan-based operations" },
        { title: "Auto Reorder", description: "Never run out of stock" },
        { title: "Lot Tracking", description: "Batch and serial numbers" },
        { title: "Reports", description: "Inventory analytics" },
      ]}
      process={[
        { step: 1, title: "Assessment", description: "Analyze inventory needs" },
        { step: 2, title: "Design", description: "System architecture" },
        { step: 3, title: "Development", description: "Build custom system" },
        { step: 4, title: "Data Migration", description: "Import existing inventory" },
        { step: 5, title: "Training", description: "Staff training" },
        { step: 6, title: "Go-Live", description: "Launch with support" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 25,000",
          features: ["Single location", "Stock tracking", "Basic reports", "5 users"],
        },
        {
          name: "Professional",
          price: "AED 60,000",
          features: ["Multi-location", "Barcode scanning", "Advanced reports", "20 users"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Unlimited locations", "RFID support", "Custom integrations", "Unlimited users"],
        },
      ]}
      faqs={[
        {
          question: "Can it integrate with our e-commerce?",
          answer: "Yes, we integrate with Shopify, WooCommerce, Magento, and custom platforms for real-time sync.",
        },
        {
          question: "Mobile app included?",
          answer: "Yes, mobile apps for warehouse staff to scan and update inventory on the go.",
        },
      ]}
      relatedCategories={[
        { name: "Supply Chain", href: "/services/software-apps/erp-systems/supply-chain" },
        { name: "Accounting", href: "/services/software-apps/erp-systems/accounting" },
      ]}
    />
  )
}
