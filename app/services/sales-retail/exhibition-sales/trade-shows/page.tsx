import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Trade Show Sales Dubai | GITEX Gulf Food ATM Sales Teams UAE",
  description:
    "Professional trade show sales teams for GITEX, Gulf Food, Arabian Travel Market, and all major exhibitions in Dubai, UAE & GCC. Maximize your exhibition ROI.",
  keywords: [
    "trade show sales dubai",
    "gitex sales team",
    "gulf food sales",
    "atm dubai sales",
    "exhibition sales uae",
  ],
}

export default function TradeShowsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Exhibition Sales", href: "/services/sales-retail/exhibition-sales" },
          }}
          title="Trade Show Sales"
          subtitle="Exhibition Excellence in Dubai & UAE"
          description="Professional sales representation at GITEX, Gulf Food, Arabian Travel Market, Beautyworld Middle East, and all major trade shows across Dubai, UAE & GCC. Our experienced teams maximize your exhibition investment."
          heroImage="/trade-show-sales-team-gitex-dubai.jpg"
          benefits={[
            "Experience with GITEX, Gulf Food, ATM, Beautyworld Middle East",
            "Multilingual sales teams (Arabic, English, Hindi)",
            "Real-time lead capture with CRM integration",
            "Product demonstration expertise",
            "Daily sales and activity reports",
            "Post-show follow-up and lead nurturing",
          ]}
          process={[
            { step: 1, title: "Pre-Show Planning", description: "Product training and sales target setting" },
            { step: 2, title: "Booth Setup", description: "Team briefing and system configuration" },
            { step: 3, title: "Show Execution", description: "Active selling with lead qualification" },
            { step: 4, title: "Post-Show", description: "Lead handover and follow-up support" },
          ]}
          pricing={{
            startingFrom: "AED 2,500/day",
            includes: ["Trained sales staff", "Lead capture", "Daily reports", "Uniforms"],
          }}
          faqs={[
            {
              question: "Which exhibitions do you cover?",
              answer:
                "We cover all major exhibitions at Dubai World Trade Centre, ADNEC, Expo Centre Sharjah, and venues across GCC.",
            },
            {
              question: "How many staff can you provide?",
              answer: "We can scale from 2 to 50+ sales professionals depending on your booth size and requirements.",
            },
            {
              question: "Do you provide product training?",
              answer:
                "Yes, we conduct comprehensive product training before every exhibition to ensure our team represents your brand professionally.",
            },
          ]}
          relatedCategories={[
            { title: "Product Demos", href: "/services/sales-retail/exhibition-sales/product-demos" },
            { title: "Lead Generation", href: "/services/sales-retail/exhibition-sales/lead-generation" },
            { title: "Sales Staffing", href: "/services/sales-retail/exhibition-sales/sales-staffing" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
