import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Store } from "lucide-react"

export const metadata: Metadata = {
  title: "Exhibition Sales Services Dubai | Trade Show Sales UAE GCC",
  description:
    "Professional exhibition sales representation in Dubai, UAE & GCC. Expert sales teams for trade shows, GITEX, Gulf Food, and all major exhibitions across Middle East.",
  keywords: [
    "exhibition sales dubai",
    "trade show sales uae",
    "gitex sales team",
    "gulf food sales",
    "exhibition staff dubai",
    "sales representation gcc",
  ],
}

export default function ExhibitionSalesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          serviceNumber="16.1"
          title="Exhibition Sales"
          subtitle="Trade Show Excellence"
          description="Maximize your exhibition ROI with our professional sales teams at GITEX, Gulf Food, Arabian Travel Market, and all major trade shows across Dubai, UAE & GCC."
          heroImage="/professional-exhibition-sales-team-trade-show.jpg"
          icon={Store}
          brandColor="lime"
          features={[
            {
              title: "Trade Show Sales",
              description: "Expert sales representation at major exhibitions like GITEX, Gulf Food, ATM Dubai.",
              icon: "🎪",
              href: "/services/sales-retail/exhibition-sales/trade-shows",
            },
            {
              title: "Product Demos",
              description: "Engaging product demonstrations that convert visitors into customers.",
              icon: "🎯",
              href: "/services/sales-retail/exhibition-sales/product-demos",
            },
            {
              title: "Lead Generation",
              description: "Systematic lead capture and qualification for post-event follow-up.",
              icon: "📋",
              href: "/services/sales-retail/exhibition-sales/lead-generation",
            },
            {
              title: "Sales Staffing",
              description: "Multilingual, trained sales professionals for your exhibition booth.",
              icon: "👥",
              href: "/services/sales-retail/exhibition-sales/sales-staffing",
            },
            {
              title: "Event Activations",
              description: "Brand activation campaigns that create memorable experiences.",
              icon: "✨",
              href: "/services/sales-retail/exhibition-sales/activations",
            },
            {
              title: "Roadshows",
              description: "Mobile sales teams for roadshows and pop-up events across UAE & GCC.",
              icon: "🚐",
              href: "/services/sales-retail/exhibition-sales/roadshows",
            },
          ]}
          processSteps={[
            {
              title: "Pre-Event Planning",
              description: "Understanding your products and setting sales targets for the exhibition.",
            },
            {
              title: "Team Training",
              description: "Training sales staff on your products, brand messaging, and sales techniques.",
            },
            { title: "On-Site Execution", description: "Professional sales operations with real-time reporting." },
            { title: "Post-Event Follow-up", description: "Lead nurturing and conversion optimization." },
          ]}
          benefits={[
            "Experience with GITEX, Gulf Food, ATM, and major UAE exhibitions",
            "Multilingual sales teams",
            "Real-time lead capture systems",
            "Daily sales and activity reports",
            "Post-event analysis and follow-up",
          ]}
          relatedServices={[
            { title: "Retail Management", href: "/services/sales-retail/retail-management" },
            { title: "Exhibition Stands", href: "/services/exhibition-stands" },
            { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
