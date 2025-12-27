import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Catalogs | Print & Exhibitions | Creative Fusion",
  description: "Professional catalog printing in Dubai & UAE.",
}

export default function CatalogsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Print Materials"
      subServiceSlug="print-materials"
      categoryName="Catalogs"
      categorySlug="catalogs"
      description="Professional catalog printing showcasing your products and services in premium bound formats."
      features={[
        "Perfect binding",
        "Saddle stitch",
        "Premium covers",
        "Full color pages",
        "Various sizes",
        "Custom finishes",
      ]}
      benefits={["Product showcase", "Sales tool", "Brand prestige", "Reference material", "Professional presentation"]}
      processSteps={["Layout planning", "Content organization", "Design execution", "Proofing", "Printing", "Binding"]}
      brandColor="rose"
    />
  )
}
