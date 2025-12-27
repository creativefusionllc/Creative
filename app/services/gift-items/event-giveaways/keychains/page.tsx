import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Keychains | Gift Items | Creative Fusion",
  description: "Custom branded keychains in Dubai & UAE.",
}

export default function KeychainsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Event Giveaways"
      subServiceSlug="event-giveaways"
      categoryName="Branded Keychains"
      categorySlug="keychains"
      description="Custom branded keychains in metal, leather, acrylic, and custom shapes for lasting brand presence."
      features={[
        "Custom shapes",
        "Multiple materials",
        "Laser engraving",
        "Color printing",
        "3D designs",
        "Bulk pricing",
      ]}
      benefits={["Daily visibility", "Low cost", "High volume", "Versatile designs", "Long-lasting"]}
      processSteps={["Design concept", "Material choice", "Sample production", "Approval", "Bulk order", "Delivery"]}
      brandColor="amber"
    />
  )
}
