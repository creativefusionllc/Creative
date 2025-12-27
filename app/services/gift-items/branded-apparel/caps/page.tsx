import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Caps | Gift Items | Creative Fusion",
  description: "Custom branded caps and headwear in Dubai & UAE.",
}

export default function CapsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Branded Apparel"
      subServiceSlug="branded-apparel"
      categoryName="Branded Caps"
      categorySlug="caps"
      description="Custom branded caps and headwear for outdoor events, sports teams, and promotional giveaways."
      features={[
        "Embroidered logos",
        "Printed designs",
        "Multiple styles",
        "Adjustable sizes",
        "Various materials",
        "Custom closures",
      ]}
      benefits={["High visibility", "Outdoor advertising", "Popular giveaway", "Sun protection", "Brand exposure"]}
      processSteps={[
        "Style selection",
        "Design approval",
        "Sample production",
        "Bulk manufacturing",
        "Quality check",
        "Shipping",
      ]}
      brandColor="amber"
    />
  )
}
