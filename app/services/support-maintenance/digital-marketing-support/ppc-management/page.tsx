import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "PPC Management | Support & Maintenance | Creative Fusion",
  description: "Ongoing PPC campaign management in Dubai & UAE.",
}

export default function PpcManagementPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Digital Marketing Support"
      subServiceSlug="digital-marketing-support"
      categoryName="PPC Management"
      categorySlug="ppc-management"
      description="Ongoing PPC campaign management optimizing your ad spend for maximum ROI."
      features={[
        "Campaign optimization",
        "Bid management",
        "Ad testing",
        "Keyword refinement",
        "Budget allocation",
        "Performance reports",
      ]}
      benefits={["Better ROI", "Lower CPC", "Higher conversions", "Budget efficiency", "Competitive advantage"]}
      processSteps={[
        "Campaign audit",
        "Optimization plan",
        "Daily monitoring",
        "A/B testing",
        "Reporting",
        "Strategy adjustment",
      ]}
      brandColor="slate"
    />
  )
}
