import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Brochures | Print & Exhibitions | Creative Fusion",
  description: "Professional brochure printing in Dubai & UAE.",
}

export default function BrochuresPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Print Materials"
      subServiceSlug="print-materials"
      categoryName="Brochures"
      categorySlug="brochures"
      description="Professional brochure printing with various folds, finishes, and paper options for impactful marketing."
      features={["Multiple folds", "Premium papers", "Spot UV", "Embossing", "Full color", "Quick turnaround"]}
      benefits={[
        "Detailed information",
        "Professional image",
        "Leave-behind material",
        "Brand storytelling",
        "Sales tool",
      ]}
      processSteps={[
        "Content planning",
        "Design layout",
        "Paper selection",
        "Proofing",
        "Printing",
        "Folding & finishing",
      ]}
      brandColor="rose"
    />
  )
}
