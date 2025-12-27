import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Truck Graphics | Print & Exhibitions | Creative Fusion",
  description: "Professional truck graphics and branding in Dubai & UAE.",
}

export default function TruckGraphicsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Vehicle Branding"
      subServiceSlug="vehicle-branding"
      categoryName="Truck Graphics"
      categorySlug="truck"
      description="Professional truck graphics and branding maximizing the large surface area for advertising."
      features={[
        "Large format",
        "Side & rear panels",
        "Curtain-side printing",
        "Durable materials",
        "Reflective options",
        "Contact info display",
      ]}
      benefits={["Maximum exposure", "Highway visibility", "Large canvas", "Long-distance reach", "24/7 advertising"]}
      processSteps={[
        "Truck measurement",
        "Design layout",
        "Material selection",
        "Printing",
        "Professional installation",
        "Inspection",
      ]}
      brandColor="rose"
    />
  )
}
