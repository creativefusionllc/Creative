import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Color Theory & Palette Design | Graphic Design",
  description: "Strategic color palette development based on color psychology and brand positioning.",
}

export default function ColorTheoryPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
      }}
      title="Color Theory & Palettes"
      subtitle="Strategic Color Design"
      description="Develop impactful color palettes that evoke the right emotions and strengthen brand recognition."
      heroImage="/color-palette-design.png"
      benefits={[
        "Psychology-based selection",
        "Industry-appropriate colors",
        "Accessible combinations",
        "Print & digital specs",
        "Mood alignment",
        "Competitive differentiation",
      ]}
      process={[
        { step: 1, title: "Analysis", description: "Brand personality assessment" },
        { step: 2, title: "Exploration", description: "Color options development" },
        { step: 3, title: "Testing", description: "Application testing" },
        { step: 4, title: "Documentation", description: "Complete color specifications" },
      ]}
      pricing={{
        startingFrom: "AED 1,500",
        includes: ["Primary palette", "Secondary colors", "Color codes", "Usage rules"],
      }}
      faqs={[
        {
          question: "How many colors in a palette?",
          answer: "Typically 3-5 primary colors plus extended palette for flexibility.",
        },
        {
          question: "Do you provide all color formats?",
          answer: "Yes, including HEX, RGB, CMYK, and Pantone references.",
        },
      ]}
      relatedCategories={[
        { title: "Visual Identity", href: "/services/graphic-design/brand-identity/visual-identity" },
        { title: "Typography", href: "/services/graphic-design/brand-identity/typography" },
      ]}
    />
  )
}
