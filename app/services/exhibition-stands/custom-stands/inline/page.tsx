import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Inline Exhibition Stands | Exhibition Stands | Creative Fusion",
  description: "Cost-effective inline exhibition stands for trade shows in Dubai & UAE.",
}

export default function InlineStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Custom Stands"
      subServiceSlug="custom-stands"
      categoryName="Inline Stands"
      categorySlug="inline"
      description="Cost-effective inline exhibition stands perfect for first-time exhibitors and budget-conscious brands."
      features={[
        "Single open side",
        "Back & side walls",
        "Compact design",
        "Essential elements",
        "Quality graphics",
        "Basic lighting",
      ]}
      benefits={["Budget-friendly", "Easy to manage", "Quick setup", "Professional look", "Good for startups"]}
      processSteps={["Requirements", "Design", "Approval", "Production", "Setup", "Support"]}
      brandColor="orange"
    />
  )
}
