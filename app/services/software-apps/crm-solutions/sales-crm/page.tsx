import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Target } from "lucide-react"

export const metadata = {
  title: "Sales CRM Development | Creative Fusion",
  description: "Custom sales CRM for lead management, pipeline tracking, and sales automation.",
}

export default function SalesCRMPage() {
  return (
    <CategoryPageTemplate
      title="Sales CRM"
      subtitle="Supercharge your sales team"
      description="Custom Sales CRM for lead management, opportunity tracking, pipeline visualization, sales forecasting, and team performance analytics."
      heroIcon={<Target className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "CRM Solutions", href: "/services/software-apps/crm-solutions" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Lead Management", description: "Capture and qualify leads" },
        { title: "Pipeline", description: "Visual sales pipeline" },
        { title: "Forecasting", description: "Accurate sales predictions" },
        { title: "Automation", description: "Auto tasks and reminders" },
        { title: "Mobile", description: "Sell from anywhere" },
        { title: "Analytics", description: "Performance dashboards" },
      ]}
      process={[
        { step: 1, title: "Discovery", description: "Map sales process" },
        { step: 2, title: "Design", description: "Pipeline stages and fields" },
        { step: 3, title: "Development", description: "Build sales CRM" },
        { step: 4, title: "Integration", description: "Email, calendar, phone" },
        { step: 5, title: "Migration", description: "Import existing data" },
        { step: 6, title: "Training", description: "Sales team onboarding" },
      ]}
      pricing={[
        { name: "Starter", price: "AED 20,000", features: ["Contacts", "Pipeline", "Basic automation", "5 users"] },
        {
          name: "Professional",
          price: "AED 45,000",
          features: ["Full sales CRM", "Forecasting", "Integrations", "20 users"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Advanced analytics", "AI scoring", "Custom workflows", "Unlimited users"],
        },
      ]}
      faqs={[
        {
          question: "Can it integrate with WhatsApp?",
          answer: "Yes, we integrate with WhatsApp Business API for lead communication and automation.",
        },
        {
          question: "Mobile app included?",
          answer: "Yes, mobile apps for iOS and Android so sales reps can work from anywhere.",
        },
      ]}
      relatedCategories={[
        { name: "Marketing CRM", href: "/services/software-apps/crm-solutions/marketing-crm" },
        { name: "Service CRM", href: "/services/software-apps/crm-solutions/service-crm" },
      ]}
    />
  )
}
