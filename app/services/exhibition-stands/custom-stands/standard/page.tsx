import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Standard Exhibition Stands | Exhibition Stands | Creative Fusion",
  description: "Professional standard exhibition stands for trade shows and events in Dubai & UAE.",
}

export default function StandardStandsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Custom Stands"
      subServiceSlug="custom-stands"
      categoryName="Standard Stands"
      categorySlug="standard"
      description="Professional standard exhibition stands designed to maximize your brand visibility at trade shows and events."
      features={[
        "Custom graphics & branding",
        "Modular construction",
        "Easy setup & dismantling",
        "Storage & logistics",
        "On-site support",
        "Lighting solutions",
      ]}
      benefits={[
        "Cost-effective solution",
        "Quick turnaround time",
        "Professional appearance",
        "Reusable components",
        "Brand consistency",
      ]}
      processSteps={[
        "Consultation & brief",
        "Design concept",
        "3D visualization",
        "Production",
        "Installation",
        "Post-event support",
      ]}
      brandColor="orange"
    />
  )
}
