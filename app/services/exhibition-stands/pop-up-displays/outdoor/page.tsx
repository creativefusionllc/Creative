import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Outdoor Pop-Up Displays | Exhibition Stands | Creative Fusion",
  description: "Weather-resistant outdoor pop-up displays in Dubai & UAE.",
}

export default function OutdoorPopUpPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Pop-Up Displays"
      subServiceSlug="pop-up-displays"
      categoryName="Outdoor Pop-Up Displays"
      categorySlug="outdoor"
      description="Weather-resistant outdoor pop-up displays built to withstand Dubai's outdoor events and conditions."
      features={[
        "Weather-resistant",
        "UV-protected graphics",
        "Wind-stable base",
        "Waterproof materials",
        "Heavy-duty frame",
        "Ground stakes",
      ]}
      benefits={["All-weather use", "Durable", "Stable outdoors", "Long-lasting", "Versatile placement"]}
      processSteps={[
        "Environment assessment",
        "Material selection",
        "Design",
        "Production",
        "Weather testing",
        "Delivery",
      ]}
      brandColor="orange"
    />
  )
}
