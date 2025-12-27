import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Hanging Banners | Print & Exhibitions | Creative Fusion",
  description: "Professional hanging banner printing in Dubai & UAE.",
}

export default function HangingBannersPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Banners"
      subServiceSlug="banners"
      categoryName="Hanging Banners"
      categorySlug="hanging"
      description="Professional hanging banners for ceiling-mounted displays at events and retail spaces."
      features={[
        "Ceiling mount",
        "Various shapes",
        "Fabric & vinyl",
        "Aluminum frames",
        "360° visibility",
        "Custom sizes",
      ]}
      benefits={["Overhead visibility", "Floor space saving", "Eye-catching", "Event impact", "Brand dominance"]}
      processSteps={[
        "Venue assessment",
        "Shape selection",
        "Design creation",
        "Printing",
        "Frame assembly",
        "Installation",
      ]}
      brandColor="rose"
    />
  )
}
