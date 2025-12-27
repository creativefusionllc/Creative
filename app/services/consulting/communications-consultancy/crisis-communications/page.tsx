import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Crisis Communications",
  subtitle: "Communications Consultancy",
  description:
    "Prepare for and manage crisis situations with strategic communication plans that protect your reputation.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Crisis Planning", description: "Prepare for crises", icon: "shield" },
    { title: "Response Strategy", description: "Rapid response plans", icon: "zap" },
    { title: "Media Training", description: "Spokesperson preparation", icon: "mic" },
    { title: "Stakeholder Communications", description: "Manage all audiences", icon: "users" },
    { title: "Social Media Management", description: "Monitor and respond", icon: "message-circle" },
    { title: "Reputation Recovery", description: "Rebuild trust", icon: "trending-up" },
  ],
  process: [
    { step: 1, title: "Prepare", description: "Develop crisis plans" },
    { step: 2, title: "Train", description: "Prepare crisis team" },
    { step: 3, title: "Respond", description: "Manage active crisis" },
    { step: 4, title: "Recover", description: "Rebuild reputation" },
  ],
  benefits: [
    "Faster crisis response",
    "Protected reputation",
    "Stakeholder confidence",
    "Reduced damage",
    "Prepared leadership",
    "Stronger resilience",
  ],
  faqs: [
    {
      question: "Do we need crisis planning before a crisis?",
      answer: "Yes, preparation is essential for effective crisis response.",
    },
    {
      question: "Can you help during an active crisis?",
      answer: "Yes, we provide immediate crisis support when needed.",
    },
    {
      question: "What types of crises do you handle?",
      answer: "Product recalls, PR issues, leadership changes, cyber incidents, and more.",
    },
  ],
}

export const metadata = {
  title: "Crisis Communications Services | Communications Consultancy | Creative Fusion",
  description: serviceData.description,
}

export default function CrisisCommunicationsPage() {
  return <ServicePageTemplate {...serviceData} />
}
