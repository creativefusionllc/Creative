import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Acrylic Signs | Print & Exhibitions | Creative Fusion",
  description: "Premium acrylic signage solutions in Dubai & UAE.",
}

export default function AcrylicSignsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Signage"
      subServiceSlug="signage"
      categoryName="Acrylic Signs"
      categorySlug="acrylic"
      description="Premium acrylic signage offering a sleek, modern look for offices and retail environments."
      features={["Clear & colored", "Laser cutting", "3D lettering", "Backlit options", "UV printing", "Custom shapes"]}
      benefits={["Modern appearance", "Versatile", "Professional look", "Durable", "Easy maintenance"]}
      processSteps={["Design approval", "Material selection", "Cutting", "Assembly", "Quality check", "Installation"]}
      brandColor="rose"
    />
  )
}
