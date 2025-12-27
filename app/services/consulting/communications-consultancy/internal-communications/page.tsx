import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Internal Communications",
  subtitle: "Communications Consultancy",
  description:
    "Build effective internal communication strategies that engage employees and drive organizational alignment.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Communication Audit", description: "Assess current state", icon: "search" },
    { title: "Strategy Development", description: "Plan communications approach", icon: "target" },
    { title: "Channel Planning", description: "Select right channels", icon: "layers" },
    { title: "Content Strategy", description: "Engaging content", icon: "file-text" },
    { title: "Change Communications", description: "Support change initiatives", icon: "refresh-cw" },
    { title: "Measurement", description: "Track effectiveness", icon: "bar-chart" },
  ],
  process: [
    { step: 1, title: "Audit", description: "Review current communications" },
    { step: 2, title: "Plan", description: "Develop communication strategy" },
    { step: 3, title: "Implement", description: "Execute communication plans" },
    { step: 4, title: "Measure", description: "Track and improve" },
  ],
  benefits: [
    "Higher employee engagement",
    "Better alignment",
    "Improved culture",
    "Faster change adoption",
    "Reduced confusion",
    "Stronger employer brand",
  ],
  faqs: [
    {
      question: "How do you measure communication effectiveness?",
      answer: "Through surveys, engagement metrics, and feedback analysis.",
    },
    {
      question: "What channels do you recommend?",
      answer: "We recommend the right mix based on your workforce and culture.",
    },
    { question: "Do you help create content?", answer: "Yes, we provide both strategy and content creation services." },
  ],
}

export const metadata = {
  title: "Internal Communications Services | Communications Consultancy | Creative Fusion",
  description: serviceData.description,
}

export default function InternalCommunicationsPage() {
  return <ServicePageTemplate {...serviceData} />
}
