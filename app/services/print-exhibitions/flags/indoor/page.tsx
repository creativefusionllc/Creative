import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Indoor Flags | Print & Exhibitions | Creative Fusion",
  description: "Premium indoor flags in Dubai & UAE.",
}

export default function IndoorFlagsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Flags"
      subServiceSlug="flags"
      categoryName="Indoor Flags"
      categorySlug="indoor"
      description="Premium indoor flags for lobbies, showrooms, and corporate spaces with elegant presentation."
      features={[
        "Premium fabrics",
        "Elegant poles",
        "Weighted bases",
        "Tassels & finials",
        "Wall mounting",
        "Display cases",
      ]}
      benefits={["Corporate elegance", "Lobby presence", "Brand pride", "Professional image", "Ceremonial use"]}
      processSteps={[
        "Fabric selection",
        "Design creation",
        "Sewing & finishing",
        "Pole selection",
        "Base fitting",
        "Installation",
      ]}
      brandColor="rose"
    />
  )
}
