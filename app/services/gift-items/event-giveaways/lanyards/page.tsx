import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Lanyards | Gift Items | Creative Fusion",
  description: "Custom branded lanyards in Dubai & UAE.",
}

export default function LanyardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Event Giveaways"
      subServiceSlug="event-giveaways"
      categoryName="Branded Lanyards"
      categorySlug="lanyards"
      description="Custom branded lanyards for ID cards, events, and employee identification with full print options."
      features={[
        "Full color printing",
        "Safety breakaways",
        "Various widths",
        "Multiple attachments",
        "Eco options",
        "Quick delivery",
      ]}
      benefits={["Event essential", "ID display", "Brand visibility", "Security", "Professional look"]}
      processSteps={["Width selection", "Print design", "Attachment choice", "Production", "Quality check", "Delivery"]}
      brandColor="amber"
    />
  )
}
