import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Azure Hosting Dubai | Microsoft Cloud Services | Creative Fusion LLC",
  description: "Professional Microsoft Azure hosting in Dubai. Azure setup, management, and enterprise integration.",
}

export default function AzurePage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Cloud Hosting", href: "/services/web-development/cloud-hosting" }}
        title="Azure Hosting"
        subtitle="Microsoft Azure"
        description="Deploy on Microsoft Azure with seamless Office 365 and enterprise tool integration, plus powerful hybrid cloud options."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Virtual Machines",
          "App Services",
          "Azure SQL",
          "Blob Storage",
          "Active Directory",
          "Office 365 integration",
          "Hybrid cloud",
          "Compliance",
        ]}
        process={[
          { title: "Assess", description: "Azure readiness" },
          { title: "Design", description: "Cloud architecture" },
          { title: "Migrate", description: "Deployment" },
          { title: "Manage", description: "Ongoing support" },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "500/mo",
            description: "Small business",
            features: ["App Services", "Azure SQL", "Blob Storage", "Basic support"],
          },
          {
            name: "Business",
            price: "1,500/mo",
            description: "Enterprise",
            features: ["Everything in Starter", "Active Directory", "VPN setup", "24/7 support"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "4,000/mo",
            description: "Hybrid cloud",
            features: ["Everything in Business", "Hybrid setup", "Compliance", "Dedicated team"],
          },
        ]}
        relatedCategories={[
          { title: "AWS", href: "/services/web-development/cloud-hosting/aws" },
          { title: "Google Cloud", href: "/services/web-development/cloud-hosting/google-cloud" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
