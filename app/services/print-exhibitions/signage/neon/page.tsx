import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Neon Signs | Print & Exhibitions | Creative Fusion",
  description: "Custom neon and LED neon signs in Dubai & UAE.",
}

export default function NeonSignsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Signage"
      subServiceSlug="signage"
      categoryName="Neon Signs"
      categorySlug="neon"
      description="Custom neon and LED neon signs creating eye-catching displays for businesses and events."
      features={["Traditional neon", "LED flex neon", "Custom shapes", "Color options", "Dimmable", "Energy efficient"]}
      benefits={["Eye-catching", "Retro appeal", "Night visibility", "Instagrammable", "Unique character"]}
      processSteps={[
        "Design consultation",
        "Color selection",
        "Technical drawing",
        "Fabrication",
        "Testing",
        "Installation",
      ]}
      brandColor="rose"
    />
  )
}
