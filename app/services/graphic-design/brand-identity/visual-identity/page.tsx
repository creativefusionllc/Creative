import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Visual Identity Design | Graphic Design",
  description:
    "Professional visual identity design services for consistent brand representation across all touchpoints.",
}

export default function VisualIdentityPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
      }}
      title="Visual Identity Design"
      subtitle="Graphic Design Services"
      description="Create a cohesive visual language that represents your brand across all platforms and touchpoints."
      heroImage="/visual-identity-design.png"
      benefits={[
        "Consistent brand representation",
        "Professional visual language",
        "Cross-platform compatibility",
        "Memorable brand recognition",
        "Strategic design approach",
        "Comprehensive style system",
      ]}
      process={[
        { step: 1, title: "Discovery", description: "Understanding your brand values and goals" },
        { step: 2, title: "Research", description: "Market and competitor analysis" },
        { step: 3, title: "Design", description: "Creating visual identity elements" },
        { step: 4, title: "Delivery", description: "Final files and guidelines" },
      ]}
      pricing={{
        startingFrom: "AED 3,500",
        includes: ["Logo variations", "Color palette", "Typography system", "Visual guidelines"],
      }}
      faqs={[
        {
          question: "What is visual identity?",
          answer: "Visual identity is the collection of visual elements that represent and differentiate a brand.",
        },
        { question: "How long does it take?", answer: "Typically 2-3 weeks depending on complexity." },
      ]}
      relatedCategories={[
        { title: "Logo Systems", href: "/services/graphic-design/brand-identity/logo-systems" },
        { title: "Color Theory", href: "/services/graphic-design/brand-identity/color-theory" },
      ]}
    />
  )
}
