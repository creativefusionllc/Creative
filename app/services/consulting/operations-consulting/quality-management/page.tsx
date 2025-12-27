import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Quality Management",
  subtitle: "Operations Consulting",
  description: "Implement quality management systems that ensure consistent excellence and customer satisfaction.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Quality Assessment", description: "Evaluate current quality levels", icon: "search" },
    { title: "QMS Development", description: "Build quality systems", icon: "shield" },
    { title: "ISO Compliance", description: "Meet quality standards", icon: "award" },
    { title: "Training Programs", description: "Quality education", icon: "book" },
    { title: "Audit Systems", description: "Quality monitoring", icon: "clipboard" },
    { title: "Continuous Improvement", description: "Ongoing quality enhancement", icon: "trending-up" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Evaluate current quality state" },
    { step: 2, title: "Design", description: "Create quality management system" },
    { step: 3, title: "Implement", description: "Deploy QMS across organization" },
    { step: 4, title: "Sustain", description: "Monitor and improve continuously" },
  ],
  benefits: [
    "Consistent product/service quality",
    "Reduced defects and rework",
    "Higher customer satisfaction",
    "Compliance with standards",
    "Lower quality costs",
    "Competitive advantage",
  ],
  faqs: [
    {
      question: "Do you help with ISO certification?",
      answer: "Yes, we prepare organizations for ISO 9001 and other certifications.",
    },
    {
      question: "How long to implement QMS?",
      answer: "Basic systems in 3-4 months; certification-ready in 6-12 months.",
    },
    { question: "What industries do you serve?", answer: "Manufacturing, services, healthcare, technology, and more." },
  ],
}

export const metadata = {
  title: "Quality Management Services | Operations Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function QualityManagementPage() {
  return <ServicePageTemplate {...serviceData} />
}
