import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Retail Staff Management Dubai | Store Staffing UAE GCC",
  description:
    "Professional retail staff management in Dubai, UAE & GCC. Recruitment, training, scheduling, and performance management for your retail team.",
  keywords: ["retail staff dubai", "store staffing uae", "retail recruitment gcc", "staff management dubai"],
}

export default function StaffManagementPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Retail Management", href: "/services/sales-retail/retail-management" },
          }}
          title="Staff Management"
          subtitle="Your Retail Team"
          description="Build and manage high-performing retail teams in Dubai, UAE & GCC. From recruitment to training and scheduling, we ensure your store is always staffed with the best talent."
          heroImage="/retail-staff-management-dubai.jpg"
          benefits={[
            "Retail staff recruitment",
            "Training and onboarding programs",
            "Shift scheduling optimization",
            "Performance management",
            "Payroll coordination",
            "HR compliance support",
          ]}
          process={[
            { step: 1, title: "Needs Assessment", description: "Determining staffing requirements" },
            { step: 2, title: "Recruitment", description: "Sourcing and screening candidates" },
            { step: 3, title: "Training", description: "Product and service training" },
            { step: 4, title: "Ongoing Management", description: "Scheduling, coaching, and retention" },
          ]}
          pricing={{
            startingFrom: "AED 3,500/month",
            includes: ["Scheduling", "Training", "Performance reviews", "HR support"],
          }}
          faqs={[
            {
              question: "Do you handle visa and labor compliance?",
              answer:
                "We can assist with visa processing and ensure all staff are compliant with UAE labor laws and regulations.",
            },
            {
              question: "How do you handle scheduling for mall stores?",
              answer:
                "We create schedules that align with mall hours, peak times, and ensure coverage during all operating hours.",
            },
          ]}
          relatedCategories={[
            { title: "Store Operations", href: "/services/sales-retail/retail-management/store-operations" },
            { title: "Customer Service", href: "/services/sales-retail/retail-management/customer-service" },
            { title: "Sales Training", href: "/services/sales-retail/sales-training" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
