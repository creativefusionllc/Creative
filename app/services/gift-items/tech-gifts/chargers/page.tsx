import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Chargers | Gift Items | Creative Fusion",
  description: "Custom branded wireless chargers in Dubai & UAE.",
}

export default function ChargersPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Tech Gifts"
      subServiceSlug="tech-gifts"
      categoryName="Branded Chargers"
      categorySlug="chargers"
      description="Custom branded wireless and wired chargers for desks, cars, and on-the-go convenience."
      features={[
        "Wireless charging",
        "Fast charging",
        "Logo printing",
        "Various types",
        "Universal compatibility",
        "LED branding",
      ]}
      benefits={["Essential utility", "Desk visibility", "Daily use", "Modern technology", "Brand exposure"]}
      processSteps={["Type selection", "Design submission", "Sample approval", "Production", "Testing", "Delivery"]}
      brandColor="amber"
    />
  )
}
