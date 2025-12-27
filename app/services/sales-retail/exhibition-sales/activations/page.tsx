import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Brand Activations Dubai | Event Activations UAE GCC",
  description:
    "Creative brand activation services in Dubai, UAE & GCC. Engaging experiential marketing, product launches, and promotional campaigns that create lasting impressions.",
  keywords: [
    "brand activations dubai",
    "event activations uae",
    "experiential marketing gcc",
    "promotional events dubai",
  ],
}

export default function ActivationsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Exhibition Sales", href: "/services/sales-retail/exhibition-sales" },
          }}
          title="Event Activations"
          subtitle="Memorable Brand Experiences"
          description="Create unforgettable brand experiences with our activation services across Dubai, UAE & GCC. From product launches to experiential campaigns, we bring your brand to life."
          heroImage="/brand-activation-event-dubai.jpg"
          benefits={[
            "Creative activation concepts",
            "Experienced brand ambassadors",
            "Interactive engagement activities",
            "Social media integration",
            "Real-time engagement metrics",
            "Full event management support",
          ]}
          process={[
            {
              step: 1,
              title: "Concept Development",
              description: "Creating activation concepts aligned with your goals",
            },
            { step: 2, title: "Planning", description: "Detailed logistics and resource planning" },
            { step: 3, title: "Execution", description: "Flawless activation delivery" },
            { step: 4, title: "Measurement", description: "ROI tracking and engagement analytics" },
          ]}
          pricing={{
            startingFrom: "AED 15,000/activation",
            includes: ["Concept design", "Staff", "Props", "Reporting"],
          }}
          faqs={[
            {
              question: "What types of activations do you offer?",
              answer:
                "We offer product sampling, experiential zones, pop-up experiences, gaming activations, photo opportunities, and custom concepts.",
            },
            {
              question: "Can you handle mall activations?",
              answer:
                "Yes, we have experience with activations at Dubai Mall, Mall of Emirates, and all major shopping centers with necessary permits.",
            },
          ]}
          relatedCategories={[
            { title: "Roadshows", href: "/services/sales-retail/exhibition-sales/roadshows" },
            { title: "Product Demos", href: "/services/sales-retail/exhibition-sales/product-demos" },
            { title: "Sales Staffing", href: "/services/sales-retail/exhibition-sales/sales-staffing" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
