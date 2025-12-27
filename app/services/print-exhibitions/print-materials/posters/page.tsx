import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Posters | Print & Exhibitions | Creative Fusion",
  description: "Large format poster printing in Dubai & UAE.",
}

export default function PostersPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Print Materials"
      subServiceSlug="print-materials"
      categoryName="Posters"
      categorySlug="posters"
      description="Large format poster printing for events, retail, and promotional displays in various sizes."
      features={[
        "Large formats",
        "Photo quality",
        "Various papers",
        "Lamination",
        "Mounting options",
        "Indoor & outdoor",
      ]}
      benefits={["High visibility", "Impactful messaging", "Decorative", "Event essential", "Affordable advertising"]}
      processSteps={["Size selection", "Design approval", "Material choice", "Printing", "Finishing", "Delivery"]}
      brandColor="rose"
    />
  )
}
