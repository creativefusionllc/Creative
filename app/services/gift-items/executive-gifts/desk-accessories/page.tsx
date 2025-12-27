import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Desk Accessories | Gift Items | Creative Fusion",
  description: "Premium branded desk accessories in Dubai & UAE.",
}

export default function DeskAccessoriesPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Executive Gifts"
      subServiceSlug="executive-gifts"
      categoryName="Desk Accessories"
      categorySlug="desk-accessories"
      description="Premium branded desk accessories including organizers, card holders, and office essentials."
      features={[
        "Quality materials",
        "Custom branding",
        "Desk organizers",
        "Card holders",
        "Pen stands",
        "Name plates",
      ]}
      benefits={["Office visibility", "Daily use", "Professional look", "Organized workspace", "Brand presence"]}
      processSteps={["Selection", "Design", "Branding", "Production", "Quality check", "Delivery"]}
      brandColor="amber"
    />
  )
}
