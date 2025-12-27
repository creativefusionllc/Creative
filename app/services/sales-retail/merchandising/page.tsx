import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { LayoutGrid } from "lucide-react"

export const metadata: Metadata = {
  title: "Merchandising Services Dubai | Visual Merchandising UAE GCC",
  description:
    "Professional merchandising services in Dubai, UAE & GCC. Visual merchandising, product placement, retail displays, and in-store branding across Middle East.",
  keywords: [
    "merchandising services dubai",
    "visual merchandising uae",
    "product placement gcc",
    "retail displays dubai",
    "in-store branding uae",
    "merchandising solutions",
  ],
}

export default function MerchandisingPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          serviceNumber="16.5"
          title="Merchandising"
          subtitle="Visual Excellence"
          description="Transform your retail presence with professional merchandising services in Dubai, UAE & GCC. We create compelling product displays and visual experiences that drive sales."
          heroImage="/visual-merchandising-retail-display.jpg"
          icon={LayoutGrid}
          brandColor="purple"
          features={[
            {
              title: "Visual Merchandising",
              description: "Creative visual displays that attract and engage customers.",
              icon: "🎨",
              href: "/services/sales-retail/merchandising/visual",
            },
            {
              title: "Product Placement",
              description: "Strategic product positioning for maximum visibility and sales.",
              icon: "📍",
              href: "/services/sales-retail/merchandising/placement",
            },
            {
              title: "Window Displays",
              description: "Eye-catching window displays that draw customers in.",
              icon: "🪟",
              href: "/services/sales-retail/merchandising/window-displays",
            },
            {
              title: "Planograms",
              description: "Data-driven shelf planning and space optimization.",
              icon: "📐",
              href: "/services/sales-retail/merchandising/planograms",
            },
            {
              title: "In-Store Branding",
              description: "Cohesive brand experience throughout the retail space.",
              icon: "🏷️",
              href: "/services/sales-retail/merchandising/in-store-branding",
            },
            {
              title: "Seasonal Displays",
              description: "Holiday and seasonal merchandising for peak periods.",
              icon: "🎄",
              href: "/services/sales-retail/merchandising/seasonal",
            },
          ]}
          processSteps={[
            { title: "Space Analysis", description: "Evaluating retail space and customer flow patterns." },
            { title: "Concept Design", description: "Creating merchandising concepts aligned with brand identity." },
            { title: "Implementation", description: "Professional installation and display setup." },
            { title: "Performance Review", description: "Measuring impact on sales and customer engagement." },
          ]}
          benefits={[
            "Experienced merchandising teams in UAE",
            "Understanding of regional consumer behavior",
            "Compliance with mall regulations",
            "Seasonal and promotional expertise",
            "Regular maintenance and updates",
          ]}
          relatedServices={[
            { title: "Retail Management", href: "/services/sales-retail/retail-management" },
            { title: "Creative Branding", href: "/services/creative-branding" },
            { title: "Exhibition Stands", href: "/services/exhibition-stands" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
