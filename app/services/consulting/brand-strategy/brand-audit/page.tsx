import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Brand Audit",
  subtitle: "Brand Strategy",
  description: "Comprehensive assessment of your brand's health, perception, and performance in the market.",
  heroImage: "/brand-audit-analysis-review.jpg",
  features: [
    { title: "Brand Health Check", description: "Assess brand strength", icon: "activity" },
    { title: "Perception Analysis", description: "Understand brand image", icon: "eye" },
    { title: "Competitive Review", description: "Compare to competitors", icon: "users" },
    { title: "Touchpoint Audit", description: "Review all brand touchpoints", icon: "layers" },
    { title: "Equity Measurement", description: "Quantify brand value", icon: "bar-chart" },
    { title: "Gap Analysis", description: "Identify improvement areas", icon: "search" },
  ],
  process: [
    { step: 1, title: "Collect", description: "Gather brand data and feedback" },
    { step: 2, title: "Analyze", description: "Assess brand performance" },
    { step: 3, title: "Report", description: "Document findings and gaps" },
    { step: 4, title: "Recommend", description: "Provide strategic recommendations" },
  ],
  benefits: [
    "Clear brand understanding",
    "Identify weaknesses",
    "Benchmark against competitors",
    "Prioritize improvements",
    "Measure brand equity",
    "Strategic direction",
  ],
  faqs: [
    {
      question: "What does a brand audit include?",
      answer: "Visual audit, messaging review, competitive analysis, and customer perception research.",
    },
    {
      question: "How often should we audit our brand?",
      answer: "Comprehensive audits every 2-3 years; quick checks annually.",
    },
    { question: "How long does an audit take?", answer: "Typically 4-6 weeks for a comprehensive audit." },
  ],
}

export const metadata = {
  title: "Brand Audit Services | Brand Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function BrandAuditPage() {
  return <ServicePageTemplate {...serviceData} />
}
