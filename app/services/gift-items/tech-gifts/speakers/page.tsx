import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded Speakers | Gift Items | Creative Fusion",
  description: "Custom branded bluetooth speakers in Dubai & UAE.",
}

export default function SpeakersPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Tech Gifts"
      subServiceSlug="tech-gifts"
      categoryName="Branded Speakers"
      categorySlug="speakers"
      description="Custom branded bluetooth speakers combining quality audio with prominent brand visibility."
      features={[
        "Bluetooth connectivity",
        "Logo printing",
        "Portable designs",
        "Rechargeable",
        "Various sizes",
        "Water-resistant options",
      ]}
      benefits={["High-value gift", "Group visibility", "Quality sound", "Modern appeal", "Brand association"]}
      processSteps={[
        "Speaker selection",
        "Branding design",
        "Sound testing",
        "Production",
        "Quality check",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
