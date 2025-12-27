import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { UserCircle } from "lucide-react"

export const metadata = {
  title: "CRM Solutions | Creative Fusion",
  description: "Custom CRM development for sales, marketing, and customer service management.",
}

export default function CRMSolutionsPage() {
  return (
    <SubServicePageTemplate
      title="CRM Solutions"
      subtitle="Customer relationship management"
      description="Custom CRM systems that help you manage leads, track sales, automate marketing, and deliver exceptional customer service - all tailored to your business processes."
      heroIcon={<UserCircle className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      features={[
        {
          title: "Sales CRM",
          description: "Lead and pipeline management",
          href: "/services/software-apps/crm-solutions/sales-crm",
        },
        {
          title: "Marketing CRM",
          description: "Campaign automation",
          href: "/services/software-apps/crm-solutions/marketing-crm",
        },
        {
          title: "Service CRM",
          description: "Customer support",
          href: "/services/software-apps/crm-solutions/service-crm",
        },
        {
          title: "Custom CRM",
          description: "Fully bespoke solution",
          href: "/services/software-apps/crm-solutions/custom-crm",
        },
        {
          title: "CRM Integration",
          description: "Connect existing CRM",
          href: "/services/software-apps/crm-solutions/crm-integration",
        },
        {
          title: "CRM Migration",
          description: "Move to new CRM",
          href: "/services/software-apps/crm-solutions/crm-migration",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic CRM",
          price: "From AED 25,000",
          features: ["Contact management", "Lead tracking", "Basic reports", "5 users"],
        },
        {
          name: "Full CRM",
          price: "From AED 60,000",
          features: ["Sales + Marketing", "Automation", "Integrations", "20 users"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["All modules", "Custom features", "Unlimited users", "Dedicated support"],
        },
      ]}
      faqs={[
        {
          question: "Custom CRM vs Salesforce?",
          answer:
            "Custom CRM fits your exact process without licensing fees. Salesforce offers ecosystem but requires adaptation.",
        },
        {
          question: "Can it integrate with our website?",
          answer: "Yes, we build lead capture forms, chat widgets, and API integrations with your website.",
        },
      ]}
    />
  )
}
