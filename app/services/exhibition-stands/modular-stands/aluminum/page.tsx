import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Aluminum Frame Stands | Exhibition Stands | Creative Fusion",
  description: "Premium aluminum frame modular stands in Dubai & UAE.",
}

export default function AluminumStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Modular Stands"
      subServiceSlug="modular-stands"
      categoryName="Aluminum Frame Stands"
      categorySlug="aluminum"
      description="Premium aluminum frame modular stands offering durability, lightweight construction, and modern aesthetics."
      features={[
        "Anodized aluminum",
        "Lightweight yet strong",
        "Precision engineering",
        "Sleek appearance",
        "Easy assembly",
        "Long lifespan",
      ]}
      benefits={["Professional look", "Easy handling", "Durable investment", "Modern design", "Quick setup"]}
      processSteps={[
        "Frame selection",
        "Design integration",
        "Graphics production",
        "Assembly training",
        "Delivery",
        "Support",
      ]}
      brandColor="orange"
    />
  )
}
