import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Hosting Support | Support & Maintenance",
  description: "Server and hosting support including management, monitoring, and optimization.",
}

export default function HostingSupportPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Support & Maintenance", serviceHref: "/services/support-maintenance" }}
      title="Hosting Support"
      subtitle="Server Management"
      description="Professional hosting support to ensure your servers run reliably and securely."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Server Management",
          description: "Full server admin",
          href: "/services/support-maintenance/hosting-support/server-management",
        },
        {
          title: "Monitoring",
          description: "24/7 server monitoring",
          href: "/services/support-maintenance/hosting-support/monitoring",
        },
        {
          title: "Security",
          description: "Server security",
          href: "/services/support-maintenance/hosting-support/security",
        },
        {
          title: "Backups",
          description: "Server backups",
          href: "/services/support-maintenance/hosting-support/backups",
        },
        {
          title: "Migration",
          description: "Server migration",
          href: "/services/support-maintenance/hosting-support/migration",
        },
        {
          title: "Optimization",
          description: "Performance tuning",
          href: "/services/support-maintenance/hosting-support/optimization",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 500/month",
          features: ["Shared hosting support", "Weekly backups", "Email support", "Business hours"],
          popular: false,
        },
        {
          name: "VPS",
          price: "AED 1,500/month",
          features: ["VPS management", "Daily backups", "Priority support", "Security hardening"],
          popular: true,
        },
        {
          name: "Dedicated",
          price: "AED 4,000/month",
          features: ["Full server management", "Real-time monitoring", "24/7 support", "Custom configuration"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Do you manage cloud hosting?", answer: "Yes, we support AWS, Google Cloud, Azure, and others." },
        { question: "Can you migrate my hosting?", answer: "Yes, we offer zero-downtime migration services." },
      ]}
    />
  )
}
