import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Tote Bags | Gift Items | Creative Fusion",
  description: "Custom branded tote bags in Dubai & UAE.",
}

export default function ToteBagsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Event Giveaways"
      subServiceSlug="event-giveaways"
      categoryName="Branded Tote Bags"
      categorySlug="tote-bags"
      description="Custom branded tote bags perfect for conferences, retail, and eco-conscious promotions."
      features={[
        "Various materials",
        "Full print options",
        "Multiple sizes",
        "Reinforced handles",
        "Eco-friendly options",
        "Custom colors",
      ]}
      benefits={["Walking advertising", "Practical use", "Eco-friendly", "High visibility", "Cost-effective"]}
      processSteps={[
        "Material selection",
        "Design creation",
        "Print approval",
        "Production",
        "Quality check",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
