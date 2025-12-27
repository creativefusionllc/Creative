import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Plantable Products | Gift Items | Creative Fusion",
  description: "Plantable promotional products in Dubai & UAE.",
}

export default function PlantablePage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Eco-Friendly Gifts"
      subServiceSlug="eco-friendly"
      categoryName="Plantable Products"
      categorySlug="plantable"
      description="Plantable promotional products including seed paper, pencils, and cards that grow into plants."
      features={[
        "Embedded seeds",
        "Biodegradable",
        "Custom printing",
        "Various seeds",
        "Growing guide",
        "Unique experience",
      ]}
      benefits={["Memorable gift", "Growing experience", "Zero waste", "Conversation starter", "Environmental message"]}
      processSteps={[
        "Seed selection",
        "Design approval",
        "Paper production",
        "Printing",
        "Packaging",
        "Growing instructions",
      ]}
      brandColor="amber"
    />
  )
}
