import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Logo Systems Design | Graphic Design",
  description: "Comprehensive logo system design for versatile brand applications.",
}

export default function LogoSystemsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
      }}
      title="Logo Systems"
      subtitle="Comprehensive Logo Design"
      description="Develop versatile logo systems that work seamlessly across all applications and sizes."
      heroImage="/logo-system-design.jpg"
      benefits={[
        "Multiple logo variations",
        "Scalable designs",
        "Responsive logos",
        "Sub-brand integration",
        "Icon systems",
        "Usage flexibility",
      ]}
      process={[
        { step: 1, title: "Strategy", description: "Define logo requirements" },
        { step: 2, title: "Concepts", description: "Develop logo variations" },
        { step: 3, title: "Refinement", description: "Perfect the system" },
        { step: 4, title: "Delivery", description: "All formats and guidelines" },
      ]}
      pricing={{
        startingFrom: "AED 4,000",
        includes: ["Primary logo", "Secondary marks", "Icon system", "Usage guidelines"],
      }}
      faqs={[
        {
          question: "What is a logo system?",
          answer:
            "A logo system includes multiple logo variations designed to work together across different applications.",
        },
        {
          question: "How many variations included?",
          answer: "Typically 4-6 variations including horizontal, stacked, icon, and monochrome versions.",
        },
      ]}
      relatedCategories={[
        { title: "Visual Identity", href: "/services/graphic-design/brand-identity/visual-identity" },
        { title: "Brand Guidelines", href: "/services/graphic-design/brand-identity/brand-guidelines" },
      ]}
    />
  )
}
