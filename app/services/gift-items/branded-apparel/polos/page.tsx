import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Polo Shirts | Gift Items | Creative Fusion",
  description: "Custom branded polo shirts in Dubai & UAE.",
}

export default function PolosPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Branded Apparel"
      subServiceSlug="branded-apparel"
      categoryName="Branded Polo Shirts"
      categorySlug="polos"
      description="Custom branded polo shirts perfect for corporate uniforms, events, and promotional campaigns."
      features={[
        "Premium cotton",
        "Embroidery",
        "Screen printing",
        "Custom colors",
        "Collar options",
        "Button customization",
      ]}
      benefits={["Professional look", "Comfortable wear", "Durable", "Versatile", "Brand visibility"]}
      processSteps={[
        "Style selection",
        "Color matching",
        "Logo placement",
        "Sample production",
        "Bulk order",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
