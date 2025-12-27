import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Product Training Dubai | Sales Product Knowledge UAE GCC",
  description:
    "Professional product training for sales teams in Dubai, UAE & GCC. Deep product knowledge, demonstration skills, and competitive positioning.",
  keywords: ["product training dubai", "sales product knowledge uae", "demo training gcc", "product selling dubai"],
}

export default function ProductTrainingPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Sales Training", href: "/services/sales-retail/sales-training" },
          }}
          title="Product Training"
          subtitle="Expert Product Knowledge"
          description="Equip your sales team with deep product expertise in Dubai, UAE & GCC. Our product training develops knowledge and demonstration skills that convert."
          heroImage="/product-training-sales-dubai.jpg"
          benefits={[
            "Deep product knowledge",
            "Feature-benefit translation",
            "Demonstration techniques",
            "Competitive differentiation",
            "Technical Q&A handling",
            "Product certification",
          ]}
          process={[
            { step: 1, title: "Product Deep-Dive", description: "Comprehensive product education" },
            { step: 2, title: "Selling Angles", description: "Developing sales messaging" },
            { step: 3, title: "Demo Practice", description: "Product demonstration skills" },
            { step: 4, title: "Certification", description: "Knowledge assessment and certification" },
          ]}
          pricing={{
            startingFrom: "AED 1,000/person",
            includes: ["Training", "Product guide", "Demo practice", "Certification"],
          }}
          faqs={[
            {
              question: "Can you train on our specific products?",
              answer: "Yes, we develop custom training based on your product line after thorough product immersion.",
            },
            {
              question: "Do you provide ongoing product updates?",
              answer: "Yes, we can deliver refresher training when you launch new products or features.",
            },
          ]}
          relatedCategories={[
            { title: "Sales Fundamentals", href: "/services/sales-retail/sales-training/fundamentals" },
            { title: "Customer Service", href: "/services/sales-retail/sales-training/customer-service" },
            { title: "Advanced Selling", href: "/services/sales-retail/sales-training/advanced" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
