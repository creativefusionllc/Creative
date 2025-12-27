import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Analytics Dashboard Dubai | Messaging Reports UAE | Creative Fusion LLC",
  description:
    "WhatsApp analytics and reporting dashboard in Dubai & UAE. Track message delivery, engagement, agent performance, and ROI for businesses in GCC.",
  keywords: ["whatsapp analytics dubai", "messaging reports uae", "whatsapp performance gcc"],
}

export default function AnalyticsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Analytics Dashboard"
          description="Comprehensive analytics and reporting for WhatsApp Business API. Track delivery rates, response times, agent performance, and campaign ROI in real-time."
          heroImage="/whatsapp-analytics-dashboard-reports.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Business API", href: "/services/whatsapp-marketing/business-api" },
          }}
          benefits={[
            "Real-time message tracking",
            "Delivery and read rates",
            "Response time metrics",
            "Agent performance KPIs",
            "Campaign ROI analysis",
            "Custom report builder",
          ]}
          process={[
            { step: 1, title: "Integration", description: "Connect API to analytics" },
            { step: 2, title: "Configuration", description: "Set up dashboards and KPIs" },
            { step: 3, title: "Automation", description: "Schedule automated reports" },
            { step: 4, title: "Optimization", description: "Insights-driven improvements" },
          ]}
          pricing={{
            startingFrom: "AED 1,500",
            includes: ["Dashboard setup", "5 custom reports", "Weekly automation", "30-day data retention"],
          }}
          faqs={[
            {
              question: "What metrics are tracked?",
              answer: "Messages sent/delivered/read, response times, conversation counts, agent performance, and more.",
            },
            {
              question: "Can I export reports?",
              answer: "Yes, export to PDF, Excel, or connect to BI tools like Power BI or Tableau.",
            },
            {
              question: "How long is data stored?",
              answer: "Standard 90-day retention, extended options available for enterprise plans.",
            },
          ]}
          relatedCategories={[
            { name: "Multi-Agent Setup", href: "/services/whatsapp-marketing/business-api/multi-agent" },
            { name: "Official API Setup", href: "/services/whatsapp-marketing/business-api/official-setup" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
