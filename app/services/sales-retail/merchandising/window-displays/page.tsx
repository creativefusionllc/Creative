import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Window Display Design Dubai | Store Windows UAE GCC",
  description:
    "Professional window display design services in Dubai, UAE & GCC. Eye-catching storefront displays that attract foot traffic and showcase your brand.",
  keywords: ["window display dubai", "storefront design uae", "retail windows gcc", "window merchandising dubai"],
}

export default function WindowDisplaysPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Merchandising", href: "/services/sales-retail/merchandising" },
          }}
          title="Window Displays"
          subtitle="Storefront Excellence"
          description="Capture attention with stunning window displays in Dubai, UAE & GCC. Our creative window designs stop shoppers in their tracks and drive store traffic."
          heroImage="/window-display-retail-dubai.jpg"
          benefits={[
            "Creative window concepts",
            "Seasonal and thematic designs",
            "Lighting design included",
            "Mannequin styling",
            "Props and scenery",
            "Professional installation",
          ]}
          process={[
            { step: 1, title: "Brief & Inspiration", description: "Understanding brand and campaign goals" },
            { step: 2, title: "Concept Design", description: "Creating visual concepts and mockups" },
            { step: 3, title: "Production", description: "Sourcing and creating display elements" },
            { step: 4, title: "Installation", description: "Professional window setup" },
          ]}
          pricing={{ startingFrom: "AED 5,000/window", includes: ["Design", "Props", "Installation", "Photography"] }}
          faqs={[
            {
              question: "How long does a window display last?",
              answer:
                "Fashion windows typically change monthly, while other retail may run displays for 6-8 weeks or seasonally.",
            },
            {
              question: "Do you work within mall guidelines?",
              answer: "Yes, we are familiar with visual guidelines of major Dubai and UAE malls and ensure compliance.",
            },
          ]}
          relatedCategories={[
            { title: "Visual Merchandising", href: "/services/sales-retail/merchandising/visual" },
            { title: "Seasonal", href: "/services/sales-retail/merchandising/seasonal" },
            { title: "In-Store Branding", href: "/services/sales-retail/merchandising/in-store-branding" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
