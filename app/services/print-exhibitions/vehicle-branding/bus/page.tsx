import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Bus Branding | Print & Exhibitions | Creative Fusion",
  description: "High-impact bus advertising in Dubai & UAE.",
}

export default function BusBrandingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Vehicle Branding"
      subServiceSlug="vehicle-branding"
      categoryName="Bus Branding"
      categorySlug="bus"
      description="High-impact bus advertising reaching commuters and pedestrians across Dubai's bus network."
      features={[
        "Full bus wraps",
        "Side panels",
        "Rear advertising",
        "Interior branding",
        "Route selection",
        "Long-term campaigns",
      ]}
      benefits={["Massive reach", "Route targeting", "Unavoidable presence", "Public transport audience", "City-wide"]}
      processSteps={[
        "Route analysis",
        "Design development",
        "RTA approval",
        "Printing",
        "Installation",
        "Campaign management",
      ]}
      brandColor="rose"
    />
  )
}
