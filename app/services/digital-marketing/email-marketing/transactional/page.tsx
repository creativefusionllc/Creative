import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Transactional Email Services Dubai | Order Confirmations | Creative Fusion LLC",
  description:
    "Transactional email services in Dubai. Order confirmations, shipping updates, password resets, and system notifications.",
}

export default function TransactionalPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Digital Marketing", href: "/services/digital-marketing" }}
        parentSubService={{ title: "Email Marketing", href: "/services/digital-marketing/email-marketing" }}
        title="Transactional Emails"
        subtitle="Critical system communications"
        description="Professional transactional email design and setup. Order confirmations, shipping notifications, and system emails that represent your brand."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Order confirmations",
          "Shipping notifications",
          "Password resets",
          "Account alerts",
          "Invoice emails",
          "Appointment reminders",
          "Review requests",
          "Receipt emails",
        ]}
        process={[
          { title: "Audit", description: "Current email review" },
          { title: "Design", description: "Template creation" },
          { title: "Integrate", description: "System setup" },
          { title: "Test", description: "Quality assurance" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "1,200",
            description: "5 email templates",
            features: ["Template design", "Basic integration", "Mobile responsive", "Brand styling"],
          },
          {
            name: "Standard",
            price: "2,500",
            description: "10 templates",
            features: ["Everything in Basic", "Advanced integration", "Dynamic content", "A/B testing"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "5,000",
            description: "Unlimited templates",
            features: ["Everything in Standard", "Custom integration", "API setup", "Dedicated support"],
          },
        ]}
        relatedCategories={[
          { title: "E-commerce", href: "/services/web-development/ecommerce" },
          { title: "Web Applications", href: "/services/web-development/web-applications" },
          { title: "Automation", href: "/services/digital-marketing/email-marketing/automation" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
