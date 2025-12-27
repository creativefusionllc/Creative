import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Portal Development Dubai | Client & Employee Portals | Creative Fusion LLC",
  description:
    "Custom portal development in Dubai. Client portals, employee portals, and partner portals for your business.",
}

export default function PortalsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Web Applications", href: "/services/web-development/web-applications" }}
        title="Portal Development"
        subtitle="Secure self-service platforms"
        description="Build secure portals for clients, employees, or partners with self-service features, document sharing, and communication tools."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "User authentication",
          "Document sharing",
          "Messaging",
          "Ticketing",
          "Invoicing",
          "Project tracking",
          "Notifications",
          "Mobile access",
        ]}
        process={[
          { title: "Requirements", description: "Portal features" },
          { title: "Design", description: "User experience" },
          { title: "Build", description: "Development" },
          { title: "Launch", description: "User onboarding" },
        ]}
        pricing={[
          {
            name: "Client Portal",
            price: "12,000",
            description: "Basic portal",
            features: ["User accounts", "Document sharing", "Messaging", "Invoices"],
          },
          {
            name: "Business Portal",
            price: "25,000",
            description: "Full portal",
            features: ["Everything in Client Portal", "Project management", "Ticketing", "Analytics"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "50,000+",
            description: "Complex portal",
            features: ["Everything in Business Portal", "Multi-tenant", "API integration", "Custom workflows"],
          },
        ]}
        relatedCategories={[
          { title: "CRM", href: "/services/web-development/web-applications/crm" },
          { title: "SaaS", href: "/services/web-development/web-applications/saas" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
