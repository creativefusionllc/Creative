import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Car Wraps | Print & Exhibitions | Creative Fusion",
  description: "Professional car wrapping services in Dubai & UAE.",
}

export default function CarWrapsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Vehicle Branding"
      subServiceSlug="vehicle-branding"
      categoryName="Car Wraps"
      categorySlug="car-wraps"
      description="Professional car wrapping services transforming vehicles into mobile advertising platforms."
      features={["Full wraps", "Partial wraps", "3M vinyl", "Custom designs", "Paint protection", "Easy removal"]}
      benefits={["Mobile advertising", "Paint protection", "Brand visibility", "Cost-effective", "24/7 exposure"]}
      processSteps={[
        "Vehicle assessment",
        "Design creation",
        "Material selection",
        "Surface prep",
        "Application",
        "Quality inspection",
      ]}
      brandColor="rose"
    />
  )
}
