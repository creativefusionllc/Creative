import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Direct Sales Services Dubai | B2B B2C Sales UAE GCC",
  description:
    "Professional direct sales services in Dubai, UAE & GCC. B2B corporate sales, B2C consumer sales, door-to-door campaigns, and field sales teams across Middle East.",
  keywords: [
    "direct sales dubai",
    "b2b sales uae",
    "b2c sales gcc",
    "field sales team",
    "corporate sales dubai",
    "door to door sales uae",
  ],
}

export default function DirectSalesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          serviceNumber="16.3"
          title="Direct Sales"
          subtitle="Personal Selling"
          description="Results-driven direct sales services for B2B and B2C markets across Dubai, UAE & GCC. Our trained sales teams deliver measurable results through personal selling approaches."
          heroImage="/professional-direct-sales-team-meeting.jpg"
          icon={Users}
          brandColor="emerald"
          features={[
            {
              title: "B2B Sales",
              description: "Corporate and enterprise sales teams for business clients.",
              icon: "🏢",
              href: "/services/sales-retail/direct-sales/b2b-sales",
            },
            {
              title: "B2C Sales",
              description: "Consumer-focused direct sales campaigns and teams.",
              icon: "👤",
              href: "/services/sales-retail/direct-sales/b2c-sales",
            },
            {
              title: "Door-to-Door",
              description: "Professional door-to-door sales campaigns for products and services.",
              icon: "🚪",
              href: "/services/sales-retail/direct-sales/door-to-door",
            },
            {
              title: "Telemarketing",
              description: "Outbound telemarketing and telesales services.",
              icon: "📞",
              href: "/services/sales-retail/direct-sales/telemarketing",
            },
            {
              title: "Field Sales",
              description: "Mobile field sales teams across UAE & GCC markets.",
              icon: "🚗",
              href: "/services/sales-retail/direct-sales/field-sales",
            },
            {
              title: "Account Management",
              description: "Key account management and relationship building.",
              icon: "🤝",
              href: "/services/sales-retail/direct-sales/account-management",
            },
          ]}
          processSteps={[
            { title: "Target Definition", description: "Identifying target markets and ideal customer profiles." },
            { title: "Team Setup", description: "Recruiting and training dedicated sales teams." },
            { title: "Campaign Launch", description: "Executing direct sales campaigns with clear KPIs." },
            { title: "Performance Tracking", description: "Monitoring results and optimizing strategies." },
          ]}
          benefits={[
            "Trained multilingual sales professionals",
            "CRM integration and lead tracking",
            "Performance-based compensation models",
            "Daily activity and sales reports",
            "Compliance with UAE sales regulations",
          ]}
          relatedServices={[
            { title: "Exhibition Sales", href: "/services/sales-retail/exhibition-sales" },
            { title: "Sales Training", href: "/services/sales-retail/sales-training" },
            { title: "Distribution", href: "/services/sales-retail/distribution" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
