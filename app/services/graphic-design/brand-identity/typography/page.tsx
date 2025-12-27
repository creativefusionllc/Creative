import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Typography Design | Graphic Design",
  description: "Custom typography systems that enhance brand personality and readability.",
}

export default function TypographyPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
      }}
      title="Typography Systems"
      subtitle="Font & Type Design"
      description="Create distinctive typography systems that communicate your brand voice effectively."
      heroImage="/typography-design.png"
      benefits={[
        "Custom font selection",
        "Hierarchy systems",
        "Web & print optimized",
        "Readability focused",
        "Brand personality",
        "Licensing guidance",
      ]}
      process={[
        { step: 1, title: "Audit", description: "Assess typography needs" },
        { step: 2, title: "Selection", description: "Font pairing options" },
        { step: 3, title: "Hierarchy", description: "Define type scales" },
        { step: 4, title: "Guidelines", description: "Usage documentation" },
      ]}
      pricing={{
        startingFrom: "AED 2,000",
        includes: ["Primary typeface", "Secondary font", "Type hierarchy", "Usage guidelines"],
      }}
      faqs={[
        {
          question: "Do you create custom fonts?",
          answer:
            "We can recommend and customize existing fonts or create completely custom typefaces for premium projects.",
        },
        {
          question: "Are fonts included?",
          answer: "We provide font recommendations and can include licensing in the package.",
        },
      ]}
      relatedCategories={[
        { title: "Color Theory", href: "/services/graphic-design/brand-identity/color-theory" },
        { title: "Brand Guidelines", href: "/services/graphic-design/brand-identity/brand-guidelines" },
      ]}
    />
  )
}
