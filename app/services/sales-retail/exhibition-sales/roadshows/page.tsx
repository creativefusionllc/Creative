import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Roadshow Services Dubai | Mobile Marketing UAE GCC",
  description:
    "Professional roadshow and mobile marketing services across Dubai, UAE & GCC. Pop-up events, traveling exhibitions, and multi-city campaigns throughout Middle East.",
  keywords: ["roadshows dubai", "mobile marketing uae", "pop-up events gcc", "traveling exhibitions dubai"],
}

export default function RoadshowsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Exhibition Sales", href: "/services/sales-retail/exhibition-sales" },
          }}
          title="Roadshows"
          subtitle="Mobile Brand Experiences"
          description="Take your brand on the road with professional roadshow services across Dubai, UAE & GCC. Multi-location campaigns that reach customers where they are."
          heroImage="/roadshow-mobile-marketing-uae.jpg"
          benefits={[
            "Multi-city campaign management",
            "Mobile display units and vehicles",
            "Consistent brand experience across locations",
            "Local market expertise",
            "Permits and logistics handled",
            "Real-time campaign tracking",
          ]}
          process={[
            { step: 1, title: "Route Planning", description: "Strategic location selection across UAE & GCC" },
            { step: 2, title: "Setup Design", description: "Mobile booth or vehicle branding design" },
            { step: 3, title: "Campaign Execution", description: "Professional team at each location" },
            { step: 4, title: "Reporting", description: "Daily updates and final campaign analysis" },
          ]}
          pricing={{
            startingFrom: "AED 25,000/campaign",
            includes: ["Route planning", "Staff", "Logistics", "Permits", "Reporting"],
          }}
          faqs={[
            {
              question: "Which cities do you cover?",
              answer:
                "We cover all UAE emirates and can extend to GCC countries including Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain.",
            },
            {
              question: "Do you provide branded vehicles?",
              answer: "Yes, we can provide branded vehicles, pop-up trucks, and mobile exhibition units for roadshows.",
            },
          ]}
          relatedCategories={[
            { title: "Event Activations", href: "/services/sales-retail/exhibition-sales/activations" },
            { title: "Trade Shows", href: "/services/sales-retail/exhibition-sales/trade-shows" },
            { title: "Sales Staffing", href: "/services/sales-retail/exhibition-sales/sales-staffing" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
