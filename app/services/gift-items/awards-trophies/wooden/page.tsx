import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Wooden Awards | Gift Items | Creative Fusion",
  description: "Custom wooden awards and plaques in Dubai & UAE.",
}

export default function WoodenAwardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Awards & Trophies"
      subServiceSlug="awards-trophies"
      categoryName="Wooden Awards"
      categorySlug="wooden"
      description="Custom wooden awards and plaques combining natural beauty with personalized recognition."
      features={[
        "Premium woods",
        "Laser engraving",
        "Metal accents",
        "Various shapes",
        "Eco-friendly",
        "Natural finish",
      ]}
      benefits={["Natural elegance", "Eco-conscious", "Warm appearance", "Unique grain", "Sustainable choice"]}
      processSteps={["Wood selection", "Design approval", "Laser engraving", "Finishing", "Quality check", "Delivery"]}
      brandColor="amber"
    />
  )
}
