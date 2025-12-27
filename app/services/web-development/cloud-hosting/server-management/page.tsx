import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Server Management Dubai | DevOps Services | Creative Fusion LLC",
  description:
    "Professional server management and DevOps services in Dubai. System administration and infrastructure management.",
}

export default function ServerManagementPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Cloud Hosting", href: "/services/web-development/cloud-hosting" }}
        title="Server Management"
        subtitle="Expert administration"
        description="Professional server management and DevOps services including setup, optimization, security, and ongoing administration."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "System administration",
          "Security hardening",
          "Performance tuning",
          "CI/CD pipelines",
          "Docker/Kubernetes",
          "Monitoring setup",
          "Log management",
          "Documentation",
        ]}
        process={[
          { title: "Audit", description: "Server assessment" },
          { title: "Optimize", description: "Performance & security" },
          { title: "Automate", description: "DevOps setup" },
          { title: "Manage", description: "Ongoing support" },
        ]}
        pricing={[
          {
            name: "Hourly",
            price: "150/hr",
            description: "As needed",
            features: ["Server setup", "Troubleshooting", "One-time optimization", "Documentation"],
          },
          {
            name: "Monthly",
            price: "1,200/mo",
            description: "Regular support",
            features: ["Monthly maintenance", "Security updates", "Monitoring", "Priority support"],
            popular: true,
          },
          {
            name: "Dedicated",
            price: "4,000/mo",
            description: "Full DevOps",
            features: ["Everything in Monthly", "CI/CD setup", "Container orchestration", "24/7 on-call"],
          },
        ]}
        relatedCategories={[
          { title: "Managed Hosting", href: "/services/web-development/cloud-hosting/managed-hosting" },
          { title: "AWS", href: "/services/web-development/cloud-hosting/aws" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
