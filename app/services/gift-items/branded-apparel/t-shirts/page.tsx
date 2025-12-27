import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded T-Shirts | Gift Items | Creative Fusion",
  description: "Custom branded t-shirts and apparel in Dubai & UAE.",
}

export default function TShirtsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Branded Apparel"
      subServiceSlug="branded-apparel"
      categoryName="Branded T-Shirts"
      categorySlug="t-shirts"
      description="Custom branded t-shirts with high-quality printing for events, promotions, and team uniforms."
      features={["Screen printing", "DTG printing", "Embroidery", "Various fabrics", "All sizes", "Custom designs"]}
      benefits={["Walking billboards", "Team unity", "Event merchandise", "Cost-effective", "Wide reach"]}
      processSteps={[
        "Design submission",
        "Fabric selection",
        "Sample approval",
        "Bulk production",
        "Quality check",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
