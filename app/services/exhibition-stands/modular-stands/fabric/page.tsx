import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Fabric Display Stands | Exhibition Stands | Creative Fusion",
  description: "Vibrant fabric display modular stands in Dubai & UAE.",
}

export default function FabricStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Modular Stands"
      subServiceSlug="modular-stands"
      categoryName="Fabric Display Stands"
      categorySlug="fabric"
      description="Vibrant fabric display stands with seamless dye-sublimation printed graphics for stunning visual impact."
      features={[
        "Dye-sublimation printing",
        "Seamless graphics",
        "Wrinkle-resistant",
        "Machine washable",
        "Vibrant colors",
        "Lightweight frames",
      ]}
      benefits={["Eye-catching displays", "Easy graphic updates", "Portable", "Cost-effective", "Quick changes"]}
      processSteps={[
        "Design creation",
        "Color proofing",
        "Fabric printing",
        "Frame assembly",
        "Installation guide",
        "Care instructions",
      ]}
      brandColor="orange"
    />
  )
}
