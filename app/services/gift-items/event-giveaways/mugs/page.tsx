import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Mugs | Gift Items | Creative Fusion",
  description: "Custom branded mugs and drinkware in Dubai & UAE.",
}

export default function MugsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Event Giveaways"
      subServiceSlug="event-giveaways"
      categoryName="Branded Mugs"
      categorySlug="mugs"
      description="Custom branded mugs and drinkware for office use, gifts, and promotional campaigns."
      features={["Ceramic options", "Travel mugs", "Magic mugs", "Full wrap printing", "Various sizes", "Gift boxes"]}
      benefits={["Daily use", "Office visibility", "Popular gift", "Conversation starter", "Brand reminder"]}
      processSteps={[
        "Style selection",
        "Design submission",
        "Print approval",
        "Production",
        "Quality check",
        "Packaging",
      ]}
      brandColor="amber"
    />
  )
}
