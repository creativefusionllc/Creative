import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Entrance Branding | Exhibition Stands | Creative Fusion",
  description: "Impactful entrance branding for events in Dubai & UAE.",
}

export default function EntranceBrandingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Event Branding"
      subServiceSlug="event-branding"
      categoryName="Entrance Branding"
      categorySlug="entrance"
      description="Impactful entrance branding that sets the tone and creates memorable first impressions."
      features={[
        "Welcome arches",
        "Gate branding",
        "Floor graphics",
        "Directional signage",
        "Registration areas",
        "Photo moments",
      ]}
      benefits={[
        "Strong first impression",
        "Brand immersion",
        "Navigation aid",
        "Photo opportunities",
        "Event atmosphere",
      ]}
      processSteps={[
        "Entry flow analysis",
        "Design concept",
        "Structural planning",
        "Fabrication",
        "Installation",
        "Removal",
      ]}
      brandColor="orange"
    />
  )
}
