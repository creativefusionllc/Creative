import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Event Backdrops | Exhibition Stands | Creative Fusion",
  description: "Professional event backdrops for media and photography in Dubai & UAE.",
}

export default function BackdropPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Event Branding"
      subServiceSlug="event-branding"
      categoryName="Event Backdrops"
      categorySlug="backdrop"
      description="Professional event backdrops perfect for media walls, interviews, and branded photography."
      features={[
        "Step & repeat",
        "Media walls",
        "Fabric printing",
        "Tension frames",
        "Seamless graphics",
        "Custom sizes",
      ]}
      benefits={["Media coverage", "Brand visibility", "Professional photos", "Social sharing", "Sponsor exposure"]}
      processSteps={[
        "Size planning",
        "Logo placement",
        "Material selection",
        "Printing",
        "Frame assembly",
        "Installation",
      ]}
      brandColor="orange"
    />
  )
}
