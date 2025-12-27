import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Headphones } from "lucide-react"

export const metadata: Metadata = {
  title: "WhatsApp Customer Support Dubai | Support Solutions UAE | Creative Fusion LLC",
  description:
    "WhatsApp customer support services in Dubai & UAE. 24/7 automated and live support solutions for businesses in GCC.",
  keywords: ["whatsapp customer support dubai", "whatsapp helpdesk uae", "customer service gcc"],
}

export default function CustomerSupportPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Customer Support"
          subtitle="WhatsApp Marketing"
          description="Transform customer service with WhatsApp support solutions. Automated responses, live agent integration, and seamless ticketing for exceptional customer experience."
          heroImage="/whatsapp-customer-support-service.jpg"
          icon={Headphones}
          features={[
            {
              title: "Live Chat Support",
              description: "Real-time customer support with live agents via WhatsApp",
              href: "/services/whatsapp-marketing/customer-support/live-chat",
            },
            {
              title: "Automated Support",
              description: "AI-powered automated responses for common queries",
              href: "/services/whatsapp-marketing/customer-support/automated",
            },
            {
              title: "Ticket Management",
              description: "WhatsApp-integrated ticketing and issue tracking",
              href: "/services/whatsapp-marketing/customer-support/ticketing",
            },
            {
              title: "FAQ Automation",
              description: "Instant answers to frequently asked questions",
              href: "/services/whatsapp-marketing/customer-support/faq",
            },
            {
              title: "Feedback Collection",
              description: "Post-support CSAT and feedback collection",
              href: "/services/whatsapp-marketing/customer-support/feedback",
            },
            {
              title: "Escalation Management",
              description: "Smart routing and escalation workflows",
              href: "/services/whatsapp-marketing/customer-support/escalation",
            },
          ]}
          processSteps={[
            { title: "Assessment", description: "Analyze support needs and volumes" },
            { title: "Design", description: "Create support workflows and responses" },
            { title: "Integration", description: "Connect with your systems" },
            { title: "Launch", description: "Train team and go live" },
          ]}
          benefits={[
            "24/7 customer availability",
            "80% faster response times",
            "Reduced support costs",
            "Higher customer satisfaction",
            "Multi-language support",
            "Seamless escalation to humans",
          ]}
          relatedServices={[
            { title: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
            { title: "Business API", href: "/services/whatsapp-marketing/business-api" },
            { title: "CRM Solutions", href: "/services/software-apps/crm-solutions" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
