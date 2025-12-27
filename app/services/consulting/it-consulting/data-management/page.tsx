import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Data Management",
  subtitle: "IT/Technology Consulting",
  description: "Establish robust data management practices that ensure data quality, security, and accessibility.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Data Strategy", description: "Define data approach", icon: "target" },
    { title: "Data Governance", description: "Policies and standards", icon: "shield" },
    { title: "Data Quality", description: "Ensure accuracy", icon: "check-circle" },
    { title: "Master Data", description: "Single source of truth", icon: "database" },
    { title: "Data Security", description: "Protect sensitive data", icon: "lock" },
    { title: "Analytics Enablement", description: "Data for insights", icon: "bar-chart" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Evaluate data landscape" },
    { step: 2, title: "Strategy", description: "Define data management approach" },
    { step: 3, title: "Implement", description: "Deploy governance and tools" },
    { step: 4, title: "Sustain", description: "Ongoing data management" },
  ],
  benefits: [
    "Trusted data",
    "Better decision making",
    "Regulatory compliance",
    "Operational efficiency",
    "Analytics ready",
    "Reduced data risks",
  ],
  faqs: [
    { question: "What is data governance?", answer: "Policies, processes, and standards for managing data assets." },
    {
      question: "How do you improve data quality?",
      answer: "Through profiling, cleansing, standardization, and ongoing monitoring.",
    },
    {
      question: "Do you help with data privacy compliance?",
      answer: "Yes, including GDPR, CCPA, and industry-specific regulations.",
    },
  ],
}

export const metadata = {
  title: "Data Management Services | IT Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function DataManagementPage() {
  return <ServicePageTemplate {...serviceData} />
}
