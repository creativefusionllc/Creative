import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Google Cloud Hosting Dubai | GCP Services | Creative Fusion LLC",
  description: "Professional Google Cloud Platform hosting in Dubai. GCP setup, management, and optimization services.",
}

export default function GoogleCloudPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Cloud Hosting", href: "/services/web-development/cloud-hosting" }}
        title="Google Cloud Hosting"
        subtitle="Google Cloud Platform"
        description="Deploy on Google Cloud Platform with expert setup, Kubernetes management, and AI/ML integration capabilities."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Compute Engine",
          "Cloud Storage",
          "Cloud SQL",
          "Kubernetes",
          "BigQuery",
          "AI/ML tools",
          "Global CDN",
          "Security",
        ]}
        process={[
          { title: "Plan", description: "Architecture design" },
          { title: "Setup", description: "GCP deployment" },
          { title: "Optimize", description: "Performance tuning" },
          { title: "Support", description: "Managed services" },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "500/mo",
            description: "Small apps",
            features: ["Compute Engine", "Cloud Storage", "Basic support", "Monitoring"],
          },
          {
            name: "Business",
            price: "1,500/mo",
            description: "Production",
            features: ["Everything in Starter", "Kubernetes", "CDN", "24/7 support"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "3,500/mo",
            description: "Enterprise scale",
            features: ["Everything in Business", "BigQuery", "AI/ML", "Dedicated team"],
          },
        ]}
        relatedCategories={[
          { title: "AWS", href: "/services/web-development/cloud-hosting/aws" },
          { title: "Azure", href: "/services/web-development/cloud-hosting/azure" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
