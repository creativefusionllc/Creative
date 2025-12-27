import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Dedicated Servers Dubai | Enterprise Hosting | Creative Fusion LLC",
  description:
    "Enterprise-grade dedicated servers in Dubai UAE. Full server power for high-traffic websites and applications.",
  keywords: ["dedicated server dubai", "enterprise hosting uae", "dedicated hosting"],
}

export default function DedicatedServerPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Web Hosting", href: "/services/domain-hosting/web-hosting" },
      }}
      title="Dedicated Servers"
      subtitle="Maximum Power"
      description="Full dedicated server hardware exclusively for your business. Maximum performance, security, and control for enterprise applications and high-traffic websites."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "100% dedicated resources",
        "Enterprise-grade hardware",
        "Full hardware control",
        "Custom configurations",
        "RAID storage options",
        "99.99% uptime SLA",
      ]}
      process={[
        { step: 1, title: "Consult", description: "Discuss your requirements" },
        { step: 2, title: "Configure", description: "Custom server build" },
        { step: 3, title: "Deploy", description: "Server provisioned" },
        { step: 4, title: "Manage", description: "Ongoing support" },
      ]}
      pricing={{
        startingFrom: "AED 999/month",
        includes: [
          "Intel Xeon processor",
          "32GB DDR4 RAM",
          "2x 500GB SSD RAID",
          "10TB bandwidth",
          "IPMI access",
          "24/7 monitoring",
        ],
      }}
      faqs={[
        {
          question: "When should I choose dedicated?",
          answer: "When you need maximum performance, have compliance requirements, or handle sensitive data.",
        },
        {
          question: "Can I customize the hardware?",
          answer: "Yes, we offer fully customizable configurations to match your exact requirements.",
        },
        {
          question: "Is managed support available?",
          answer: "Yes, we offer fully managed dedicated servers with 24/7 administration and monitoring.",
        },
      ]}
      relatedCategories={[
        { title: "VPS Hosting", href: "/services/domain-hosting/web-hosting/vps-hosting" },
        { title: "Cloud Hosting", href: "/services/domain-hosting/web-hosting/cloud-hosting" },
        { title: "E-Commerce Hosting", href: "/services/domain-hosting/web-hosting/ecommerce-hosting" },
      ]}
    />
  )
}
