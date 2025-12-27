import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Seasonal Merchandising Dubai | Holiday Displays UAE GCC",
  description:
    "Professional seasonal merchandising services in Dubai, UAE & GCC. Ramadan, Eid, Christmas, DSF, and holiday retail displays that drive seasonal sales.",
  keywords: ["seasonal merchandising dubai", "holiday displays uae", "ramadan retail gcc", "eid merchandising dubai"],
}

export default function SeasonalPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Merchandising", href: "/services/sales-retail/merchandising" },
          }}
          title="Seasonal Displays"
          subtitle="Holiday Merchandising"
          description="Maximize seasonal sales with professional merchandising in Dubai, UAE & GCC. We create stunning displays for Ramadan, Eid, Christmas, DSF, and all key retail seasons."
          heroImage="/seasonal-merchandising-dubai.jpg"
          benefits={[
            "Ramadan and Eid displays",
            "Christmas and New Year themes",
            "DSF and shopping festival setups",
            "Back-to-school merchandising",
            "National Day celebrations",
            "Summer and vacation themes",
          ]}
          process={[
            { step: 1, title: "Season Planning", description: "Planning calendar of seasonal campaigns" },
            { step: 2, title: "Concept Development", description: "Creating seasonal design concepts" },
            { step: 3, title: "Production", description: "Manufacturing seasonal displays" },
            { step: 4, title: "Installation", description: "Timely setup before season start" },
          ]}
          pricing={{ startingFrom: "AED 4,000/season", includes: ["Concept", "Materials", "Installation", "Takedown"] }}
          faqs={[
            {
              question: "How early should we plan seasonal displays?",
              answer:
                "We recommend planning 6-8 weeks before major seasons like Ramadan and Christmas for best results.",
            },
            {
              question: "Do you handle display storage between seasons?",
              answer: "Yes, we can store and maintain seasonal displays for reuse in future years.",
            },
          ]}
          relatedCategories={[
            { title: "Window Displays", href: "/services/sales-retail/merchandising/window-displays" },
            { title: "Visual Merchandising", href: "/services/sales-retail/merchandising/visual" },
            { title: "In-Store Branding", href: "/services/sales-retail/merchandising/in-store-branding" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
