import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Social Media Management | Support & Maintenance | Creative Fusion",
  description: "Ongoing social media management in Dubai & UAE.",
}

export default function SocialManagementPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Digital Marketing Support"
      subServiceSlug="digital-marketing-support"
      categoryName="Social Media Management"
      categorySlug="social-management"
      description="Ongoing social media management keeping your brand active and engaged across platforms."
      features={[
        "Content posting",
        "Community management",
        "Engagement monitoring",
        "Response management",
        "Analytics",
        "Strategy updates",
      ]}
      benefits={["Consistent presence", "Audience engagement", "Brand awareness", "Customer service", "Growth"]}
      processSteps={[
        "Platform audit",
        "Content calendar",
        "Daily management",
        "Engagement",
        "Reporting",
        "Strategy refinement",
      ]}
      brandColor="slate"
    />
  )
}
