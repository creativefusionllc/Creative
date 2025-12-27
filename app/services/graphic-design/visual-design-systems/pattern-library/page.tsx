export const metadata = {
  title: "Design Pattern Library | Creative Fusion Dubai",
  description:
    "Professional design pattern library services including interaction patterns, layout patterns, and UI patterns. Creative Fusion delivers pattern libraries in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function PatternLibraryPage() {
  return (
    <ServicePageTemplate
      title="Design Pattern Library"
      description="Document and standardize design patterns across your product with a comprehensive pattern library that guides consistent user experiences."
      category="Graphic Design"
      subcategory="Visual Design Systems"
      icon="grid"
      features={[
        "Navigation patterns",
        "Form patterns",
        "Data visualization patterns",
        "Search patterns",
        "Filtering patterns",
        "Sorting patterns",
        "Pagination patterns",
        "Modal patterns",
        "Error handling patterns",
        "Loading patterns",
      ]}
      benefits={[
        "Consistent UX",
        "Decision guidance",
        "Team alignment",
        "Reduced design debt",
        "Faster problem solving",
      ]}
      process={[
        "Pattern identification",
        "Use case documentation",
        "Pattern design",
        "Best practices guide",
        "Library creation",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 4,000",
          features: ["15 common patterns", "Basic documentation", "Use cases"],
        },
        {
          name: "Professional",
          price: "AED 10,000",
          features: ["40+ patterns", "Detailed documentation", "Do's and Don'ts", "Code examples"],
        },
        {
          name: "Enterprise",
          price: "AED 25,000",
          features: [
            "Comprehensive pattern library",
            "Custom patterns",
            "Accessibility guidelines",
            "Interactive examples",
            "Training",
          ],
        },
      ]}
      faqs={[
        {
          question: "What's a design pattern?",
          answer:
            "A design pattern is a reusable solution to a common design problem. For example, a 'search with filters' pattern defines how users search and refine results across your product.",
        },
        {
          question: "How is this different from a component library?",
          answer:
            "Components are the building blocks (buttons, cards), while patterns show how to combine components to solve specific user problems (checkout flow, data filtering, etc.).",
        },
      ]}
      relatedServices={[
        { name: "Component Library", href: "/services/graphic-design/visual-design-systems/component-library" },
        { name: "UX Research", href: "/services/graphic-design/ui-ux-design/ux-research" },
        { name: "UI Design", href: "/services/graphic-design/ui-ux-design/website-ui" },
      ]}
    />
  )
}
