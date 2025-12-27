import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "WhatsApp Business API Integration Dubai | API Setup UAE | Creative Fusion LLC",
  description:
    "Professional WhatsApp Business API integration services in Dubai & UAE. Official API setup, verification, and enterprise-grade messaging solutions for businesses in GCC.",
  keywords: [
    "whatsapp business api dubai",
    "whatsapp api integration uae",
    "whatsapp enterprise api gcc",
    "business api setup dubai",
    "whatsapp official api uae",
  ],
}

export default function BusinessApiPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Business API Integration"
          subtitle="WhatsApp Marketing"
          description="Enterprise-grade WhatsApp Business API integration for large-scale customer communication. Official API setup with verified business profiles for companies in Dubai, UAE & GCC."
          heroImage="/whatsapp-business-api-integration-dashboard.jpg"
          icon={Settings}
          features={[
            {
              title: "Official API Setup",
              description: "Complete WhatsApp Business API registration and verification",
              href: "/services/whatsapp-marketing/business-api/official-setup",
            },
            {
              title: "Cloud API Integration",
              description: "Meta Cloud API setup for scalable messaging infrastructure",
              href: "/services/whatsapp-marketing/business-api/cloud-api",
            },
            {
              title: "On-Premise Deployment",
              description: "Self-hosted API deployment for data-sensitive enterprises",
              href: "/services/whatsapp-marketing/business-api/on-premise",
            },
            {
              title: "CRM Integration",
              description: "Connect WhatsApp with Salesforce, HubSpot, Zoho & other CRMs",
              href: "/services/whatsapp-marketing/business-api/crm-integration",
            },
            {
              title: "Multi-Agent Setup",
              description: "Team inbox and agent assignment for customer support",
              href: "/services/whatsapp-marketing/business-api/multi-agent",
            },
            {
              title: "Analytics Dashboard",
              description: "Real-time messaging analytics and performance tracking",
              href: "/services/whatsapp-marketing/business-api/analytics",
            },
          ]}
          processSteps={[
            { title: "Verification", description: "Business verification with Meta for API access" },
            { title: "Setup", description: "API configuration and phone number registration" },
            { title: "Integration", description: "Connect with your existing systems and CRM" },
            { title: "Testing", description: "Thorough testing and go-live support" },
          ]}
          benefits={[
            "Official Meta Business Partner support",
            "Verified green badge for your business",
            "Unlimited messaging capacity",
            "99.9% uptime SLA guarantee",
            "End-to-end encryption",
            "GDPR and data compliance ready",
          ]}
          relatedServices={[
            { title: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
            { title: "Broadcast Campaigns", href: "/services/whatsapp-marketing/broadcast" },
            { title: "CRM Solutions", href: "/services/software-apps/crm-solutions" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
