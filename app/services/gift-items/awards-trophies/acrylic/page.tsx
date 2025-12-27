import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Acrylic Awards | Gift Items | Creative Fusion",
  description: "Custom acrylic awards and trophies in Dubai & UAE.",
}

export default function AcrylicAwardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Awards & Trophies"
      subServiceSlug="awards-trophies"
      categoryName="Acrylic Awards"
      categorySlug="acrylic"
      description="Custom acrylic awards offering versatile designs, vibrant colors, and modern aesthetics."
      features={[
        "Custom shapes",
        "Color printing",
        "LED options",
        "Clear & colored",
        "Layered designs",
        "Budget-friendly",
      ]}
      benefits={["Modern look", "Versatile designs", "Cost-effective", "Vibrant colors", "Lightweight"]}
      processSteps={["Shape design", "Color selection", "Print approval", "Cutting", "Assembly", "Packaging"]}
      brandColor="amber"
    />
  )
}
