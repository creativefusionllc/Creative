import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Digital Marketing Strategy",
  subtitle: "Marketing Strategy",
  description:
    "Create comprehensive digital marketing plans that drive traffic, engagement, and conversions across all channels.",
  heroImage: "/digital-marketing-strategy.png",
  features: [
    { title: "Channel Planning", description: "Optimize channel mix", icon: "layers" },
    { title: "Campaign Strategy", description: "Integrated campaigns", icon: "target" },
    { title: "Budget Allocation", description: "Maximize marketing ROI", icon: "dollar-sign" },
    { title: "Audience Targeting", description: "Precise segmentation", icon: "users" },
    { title: "Marketing Automation", description: "Scale marketing efforts", icon: "cpu" },
    { title: "Analytics Setup", description: "Track performance", icon: "bar-chart" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Evaluate current digital presence" },
    { step: 2, title: "Strategize", description: "Develop comprehensive plan" },
    { step: 3, title: "Execute", description: "Implement across channels" },
    { step: 4, title: "Optimize", description: "Continuously improve results" },
  ],
  benefits: [
    "Integrated digital presence",
    "Higher marketing ROI",
    "Better lead quality",
    "Improved conversions",
    "Data-driven optimization",
    "Scalable growth",
  ],
  faqs: [
    {
      question: "Which digital channels should we focus on?",
      answer: "We recommend channels based on your audience, goals, and budget.",
    },
    {
      question: "How much should we budget for digital marketing?",
      answer: "Typically 5-15% of revenue, depending on growth goals.",
    },
    {
      question: "How quickly will we see results?",
      answer: "Paid channels show quick results; organic strategies take 3-6 months.",
    },
  ],
}

export const metadata = {
  title: "Digital Marketing Strategy Services | Marketing Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function DigitalMarketingStrategyPage() {
  return <ServicePageTemplate {...serviceData} />
}
