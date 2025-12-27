import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Roll-Up Banners | Print & Exhibitions | Creative Fusion",
  description: "Professional roll-up banner printing in Dubai & UAE.",
}

export default function RollUpBannersPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Banners"
      subServiceSlug="banners"
      categoryName="Roll-Up Banners"
      categorySlug="roll-up"
      description="Professional roll-up banners perfect for events, exhibitions, and retail promotions."
      features={[
        "Retractable mechanism",
        "Carry case",
        "Various widths",
        "Premium prints",
        "Quick setup",
        "Replaceable graphics",
      ]}
      benefits={["Portable", "Self-standing", "Professional look", "Easy transport", "Reusable"]}
      processSteps={["Size selection", "Design creation", "Printing", "Assembly", "Quality check", "Delivery"]}
      brandColor="rose"
    />
  )
}
