import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Branded USB Drives | Gift Items | Creative Fusion",
  description: "Custom branded USB drives in Dubai & UAE.",
}

export default function UsbDrivesPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Tech Gifts"
      subServiceSlug="tech-gifts"
      categoryName="Branded USB Drives"
      categorySlug="usb-drives"
      description="Custom branded USB drives in various shapes and capacities for data sharing and promotion."
      features={[
        "Custom shapes",
        "Multiple capacities",
        "Logo printing",
        "Pre-loaded content",
        "Gift packaging",
        "Fast transfer",
      ]}
      benefits={["Practical utility", "Pre-load content", "Brand exposure", "Conference essential", "Cost-effective"]}
      processSteps={[
        "Shape selection",
        "Capacity choice",
        "Design approval",
        "Content loading",
        "Production",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
