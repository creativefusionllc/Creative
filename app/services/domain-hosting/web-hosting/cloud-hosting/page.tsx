import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Cloud Hosting Dubai | Scalable Cloud Servers | Creative Fusion LLC",
  description:
    "Scalable cloud hosting in Dubai UAE. Auto-scaling infrastructure, pay-as-you-go, and enterprise reliability.",
  keywords: ["cloud hosting dubai", "cloud server uae", "scalable hosting"],
}

export default function CloudHostingPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Web Hosting", href: "/services/domain-hosting/web-hosting" },
      }}
      title="Cloud Hosting"
      subtitle="Infinite Scalability"
      description="Enterprise cloud hosting with auto-scaling capabilities. Handle traffic spikes effortlessly and pay only for what you use."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "Auto-scaling resources",
        "Pay-as-you-go pricing",
        "Multi-region deployment",
        "Load balancing",
        "99.99% uptime",
        "Enterprise security",
      ]}
      process={[
        { step: 1, title: "Plan", description: "Architecture design" },
        { step: 2, title: "Deploy", description: "Cloud infrastructure" },
        { step: 3, title: "Configure", description: "Auto-scaling rules" },
        { step: 4, title: "Monitor", description: "24/7 performance" },
      ]}
      pricing={{
        startingFrom: "AED 149/month",
        includes: ["2 vCPU cloud server", "4GB RAM", "100GB SSD", "Auto-scaling", "Load balancer", "CDN included"],
      }}
      faqs={[
        {
          question: "What is cloud hosting?",
          answer:
            "Cloud hosting distributes your site across multiple servers, ensuring high availability and scalability.",
        },
        {
          question: "How does auto-scaling work?",
          answer:
            "Resources automatically increase during traffic spikes and decrease when not needed, optimizing costs.",
        },
        {
          question: "Is it suitable for startups?",
          answer: "Yes! Pay-as-you-go pricing means you start small and scale as your business grows.",
        },
      ]}
      relatedCategories={[
        { title: "VPS Hosting", href: "/services/domain-hosting/web-hosting/vps-hosting" },
        { title: "Dedicated Servers", href: "/services/domain-hosting/web-hosting/dedicated-server" },
        { title: "E-Commerce Hosting", href: "/services/domain-hosting/web-hosting/ecommerce-hosting" },
      ]}
    />
  )
}
