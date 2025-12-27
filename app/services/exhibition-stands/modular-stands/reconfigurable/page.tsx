import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Reconfigurable Modular Stands | Exhibition Stands | Creative Fusion",
  description: "Flexible reconfigurable modular stands for multiple events in Dubai & UAE.",
}

export default function ReconfigurableStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Modular Stands"
      subServiceSlug="modular-stands"
      categoryName="Reconfigurable Stands"
      categorySlug="reconfigurable"
      description="Flexible reconfigurable modular stands that adapt to different booth sizes and layouts."
      features={[
        "Multiple configurations",
        "Expandable system",
        "Interchangeable parts",
        "Easy modifications",
        "Scalable design",
        "Long-term value",
      ]}
      benefits={[
        "Adapt to any space",
        "Future-proof investment",
        "Consistent branding",
        "Reduced costs",
        "Versatile use",
      ]}
      processSteps={[
        "Needs analysis",
        "System design",
        "Configuration options",
        "Production",
        "Training",
        "Ongoing support",
      ]}
      brandColor="orange"
    />
  )
}
