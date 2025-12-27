import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Building } from "lucide-react"

export const metadata = {
  title: "Enterprise Software Development | Creative Fusion",
  description: "Large-scale enterprise software solutions for complex business needs.",
}

export default function EnterpriseSoftwarePage() {
  return (
    <CategoryPageTemplate
      title="Enterprise Software"
      subtitle="Large-scale business solutions"
      description="Build robust enterprise software systems that handle complex business processes, large user bases, and integration with existing enterprise infrastructure."
      heroIcon={<Building className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Custom Software", href: "/services/software-apps/custom-software" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Scalability", description: "Handle millions of users" },
        { title: "High Availability", description: "99.99% uptime SLA" },
        { title: "Security", description: "Enterprise-grade security" },
        { title: "Integration", description: "Connect all systems" },
        { title: "Compliance", description: "Meet regulatory requirements" },
        { title: "Analytics", description: "Business intelligence built-in" },
      ]}
      process={[
        { step: 1, title: "Discovery", description: "Deep-dive into requirements" },
        { step: 2, title: "Architecture", description: "Design scalable system" },
        { step: 3, title: "Development", description: "Agile sprints" },
        { step: 4, title: "Integration", description: "Connect existing systems" },
        { step: 5, title: "Testing", description: "Load and security testing" },
        { step: 6, title: "Deployment", description: "Phased rollout" },
      ]}
      pricing={[
        {
          name: "Department",
          price: "From AED 100,000",
          features: ["Single department", "Core features", "6-month timeline", "2 year support"],
        },
        {
          name: "Organization",
          price: "From AED 300,000",
          features: ["Multiple departments", "Full features", "12-month timeline", "3 year support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Global deployment", "Unlimited scale", "Dedicated team", "Ongoing partnership"],
        },
      ]}
      faqs={[
        {
          question: "How do you ensure security?",
          answer:
            "We follow OWASP guidelines, conduct penetration testing, and implement encryption at rest and transit.",
        },
        {
          question: "Can you integrate with SAP/Oracle?",
          answer:
            "Yes, we have experience integrating with major enterprise systems including SAP, Oracle, Salesforce.",
        },
      ]}
      relatedCategories={[
        { name: "System Integration", href: "/services/software-apps/custom-software/integrations" },
        { name: "ERP Systems", href: "/services/software-apps/erp-systems" },
      ]}
    />
  )
}
