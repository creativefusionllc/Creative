import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Customer Service Training Dubai | CX Excellence UAE GCC",
  description:
    "Professional customer service training in Dubai, UAE & GCC. Service excellence, complaint handling, and customer experience skills for frontline teams.",
  keywords: ["customer service training dubai", "cx training uae", "service excellence gcc", "customer care dubai"],
}

export default function CustomerServiceTrainingPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Sales Training", href: "/services/sales-retail/sales-training" },
          }}
          title="Customer Service Training"
          subtitle="Service Excellence"
          description="Deliver exceptional customer experiences with professional service training in Dubai, UAE & GCC. Our programs develop skills that create loyal customers."
          heroImage="/customer-service-training-dubai.jpg"
          benefits={[
            "Service mindset development",
            "Communication excellence",
            "Complaint resolution",
            "Difficult customer handling",
            "Cross-cultural service",
            "Service recovery techniques",
          ]}
          process={[
            { step: 1, title: "Service Assessment", description: "Evaluating current service levels" },
            { step: 2, title: "Skills Training", description: "Interactive service skills workshop" },
            { step: 3, title: "Scenario Practice", description: "Role-plays and simulations" },
            { step: 4, title: "Implementation", description: "On-the-job application support" },
          ]}
          pricing={{
            startingFrom: "AED 900/person",
            includes: ["1-day workshop", "Materials", "Role-plays", "Certificate"],
          }}
          faqs={[
            {
              question: "Is training available in Arabic?",
              answer: "Yes, we deliver customer service training in both English and Arabic.",
            },
            {
              question: "Do you cover multicultural service?",
              answer: "Yes, our programs include modules on serving diverse customer backgrounds common in UAE.",
            },
          ]}
          relatedCategories={[
            { title: "Sales Fundamentals", href: "/services/sales-retail/sales-training/fundamentals" },
            { title: "Product Training", href: "/services/sales-retail/sales-training/product-training" },
            { title: "Retail Management", href: "/services/sales-retail/retail-management" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
