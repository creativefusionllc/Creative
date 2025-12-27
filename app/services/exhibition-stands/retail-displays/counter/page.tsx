import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Counter Displays | Exhibition Stands | Creative Fusion",
  description: "Point-of-sale counter displays in Dubai & UAE.",
}

export default function CounterDisplaysPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Retail Displays"
      subServiceSlug="retail-displays"
      categoryName="Counter Displays"
      categorySlug="counter"
      description="Point-of-sale counter displays designed to drive last-minute purchases at checkout."
      features={[
        "Compact size",
        "Eye-level placement",
        "Product compartments",
        "Brand graphics",
        "Durable materials",
        "Easy refill",
      ]}
      benefits={["Impulse sales", "Last-minute purchases", "High visibility", "Space-efficient", "Cost-effective"]}
      processSteps={["Product fit", "Design", "Material choice", "Production", "Distribution", "Restocking plan"]}
      brandColor="orange"
    />
  )
}
