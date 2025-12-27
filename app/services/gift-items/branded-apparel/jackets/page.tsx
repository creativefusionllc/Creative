import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Jackets | Gift Items | Creative Fusion",
  description: "Custom branded jackets and outerwear in Dubai & UAE.",
}

export default function JacketsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Branded Apparel"
      subServiceSlug="branded-apparel"
      categoryName="Branded Jackets"
      categorySlug="jackets"
      description="Custom branded jackets and outerwear for corporate teams, events, and premium gifting."
      features={[
        "Various styles",
        "Embroidered logos",
        "Inner branding",
        "Custom lining",
        "Weather-resistant",
        "Premium quality",
      ]}
      benefits={["Premium gift", "Year-round use", "High visibility", "Professional appearance", "Lasting impression"]}
      processSteps={[
        "Style consultation",
        "Material selection",
        "Design approval",
        "Production",
        "Quality assurance",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
