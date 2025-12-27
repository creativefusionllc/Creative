import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Technology Strategy",
  subtitle: "IT/Technology Consulting",
  description:
    "Develop a technology roadmap that aligns IT investments with business objectives and drives innovation.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "IT Assessment", description: "Evaluate current technology", icon: "search" },
    { title: "Roadmap Development", description: "Plan technology evolution", icon: "map" },
    { title: "Architecture Design", description: "Design IT infrastructure", icon: "layers" },
    { title: "Vendor Selection", description: "Choose right solutions", icon: "check-square" },
    { title: "Budget Planning", description: "Optimize IT spend", icon: "dollar-sign" },
    { title: "Governance", description: "IT governance framework", icon: "shield" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Evaluate current IT landscape" },
    { step: 2, title: "Envision", description: "Define future state" },
    { step: 3, title: "Plan", description: "Create technology roadmap" },
    { step: 4, title: "Execute", description: "Implement and iterate" },
  ],
  benefits: [
    "Aligned IT investments",
    "Reduced technology risk",
    "Improved efficiency",
    "Better ROI on IT",
    "Competitive advantage",
    "Future-ready organization",
  ],
  faqs: [
    {
      question: "How long is a technology strategy valid?",
      answer: "Typically 3-5 years with annual reviews and updates.",
    },
    { question: "Do you help with implementation?", answer: "Yes, we support from strategy through execution." },
    {
      question: "What technologies do you cover?",
      answer: "Cloud, infrastructure, applications, security, and emerging technologies.",
    },
  ],
}

export const metadata = {
  title: "Technology Strategy Services | IT Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function TechnologyStrategyPage() {
  return <ServicePageTemplate {...serviceData} />
}
