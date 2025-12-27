import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Reusable Products | Gift Items | Creative Fusion",
  description: "Reusable promotional products in Dubai & UAE.",
}

export default function ReusablePage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Eco-Friendly Gifts"
      subServiceSlug="eco-friendly"
      categoryName="Reusable Products"
      categorySlug="reusable"
      description="Reusable promotional products replacing single-use items and promoting sustainability."
      features={[
        "Replace single-use",
        "Durable materials",
        "Food-safe options",
        "Custom branding",
        "Various products",
        "Long-lasting",
      ]}
      benefits={["Daily use", "Plastic reduction", "Brand exposure", "Cost savings", "Eco awareness"]}
      processSteps={[
        "Product selection",
        "Material check",
        "Design approval",
        "Production",
        "Quality testing",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
