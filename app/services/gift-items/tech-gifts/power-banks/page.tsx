import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Power Banks | Gift Items | Creative Fusion",
  description: "Custom branded power banks in Dubai & UAE.",
}

export default function PowerBanksPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Tech Gifts"
      subServiceSlug="tech-gifts"
      categoryName="Branded Power Banks"
      categorySlug="power-banks"
      description="Custom branded power banks that keep your brand in customers' hands throughout the day."
      features={[
        "Various capacities",
        "Fast charging",
        "Logo printing",
        "LED indicators",
        "Multiple ports",
        "Compact designs",
      ]}
      benefits={["Daily use", "High utility", "Brand visibility", "Popular gift", "Long battery life"]}
      processSteps={["Capacity selection", "Design submission", "Sample approval", "Production", "Testing", "Delivery"]}
      brandColor="amber"
    />
  )
}
