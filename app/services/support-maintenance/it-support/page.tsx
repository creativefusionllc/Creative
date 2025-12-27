import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "IT Support Services | Support & Maintenance",
  description: "Professional IT support including helpdesk, remote support, and managed services.",
}

export default function ITSupportPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Support & Maintenance", serviceHref: "/services/support-maintenance" }}
      title="IT Support"
      subtitle="Technical Support Services"
      description="Reliable IT support services to keep your business running smoothly."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Helpdesk",
          description: "24/7 support desk",
          href: "/services/support-maintenance/it-support/helpdesk",
        },
        {
          title: "Remote Support",
          description: "Online assistance",
          href: "/services/support-maintenance/it-support/remote",
        },
        {
          title: "On-Site Support",
          description: "Physical support visits",
          href: "/services/support-maintenance/it-support/onsite",
        },
        {
          title: "Managed Services",
          description: "Full IT management",
          href: "/services/support-maintenance/it-support/managed",
        },
        {
          title: "Network Support",
          description: "Network maintenance",
          href: "/services/support-maintenance/it-support/network",
        },
        {
          title: "Security",
          description: "Cybersecurity services",
          href: "/services/support-maintenance/it-support/security",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 500/month",
          features: ["Email support", "8-hour response", "Remote only", "Business hours"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 1,500/month",
          features: ["Phone + email", "4-hour response", "Remote + on-site", "Extended hours"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 5,000/month",
          features: ["Dedicated team", "1-hour response", "24/7 support", "Full managed IT"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "What are response times?", answer: "Varies by plan: 1-8 hours depending on priority." },
        { question: "Do you support Mac and Windows?", answer: "Yes, we support all major operating systems." },
      ]}
    />
  )
}
