import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Curved Pop-Up Displays | Exhibition Stands | Creative Fusion",
  description: "Elegant curved pop-up displays for events in Dubai & UAE.",
}

export default function CurvedPopUpPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Pop-Up Displays"
      subServiceSlug="pop-up-displays"
      categoryName="Curved Pop-Up Displays"
      categorySlug="curved"
      description="Elegant curved pop-up displays creating a seamless panoramic backdrop for your brand."
      features={[
        "Curved frame design",
        "Magnetic graphics",
        "Tool-free setup",
        "Wheeled case",
        "Spotlight options",
        "Counter available",
      ]}
      benefits={["Visual impact", "Professional look", "5-minute setup", "Portable", "Versatile use"]}
      processSteps={["Size selection", "Graphic design", "Print production", "Quality check", "Packaging", "Delivery"]}
      brandColor="orange"
    />
  )
}
