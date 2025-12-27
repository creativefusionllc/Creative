import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Photo Booth Branding | Exhibition Stands | Creative Fusion",
  description: "Branded photo booth experiences in Dubai & UAE.",
}

export default function PhotoBoothBrandingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Event Branding"
      subServiceSlug="event-branding"
      categoryName="Photo Booth Branding"
      categorySlug="photo-booth"
      description="Branded photo booth experiences that generate social media engagement and lasting memories."
      features={[
        "Custom backdrops",
        "Props & accessories",
        "Branded frames",
        "Social sharing",
        "Print options",
        "Green screen",
      ]}
      benefits={["Social engagement", "User-generated content", "Brand exposure", "Fun experience", "Viral potential"]}
      processSteps={[
        "Concept creation",
        "Backdrop design",
        "Props sourcing",
        "Tech setup",
        "Event operation",
        "Content delivery",
      ]}
      brandColor="orange"
    />
  )
}
