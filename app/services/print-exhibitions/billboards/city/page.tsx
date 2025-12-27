import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "City Billboards | Print & Exhibitions | Creative Fusion",
  description: "Strategic city billboard advertising in Dubai & UAE.",
}

export default function CityBillboardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Billboards"
      subServiceSlug="billboards"
      categoryName="City Billboards"
      categorySlug="city"
      description="Strategic city billboard placements in high-traffic urban areas for maximum brand exposure."
      features={[
        "Urban locations",
        "Pedestrian views",
        "Traffic hotspots",
        "Backlit options",
        "Multiple sizes",
        "Short-term rentals",
      ]}
      benefits={["Urban reach", "Targeted locations", "Foot traffic", "Commuter exposure", "Local awareness"]}
      processSteps={[
        "Area analysis",
        "Site selection",
        "Creative design",
        "Printing",
        "Installation",
        "Campaign tracking",
      ]}
      brandColor="rose"
    />
  )
}
