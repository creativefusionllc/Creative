import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Indoor Signage | Print & Exhibitions | Creative Fusion",
  description: "Professional indoor signage solutions in Dubai & UAE.",
}

export default function IndoorSignagePage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Signage"
      subServiceSlug="signage"
      categoryName="Indoor Signage"
      categorySlug="indoor"
      description="Professional indoor signage for offices, retail, and commercial spaces in Dubai."
      features={[
        "Reception signs",
        "Directory boards",
        "Wall graphics",
        "Wayfinding",
        "Digital displays",
        "Suspended signs",
      ]}
      benefits={["Professional image", "Easy navigation", "Brand immersion", "Customer guidance", "Space enhancement"]}
      processSteps={[
        "Space assessment",
        "Design planning",
        "Material selection",
        "Production",
        "Installation",
        "Final inspection",
      ]}
      brandColor="rose"
    />
  )
}
