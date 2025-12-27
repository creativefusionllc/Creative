import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Executive Gift Sets | Gift Items | Creative Fusion",
  description: "Curated executive gift sets in Dubai & UAE.",
}

export default function GiftSetsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Executive Gifts"
      subServiceSlug="executive-gifts"
      categoryName="Executive Gift Sets"
      categorySlug="gift-sets"
      description="Curated executive gift sets combining multiple premium items in elegant presentation boxes."
      features={[
        "Curated combinations",
        "Custom boxes",
        "Premium items",
        "Personalization",
        "Ribbon & wrapping",
        "Gift cards",
      ]}
      benefits={["Complete solution", "Premium presentation", "High impact", "Memorable gifting", "Flexible budgets"]}
      processSteps={["Budget planning", "Item selection", "Packaging design", "Assembly", "Quality check", "Delivery"]}
      brandColor="amber"
    />
  )
}
