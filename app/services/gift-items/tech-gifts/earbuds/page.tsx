import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Earbuds | Gift Items | Creative Fusion",
  description: "Custom branded earbuds and headphones in Dubai & UAE.",
}

export default function EarbudsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Tech Gifts"
      subServiceSlug="tech-gifts"
      categoryName="Branded Earbuds"
      categorySlug="earbuds"
      description="Custom branded earbuds and headphones for premium tech gifting with excellent sound quality."
      features={[
        "Wireless options",
        "Custom case printing",
        "Quality audio",
        "Noise cancellation",
        "Various styles",
        "Gift packaging",
      ]}
      benefits={["Premium gift", "Daily use", "Modern appeal", "Brand visibility", "Appreciated value"]}
      processSteps={["Model selection", "Branding design", "Sample testing", "Production", "Packaging", "Delivery"]}
      brandColor="amber"
    />
  )
}
