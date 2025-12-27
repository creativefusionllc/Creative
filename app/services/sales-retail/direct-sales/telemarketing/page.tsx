import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Telemarketing Services Dubai | Telesales UAE GCC",
  description:
    "Professional telemarketing and telesales services in Dubai, UAE & GCC. Outbound calling, lead generation, appointment setting, and phone sales campaigns.",
  keywords: ["telemarketing dubai", "telesales uae", "outbound calling gcc", "phone sales dubai"],
}

export default function TelemarketingPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
          }}
          title="Telemarketing"
          subtitle="Phone Sales Excellence"
          description="Drive sales and appointments through professional telemarketing services in Dubai, UAE & GCC. Our multilingual teams deliver results through strategic outbound campaigns."
          heroImage="/telemarketing-call-center-dubai.jpg"
          benefits={[
            "Multilingual calling teams",
            "CRM integration",
            "Call recording and QA",
            "Script development",
            "Lead qualification",
            "Appointment setting",
          ]}
          process={[
            { step: 1, title: "Campaign Setup", description: "Script development and team training" },
            { step: 2, title: "List Preparation", description: "Data cleaning and segmentation" },
            { step: 3, title: "Calling Campaign", description: "Systematic outbound calling" },
            { step: 4, title: "Lead Delivery", description: "Qualified leads delivered to your CRM" },
          ]}
          pricing={{
            startingFrom: "AED 50/hour/agent",
            includes: ["Trained agent", "CRM access", "Call recording", "Reports"],
          }}
          faqs={[
            {
              question: "What languages can your team call in?",
              answer: "We have agents fluent in Arabic, English, Hindi, Urdu, Tagalog, and other languages.",
            },
            {
              question: "Do you comply with UAE telemarketing regulations?",
              answer: "Yes, we fully comply with TRA regulations and maintain proper DNC list management.",
            },
          ]}
          relatedCategories={[
            { title: "B2B Sales", href: "/services/sales-retail/direct-sales/b2b-sales" },
            { title: "B2C Sales", href: "/services/sales-retail/direct-sales/b2c-sales" },
            { title: "Account Management", href: "/services/sales-retail/direct-sales/account-management" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
