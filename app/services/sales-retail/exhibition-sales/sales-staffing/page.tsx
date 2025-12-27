import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Exhibition Sales Staffing Dubai | Event Staff UAE GCC",
  description:
    "Professional exhibition sales staffing in Dubai, UAE & GCC. Multilingual, trained sales professionals for trade shows, exhibitions, and corporate events.",
  keywords: ["exhibition staff dubai", "sales staffing uae", "event staff gcc", "trade show staff dubai"],
}

export default function SalesStaffingPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Exhibition Sales", href: "/services/sales-retail/exhibition-sales" },
          }}
          title="Sales Staffing"
          subtitle="Professional Exhibition Teams"
          description="Staff your exhibition booth with professional, multilingual sales teams in Dubai, UAE & GCC. Our trained staff represent your brand with excellence."
          heroImage="/exhibition-sales-staff-dubai.jpg"
          benefits={[
            "Multilingual staff (Arabic, English, Hindi, Urdu, Tagalog)",
            "Professional appearance and grooming standards",
            "Sales-trained with proven track records",
            "Product training included",
            "Uniformed and branded",
            "Background-checked and reliable",
          ]}
          process={[
            { step: 1, title: "Briefing", description: "Understanding your brand and staffing requirements" },
            { step: 2, title: "Selection", description: "Handpicking staff matching your brand image" },
            { step: 3, title: "Training", description: "Product and brand training before the event" },
            { step: 4, title: "Deployment", description: "On-site management and supervision" },
          ]}
          pricing={{
            startingFrom: "AED 450/person/day",
            includes: ["Trained staff", "Uniforms", "Supervision", "Replacement guarantee"],
          }}
          faqs={[
            {
              question: "What languages do your staff speak?",
              answer:
                "Our multilingual team covers Arabic, English, Hindi, Urdu, Tagalog, French, and other languages based on requirements.",
            },
            {
              question: "Can you provide staff for multi-day events?",
              answer:
                "Yes, we provide consistent staff throughout multi-day exhibitions with backup options to ensure coverage.",
            },
          ]}
          relatedCategories={[
            { title: "Trade Shows", href: "/services/sales-retail/exhibition-sales/trade-shows" },
            { title: "Event Activations", href: "/services/sales-retail/exhibition-sales/activations" },
            { title: "Roadshows", href: "/services/sales-retail/exhibition-sales/roadshows" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
