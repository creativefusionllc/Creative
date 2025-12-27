import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "End Cap Displays | Exhibition Stands | Creative Fusion",
  description: "High-visibility end cap displays in Dubai & UAE.",
}

export default function EndCapDisplaysPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Retail Displays"
      subServiceSlug="retail-displays"
      categoryName="End Cap Displays"
      categorySlug="end-cap"
      description="High-visibility end cap displays positioned at aisle ends for maximum product exposure."
      features={[
        "Aisle-end position",
        "Large graphics area",
        "Multi-product display",
        "Promotional space",
        "Sturdy build",
        "Easy restocking",
      ]}
      benefits={["Prime real estate", "High traffic", "Promotional impact", "Brand dominance", "Sales boost"]}
      processSteps={[
        "Retailer negotiation",
        "Space planning",
        "Design",
        "Production",
        "Installation",
        "Performance tracking",
      ]}
      brandColor="orange"
    />
  )
}
