import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "VPS Hosting Dubai | Virtual Private Servers | Creative Fusion LLC",
  description:
    "High-performance VPS hosting in Dubai UAE. Dedicated resources, root access, and full control for growing businesses.",
  keywords: ["vps hosting dubai", "virtual private server uae", "vps dubai"],
}

export default function VpsHostingPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Web Hosting", href: "/services/domain-hosting/web-hosting" },
      }}
      title="VPS Hosting"
      subtitle="Dedicated Resources"
      description="Virtual Private Servers with guaranteed resources and full root access. Perfect for growing businesses that need more power and control."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "Dedicated CPU & RAM",
        "Full root access",
        "SSD NVMe storage",
        "Choose your OS",
        "Instant scalability",
        "DDoS protection",
      ]}
      process={[
        { step: 1, title: "Configure", description: "Choose specs and OS" },
        { step: 2, title: "Deploy", description: "Server ready in minutes" },
        { step: 3, title: "Access", description: "Full root/admin access" },
        { step: 4, title: "Scale", description: "Upgrade resources anytime" },
      ]}
      pricing={{
        startingFrom: "AED 199/month",
        includes: ["2 vCPU cores", "4GB RAM", "80GB NVMe SSD", "4TB bandwidth", "Full root access", "24/7 support"],
      }}
      faqs={[
        {
          question: "What's the difference between VPS and shared?",
          answer:
            "VPS provides dedicated resources isolated from other users, offering better performance and security.",
        },
        {
          question: "Do I get root access?",
          answer: "Yes, you get full root access to install any software and configure your server as needed.",
        },
        {
          question: "Is VPS managed or unmanaged?",
          answer:
            "We offer both options. Managed VPS includes server administration, while unmanaged gives you full control.",
        },
      ]}
      relatedCategories={[
        { title: "Dedicated Servers", href: "/services/domain-hosting/web-hosting/dedicated-server" },
        { title: "Cloud Hosting", href: "/services/domain-hosting/web-hosting/cloud-hosting" },
        { title: "Shared Hosting", href: "/services/domain-hosting/web-hosting/shared-hosting" },
      ]}
    />
  )
}
