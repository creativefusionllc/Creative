import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Rental Modular Stands | Exhibition Stands | Creative Fusion",
  description: "Cost-effective rental modular stands for events in Dubai & UAE.",
}

export default function RentalStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Modular Stands"
      subServiceSlug="modular-stands"
      categoryName="Rental Stands"
      categorySlug="rental"
      description="Cost-effective rental modular stands for one-time events or companies testing exhibition marketing."
      features={[
        "No ownership costs",
        "Full service included",
        "Custom graphics",
        "Setup & dismantling",
        "Storage included",
        "Maintenance free",
      ]}
      benefits={["Lower investment", "No storage needed", "Professional quality", "Hassle-free", "Try before buying"]}
      processSteps={[
        "Consultation",
        "Stand selection",
        "Customization",
        "Delivery & setup",
        "Event support",
        "Collection",
      ]}
      brandColor="orange"
    />
  )
}
