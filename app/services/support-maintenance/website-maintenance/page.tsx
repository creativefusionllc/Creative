import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Website Maintenance | Support & Maintenance",
  description: "Professional website maintenance including updates, security, and performance optimization.",
}

export default function WebsiteMaintenancePage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Support & Maintenance", serviceHref: "/services/support-maintenance" }}
      title="Website Maintenance"
      subtitle="Web Support Services"
      description="Keep your website secure, updated, and performing at its best with our maintenance plans."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Updates",
          description: "Regular CMS updates",
          href: "/services/support-maintenance/website-maintenance/updates",
        },
        {
          title: "Security",
          description: "Security monitoring",
          href: "/services/support-maintenance/website-maintenance/security",
        },
        {
          title: "Backups",
          description: "Automated backups",
          href: "/services/support-maintenance/website-maintenance/backups",
        },
        {
          title: "Performance",
          description: "Speed optimization",
          href: "/services/support-maintenance/website-maintenance/performance",
        },
        {
          title: "Monitoring",
          description: "Uptime monitoring",
          href: "/services/support-maintenance/website-maintenance/monitoring",
        },
        {
          title: "Content",
          description: "Content updates",
          href: "/services/support-maintenance/website-maintenance/content",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 300/month",
          features: ["Weekly backups", "Security updates", "Uptime monitoring", "Email support"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 800/month",
          features: ["Daily backups", "2hr content updates", "Performance reports", "Priority support"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 2,000/month",
          features: ["Real-time backup", "Unlimited updates", "Dedicated manager", "24/7 support"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What platforms do you support?",
          answer: "WordPress, Shopify, custom sites, and most CMS platforms.",
        },
        { question: "What if my site goes down?", answer: "We monitor 24/7 and respond immediately to any downtime." },
      ]}
    />
  )
}
