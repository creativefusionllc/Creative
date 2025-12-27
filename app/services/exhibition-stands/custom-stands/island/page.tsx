import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Island Exhibition Stands | Exhibition Stands | Creative Fusion",
  description: "360-degree island exhibition stands for premium brand exposure in Dubai & UAE.",
}

export default function IslandStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Custom Stands"
      subServiceSlug="custom-stands"
      categoryName="Island Stands"
      categorySlug="island"
      description="360-degree island exhibition stands offering maximum exposure and engagement from all directions."
      features={[
        "Open from all sides",
        "Central focal point",
        "Multiple entry points",
        "Hanging structures",
        "Interactive zones",
        "Premium lighting",
      ]}
      benefits={[
        "Maximum visibility",
        "High foot traffic",
        "Flexible layout",
        "Brand dominance",
        "Multiple demo areas",
      ]}
      processSteps={[
        "Layout planning",
        "Creative design",
        "3D rendering",
        "Construction",
        "Installation",
        "Event support",
      ]}
      brandColor="orange"
    />
  )
}
