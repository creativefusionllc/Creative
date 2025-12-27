import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Motorcycle Branding | Print & Exhibitions | Creative Fusion",
  description: "Motorcycle and scooter branding in Dubai & UAE.",
}

export default function MotorcycleBrandingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Vehicle Branding"
      subServiceSlug="vehicle-branding"
      categoryName="Motorcycle Branding"
      categorySlug="motorcycle"
      description="Motorcycle and scooter branding for delivery fleets and promotional campaigns."
      features={["Full wraps", "Decal kits", "Delivery boxes", "Helmet branding", "Rider uniforms", "Coordinated look"]}
      benefits={["Delivery visibility", "Last-mile branding", "Agile advertising", "Urban penetration", "Young appeal"]}
      processSteps={[
        "Fleet assessment",
        "Branding design",
        "Component printing",
        "Application",
        "Rider gear",
        "Quality check",
      ]}
      brandColor="rose"
    />
  )
}
