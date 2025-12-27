import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "SEO Maintenance | Support & Maintenance | Creative Fusion",
  description: "Ongoing SEO maintenance services in Dubai & UAE.",
}

export default function SeoMaintenancePage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Digital Marketing Support"
      subServiceSlug="digital-marketing-support"
      categoryName="SEO Maintenance"
      categorySlug="seo-maintenance"
      description="Ongoing SEO maintenance keeping your website optimized for search engine rankings."
      features={[
        "Keyword monitoring",
        "Content updates",
        "Technical SEO",
        "Link building",
        "Competitor analysis",
        "Ranking reports",
      ]}
      benefits={[
        "Maintained rankings",
        "Organic traffic",
        "Competitive edge",
        "Algorithm updates",
        "Continuous improvement",
      ]}
      processSteps={[
        "SEO audit",
        "Strategy refinement",
        "Monthly optimization",
        "Content updates",
        "Reporting",
        "Strategy adjustment",
      ]}
      brandColor="slate"
    />
  )
}
