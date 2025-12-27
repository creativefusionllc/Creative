import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Recycled Products | Gift Items | Creative Fusion",
  description: "Recycled material promotional products in Dubai & UAE.",
}

export default function RecycledPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Eco-Friendly Gifts"
      subServiceSlug="eco-friendly"
      categoryName="Recycled Products"
      categorySlug="recycled"
      description="Promotional products made from recycled materials supporting circular economy principles."
      features={[
        "Recycled materials",
        "Eco certifications",
        "Various products",
        "Quality printing",
        "Modern designs",
        "Green messaging",
      ]}
      benefits={["Environmental impact", "Brand values", "Unique story", "CSR compliance", "Customer appeal"]}
      processSteps={[
        "Material sourcing",
        "Design adaptation",
        "Certification",
        "Production",
        "Quality check",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
