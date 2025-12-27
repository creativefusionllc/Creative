import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Wayfinding Signage | Exhibition Stands | Creative Fusion",
  description: "Professional wayfinding signage for events in Dubai & UAE.",
}

export default function WayfindingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Event Branding"
      subServiceSlug="event-branding"
      categoryName="Wayfinding Signage"
      categorySlug="wayfinding"
      description="Professional wayfinding signage that guides attendees seamlessly through your event."
      features={[
        "Directional signs",
        "Floor decals",
        "Hanging banners",
        "Digital screens",
        "Map displays",
        "Zone markers",
      ]}
      benefits={[
        "Easy navigation",
        "Reduced confusion",
        "Professional image",
        "Better experience",
        "Brand consistency",
      ]}
      processSteps={["Venue mapping", "Flow planning", "Design system", "Production", "Installation", "Testing"]}
      brandColor="orange"
    />
  )
}
