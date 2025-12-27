import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Custom Iconography Design | Graphic Design",
  description: "Bespoke icon design that reinforces brand identity and improves user experience.",
}

export default function IconographyPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
      }}
      title="Custom Iconography"
      subtitle="Icon Design Services"
      description="Create unique icon sets that enhance brand recognition and improve user navigation."
      heroImage="/custom-icon-design.jpg"
      benefits={[
        "Brand-aligned style",
        "Consistent icon family",
        "Multiple formats",
        "Scalable vectors",
        "Web & app ready",
        "Print compatible",
      ]}
      process={[
        { step: 1, title: "Define", description: "Identify icon needs" },
        { step: 2, title: "Style", description: "Develop icon aesthetic" },
        { step: 3, title: "Design", description: "Create icon set" },
        { step: 4, title: "Export", description: "All formats delivered" },
      ]}
      pricing={{
        startingFrom: "AED 1,500",
        includes: ["20 custom icons", "SVG & PNG formats", "Multiple sizes", "Style guidelines"],
      }}
      faqs={[
        { question: "How many icons included?", answer: "Standard packages include 20 icons, with options to expand." },
        { question: "What formats provided?", answer: "SVG, PNG in multiple sizes, and icon font if needed." },
      ]}
      relatedCategories={[
        { title: "Visual Identity", href: "/services/graphic-design/brand-identity/visual-identity" },
        { title: "UI/UX Design", href: "/services/graphic-design/ui-ux-design" },
      ]}
    />
  )
}
