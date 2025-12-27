import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Growth Strategy",
  subtitle: "Marketing Strategy",
  description:
    "Accelerate business growth with data-driven strategies that identify and capitalize on expansion opportunities.",
  heroImage: "/business-growth-strategy-charts.jpg",
  features: [
    { title: "Growth Audit", description: "Assess growth potential", icon: "search" },
    { title: "Opportunity Mapping", description: "Identify growth levers", icon: "map" },
    { title: "Revenue Optimization", description: "Maximize revenue streams", icon: "dollar-sign" },
    { title: "Expansion Planning", description: "New markets and products", icon: "globe" },
    { title: "Partnership Strategy", description: "Strategic alliances", icon: "users" },
    { title: "Growth Metrics", description: "Track and measure growth", icon: "trending-up" },
  ],
  process: [
    { step: 1, title: "Analyze", description: "Assess current growth trajectory" },
    { step: 2, title: "Identify", description: "Find growth opportunities" },
    { step: 3, title: "Prioritize", description: "Rank initiatives by impact" },
    { step: 4, title: "Execute", description: "Implement growth initiatives" },
  ],
  benefits: [
    "Accelerated revenue growth",
    "New market opportunities",
    "Improved unit economics",
    "Scalable growth systems",
    "Data-driven decisions",
    "Sustainable expansion",
  ],
  faqs: [
    {
      question: "How do you identify growth opportunities?",
      answer: "Through market analysis, customer research, and data analytics.",
    },
    {
      question: "What growth rate can we expect?",
      answer: "Varies by industry, but we target measurable improvement within 6-12 months.",
    },
    { question: "Do you help implement growth initiatives?", answer: "Yes, we support both strategy and execution." },
  ],
}

export const metadata = {
  title: "Growth Strategy Services | Marketing Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function GrowthStrategyPage() {
  return <ServicePageTemplate {...serviceData} />
}
