import { CategoryPageTemplate } from "@/components/services/category-page-template"

export default function MarketingCRMPage() {
  return (
    <CategoryPageTemplate
      title="Marketing CRM"
      description="Marketing CRM solutions to automate campaigns, track leads, and measure marketing ROI across all channels."
      parentService="Software & Apps"
      parentServiceHref="/services/software-apps"
      subService="CRM Solutions"
      subServiceHref="/services/software-apps/crm-solutions"
      features={[
        "Campaign automation",
        "Lead scoring & nurturing",
        "Email marketing integration",
        "Marketing analytics",
        "Multi-channel tracking",
        "ROI measurement",
      ]}
      benefits={[
        "Increase conversion rates",
        "Automate repetitive tasks",
        "Better lead qualification",
        "Improved campaign performance",
      ]}
      brandColor="cyan"
    />
  )
}
