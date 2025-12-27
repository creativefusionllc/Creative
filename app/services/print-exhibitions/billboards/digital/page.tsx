import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Digital Billboards | Print & Exhibitions | Creative Fusion",
  description: "Dynamic digital billboard advertising in Dubai & UAE.",
}

export default function DigitalBillboardsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Billboards"
      subServiceSlug="billboards"
      categoryName="Digital Billboards"
      categorySlug="digital"
      description="Dynamic digital billboard advertising with animated content and real-time updates."
      features={[
        "LED screens",
        "Animated content",
        "Real-time updates",
        "Dayparting",
        "Multiple ads",
        "Remote management",
      ]}
      benefits={["Dynamic content", "Flexible messaging", "Time-targeted", "Eye-catching", "Quick changes"]}
      processSteps={[
        "Screen selection",
        "Content creation",
        "Animation design",
        "Scheduling",
        "Upload",
        "Performance tracking",
      ]}
      brandColor="rose"
    />
  )
}
