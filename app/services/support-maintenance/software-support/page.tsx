import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Software Support | Support & Maintenance",
  description: "Application support including bug fixes, updates, training, and documentation.",
}

export default function SoftwareSupportPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Support & Maintenance", serviceHref: "/services/support-maintenance" }}
      title="Software Support"
      subtitle="Application Maintenance"
      description="Comprehensive software support to ensure your applications run smoothly and efficiently."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Bug Fixes",
          description: "Issue resolution",
          href: "/services/support-maintenance/software-support/bug-fixes",
        },
        {
          title: "Updates",
          description: "Feature updates",
          href: "/services/support-maintenance/software-support/updates",
        },
        {
          title: "Training",
          description: "User training",
          href: "/services/support-maintenance/software-support/training",
        },
        {
          title: "Documentation",
          description: "Technical docs",
          href: "/services/support-maintenance/software-support/documentation",
        },
        {
          title: "System Integration",
          description: "Connect systems",
          href: "/services/support-maintenance/software-support/integration",
        },
        {
          title: "Optimization",
          description: "Performance tuning",
          href: "/services/support-maintenance/software-support/optimization",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 1,000/month",
          features: ["Bug fixes", "Email support", "5 hours included", "Business hours"],
          popular: false,
        },
        {
          name: "Standard",
          price: "AED 3,000/month",
          features: ["Bug fixes + updates", "Phone support", "15 hours included", "Priority response"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 7,500/month",
          features: ["Full support", "Dedicated team", "Unlimited hours", "24/7 availability"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Do you support custom software?",
          answer: "Yes, we can support any application we've developed or inherited.",
        },
        { question: "Can you take over existing projects?", answer: "Yes, we offer code audit and takeover services." },
      ]}
    />
  )
}
