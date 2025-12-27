import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Sampling Kiosks | Exhibition Stands | Creative Fusion",
  description: "Product sampling kiosks for events in Dubai & UAE.",
}

export default function SamplingKiosksPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Kiosks"
      subServiceSlug="kiosks"
      categoryName="Sampling Kiosks"
      categorySlug="sampling"
      description="Product sampling kiosks designed for distributing samples while collecting customer data."
      features={[
        "Product dispensing",
        "Data capture",
        "Refrigeration options",
        "Stock monitoring",
        "Branded enclosure",
        "Hygiene compliant",
      ]}
      benefits={["Product trial", "Lead generation", "Controlled distribution", "Brand experience", "Market research"]}
      processSteps={[
        "Product requirements",
        "Kiosk design",
        "Dispensing system",
        "Data integration",
        "Setup",
        "Restocking plan",
      ]}
      brandColor="orange"
    />
  )
}
