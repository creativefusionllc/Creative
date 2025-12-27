import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata = {
  title: "Custom Exhibition Booths Dubai | Bespoke Trade Show Stands UAE | Creative Fusion",
  description:
    "Custom-designed exhibition booths and bespoke trade show stands in Dubai UAE by Creative Fusion. Unique, attention-grabbing displays built to your specifications.",
}

export default function CustomBoothsPage() {
  return (
    <ServicePageTemplate
      category="Exhibition Stands"
      categorySlug="exhibition-stands"
      title="Custom Booths"
      description="Completely custom-designed exhibition booths built to showcase your brand uniquely. From concept to construction, we create stunning bespoke displays for major exhibitions across Dubai and UAE."
      subcategories={[
        {
          name: "Double-Decker Booths",
          slug: "double-decker",
          description: "Two-story exhibition structures",
        },
        {
          name: "Branded Environments",
          slug: "branded-environments",
          description: "Immersive brand experiences",
        },
        {
          name: "Product Launch Booths",
          slug: "product-launch",
          description: "Special event booth designs",
        },
      ]}
      features={[
        "Unique custom design",
        "CAD 3D visualization",
        "Premium materials",
        "Integrated technology",
        "Custom furniture",
        "Professional lighting",
        "Storage solutions",
        "Full project management",
      ]}
    />
  )
}
