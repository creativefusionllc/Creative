import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Cog } from "lucide-react"

export const metadata = {
  title: "Business Process Automation | Creative Fusion",
  description: "Automate repetitive tasks and streamline workflows for maximum efficiency.",
}

export default function AutomationPage() {
  return (
    <CategoryPageTemplate
      title="Business Automation"
      subtitle="Automate workflows & processes"
      description="Eliminate manual, repetitive tasks with intelligent automation. We build custom automation solutions that save time, reduce errors, and increase productivity."
      heroIcon={<Cog className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Custom Software", href: "/services/software-apps/custom-software" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Save Time", description: "Automate repetitive tasks" },
        { title: "Reduce Errors", description: "Eliminate human mistakes" },
        { title: "Cost Savings", description: "Lower operational costs" },
        { title: "Scalability", description: "Handle increased volume" },
        { title: "24/7 Operations", description: "Run without supervision" },
        { title: "Compliance", description: "Consistent process adherence" },
      ]}
      process={[
        { step: 1, title: "Process Mapping", description: "Document current workflows" },
        { step: 2, title: "Identify Opportunities", description: "Find automation candidates" },
        { step: 3, title: "Design", description: "Design automated workflows" },
        { step: 4, title: "Build", description: "Develop automation scripts" },
        { step: 5, title: "Test", description: "Validate accuracy" },
        { step: 6, title: "Deploy", description: "Launch and monitor" },
      ]}
      pricing={[
        {
          name: "Single Process",
          price: "AED 5,000",
          features: ["One workflow", "Basic triggers", "Email notifications", "30-day support"],
        },
        {
          name: "Department",
          price: "AED 25,000",
          features: ["Multiple workflows", "Advanced logic", "System integrations", "6-month support"],
          isPopular: true,
        },
        {
          name: "Enterprise RPA",
          price: "Custom",
          features: ["Company-wide automation", "AI/ML capabilities", "Full monitoring", "Ongoing management"],
        },
      ]}
      faqs={[
        {
          question: "What can be automated?",
          answer:
            "Data entry, report generation, email responses, invoice processing, inventory updates, and much more.",
        },
        {
          question: "RPA vs custom automation?",
          answer:
            "RPA uses bots to mimic user actions. Custom automation builds direct system integrations. We recommend the best approach.",
        },
      ]}
      relatedCategories={[
        { name: "System Integration", href: "/services/software-apps/custom-software/integrations" },
        { name: "API Development", href: "/services/software-apps/custom-software/api-development" },
      ]}
    />
  )
}
