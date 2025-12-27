import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Organic Products | Gift Items | Creative Fusion",
  description: "Organic promotional products in Dubai & UAE.",
}

export default function OrganicPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Eco-Friendly Gifts"
      subServiceSlug="eco-friendly"
      categoryName="Organic Products"
      categorySlug="organic"
      description="Organic promotional products including cotton bags, clothing, and natural material items."
      features={[
        "Organic cotton",
        "Natural dyes",
        "GOTS certified",
        "Chemical-free",
        "Soft textures",
        "Ethical sourcing",
      ]}
      benefits={["Premium eco choice", "Skin-friendly", "Ethical production", "Health conscious", "Brand prestige"]}
      processSteps={[
        "Certification check",
        "Design creation",
        "Material sourcing",
        "Production",
        "Testing",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
