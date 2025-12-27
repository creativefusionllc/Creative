import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Information Kiosks | Exhibition Stands | Creative Fusion",
  description: "Digital information kiosks for events in Dubai & UAE.",
}

export default function InformationKiosksPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Kiosks"
      subServiceSlug="kiosks"
      categoryName="Information Kiosks"
      categorySlug="information"
      description="Digital information kiosks providing self-service access to event details, maps, and schedules."
      features={[
        "Touchscreen interface",
        "Wayfinding maps",
        "Event schedules",
        "Multi-language",
        "Search function",
        "Print capability",
      ]}
      benefits={["Self-service", "Reduced staff needs", "24/7 availability", "Updated info", "Professional image"]}
      processSteps={["Requirements", "UI/UX design", "Content creation", "Hardware setup", "Testing", "Deployment"]}
      brandColor="orange"
    />
  )
}
