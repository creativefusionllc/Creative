import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Highway Billboards | Print & Exhibitions | Creative Fusion",
  description: "High-impact highway billboard advertising in Dubai & UAE.",
}

export default function HighwayBillboardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Billboards"
      subServiceSlug="billboards"
      categoryName="Highway Billboards"
      categorySlug="highway"
      description="High-impact highway billboard advertising reaching thousands of commuters daily in Dubai & UAE."
      features={[
        "Prime locations",
        "Large format printing",
        "Illuminated options",
        "Weather-resistant",
        "High visibility",
        "Traffic data",
      ]}
      benefits={["Mass reach", "24/7 exposure", "Brand awareness", "Geographic targeting", "High impressions"]}
      processSteps={[
        "Location selection",
        "Design creation",
        "Permit acquisition",
        "Printing",
        "Installation",
        "Maintenance",
      ]}
      brandColor="rose"
    />
  )
}
