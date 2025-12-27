import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Custom Flags | Print & Exhibitions | Creative Fusion",
  description: "Custom shaped flags in Dubai & UAE.",
}

export default function CustomFlagsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Flags"
      subServiceSlug="flags"
      categoryName="Custom Flags"
      categorySlug="custom"
      description="Custom shaped flags designed to match your brand identity with unique shapes and sizes."
      features={[
        "Custom shapes",
        "Unique designs",
        "Brand matching",
        "Special materials",
        "Custom hardware",
        "One-of-a-kind",
      ]}
      benefits={["Unique identity", "Brand differentiation", "Custom fit", "Memorable", "Creative freedom"]}
      processSteps={[
        "Concept discussion",
        "Shape design",
        "Technical drawing",
        "Prototyping",
        "Production",
        "Delivery",
      ]}
      brandColor="rose"
    />
  )
}
