import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Software Selection",
  subtitle: "IT/Technology Consulting",
  description: "Find the right software solutions for your business with unbiased evaluation and selection guidance.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Requirements Analysis", description: "Define software needs", icon: "clipboard" },
    { title: "Market Research", description: "Evaluate options", icon: "search" },
    { title: "Vendor Evaluation", description: "Compare solutions", icon: "users" },
    { title: "Demo Coordination", description: "Organize vendor demos", icon: "play" },
    { title: "Scoring Matrix", description: "Objective comparison", icon: "grid" },
    { title: "Contract Support", description: "Negotiation assistance", icon: "file-text" },
  ],
  process: [
    { step: 1, title: "Define", description: "Document requirements" },
    { step: 2, title: "Research", description: "Identify potential solutions" },
    { step: 3, title: "Evaluate", description: "Compare and score options" },
    { step: 4, title: "Select", description: "Make informed decision" },
  ],
  benefits: [
    "Right software choice",
    "Reduced implementation risk",
    "Better ROI",
    "Time savings",
    "Unbiased evaluation",
    "Negotiation leverage",
  ],
  faqs: [
    {
      question: "Do you receive vendor commissions?",
      answer: "No, we provide unbiased, vendor-neutral recommendations.",
    },
    { question: "How long does selection take?", answer: "Typically 4-8 weeks depending on complexity." },
    {
      question: "What software types do you cover?",
      answer: "ERP, CRM, HCM, marketing, and other business applications.",
    },
  ],
}

export const metadata = {
  title: "Software Selection Services | IT Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function SoftwareSelectionPage() {
  return <ServicePageTemplate {...serviceData} />
}
