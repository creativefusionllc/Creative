import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Floor Displays | Exhibition Stands | Creative Fusion",
  description: "Impactful floor displays for retail in Dubai & UAE.",
}

export default function FloorDisplaysPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Retail Displays"
      subServiceSlug="retail-displays"
      categoryName="Floor Displays"
      categorySlug="floor"
      description="Impactful floor displays strategically positioned to maximize product visibility and sales."
      features={[
        "Freestanding design",
        "Multiple shelves",
        "Brand customization",
        "Sturdy construction",
        "Easy assembly",
        "Product holders",
      ]}
      benefits={["Prime positioning", "Impulse purchases", "Brand visibility", "Flexible placement", "High ROI"]}
      processSteps={["Product analysis", "Display design", "Prototype", "Production", "Distribution", "Placement"]}
      brandColor="orange"
    />
  )
}
