import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { GraduationCap } from "lucide-react"

export const metadata: Metadata = {
  title: "Sales Training Dubai | Sales Skills Development UAE GCC",
  description:
    "Professional sales training services in Dubai, UAE & GCC. Sales skills development, team training, coaching, and performance improvement programs across Middle East.",
  keywords: [
    "sales training dubai",
    "sales skills uae",
    "sales coaching gcc",
    "team training dubai",
    "sales development middle east",
    "sales performance training",
  ],
}

export default function SalesTrainingPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          serviceNumber="16.6"
          title="Sales Training"
          subtitle="Team Excellence"
          description="Empower your sales teams with professional training programs in Dubai, UAE & GCC. Our comprehensive training develops winning sales skills for the Middle East market."
          heroImage="/sales-training-workshop-dubai.jpg"
          icon={GraduationCap}
          brandColor="teal"
          features={[
            {
              title: "Sales Fundamentals",
              description: "Core sales skills training for new and junior team members.",
              icon: "📚",
              href: "/services/sales-retail/sales-training/fundamentals",
            },
            {
              title: "Advanced Selling",
              description: "Advanced techniques for experienced sales professionals.",
              icon: "🎯",
              href: "/services/sales-retail/sales-training/advanced",
            },
            {
              title: "Negotiation Skills",
              description: "Mastering negotiation and closing techniques.",
              icon: "🤝",
              href: "/services/sales-retail/sales-training/negotiation",
            },
            {
              title: "Product Training",
              description: "In-depth product knowledge and demonstration skills.",
              icon: "📦",
              href: "/services/sales-retail/sales-training/product-training",
            },
            {
              title: "Customer Service",
              description: "Excellence in customer engagement and relationship building.",
              icon: "⭐",
              href: "/services/sales-retail/sales-training/customer-service",
            },
            {
              title: "Sales Leadership",
              description: "Leadership development for sales managers and team leads.",
              icon: "👔",
              href: "/services/sales-retail/sales-training/leadership",
            },
          ]}
          processSteps={[
            { title: "Needs Assessment", description: "Evaluating current team skills and training requirements." },
            { title: "Program Design", description: "Customizing training content for your industry and products." },
            { title: "Training Delivery", description: "Interactive workshops and hands-on practice sessions." },
            { title: "Follow-up Coaching", description: "Ongoing support and performance reinforcement." },
          ]}
          benefits={[
            "Certified sales trainers with UAE market experience",
            "Arabic and English language options",
            "Customized for your industry",
            "Practical, role-play based learning",
            "Post-training assessments and certifications",
          ]}
          relatedServices={[
            { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
            { title: "Exhibition Sales", href: "/services/sales-retail/exhibition-sales" },
            { title: "Retail Management", href: "/services/sales-retail/retail-management" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
