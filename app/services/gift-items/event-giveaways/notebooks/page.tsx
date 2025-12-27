import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Notebooks | Gift Items | Creative Fusion",
  description: "Custom branded notebooks and journals in Dubai & UAE.",
}

export default function NotebooksPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Event Giveaways"
      subServiceSlug="event-giveaways"
      categoryName="Branded Notebooks"
      categorySlug="notebooks"
      description="Custom branded notebooks and journals with premium covers and quality paper for professionals."
      features={[
        "Custom covers",
        "Premium paper",
        "Various sizes",
        "Pen holders",
        "Ribbon markers",
        "Embossing options",
      ]}
      benefits={["Professional use", "Meeting essential", "Brand visibility", "Quality perception", "Daily reminder"]}
      processSteps={["Size selection", "Cover design", "Paper choice", "Production", "Assembly", "Delivery"]}
      brandColor="amber"
    />
  )
}
