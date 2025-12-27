import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Brand Guidelines Design | Graphic Design",
  description: "Comprehensive brand guideline documents for consistent brand implementation.",
}

export default function BrandGuidelinesPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
      }}
      title="Brand Guidelines"
      subtitle="Brand Standards Documentation"
      description="Comprehensive brand guidelines that ensure consistent implementation across all touchpoints."
      heroImage="/brand-guidelines-document.jpg"
      benefits={[
        "Complete documentation",
        "Usage examples",
        "Do's and don'ts",
        "Digital & print ready",
        "Team alignment",
        "Quality control",
      ]}
      process={[
        { step: 1, title: "Compile", description: "Gather all brand elements" },
        { step: 2, title: "Document", description: "Create comprehensive guide" },
        { step: 3, title: "Examples", description: "Add real-world applications" },
        { step: 4, title: "Deliver", description: "PDF and editable formats" },
      ]}
      pricing={{
        startingFrom: "AED 3,000",
        includes: ["30+ page guide", "Usage examples", "Asset library", "Editable templates"],
      }}
      faqs={[
        {
          question: "What's included in guidelines?",
          answer: "Logo usage, colors, typography, imagery, tone of voice, and application examples.",
        },
        { question: "Can it be updated?", answer: "Yes, we provide editable files for future updates." },
      ]}
      relatedCategories={[
        { title: "Visual Identity", href: "/services/graphic-design/brand-identity/visual-identity" },
        { title: "Logo Systems", href: "/services/graphic-design/brand-identity/logo-systems" },
      ]}
    />
  )
}
