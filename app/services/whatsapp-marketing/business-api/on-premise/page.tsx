import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp On-Premise API Dubai | Self-Hosted Solution UAE | Creative Fusion LLC",
  description:
    "WhatsApp On-Premise API deployment in Dubai & UAE. Self-hosted solution for enterprises requiring full data control and compliance in GCC.",
  keywords: ["whatsapp on-premise dubai", "self-hosted whatsapp api uae", "enterprise whatsapp gcc"],
}

export default function OnPremisePage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="On-Premise Deployment"
          description="Self-hosted WhatsApp Business API for enterprises requiring complete data sovereignty and control. Ideal for regulated industries in Dubai, UAE & GCC."
          heroImage="/whatsapp-on-premise-server-deployment.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Business API", href: "/services/whatsapp-marketing/business-api" },
          }}
          benefits={[
            "Complete data sovereignty",
            "On your own infrastructure",
            "Compliance with local regulations",
            "Custom security configurations",
            "No third-party data access",
            "Enterprise SLA options",
          ]}
          process={[
            { step: 1, title: "Assessment", description: "Infrastructure requirements analysis" },
            { step: 2, title: "Deployment", description: "Install API on your servers" },
            { step: 3, title: "Configuration", description: "Security and compliance setup" },
            { step: 4, title: "Maintenance", description: "Ongoing support and updates" },
          ]}
          pricing={{
            startingFrom: "AED 15,000",
            includes: ["Server deployment", "Security config", "Compliance setup", "90-day support"],
          }}
          faqs={[
            {
              question: "What infrastructure is needed?",
              answer: "Minimum Docker-compatible servers with specific RAM and CPU requirements based on volume.",
            },
            {
              question: "Is it suitable for banking?",
              answer: "Yes, on-premise is ideal for financial institutions requiring data residency in UAE.",
            },
            {
              question: "Who manages updates?",
              answer: "We provide managed services for updates and maintenance, or train your team.",
            },
          ]}
          relatedCategories={[
            { name: "Cloud API", href: "/services/whatsapp-marketing/business-api/cloud-api" },
            { name: "Multi-Agent Setup", href: "/services/whatsapp-marketing/business-api/multi-agent" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
