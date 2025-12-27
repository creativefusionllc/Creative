import { CategoryPageTemplate } from "@/components/services/category-page-template"

export default function ServiceCRMPage() {
  return (
    <CategoryPageTemplate
      title="Service CRM"
      description="Service CRM systems to manage customer support, ticketing, and service delivery for exceptional customer experiences."
      parentService="Software & Apps"
      parentServiceHref="/services/software-apps"
      subService="CRM Solutions"
      subServiceHref="/services/software-apps/crm-solutions"
      features={[
        "Ticket management",
        "Knowledge base",
        "Live chat integration",
        "SLA tracking",
        "Customer portal",
        "Service analytics",
      ]}
      benefits={[
        "Faster response times",
        "Improved customer satisfaction",
        "Reduced support costs",
        "Better service quality",
      ]}
      brandColor="cyan"
    />
  )
}
