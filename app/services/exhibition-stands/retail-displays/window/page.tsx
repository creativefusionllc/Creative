import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Window Displays | Exhibition Stands | Creative Fusion",
  description: "Creative window displays for retail in Dubai & UAE.",
}

export default function WindowDisplaysPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Retail Displays"
      subServiceSlug="retail-displays"
      categoryName="Window Displays"
      categorySlug="window"
      description="Creative window displays that capture attention and drive foot traffic into your retail store."
      features={[
        "Custom designs",
        "Seasonal themes",
        "Lighting integration",
        "Props & mannequins",
        "Brand storytelling",
        "Installation service",
      ]}
      benefits={["Attract customers", "Increase footfall", "Brand awareness", "Seasonal updates", "Competitive edge"]}
      processSteps={[
        "Store assessment",
        "Concept development",
        "Design approval",
        "Prop sourcing",
        "Installation",
        "Maintenance",
      ]}
      brandColor="orange"
    />
  )
}
