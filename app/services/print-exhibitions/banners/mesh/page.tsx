import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Mesh Banners | Print & Exhibitions | Creative Fusion",
  description: "Wind-resistant mesh banner printing in Dubai & UAE.",
}

export default function MeshBannersPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Banners"
      subServiceSlug="banners"
      categoryName="Mesh Banners"
      categorySlug="mesh"
      description="Wind-resistant mesh banners perfect for outdoor installations and building wraps."
      features={[
        "Perforated material",
        "Wind-resistant",
        "Large formats",
        "Building wraps",
        "Fence covers",
        "UV resistant",
      ]}
      benefits={["Outdoor durability", "Wind passage", "Large-scale branding", "Construction site use", "Long-lasting"]}
      processSteps={[
        "Site measurement",
        "Design scaling",
        "Material selection",
        "Large format printing",
        "Finishing",
        "Installation",
      ]}
      brandColor="rose"
    />
  )
}
