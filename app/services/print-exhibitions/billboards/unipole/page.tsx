import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Unipole Billboards | Print & Exhibitions | Creative Fusion",
  description: "Prominent unipole billboard advertising in Dubai & UAE.",
}

export default function UnipoleBillboardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Billboards"
      subServiceSlug="billboards"
      categoryName="Unipole Billboards"
      categorySlug="unipole"
      description="Prominent unipole billboards standing tall at intersections and major roads for dominant presence."
      features={[
        "Single pole structure",
        "Elevated position",
        "360° visibility options",
        "Large format",
        "Illumination",
        "Premium locations",
      ]}
      benefits={["Dominant presence", "Clear sightlines", "Landmark status", "High recall", "Premium positioning"]}
      processSteps={[
        "Location scouting",
        "Structural assessment",
        "Design approval",
        "Printing",
        "Installation",
        "Lighting setup",
      ]}
      brandColor="rose"
    />
  )
}
