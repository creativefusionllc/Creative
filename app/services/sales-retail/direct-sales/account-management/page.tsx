import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Account Management Dubai | Key Account Services UAE GCC",
  description:
    "Professional key account management services in Dubai, UAE & GCC. Client relationship management, account growth, and retention strategies for your key customers.",
  keywords: ["account management dubai", "key accounts uae", "client management gcc", "account growth dubai"],
}

export default function AccountManagementPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
          }}
          title="Account Management"
          subtitle="Key Account Excellence"
          description="Grow and retain your most valuable customers with professional account management services in Dubai, UAE & GCC. Our dedicated managers nurture relationships and drive account growth."
          heroImage="/key-account-management-dubai.jpg"
          benefits={[
            "Dedicated account managers",
            "Relationship development",
            "Upselling and cross-selling",
            "Account planning and reviews",
            "Customer success focus",
            "Retention strategies",
          ]}
          process={[
            { step: 1, title: "Account Assessment", description: "Understanding account history and potential" },
            { step: 2, title: "Strategy Development", description: "Creating account growth plans" },
            { step: 3, title: "Relationship Building", description: "Regular engagement and value delivery" },
            { step: 4, title: "Growth Execution", description: "Implementing expansion strategies" },
          ]}
          pricing={{
            startingFrom: "AED 8,000/month",
            includes: ["Dedicated manager", "Account planning", "Reports", "QBRs"],
          }}
          faqs={[
            {
              question: "How many accounts can one manager handle?",
              answer: "Depending on account complexity, one manager typically handles 5-15 key accounts effectively.",
            },
            {
              question: "Do you conduct quarterly business reviews?",
              answer:
                "Yes, we conduct formal QBRs with your key accounts to review performance and plan future growth.",
            },
          ]}
          relatedCategories={[
            { title: "B2B Sales", href: "/services/sales-retail/direct-sales/b2b-sales" },
            { title: "Field Sales", href: "/services/sales-retail/direct-sales/field-sales" },
            { title: "Sales Training", href: "/services/sales-retail/sales-training" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
