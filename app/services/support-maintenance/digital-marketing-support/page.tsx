import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Digital Marketing Support | Support & Maintenance",
  description: "Ongoing digital marketing support including campaign management and optimization.",
}

export default function DigitalMarketingSupportPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Support & Maintenance", serviceHref: "/services/support-maintenance" }}
      title="Marketing Support"
      subtitle="Ongoing Marketing Services"
      description="Continuous digital marketing support to maintain and grow your online presence."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Campaign Management",
          description: "Ad campaign maintenance",
          href: "/services/support-maintenance/digital-marketing-support/campaigns",
        },
        {
          title: "SEO Maintenance",
          description: "Ongoing SEO work",
          href: "/services/support-maintenance/digital-marketing-support/seo",
        },
        {
          title: "Social Media",
          description: "Social management",
          href: "/services/support-maintenance/digital-marketing-support/social",
        },
        {
          title: "Reporting",
          description: "Performance reports",
          href: "/services/support-maintenance/digital-marketing-support/reporting",
        },
        {
          title: "Content",
          description: "Content updates",
          href: "/services/support-maintenance/digital-marketing-support/content",
        },
        {
          title: "Analytics",
          description: "Data analysis",
          href: "/services/support-maintenance/digital-marketing-support/analytics",
        },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 2,000/month",
          features: ["4 social posts/week", "Monthly report", "Basic SEO", "Email support"],
          popular: false,
        },
        {
          name: "Growth",
          price: "AED 5,000/month",
          features: ["Daily posting", "Weekly reports", "Full SEO", "Ad management"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 15,000/month",
          features: ["Multi-platform", "Real-time analytics", "Strategy calls", "Dedicated manager"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Is ad spend included?", answer: "No, ad spend is separate from management fees." },
        { question: "How often do you report?", answer: "Depending on plan: weekly or monthly comprehensive reports." },
      ]}
    />
  )
}
