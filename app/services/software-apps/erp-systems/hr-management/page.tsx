import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Users } from "lucide-react"

export const metadata = {
  title: "HR Management System | Creative Fusion",
  description: "Custom HRMS for employee management, payroll, attendance, and performance.",
}

export default function HRManagementPage() {
  return (
    <CategoryPageTemplate
      title="HR Management"
      subtitle="Complete HR solution"
      description="Custom Human Resource Management System for employee records, payroll processing, attendance tracking, leave management, and performance reviews."
      heroIcon={<Users className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "ERP Systems", href: "/services/software-apps/erp-systems" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Employee Database", description: "Complete staff records" },
        { title: "Payroll", description: "Automated salary processing" },
        { title: "Attendance", description: "Time tracking integration" },
        { title: "Leave Management", description: "Requests and approvals" },
        { title: "Performance", description: "Reviews and goals" },
        { title: "Self-Service", description: "Employee portal" },
      ]}
      process={[
        { step: 1, title: "Assessment", description: "HR process analysis" },
        { step: 2, title: "Design", description: "System configuration" },
        { step: 3, title: "Development", description: "Build HR modules" },
        { step: 4, title: "Data Migration", description: "Import employee data" },
        { step: 5, title: "Integration", description: "Connect attendance devices" },
        { step: 6, title: "Training", description: "HR and staff training" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 15,000",
          features: ["Employee records", "Leave management", "Basic payroll", "Up to 50 employees"],
        },
        {
          name: "Professional",
          price: "AED 40,000",
          features: ["Full HRMS", "Attendance integration", "Performance", "Up to 200 employees"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Multi-company", "Advanced analytics", "Recruitment", "Unlimited employees"],
        },
      ]}
      faqs={[
        {
          question: "Does it handle WPS?",
          answer: "Yes, generates UAE WPS files for bank salary transfers compliant with Ministry of Labour.",
        },
        {
          question: "Can it integrate with biometric devices?",
          answer: "Yes, we integrate with most biometric and access control systems for attendance.",
        },
      ]}
      relatedCategories={[
        { name: "Accounting", href: "/services/software-apps/erp-systems/accounting" },
        { name: "Business Intelligence", href: "/services/software-apps/erp-systems/business-intelligence" },
      ]}
    />
  )
}
