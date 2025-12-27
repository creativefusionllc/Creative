import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "WhatsApp Marketing Services Dubai | WhatsApp Business API UAE | Creative Fusion LLC",
  description:
    "Professional WhatsApp marketing services in Dubai, UAE & GCC. WhatsApp Business API integration, chatbot development, broadcast campaigns & automated customer support.",
  keywords: [
    "whatsapp marketing dubai",
    "whatsapp business api uae",
    "whatsapp chatbot dubai",
    "whatsapp automation gcc",
    "whatsapp broadcast campaigns uae",
    "whatsapp customer support dubai",
    "whatsapp marketing agency uae",
    "business whatsapp integration dubai",
  ],
  openGraph: {
    title: "WhatsApp Marketing Services Dubai | Creative Fusion LLC",
    description: "Transform customer engagement with WhatsApp Business API. 98% open rates, instant communication.",
    type: "website",
    locale: "en_AE",
  },
}

export default function WhatsAppMarketingPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="WhatsApp Marketing"
          subtitle="Direct Communication"
          description="Transform customer engagement with WhatsApp Business API. Direct, personalized communication enabling automated messages, customer support, and targeted campaigns with 98% open rates across Dubai, UAE & GCC."
          heroImage="/professional-whatsapp-business-marketing-mobile.jpg"
          icon={MessageSquare}
          features={[
            {
              title: "Business API Integration",
              description: "Complete WhatsApp Business API setup and configuration for enterprises",
              href: "/services/whatsapp-marketing/business-api",
            },
            {
              title: "Chatbot Development",
              description: "Intelligent AI-powered chatbots for 24/7 automated customer interactions",
              href: "/services/whatsapp-marketing/chatbot",
            },
            {
              title: "Broadcast Campaigns",
              description: "Targeted mass messaging and promotional campaigns to engaged audiences",
              href: "/services/whatsapp-marketing/broadcast",
            },
            {
              title: "Customer Support",
              description: "Automated and live customer support solutions via WhatsApp",
              href: "/services/whatsapp-marketing/customer-support",
            },
            {
              title: "Lead Generation",
              description: "Capture and qualify leads automatically through WhatsApp interactions",
              href: "/services/whatsapp-marketing/lead-generation",
            },
            {
              title: "E-commerce Integration",
              description: "WhatsApp catalog, ordering, and payment integration for online stores",
              href: "/services/whatsapp-marketing/ecommerce",
            },
          ]}
          processSteps={[
            { title: "Strategy", description: "Analyze your business needs and develop WhatsApp marketing strategy" },
            { title: "Integration", description: "Set up WhatsApp Business API and connect with your systems" },
            { title: "Automation", description: "Build chatbots, workflows, and automated response systems" },
            { title: "Launch", description: "Deploy campaigns and monitor performance with analytics" },
          ]}
          benefits={[
            "98% message open rate - highest of any channel",
            "Instant two-way communication with customers",
            "Rich media support - images, videos, documents",
            "CRM and e-commerce integration ready",
            "Automated 24/7 customer support",
            "Detailed analytics and performance tracking",
            "Verified business profile and green badge",
            "Compliance with WhatsApp Business policies",
          ]}
          relatedServices={[
            { title: "Digital Marketing", href: "/services/digital-marketing" },
            { title: "Social Media Marketing", href: "/services/digital-marketing/social-media" },
            { title: "Marketing & PR", href: "/services/marketing-pr" },
            { title: "Software & Apps", href: "/services/software-apps" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
