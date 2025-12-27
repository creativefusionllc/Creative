import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Cybersecurity Consulting",
  subtitle: "IT/Technology Consulting",
  description: "Protect your business with comprehensive cybersecurity strategies and solutions that mitigate risk.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Security Assessment", description: "Identify vulnerabilities", icon: "shield" },
    { title: "Risk Management", description: "Assess and mitigate risks", icon: "alert-triangle" },
    { title: "Compliance", description: "Meet security standards", icon: "check-circle" },
    { title: "Incident Response", description: "Breach response planning", icon: "zap" },
    { title: "Training", description: "Security awareness", icon: "users" },
    { title: "Monitoring", description: "Continuous security monitoring", icon: "eye" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Evaluate security posture" },
    { step: 2, title: "Plan", description: "Develop security strategy" },
    { step: 3, title: "Implement", description: "Deploy security solutions" },
    { step: 4, title: "Monitor", description: "Continuous protection" },
  ],
  benefits: [
    "Protected business assets",
    "Reduced breach risk",
    "Regulatory compliance",
    "Customer trust",
    "Business continuity",
    "Peace of mind",
  ],
  faqs: [
    {
      question: "What security standards do you support?",
      answer: "ISO 27001, SOC 2, GDPR, HIPAA, PCI-DSS, and more.",
    },
    {
      question: "How often should we assess security?",
      answer: "Annual comprehensive assessments with quarterly reviews.",
    },
    {
      question: "Do you provide managed security services?",
      answer: "Yes, we offer ongoing security monitoring and management.",
    },
  ],
}

export const metadata = {
  title: "Cybersecurity Consulting Services | IT Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function CybersecurityPage() {
  return <ServicePageTemplate {...serviceData} />
}
