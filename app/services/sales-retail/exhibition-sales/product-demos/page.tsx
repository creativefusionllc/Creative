import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Product Demonstration Services Dubai | Demo Teams UAE GCC",
  description:
    "Professional product demonstration services in Dubai, UAE & GCC. Engaging demos at exhibitions, retail stores, and events that convert visitors into customers.",
  keywords: ["product demos dubai", "demonstration services uae", "product presentation gcc", "demo teams dubai"],
}

export default function ProductDemosPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Exhibition Sales", href: "/services/sales-retail/exhibition-sales" },
          }}
          title="Product Demonstrations"
          subtitle="Engaging Product Experiences"
          description="Transform visitors into customers with professional product demonstrations at exhibitions, retail stores, and events across Dubai, UAE & GCC. Our trained demonstrators create compelling experiences."
          heroImage="/product-demonstration-exhibition-dubai.jpg"
          benefits={[
            "Trained product demonstrators",
            "Engaging presentation techniques",
            "Technical product knowledge",
            "Multilingual capabilities",
            "Live demo equipment management",
            "Conversion tracking and reporting",
          ]}
          process={[
            { step: 1, title: "Product Training", description: "Deep-dive into product features and benefits" },
            { step: 2, title: "Script Development", description: "Creating compelling demonstration scripts" },
            { step: 3, title: "Live Demonstrations", description: "Engaging presentations that convert" },
            { step: 4, title: "Lead Capture", description: "Collecting and qualifying interested prospects" },
          ]}
          pricing={{
            startingFrom: "AED 1,800/day",
            includes: ["Demo specialist", "Presentation materials", "Lead capture", "Product setup"],
          }}
          faqs={[
            {
              question: "What types of products can you demonstrate?",
              answer:
                "We demonstrate all product types including technology, FMCG, automotive, healthcare, beauty, and industrial products.",
            },
            {
              question: "Do you handle complex technical products?",
              answer:
                "Yes, our team includes specialists who can demonstrate complex technical products after thorough training.",
            },
          ]}
          relatedCategories={[
            { title: "Trade Shows", href: "/services/sales-retail/exhibition-sales/trade-shows" },
            { title: "Event Activations", href: "/services/sales-retail/exhibition-sales/activations" },
            { title: "Sales Staffing", href: "/services/sales-retail/exhibition-sales/sales-staffing" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
