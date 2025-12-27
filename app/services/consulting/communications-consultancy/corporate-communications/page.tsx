import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Corporate Communications",
  subtitle: "Communications Consultancy",
  description:
    "Build a cohesive corporate communication strategy that aligns messaging across all channels and audiences.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Communication Strategy", description: "Unified approach", icon: "target" },
    { title: "Brand Messaging", description: "Consistent voice", icon: "message-circle" },
    { title: "Content Development", description: "Corporate content", icon: "file-text" },
    { title: "Channel Management", description: "Multi-channel strategy", icon: "layers" },
    { title: "Corporate Events", description: "Event communications", icon: "calendar" },
    { title: "Measurement", description: "Track effectiveness", icon: "bar-chart" },
  ],
  process: [
    { step: 1, title: "Audit", description: "Review current communications" },
    { step: 2, title: "Strategize", description: "Develop corporate comms plan" },
    { step: 3, title: "Execute", description: "Implement across channels" },
    { step: 4, title: "Optimize", description: "Continuously improve" },
  ],
  benefits: [
    "Consistent messaging",
    "Stronger brand",
    "Better reputation",
    "Aligned communications",
    "Efficient processes",
    "Measurable results",
  ],
  faqs: [
    {
      question: "What is included in corporate communications?",
      answer: "Internal, external, PR, digital, and executive communications.",
    },
    {
      question: "How do you ensure message consistency?",
      answer: "Through messaging frameworks, guidelines, and training.",
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer retainer and project-based support options.",
    },
  ],
}

export const metadata = {
  title: "Corporate Communications Services | Communications Consultancy | Creative Fusion",
  description: serviceData.description,
}

export default function CorporateCommunicationsPage() {
  return <ServicePageTemplate {...serviceData} />
}
