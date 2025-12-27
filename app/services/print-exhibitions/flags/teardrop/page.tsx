import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Teardrop Flags | Print & Exhibitions | Creative Fusion",
  description: "Professional teardrop flags in Dubai & UAE.",
}

export default function TeardropFlagsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Flags"
      subServiceSlug="flags"
      categoryName="Teardrop Flags"
      categorySlug="teardrop"
      description="Professional teardrop flags with distinctive shape ensuring logo visibility in any wind condition."
      features={[
        "Teardrop shape",
        "Tensioned design",
        "Logo always visible",
        "Multiple sizes",
        "Various bases",
        "Rotating poles",
      ]}
      benefits={[
        "Constant logo visibility",
        "Elegant shape",
        "Wind-responsive",
        "Professional look",
        "Brand prominence",
      ]}
      processSteps={["Design adaptation", "Size choice", "Printing", "Assembly", "Base fitting", "Delivery"]}
      brandColor="rose"
    />
  )
}
