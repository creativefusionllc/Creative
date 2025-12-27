import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Corporate Watches | Gift Items | Creative Fusion",
  description: "Corporate branded watches and timepieces in Dubai & UAE.",
}

export default function WatchesGiftsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Executive Gifts"
      subServiceSlug="executive-gifts"
      categoryName="Corporate Watches"
      categorySlug="watches"
      description="Corporate branded watches and timepieces for executive gifting and employee recognition."
      features={[
        "Custom dial printing",
        "Case engraving",
        "Premium movements",
        "Luxury packaging",
        "Warranty included",
        "Custom straps",
      ]}
      benefits={["High perceived value", "Daily wear", "Status symbol", "Memorable gift", "Brand prestige"]}
      processSteps={[
        "Design consultation",
        "Movement selection",
        "Customization",
        "Quality control",
        "Packaging",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
