import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Digital Strategy",
  subtitle: "Digital Transformation",
  description: "Develop a comprehensive digital roadmap that aligns technology investments with business objectives.",
  heroImage: "/digital-strategy-planning-meeting.jpg",
  features: [
    { title: "Digital Assessment", description: "Evaluate digital maturity", icon: "clipboard" },
    { title: "Roadmap Development", description: "Create transformation plan", icon: "map" },
    { title: "Technology Selection", description: "Choose right solutions", icon: "check-square" },
    { title: "Change Management", description: "Guide organizational change", icon: "users" },
    { title: "KPI Framework", description: "Measure success metrics", icon: "target" },
    { title: "Governance", description: "Digital governance structure", icon: "shield" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Evaluate current digital state" },
    { step: 2, title: "Envision", description: "Define digital future state" },
    { step: 3, title: "Plan", description: "Create actionable roadmap" },
    { step: 4, title: "Execute", description: "Implement and iterate" },
  ],
  benefits: [
    "Clear digital direction",
    "Aligned technology investments",
    "Competitive advantage",
    "Improved customer experience",
    "Operational efficiency",
    "Future-ready organization",
  ],
  faqs: [
    {
      question: "How do you develop a digital strategy?",
      answer: "We assess your current state, define goals, and create a phased roadmap.",
    },
    {
      question: "How long is a digital strategy valid?",
      answer: "Typically 3-5 years with annual reviews and adjustments.",
    },
    { question: "Do you help with implementation?", answer: "Yes, we support from strategy through execution." },
  ],
}

export const metadata = {
  title: "Digital Strategy Services | Digital Transformation | Creative Fusion",
  description: serviceData.description,
}

export default function DigitalStrategyPage() {
  return <ServicePageTemplate {...serviceData} />
}
