import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "AWS Hosting Dubai | Amazon Web Services | Creative Fusion LLC",
  description:
    "Professional AWS hosting and management in Dubai. Amazon Web Services setup, optimization, and support.",
}

export default function AWSPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Cloud Hosting", href: "/services/web-development/cloud-hosting" }}
        title="AWS Hosting"
        subtitle="Amazon Web Services"
        description="Deploy and manage your applications on AWS with expert setup, optimization, and ongoing support."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "EC2 instances",
          "S3 storage",
          "RDS databases",
          "CloudFront CDN",
          "Auto-scaling",
          "Load balancing",
          "Security",
          "24/7 monitoring",
        ]}
        process={[
          { title: "Assess", description: "Requirements analysis" },
          { title: "Architect", description: "AWS design" },
          { title: "Deploy", description: "Infrastructure setup" },
          { title: "Manage", description: "Ongoing support" },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "500/mo",
            description: "Small apps",
            features: ["EC2 setup", "S3 storage", "Basic monitoring", "Email support"],
          },
          {
            name: "Business",
            price: "1,500/mo",
            description: "Production apps",
            features: ["Everything in Starter", "Auto-scaling", "CDN setup", "24/7 monitoring"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "3,500/mo",
            description: "Large scale",
            features: ["Everything in Business", "Multi-region", "Dedicated support", "Cost optimization"],
          },
        ]}
        relatedCategories={[
          { title: "Google Cloud", href: "/services/web-development/cloud-hosting/google-cloud" },
          { title: "Azure", href: "/services/web-development/cloud-hosting/azure" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
