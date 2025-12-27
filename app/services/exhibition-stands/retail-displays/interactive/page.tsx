import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Interactive Displays | Exhibition Stands | Creative Fusion",
  description: "Engaging interactive retail displays in Dubai & UAE.",
}

export default function InteractiveDisplaysPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Retail Displays"
      subServiceSlug="retail-displays"
      categoryName="Interactive Displays"
      categorySlug="interactive"
      description="Engaging interactive retail displays with touchscreens, sensors, and digital experiences."
      features={[
        "Touchscreen technology",
        "Motion sensors",
        "Product demos",
        "Data capture",
        "Digital content",
        "Remote updates",
      ]}
      benefits={[
        "Customer engagement",
        "Data collection",
        "Memorable experience",
        "Modern appeal",
        "Competitive advantage",
      ]}
      processSteps={[
        "Technology selection",
        "UX design",
        "Hardware integration",
        "Content development",
        "Testing",
        "Deployment",
      ]}
      brandColor="orange"
    />
  )
}
