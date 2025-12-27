import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata = {
  title: "Modular Exhibition Systems Dubai | Trade Show Booths UAE | Creative Fusion",
  description:
    "Flexible modular exhibition systems and trade show booths in Dubai UAE by Creative Fusion. Customizable, reusable display systems for any event size.",
}

export default function ModularSystemsPage() {
  return (
    <ServicePageTemplate
      category="Exhibition Stands"
      categorySlug="exhibition-stands"
      title="Modular Systems"
      description="Versatile modular exhibition systems that can be reconfigured for different booth sizes and layouts. Perfect for companies exhibiting at multiple trade shows across Dubai and UAE."
      subcategories={[
        {
          name: "Shell Scheme Booths",
          slug: "shell-scheme",
          description: "Standard modular exhibition booths",
        },
        {
          name: "Island Booths",
          slug: "island-booths",
          description: "Open-sided exhibition islands",
        },
        {
          name: "Peninsula Booths",
          slug: "peninsula-booths",
          description: "Three-sided exhibition spaces",
        },
        {
          name: "Inline Booths",
          slug: "inline-booths",
          description: "Single-sided corridor booths",
        },
      ]}
      features={[
        "Reconfigurable components",
        "Expandable system",
        "Tool-free assembly",
        "Modular graphics panels",
        "Built-in lighting options",
        "Integrated storage",
        "Professional finish",
        "Easy transportation",
      ]}
    />
  )
}
