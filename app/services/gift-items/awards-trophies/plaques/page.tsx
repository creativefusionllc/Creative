import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Award Plaques | Gift Items | Creative Fusion",
  description: "Custom award plaques in Dubai & UAE.",
}

export default function PlaquesPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Awards & Trophies"
      subServiceSlug="awards-trophies"
      categoryName="Award Plaques"
      categorySlug="plaques"
      description="Custom award plaques for wall mounting and desk display in various materials and styles."
      features={[
        "Wall mount options",
        "Desk display",
        "Metal plates",
        "Wood bases",
        "Custom sizes",
        "Logo integration",
      ]}
      benefits={["Wall display", "Space-efficient", "Professional look", "Lasting recognition", "Office decor"]}
      processSteps={["Material selection", "Size determination", "Design layout", "Engraving", "Mounting", "Delivery"]}
      brandColor="amber"
    />
  )
}
