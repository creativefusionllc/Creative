import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "LED Signs | Print & Exhibitions | Creative Fusion",
  description: "Modern LED signage solutions in Dubai & UAE.",
}

export default function LedSignsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Signage"
      subServiceSlug="signage"
      categoryName="LED Signs"
      categorySlug="led"
      description="Modern LED signage solutions offering bright, energy-efficient, and dynamic display options."
      features={[
        "High brightness",
        "Energy efficient",
        "Programmable",
        "Long lifespan",
        "Various colors",
        "Remote control",
      ]}
      benefits={["Day & night visibility", "Low running costs", "Dynamic content", "Modern look", "Attention-grabbing"]}
      processSteps={[
        "Requirements analysis",
        "Design development",
        "LED selection",
        "Fabrication",
        "Programming",
        "Installation",
      ]}
      brandColor="rose"
    />
  )
}
