import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ShoppingCart } from "lucide-react"

export const metadata: Metadata = {
  title: "Sales & Retail Solutions Dubai | Exhibition Sales & Distribution UAE GCC",
  description:
    "Professional sales and retail services in Dubai, UAE & GCC. Exhibition sales representation, direct sales operations, retail management, and distribution solutions across Middle East.",
  keywords: [
    "sales services dubai",
    "retail solutions uae",
    "exhibition sales dubai",
    "distribution services gcc",
    "sales representation middle east",
    "retail management dubai",
    "trade show sales uae",
    "product distribution gcc",
  ],
  openGraph: {
    title: "Sales & Retail Solutions Dubai | Creative Fusion LLC",
    description: "Professional sales and retail services across Dubai, UAE & GCC region.",
    locale: "en_AE",
  },
}

export default function SalesRetailPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          serviceNumber="16"
          title="Sales & Retail"
          subtitle="Market Channels"
          description="Expand your market reach across Dubai, UAE, and GCC with our comprehensive sales and retail solutions. From exhibition representation to direct sales operations, we help you connect with customers effectively throughout the Middle East."
          heroImage="/images/ecommerce-website-mockup.jpg"
          icon={ShoppingCart}
          brandColor="lime"
          features={[
            {
              title: "Exhibition Sales",
              description: "Professional sales representation at trade shows and exhibitions across Dubai, UAE & GCC.",
              icon: "🎪",
              href: "/services/sales-retail/exhibition-sales",
            },
            {
              title: "Retail Management",
              description: "End-to-end retail space management and operations for your brand in UAE markets.",
              icon: "🏪",
              href: "/services/sales-retail/retail-management",
            },
            {
              title: "Direct Sales",
              description: "B2B and B2C direct sales operations with trained teams across the GCC region.",
              icon: "🤝",
              href: "/services/sales-retail/direct-sales",
            },
            {
              title: "Distribution Services",
              description: "Complete distribution network setup and management throughout Middle East.",
              icon: "🚚",
              href: "/services/sales-retail/distribution",
            },
            {
              title: "Merchandising",
              description: "Visual merchandising and product placement services for retail success.",
              icon: "📦",
              href: "/services/sales-retail/merchandising",
            },
            {
              title: "Sales Training",
              description: "Professional sales training programs to empower your team with winning techniques.",
              icon: "📚",
              href: "/services/sales-retail/sales-training",
            },
          ]}
          processSteps={[
            {
              title: "Market Analysis",
              description: "Understanding your products, target market, and sales goals in Dubai, UAE & GCC.",
            },
            {
              title: "Strategy Development",
              description: "Developing customized sales strategy and channel selection for Middle East markets.",
            },
            {
              title: "Team Deployment",
              description: "Implementing sales operations with trained, multilingual teams.",
            },
            {
              title: "Performance Optimization",
              description: "Analyzing results and continuously optimizing for maximum ROI.",
            },
          ]}
          benefits={[
            "15+ years experience in UAE & GCC markets",
            "Multilingual sales teams (Arabic, English, Hindi, Urdu)",
            "Coverage across Dubai, Abu Dhabi, Sharjah, and GCC",
            "Real-time sales reporting and analytics",
            "Licensed and compliant with UAE regulations",
            "Dedicated account management",
          ]}
          relatedServices={[
            { title: "Exhibition Stands", href: "/services/exhibition-stands" },
            { title: "Print & Exhibitions", href: "/services/print-exhibitions" },
            { title: "Digital Marketing", href: "/services/digital-marketing" },
            { title: "Creative Branding", href: "/services/creative-branding" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
