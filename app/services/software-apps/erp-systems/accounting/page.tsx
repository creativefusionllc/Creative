import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Calculator } from "lucide-react"

export const metadata = {
  title: "Accounting Software Development | Creative Fusion",
  description: "Custom accounting and financial management software for businesses.",
}

export default function AccountingPage() {
  return (
    <CategoryPageTemplate
      title="Accounting Software"
      subtitle="Financial management solution"
      description="Custom accounting software for invoicing, expenses, payroll, tax compliance, and financial reporting tailored to your business and local regulations."
      heroIcon={<Calculator className="h-8 w-8" />}
      brandColor="green"
      parentService={{ name: "ERP Systems", href: "/services/software-apps/erp-systems" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Invoicing", description: "Professional invoices" },
        { title: "Expenses", description: "Track all expenses" },
        { title: "Bank Sync", description: "Auto bank reconciliation" },
        { title: "Tax Compliance", description: "VAT and local taxes" },
        { title: "Reports", description: "P&L, balance sheet, cash flow" },
        { title: "Multi-Currency", description: "Global transactions" },
      ]}
      process={[
        { step: 1, title: "Requirements", description: "Financial process mapping" },
        { step: 2, title: "Design", description: "Chart of accounts setup" },
        { step: 3, title: "Development", description: "Build accounting modules" },
        { step: 4, title: "Data Migration", description: "Import financial history" },
        { step: 5, title: "Testing", description: "Validate calculations" },
        { step: 6, title: "Training", description: "Finance team training" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 20,000", features: ["Invoicing", "Expenses", "Basic reports", "3 users"] },
        {
          name: "Professional",
          price: "AED 50,000",
          features: ["Full accounting", "Bank sync", "Tax reports", "10 users"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Multi-company", "Consolidation", "Advanced analytics", "Unlimited users"],
        },
      ]}
      faqs={[
        {
          question: "Is it VAT compliant?",
          answer: "Yes, fully compliant with UAE VAT requirements including tax reports and FTA submission format.",
        },
        {
          question: "Can accountants access remotely?",
          answer: "Yes, cloud-based with role-based access for internal team and external accountants.",
        },
      ]}
      relatedCategories={[
        { name: "Inventory", href: "/services/software-apps/erp-systems/inventory" },
        { name: "HR Management", href: "/services/software-apps/erp-systems/hr-management" },
      ]}
    />
  )
}
