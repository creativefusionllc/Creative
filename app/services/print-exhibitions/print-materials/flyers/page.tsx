import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Flyers | Print & Exhibitions | Creative Fusion",
  description: "High-quality flyer printing in Dubai & UAE.",
}

export default function FlyersPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Print Materials"
      subServiceSlug="print-materials"
      categoryName="Flyers"
      categorySlug="flyers"
      description="High-quality flyer printing for promotions, events, and marketing campaigns at competitive prices."
      features={[
        "Various sizes",
        "Paper options",
        "Single & double sided",
        "Bulk pricing",
        "Fast delivery",
        "Gloss & matte",
      ]}
      benefits={["Cost-effective", "Wide distribution", "Event promotion", "Quick production", "Direct marketing"]}
      processSteps={[
        "Design submission",
        "Paper choice",
        "Quantity confirmation",
        "Printing",
        "Quality check",
        "Delivery",
      ]}
      brandColor="rose"
    />
  )
}
