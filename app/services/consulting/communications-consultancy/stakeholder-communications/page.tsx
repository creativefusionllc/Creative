import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Stakeholder Communications",
  subtitle: "Communications Consultancy",
  description:
    "Develop targeted communication strategies for key stakeholders including investors, partners, and customers.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Stakeholder Mapping", description: "Identify key audiences", icon: "users" },
    { title: "Message Development", description: "Tailored messaging", icon: "message-circle" },
    { title: "Investor Relations", description: "Financial communications", icon: "trending-up" },
    { title: "Partner Communications", description: "Alliance management", icon: "handshake" },
    { title: "Customer Communications", description: "Client engagement", icon: "heart" },
    { title: "Reporting", description: "Regular updates", icon: "file-text" },
  ],
  process: [
    { step: 1, title: "Map", description: "Identify stakeholders and needs" },
    { step: 2, title: "Plan", description: "Develop communication plans" },
    { step: 3, title: "Execute", description: "Deliver communications" },
    { step: 4, title: "Evaluate", description: "Assess effectiveness" },
  ],
  benefits: [
    "Stronger relationships",
    "Aligned expectations",
    "Increased trust",
    "Better engagement",
    "Proactive communication",
    "Reduced conflicts",
  ],
  faqs: [
    {
      question: "Which stakeholders should we prioritize?",
      answer: "We help identify and prioritize stakeholders based on influence and interest.",
    },
    {
      question: "How often should we communicate with stakeholders?",
      answer: "Frequency varies by stakeholder type; we recommend regular cadences.",
    },
    {
      question: "Do you help with investor presentations?",
      answer: "Yes, including pitch decks, quarterly updates, and annual reports.",
    },
  ],
}

export const metadata = {
  title: "Stakeholder Communications Services | Communications Consultancy | Creative Fusion",
  description: serviceData.description,
}

export default function StakeholderCommunicationsPage() {
  return <ServicePageTemplate {...serviceData} />
}
