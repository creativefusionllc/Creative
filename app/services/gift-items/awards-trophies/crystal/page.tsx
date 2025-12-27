import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Crystal Awards | Gift Items | Creative Fusion",
  description: "Premium crystal awards and trophies in Dubai & UAE.",
}

export default function CrystalAwardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Awards & Trophies"
      subServiceSlug="awards-trophies"
      categoryName="Crystal Awards"
      categorySlug="crystal"
      description="Premium crystal awards with 3D laser engraving for prestigious recognition and achievements."
      features={["3D laser engraving", "Premium crystal", "LED bases", "Custom shapes", "Gift boxes", "Various sizes"]}
      benefits={["Prestigious recognition", "Elegant display", "Lasting impression", "Photo-worthy", "Premium quality"]}
      processSteps={["Design consultation", "3D modeling", "Engraving", "Base selection", "Packaging", "Delivery"]}
      brandColor="amber"
    />
  )
}
