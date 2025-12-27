import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Executive Communications",
  subtitle: "Communications Consultancy",
  description: "Elevate executive presence and communication effectiveness to inspire teams and stakeholders.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Executive Coaching", description: "Communication skills", icon: "user" },
    { title: "Speechwriting", description: "Compelling speeches", icon: "file-text" },
    { title: "Presentation Design", description: "Impactful presentations", icon: "monitor" },
    { title: "Thought Leadership", description: "Build executive brand", icon: "award" },
    { title: "Board Communications", description: "Stakeholder updates", icon: "users" },
    { title: "Media Training", description: "Interview readiness", icon: "mic" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Evaluate communication strengths" },
    { step: 2, title: "Plan", description: "Develop communication strategy" },
    { step: 3, title: "Train", description: "Coach and prepare" },
    { step: 4, title: "Support", description: "Ongoing communication support" },
  ],
  benefits: [
    "Stronger executive presence",
    "More effective communication",
    "Increased influence",
    "Team inspiration",
    "Stakeholder confidence",
    "Personal brand building",
  ],
  faqs: [
    { question: "Is executive coaching confidential?", answer: "Absolutely, all coaching is strictly confidential." },
    {
      question: "Do you write speeches for executives?",
      answer: "Yes, we provide full speechwriting and preparation services.",
    },
    {
      question: "How long is a typical coaching engagement?",
      answer: "Typically 3-6 months for meaningful improvement.",
    },
  ],
}

export const metadata = {
  title: "Executive Communications Services | Communications Consultancy | Creative Fusion",
  description: serviceData.description,
}

export default function ExecutiveCommunicationsPage() {
  return <ServicePageTemplate {...serviceData} />
}
