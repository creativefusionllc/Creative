import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Double Deck Exhibition Stands | Exhibition Stands | Creative Fusion",
  description: "Impressive double deck exhibition stands for maximum impact in Dubai & UAE.",
}

export default function DoubleDeckStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Custom Stands"
      subServiceSlug="custom-stands"
      categoryName="Double Deck Stands"
      categorySlug="double-deck"
      description="Impressive double deck exhibition stands that maximize your floor space and create a commanding presence at events."
      features={[
        "Two-level design",
        "Meeting rooms upstairs",
        "Structural engineering",
        "Safety compliance",
        "Premium finishes",
        "Integrated AV systems",
      ]}
      benefits={[
        "Double the space",
        "VIP meeting areas",
        "Impressive brand presence",
        "Separate zones",
        "Maximum visibility",
      ]}
      processSteps={[
        "Space assessment",
        "Structural design",
        "Safety approval",
        "Fabrication",
        "Installation",
        "Certification",
      ]}
      brandColor="orange"
    />
  )
}
