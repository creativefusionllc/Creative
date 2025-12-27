import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Data Analytics Services Dubai | Business Intelligence | Creative Fusion LLC",
  description:
    "Expert data analytics services in Dubai UAE. Transform raw data into actionable insights with advanced analytics solutions.",
  keywords: ["data analytics dubai", "business intelligence uae", "data visualization consulting"],
}

export default function DataAnalyticsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        breadcrumb={{
          service: { title: "Business Consulting", href: "/services/consulting" },
          subService: { title: "Digital Transformation", href: "/services/consulting/digital-transformation" },
        }}
        title="Data Analytics"
        subtitle="Business Intelligence Solutions"
        description="Transform raw data into actionable insights with advanced analytics solutions that drive informed decision-making and business growth."
        heroImage="/data-analytics-business-intelligence-dashboard-cha.jpg"
        benefits={[
          "Data-driven decision making capability",
          "Identify new business opportunities",
          "Reduce operational costs through insights",
          "Improved customer understanding",
          "Predict market trends accurately",
          "Measure performance with precision",
        ]}
        process={[
          { step: 1, title: "Collect", description: "Aggregate data from all business sources." },
          { step: 2, title: "Process", description: "Clean, structure, and organize data." },
          { step: 3, title: "Analyze", description: "Apply analytics models and algorithms." },
          { step: 4, title: "Act", description: "Implement data-driven decisions." },
        ]}
        pricing={{
          startingFrom: "AED 10,000",
          includes: [
            "Data source integration",
            "Dashboard development",
            "Custom report creation",
            "Team training",
            "Ongoing support",
          ],
        }}
        faqs={[
          {
            question: "What data sources can you integrate?",
            answer: "We integrate CRM, ERP, social media, web analytics, databases, and custom data sources.",
          },
          {
            question: "How secure is our data?",
            answer:
              "We follow strict security protocols and compliance standards including GDPR and local regulations.",
          },
          {
            question: "Can we get real-time dashboards?",
            answer: "Yes, we build live dashboards with automatic data refresh and real-time monitoring.",
          },
        ]}
        relatedCategories={[
          { title: "Automation", href: "/services/consulting/digital-transformation/automation" },
          { title: "Process Digitization", href: "/services/consulting/digital-transformation/process-digitization" },
          {
            title: "Technology Roadmapping",
            href: "/services/consulting/digital-transformation/technology-roadmapping",
          },
          { title: "Cloud Migration", href: "/services/consulting/digital-transformation/cloud-migration" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
