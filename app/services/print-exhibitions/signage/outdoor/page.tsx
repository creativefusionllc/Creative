import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Outdoor Signage | Print & Exhibitions | Creative Fusion",
  description: "Durable outdoor signage solutions in Dubai & UAE.",
}

export default function OutdoorSignagePage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Signage"
      subServiceSlug="signage"
      categoryName="Outdoor Signage"
      categorySlug="outdoor"
      description="Durable outdoor signage solutions built to withstand Dubai's climate while maximizing visibility."
      features={[
        "Weather-resistant",
        "UV-protected",
        "Illumination options",
        "Various materials",
        "Custom sizes",
        "Municipal compliance",
      ]}
      benefits={["24/7 visibility", "Durability", "Brand landmark", "Way-finding", "Business identification"]}
      processSteps={[
        "Site survey",
        "Design creation",
        "Permit application",
        "Fabrication",
        "Installation",
        "Maintenance plan",
      ]}
      brandColor="rose"
    />
  )
}
