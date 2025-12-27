import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Charging Kiosks | Exhibition Stands | Creative Fusion",
  description: "Branded device charging kiosks in Dubai & UAE.",
}

export default function ChargingKiosksPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Kiosks"
      subServiceSlug="kiosks"
      categoryName="Charging Kiosks"
      categorySlug="charging"
      description="Branded device charging kiosks that provide value to attendees while promoting your brand."
      features={[
        "Multiple cables",
        "Secure lockers",
        "Brand graphics",
        "Digital screens",
        "Usage tracking",
        "Fast charging",
      ]}
      benefits={["Value-add service", "Dwell time", "Brand exposure", "Lead capture", "Positive association"]}
      processSteps={[
        "Placement strategy",
        "Branding design",
        "Hardware sourcing",
        "Installation",
        "Monitoring",
        "Maintenance",
      ]}
      brandColor="orange"
    />
  )
}
