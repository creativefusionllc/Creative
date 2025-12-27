import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Website Performance | Support & Maintenance | Creative Fusion",
  description: "Website performance optimization in Dubai & UAE.",
}

export default function WebsitePerformancePage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Website Maintenance"
      subServiceSlug="website-maintenance"
      categoryName="Website Performance"
      categorySlug="performance"
      description="Website performance optimization ensuring fast load times and optimal user experience."
      features={[
        "Speed optimization",
        "Image compression",
        "Caching setup",
        "CDN integration",
        "Database optimization",
        "Code minification",
      ]}
      benefits={["Faster load times", "Better SEO", "User satisfaction", "Lower bounce rates", "Higher conversions"]}
      processSteps={[
        "Performance audit",
        "Bottleneck identification",
        "Optimization",
        "Testing",
        "Monitoring setup",
        "Ongoing tuning",
      ]}
      brandColor="slate"
    />
  )
}
