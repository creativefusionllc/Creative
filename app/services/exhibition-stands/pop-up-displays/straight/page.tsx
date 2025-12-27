import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Straight Pop-Up Displays | Exhibition Stands | Creative Fusion",
  description: "Classic straight pop-up displays for events in Dubai & UAE.",
}

export default function StraightPopUpPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Pop-Up Displays"
      subServiceSlug="pop-up-displays"
      categoryName="Straight Pop-Up Displays"
      categorySlug="straight"
      description="Classic straight pop-up displays offering a clean, professional backdrop for any event."
      features={[
        "Straight frame",
        "Expandable design",
        "Magnetic panels",
        "Halogen lights",
        "Carry case",
        "Graphic rails",
      ]}
      benefits={["Classic look", "Easy setup", "Affordable", "Reliable", "Multi-use"]}
      processSteps={["Consultation", "Design", "Production", "Assembly test", "Packing", "Shipping"]}
      brandColor="orange"
    />
  )
}
