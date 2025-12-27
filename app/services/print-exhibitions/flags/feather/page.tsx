import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Feather Flags | Print & Exhibitions | Creative Fusion",
  description: "Eye-catching feather flags in Dubai & UAE.",
}

export default function FeatherFlagsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Flags"
      subServiceSlug="flags"
      categoryName="Feather Flags"
      categorySlug="feather"
      description="Eye-catching feather flags creating dynamic movement and visibility for outdoor promotions."
      features={[
        "Curved shape",
        "Various heights",
        "Ground stakes",
        "Cross bases",
        "Single & double sided",
        "Wind movement",
      ]}
      benefits={["Movement attraction", "Tall visibility", "Outdoor impact", "Event presence", "Brand awareness"]}
      processSteps={[
        "Size selection",
        "Design creation",
        "Fabric printing",
        "Pole assembly",
        "Base selection",
        "Delivery",
      ]}
      brandColor="rose"
    />
  )
}
