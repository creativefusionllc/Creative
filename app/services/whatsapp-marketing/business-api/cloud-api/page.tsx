import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Cloud API Dubai | Meta Cloud Integration UAE | Creative Fusion LLC",
  description:
    "WhatsApp Cloud API integration services in Dubai & UAE. Scalable, cost-effective messaging infrastructure hosted by Meta for businesses in GCC.",
  keywords: ["whatsapp cloud api dubai", "meta cloud api uae", "cloud messaging gcc"],
}

export default function CloudApiPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Cloud API Integration"
          description="Leverage Meta's Cloud API infrastructure for scalable, reliable WhatsApp messaging. No server management required - perfect for businesses seeking quick deployment."
          heroImage="/whatsapp-cloud-api-integration-meta.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Business API", href: "/services/whatsapp-marketing/business-api" },
          }}
          benefits={[
            "No server infrastructure needed",
            "Automatic scaling for high volumes",
            "Pay-per-conversation pricing",
            "Always up-to-date features",
            "Global CDN for fast delivery",
            "Built-in security and compliance",
          ]}
          process={[
            { step: 1, title: "Registration", description: "Create Meta Developer account" },
            { step: 2, title: "Configuration", description: "Set up Cloud API application" },
            { step: 3, title: "Webhook Setup", description: "Configure message webhooks" },
            { step: 4, title: "Go Live", description: "Launch and start messaging" },
          ]}
          pricing={{
            startingFrom: "AED 1,500",
            includes: ["Cloud API setup", "Webhook configuration", "Testing environment", "Documentation"],
          }}
          faqs={[
            {
              question: "What's the difference from On-Premise?",
              answer: "Cloud API is hosted by Meta, easier to set up, and requires no server management.",
            },
            {
              question: "Is there a message limit?",
              answer: "No hard limit - scales automatically based on your messaging tier.",
            },
            {
              question: "How is pricing calculated?",
              answer: "Pay per conversation (24-hour window) with different rates for user vs business initiated.",
            },
          ]}
          relatedCategories={[
            { name: "On-Premise Deployment", href: "/services/whatsapp-marketing/business-api/on-premise" },
            { name: "Analytics Dashboard", href: "/services/whatsapp-marketing/business-api/analytics" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
