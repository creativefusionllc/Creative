import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Corporate Uniforms | Gift Items | Creative Fusion",
  description: "Custom corporate uniforms in Dubai & UAE.",
}

export default function UniformsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Branded Apparel"
      subServiceSlug="branded-apparel"
      categoryName="Corporate Uniforms"
      categorySlug="uniforms"
      description="Custom corporate uniforms designed to represent your brand professionally across all employees."
      features={[
        "Custom designs",
        "Fabric selection",
        "Size ranges",
        "Multiple pieces",
        "Logo integration",
        "Comfort focus",
      ]}
      benefits={["Brand consistency", "Professional image", "Team identity", "Easy identification", "Employee pride"]}
      processSteps={[
        "Needs assessment",
        "Design creation",
        "Fabric sourcing",
        "Fitting sessions",
        "Production",
        "Distribution",
      ]}
      brandColor="amber"
    />
  )
}
