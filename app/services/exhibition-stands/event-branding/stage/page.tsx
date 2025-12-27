import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Stage Branding | Exhibition Stands | Creative Fusion",
  description: "Professional stage branding for events in Dubai & UAE.",
}

export default function StageBrandingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Event Branding"
      subServiceSlug="event-branding"
      categoryName="Stage Branding"
      categorySlug="stage"
      description="Professional stage branding that creates an impressive backdrop for speakers and performances."
      features={[
        "Backdrop design",
        "LED screens",
        "Podium branding",
        "Stage props",
        "Lighting design",
        "Audio integration",
      ]}
      benefits={["Professional image", "Brand visibility", "Photo opportunities", "Memorable events", "Media coverage"]}
      processSteps={["Venue assessment", "Stage design", "Technical planning", "Production", "Setup", "Event support"]}
      brandColor="orange"
    />
  )
}
