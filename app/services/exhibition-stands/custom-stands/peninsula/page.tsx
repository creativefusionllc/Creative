import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Peninsula Exhibition Stands | Exhibition Stands | Creative Fusion",
  description: "Three-sided peninsula exhibition stands for optimal visibility in Dubai & UAE.",
}

export default function PeninsulaStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Custom Stands"
      subServiceSlug="custom-stands"
      categoryName="Peninsula Stands"
      categorySlug="peninsula"
      description="Three-sided peninsula exhibition stands offering excellent visibility with back wall support."
      features={[
        "Three open sides",
        "Back wall storage",
        "Multiple access points",
        "Flexible configurations",
        "Branded graphics",
        "Integrated counters",
      ]}
      benefits={["Great visibility", "Cost-effective", "Storage space", "Easy navigation", "Professional look"]}
      processSteps={["Space analysis", "Design development", "Client approval", "Production", "Setup", "Support"]}
      brandColor="orange"
    />
  )
}
