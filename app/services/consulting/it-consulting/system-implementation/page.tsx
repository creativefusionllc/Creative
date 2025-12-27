import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "System Implementation",
  subtitle: "IT/Technology Consulting",
  description: "Successfully implement new technology systems with expert planning, execution, and change management.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Project Planning", description: "Detailed implementation plan", icon: "calendar" },
    { title: "Configuration", description: "System setup and customization", icon: "settings" },
    { title: "Data Migration", description: "Secure data transfer", icon: "database" },
    { title: "Integration", description: "Connect with existing systems", icon: "link" },
    { title: "Testing", description: "Comprehensive QA", icon: "check-circle" },
    { title: "Training", description: "User education", icon: "users" },
  ],
  process: [
    { step: 1, title: "Plan", description: "Define implementation approach" },
    { step: 2, title: "Build", description: "Configure and customize" },
    { step: 3, title: "Test", description: "Validate functionality" },
    { step: 4, title: "Launch", description: "Go live and support" },
  ],
  benefits: [
    "Successful implementation",
    "On-time delivery",
    "User adoption",
    "Minimized disruption",
    "Realized benefits",
    "Long-term success",
  ],
  faqs: [
    { question: "How long does implementation take?", answer: "Varies by system complexity; typically 3-12 months." },
    { question: "Will there be business disruption?", answer: "We plan to minimize disruption with phased rollouts." },
    { question: "Do you provide post-launch support?", answer: "Yes, we offer hypercare and ongoing support options." },
  ],
}

export const metadata = {
  title: "System Implementation Services | IT Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function SystemImplementationPage() {
  return <ServicePageTemplate {...serviceData} />
}
