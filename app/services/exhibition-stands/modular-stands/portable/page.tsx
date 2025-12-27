import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Portable Modular Stands | Exhibition Stands | Creative Fusion",
  description: "Lightweight portable modular stands for easy transport in Dubai & UAE.",
}

export default function PortableStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Modular Stands"
      subServiceSlug="modular-stands"
      categoryName="Portable Stands"
      categorySlug="portable"
      description="Lightweight portable modular stands that pack into compact cases for easy transport and quick setup."
      features={[
        "Lightweight materials",
        "Compact cases",
        "Tool-free assembly",
        "Interchangeable graphics",
        "Travel-friendly",
        "Durable construction",
      ]}
      benefits={["Easy transport", "Quick setup", "Cost savings", "Multiple uses", "Self-installation"]}
      processSteps={["Size selection", "Graphic design", "Production", "Training", "Delivery", "Support"]}
      brandColor="orange"
    />
  )
}
