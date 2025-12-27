import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Vinyl Banners | Print & Exhibitions | Creative Fusion",
  description: "Durable vinyl banner printing in Dubai & UAE.",
}

export default function VinylBannersPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Banners"
      subServiceSlug="banners"
      categoryName="Vinyl Banners"
      categorySlug="vinyl"
      description="Durable vinyl banners for indoor and outdoor use with vibrant, long-lasting prints."
      features={[
        "Heavy-duty vinyl",
        "Grommets & hems",
        "Custom sizes",
        "Full color printing",
        "Single & double sided",
        "Weather-resistant",
      ]}
      benefits={["Durability", "Versatility", "Cost-effective", "Vibrant colors", "Easy installation"]}
      processSteps={[
        "Size specification",
        "Design approval",
        "Printing",
        "Finishing options",
        "Quality check",
        "Delivery",
      ]}
      brandColor="rose"
    />
  )
}
