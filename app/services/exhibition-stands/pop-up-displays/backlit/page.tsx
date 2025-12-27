import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Backlit Pop-Up Displays | Exhibition Stands | Creative Fusion",
  description: "Illuminated backlit pop-up displays for maximum impact in Dubai & UAE.",
}

export default function BacklitPopUpPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Pop-Up Displays"
      subServiceSlug="pop-up-displays"
      categoryName="Backlit Pop-Up Displays"
      categorySlug="backlit"
      description="Illuminated backlit pop-up displays that make your graphics glow and stand out from the crowd."
      features={[
        "LED backlighting",
        "Even illumination",
        "Translucent graphics",
        "Energy efficient",
        "Vibrant colors",
        "Attention-grabbing",
      ]}
      benefits={["Maximum impact", "Stand out", "Day & night visibility", "Premium look", "Memorable"]}
      processSteps={[
        "Lighting design",
        "Graphic optimization",
        "LED integration",
        "Testing",
        "Packaging",
        "Installation guide",
      ]}
      brandColor="orange"
    />
  )
}
