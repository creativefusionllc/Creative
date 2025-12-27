import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Corner Exhibition Stands | Exhibition Stands | Creative Fusion",
  description: "Strategic corner exhibition stands for dual exposure in Dubai & UAE.",
}

export default function CornerStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Custom Stands"
      subServiceSlug="custom-stands"
      categoryName="Corner Stands"
      categorySlug="corner"
      description="Strategic corner exhibition stands offering dual aisle exposure at competitive pricing."
      features={[
        "Two open sides",
        "Corner visibility",
        "Efficient space use",
        "Custom branding",
        "Reception areas",
        "Product displays",
      ]}
      benefits={["Dual exposure", "Better than inline", "Cost-effective", "Good traffic flow", "Prominent position"]}
      processSteps={["Site survey", "Concept design", "Visualization", "Build", "Install", "Dismantle"]}
      brandColor="orange"
    />
  )
}
