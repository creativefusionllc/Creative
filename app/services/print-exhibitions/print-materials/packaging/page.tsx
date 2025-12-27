import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Packaging | Print & Exhibitions | Creative Fusion",
  description: "Custom packaging printing in Dubai & UAE.",
}

export default function PackagingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Print Materials"
      subServiceSlug="print-materials"
      categoryName="Packaging"
      categorySlug="packaging"
      description="Custom packaging printing including boxes, bags, and containers with premium finishes."
      features={[
        "Custom boxes",
        "Retail packaging",
        "Food packaging",
        "Gift boxes",
        "Sustainable options",
        "Special finishes",
      ]}
      benefits={["Brand experience", "Product protection", "Shelf appeal", "Unboxing experience", "Brand recognition"]}
      processSteps={[
        "Product assessment",
        "Structural design",
        "Graphic design",
        "Prototyping",
        "Production",
        "Delivery",
      ]}
      brandColor="rose"
    />
  )
}
