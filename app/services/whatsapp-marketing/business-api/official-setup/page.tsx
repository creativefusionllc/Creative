import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Official WhatsApp API Setup Dubai | Business Verification UAE | Creative Fusion LLC",
  description:
    "Official WhatsApp Business API setup and verification in Dubai & UAE. Get your business verified with green badge and access enterprise messaging features.",
  keywords: ["whatsapp api setup dubai", "business verification uae", "whatsapp green badge dubai"],
}

export default function OfficialSetupPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Official API Setup"
          description="Complete WhatsApp Business API registration and verification process. Get your business officially verified with Meta and access enterprise-grade messaging capabilities."
          heroImage="/whatsapp-official-api-setup-verification.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Business API", href: "/services/whatsapp-marketing/business-api" },
          }}
          benefits={[
            "Official Meta Business verification",
            "Green badge verification for trust",
            "Access to all API features",
            "Higher messaging limits",
            "Priority support from Meta",
            "Compliance documentation",
          ]}
          process={[
            { step: 1, title: "Application", description: "Submit business documents for verification" },
            { step: 2, title: "Review", description: "Meta reviews and verifies your business" },
            { step: 3, title: "Approval", description: "Receive API access credentials" },
            { step: 4, title: "Activation", description: "Configure and activate your API" },
          ]}
          pricing={{
            startingFrom: "AED 2,500",
            includes: ["Business verification", "API setup", "Phone registration", "30-day support"],
          }}
          faqs={[
            {
              question: "How long does verification take?",
              answer: "Typically 2-5 business days for standard verification, faster for existing Meta advertisers.",
            },
            {
              question: "What documents are required?",
              answer: "Trade license, business registration, and proof of business address in UAE.",
            },
            {
              question: "Can I use my existing number?",
              answer: "Yes, you can migrate your existing WhatsApp Business number to the API.",
            },
          ]}
          relatedCategories={[
            { name: "Cloud API", href: "/services/whatsapp-marketing/business-api/cloud-api" },
            { name: "CRM Integration", href: "/services/whatsapp-marketing/business-api/crm-integration" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
