import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Premium Pens | Gift Items | Creative Fusion",
  description: "Premium branded pens and writing instruments in Dubai & UAE.",
}

export default function PensGiftsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Executive Gifts"
      subServiceSlug="executive-gifts"
      categoryName="Premium Pens"
      categorySlug="pens"
      description="Premium branded pens and writing instruments from top manufacturers with custom engraving."
      features={["Top brands", "Laser engraving", "Gift boxes", "Refillable", "Various styles", "Presentation cases"]}
      benefits={["Daily use", "Professional image", "Brand visibility", "Appreciated gift", "Long-lasting"]}
      processSteps={["Brand selection", "Engraving design", "Sample approval", "Production", "Packaging", "Delivery"]}
      brandColor="amber"
    />
  )
}
