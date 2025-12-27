import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Fleet Branding | Print & Exhibitions | Creative Fusion",
  description: "Consistent fleet branding services in Dubai & UAE.",
}

export default function FleetBrandingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Vehicle Branding"
      subServiceSlug="vehicle-branding"
      categoryName="Fleet Branding"
      categorySlug="fleet"
      description="Consistent fleet branding services ensuring uniform brand presence across all company vehicles."
      features={[
        "Uniform design",
        "Multi-vehicle management",
        "Brand guidelines",
        "Scalable production",
        "Maintenance plans",
        "Fleet tracking",
      ]}
      benefits={[
        "Brand consistency",
        "Professional image",
        "Multiple impressions",
        "Employee pride",
        "Market presence",
      ]}
      processSteps={[
        "Fleet audit",
        "Design standardization",
        "Production planning",
        "Sequential application",
        "Quality control",
        "Ongoing maintenance",
      ]}
      brandColor="rose"
    />
  )
}
