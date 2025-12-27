import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "IT Infrastructure",
  subtitle: "IT/Technology Consulting",
  description: "Design and optimize IT infrastructure for performance, reliability, and scalability.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Infrastructure Assessment", description: "Evaluate current state", icon: "search" },
    { title: "Architecture Design", description: "Plan optimal infrastructure", icon: "layers" },
    { title: "Cloud Solutions", description: "Cloud infrastructure", icon: "cloud" },
    { title: "Network Design", description: "Optimize connectivity", icon: "wifi" },
    { title: "Disaster Recovery", description: "Business continuity", icon: "shield" },
    { title: "Monitoring", description: "Performance monitoring", icon: "activity" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Review current infrastructure" },
    { step: 2, title: "Design", description: "Create optimal architecture" },
    { step: 3, title: "Implement", description: "Deploy infrastructure" },
    { step: 4, title: "Manage", description: "Ongoing optimization" },
  ],
  benefits: [
    "Improved performance",
    "Higher availability",
    "Scalable systems",
    "Reduced costs",
    "Better security",
    "Future-ready infrastructure",
  ],
  faqs: [
    { question: "Should we move to the cloud?", answer: "We help evaluate cloud vs on-premise based on your needs." },
    { question: "How do you ensure uptime?", answer: "Through redundancy, failover, and disaster recovery planning." },
    { question: "Do you manage infrastructure?", answer: "Yes, we offer managed infrastructure services." },
  ],
}

export const metadata = {
  title: "IT Infrastructure Services | IT Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function ITInfrastructurePage() {
  return <ServicePageTemplate {...serviceData} />
}
