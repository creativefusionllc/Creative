import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Rectangle Flags | Print & Exhibitions | Creative Fusion",
  description: "Classic rectangle flags in Dubai & UAE.",
}

export default function RectangleFlagsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Flags"
      subServiceSlug="flags"
      categoryName="Rectangle Flags"
      categorySlug="rectangle"
      description="Classic rectangle flags offering maximum print area for detailed messaging and graphics."
      features={[
        "Maximum print area",
        "Traditional shape",
        "Various sizes",
        "Wall & pole mount",
        "Indoor & outdoor",
        "Double-sided",
      ]}
      benefits={[
        "Maximum design space",
        "Traditional appeal",
        "Versatile mounting",
        "Clear messaging",
        "Professional look",
      ]}
      processSteps={["Size determination", "Design layout", "Printing", "Finishing", "Hardware", "Delivery"]}
      brandColor="rose"
    />
  )
}
