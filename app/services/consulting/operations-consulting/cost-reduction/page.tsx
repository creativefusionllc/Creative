import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Cost Reduction",
  subtitle: "Operations Consulting",
  description: "Identify and eliminate unnecessary costs while maintaining quality and operational effectiveness.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Cost Analysis", description: "Identify cost drivers", icon: "search" },
    { title: "Spend Analysis", description: "Review all expenditures", icon: "dollar-sign" },
    { title: "Process Efficiency", description: "Reduce process costs", icon: "zap" },
    { title: "Vendor Negotiation", description: "Better supplier terms", icon: "handshake" },
    { title: "Technology Optimization", description: "Reduce tech costs", icon: "cpu" },
    { title: "Overhead Reduction", description: "Cut indirect costs", icon: "scissors" },
  ],
  process: [
    { step: 1, title: "Analyze", description: "Map all costs and drivers" },
    { step: 2, title: "Identify", description: "Find reduction opportunities" },
    { step: 3, title: "Implement", description: "Execute cost reductions" },
    { step: 4, title: "Sustain", description: "Maintain cost discipline" },
  ],
  benefits: [
    "Improved profit margins",
    "Better cash flow",
    "Competitive pricing ability",
    "Sustainable operations",
    "Investment capacity",
    "Business resilience",
  ],
  faqs: [
    { question: "How much can we save?", answer: "Typically 10-30% reduction in operational costs." },
    {
      question: "Will cost cuts affect quality?",
      answer: "We focus on eliminating waste, not cutting corners on quality.",
    },
    { question: "How long to see savings?", answer: "Quick wins in weeks; major savings within 3-6 months." },
  ],
}

export const metadata = {
  title: "Cost Reduction Services | Operations Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function CostReductionPage() {
  return <ServicePageTemplate {...serviceData} />
}
