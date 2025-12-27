import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Go-to-Market Strategy",
  subtitle: "Marketing Strategy",
  description: "Launch products and services successfully with comprehensive go-to-market planning and execution.",
  heroImage: "/product-launch-go-to-market-strategy.jpg",
  features: [
    { title: "Market Analysis", description: "Identify target market segments", icon: "target" },
    { title: "Positioning", description: "Define unique value proposition", icon: "award" },
    { title: "Pricing Strategy", description: "Optimize pricing models", icon: "dollar-sign" },
    { title: "Channel Strategy", description: "Select distribution channels", icon: "share-2" },
    { title: "Launch Planning", description: "Detailed launch roadmap", icon: "calendar" },
    { title: "Sales Enablement", description: "Equip sales teams", icon: "briefcase" },
  ],
  process: [
    { step: 1, title: "Research", description: "Analyze market and competition" },
    { step: 2, title: "Strategy", description: "Define GTM approach" },
    { step: 3, title: "Prepare", description: "Build launch assets and teams" },
    { step: 4, title: "Launch", description: "Execute and optimize" },
  ],
  benefits: [
    "Faster time to market",
    "Higher launch success rate",
    "Clear market positioning",
    "Optimized pricing",
    "Aligned sales and marketing",
    "Measurable results",
  ],
  faqs: [
    { question: "When should we start GTM planning?", answer: "Ideally 3-6 months before planned launch date." },
    { question: "Do you help with execution?", answer: "Yes, we support from strategy through launch and beyond." },
    {
      question: "What industries do you serve?",
      answer: "We have GTM experience across B2B, B2C, and technology sectors.",
    },
  ],
}

export const metadata = {
  title: "Go-to-Market Strategy Services | Marketing Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function GoToMarketPage() {
  return <ServicePageTemplate {...serviceData} />
}
