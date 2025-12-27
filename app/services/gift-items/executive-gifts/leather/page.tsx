import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Leather Executive Gifts | Gift Items | Creative Fusion",
  description: "Premium leather executive gifts and accessories in Dubai & UAE.",
}

export default function LeatherGiftsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Executive Gifts"
      subServiceSlug="executive-gifts"
      categoryName="Leather Gifts"
      categorySlug="leather"
      description="Premium leather executive gifts including wallets, portfolios, and accessories that make lasting impressions."
      features={[
        "Genuine leather",
        "Custom embossing",
        "Gift packaging",
        "Multiple colors",
        "Premium quality",
        "Logo branding",
      ]}
      benefits={["Prestigious image", "Lasting impression", "Durability", "Executive appeal", "Brand recognition"]}
      processSteps={["Selection", "Customization", "Branding", "Quality check", "Packaging", "Delivery"]}
      brandColor="amber"
    />
  )
}
