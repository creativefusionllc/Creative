import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Retail Customer Service Dubai | Store CX Excellence UAE GCC",
  description:
    "Professional retail customer service training and management in Dubai, UAE & GCC. Enhance customer experience, build loyalty, and drive repeat sales.",
  keywords: ["retail customer service dubai", "store cx uae", "customer experience gcc", "retail training dubai"],
}

export default function CustomerServicePage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Retail Management", href: "/services/sales-retail/retail-management" },
          }}
          title="Customer Service"
          subtitle="CX Excellence"
          description="Deliver exceptional customer experiences in your retail stores across Dubai, UAE & GCC. Our customer service programs build loyalty and drive repeat business."
          heroImage="/retail-customer-service-dubai.jpg"
          benefits={[
            "Customer service training programs",
            "Mystery shopping assessments",
            "Complaint handling procedures",
            "Customer feedback systems",
            "Loyalty program management",
            "CX metrics and reporting",
          ]}
          process={[
            { step: 1, title: "CX Audit", description: "Assessing current customer experience" },
            { step: 2, title: "Standards Development", description: "Creating service standards and scripts" },
            { step: 3, title: "Team Training", description: "Training staff on service excellence" },
            { step: 4, title: "Monitoring", description: "Ongoing mystery shopping and feedback" },
          ]}
          pricing={{
            startingFrom: "AED 4,000/month",
            includes: ["Training", "Mystery shopping", "Feedback system", "Monthly reports"],
          }}
          faqs={[
            {
              question: "Do you provide mystery shopping?",
              answer:
                "Yes, we conduct regular mystery shopping visits to assess service quality and provide actionable feedback.",
            },
            {
              question: "Can you train multilingual staff?",
              answer: "Yes, we provide customer service training in Arabic, English, and other languages as needed.",
            },
          ]}
          relatedCategories={[
            { title: "Staff Management", href: "/services/sales-retail/retail-management/staff-management" },
            { title: "Sales Training", href: "/services/sales-retail/sales-training" },
            { title: "Store Operations", href: "/services/sales-retail/retail-management/store-operations" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
