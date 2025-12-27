import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Metal Awards | Gift Items | Creative Fusion",
  description: "Custom metal awards and trophies in Dubai & UAE.",
}

export default function MetalAwardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Awards & Trophies"
      subServiceSlug="awards-trophies"
      categoryName="Metal Awards"
      categorySlug="metal"
      description="Custom metal awards and trophies in gold, silver, and bronze finishes for corporate recognition."
      features={[
        "Gold/Silver/Bronze",
        "Custom designs",
        "Engraving",
        "Various finishes",
        "Display stands",
        "Premium boxes",
      ]}
      benefits={["Classic elegance", "Durable", "Prestigious", "Timeless appeal", "Professional look"]}
      processSteps={["Design creation", "Metal selection", "Finish choice", "Engraving", "Assembly", "Packaging"]}
      brandColor="amber"
    />
  )
}
