import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Mobile Billboards | Print & Exhibitions | Creative Fusion",
  description: "Mobile billboard truck advertising in Dubai & UAE.",
}

export default function MobileBillboardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Billboards"
      subServiceSlug="billboards"
      categoryName="Mobile Billboards"
      categorySlug="mobile"
      description="Mobile billboard trucks bringing your message directly to target audiences across Dubai."
      features={[
        "Moving displays",
        "Route planning",
        "GPS tracking",
        "LED options",
        "Audio capability",
        "Event targeting",
      ]}
      benefits={[
        "Geographic flexibility",
        "Event coverage",
        "Cannot be ignored",
        "Route customization",
        "High attention",
      ]}
      processSteps={[
        "Route planning",
        "Design creation",
        "Truck branding",
        "Schedule setup",
        "Campaign launch",
        "GPS reporting",
      ]}
      brandColor="rose"
    />
  )
}
