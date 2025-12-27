import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Managed Hosting Dubai | Fully Managed Servers | Creative Fusion LLC",
  description: "Fully managed hosting services in Dubai. Server management, monitoring, security, and support.",
}

export default function ManagedHostingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Cloud Hosting", href: "/services/web-development/cloud-hosting" }}
        title="Managed Hosting"
        subtitle="Fully managed servers"
        description="Get fully managed hosting with expert server administration, security, monitoring, and 24/7 support."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Server management",
          "Security patches",
          "Performance optimization",
          "24/7 monitoring",
          "Backup management",
          "SSL certificates",
          "CDN setup",
          "Expert support",
        ]}
        process={[
          { title: "Assess", description: "Hosting needs" },
          { title: "Provision", description: "Server setup" },
          { title: "Migrate", description: "Site transfer" },
          { title: "Support", description: "Ongoing management" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "300/mo",
            description: "Small sites",
            features: ["1 server", "Daily backups", "Basic monitoring", "Email support"],
          },
          {
            name: "Business",
            price: "750/mo",
            description: "Business sites",
            features: ["Everything in Basic", "Multiple servers", "CDN", "24/7 support"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "2,000/mo",
            description: "Mission critical",
            features: ["Everything in Business", "Load balancing", "Dedicated manager", "SLA guarantee"],
          },
        ]}
        relatedCategories={[
          { title: "Server Management", href: "/services/web-development/cloud-hosting/server-management" },
          { title: "VPS Hosting", href: "/services/domain-hosting/web-hosting/vps-hosting" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
