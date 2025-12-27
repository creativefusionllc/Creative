import { CategoryPageTemplate } from "@/components/services/category-page-template"

export default function CustomCRMPage() {
  return (
    <CategoryPageTemplate
      title="Custom CRM"
      description="Fully customized CRM solutions built to match your unique business processes and requirements."
      parentService="Software & Apps"
      parentServiceHref="/services/software-apps"
      subService="CRM Solutions"
      subServiceHref="/services/software-apps/crm-solutions"
      features={[
        "Custom workflows",
        "Tailored dashboards",
        "Unique data models",
        "API integrations",
        "Role-based access",
        "Custom reporting",
      ]}
      benefits={["Perfect fit for your business", "Scalable architecture", "Competitive advantage", "Full ownership"]}
      brandColor="cyan"
    />
  )
}
