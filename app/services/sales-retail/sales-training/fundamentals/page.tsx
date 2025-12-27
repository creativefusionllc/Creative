import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Sales Fundamentals Training Dubai | Basic Sales Skills UAE GCC",
  description:
    "Professional sales fundamentals training in Dubai, UAE & GCC. Core selling skills, prospecting techniques, and sales basics for new and junior salespeople.",
  keywords: ["sales fundamentals dubai", "basic sales training uae", "sales skills gcc", "selling basics dubai"],
}

export default function FundamentalsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Sales Training", href: "/services/sales-retail/sales-training" },
          }}
          title="Sales Fundamentals"
          subtitle="Core Selling Skills"
          description="Build a strong sales foundation with fundamentals training in Dubai, UAE & GCC. Our programs develop core selling skills for new and junior sales professionals."
          heroImage="/sales-fundamentals-training-dubai.jpg"
          benefits={[
            "Sales process understanding",
            "Prospecting techniques",
            "Qualifying leads",
            "Presentation skills",
            "Handling objections",
            "Closing basics",
          ]}
          process={[
            { step: 1, title: "Assessment", description: "Evaluating current skill levels" },
            { step: 2, title: "Training", description: "Interactive classroom sessions" },
            { step: 3, title: "Practice", description: "Role-plays and simulations" },
            { step: 4, title: "Certification", description: "Assessment and certification" },
          ]}
          pricing={{
            startingFrom: "AED 1,200/person",
            includes: ["2-day workshop", "Materials", "Role-plays", "Certificate"],
          }}
          faqs={[
            {
              question: "Who should attend fundamentals training?",
              answer:
                "This program is ideal for new hires, junior salespeople, and those transitioning into sales roles.",
            },
            {
              question: "Is the training customized for our industry?",
              answer: "Yes, we adapt examples and exercises to your specific industry and products.",
            },
          ]}
          relatedCategories={[
            { title: "Advanced Selling", href: "/services/sales-retail/sales-training/advanced" },
            { title: "Product Training", href: "/services/sales-retail/sales-training/product-training" },
            { title: "Customer Service", href: "/services/sales-retail/sales-training/customer-service" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
