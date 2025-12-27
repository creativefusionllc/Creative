import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Brand Positioning",
  subtitle: "Brand Strategy",
  description:
    "Define a unique market position that differentiates your brand and resonates with your target audience.",
  heroImage: "/brand-positioning-strategy.jpg",
  features: [
    { title: "Competitive Analysis", description: "Map competitive landscape", icon: "users" },
    { title: "Value Proposition", description: "Define unique value", icon: "award" },
    { title: "Target Audience", description: "Identify ideal customers", icon: "target" },
    { title: "Positioning Statement", description: "Craft brand position", icon: "file-text" },
    { title: "Messaging Framework", description: "Consistent communication", icon: "message-circle" },
    { title: "Brand Differentiation", description: "Stand out from competitors", icon: "star" },
  ],
  process: [
    { step: 1, title: "Research", description: "Analyze market and competition" },
    { step: 2, title: "Define", description: "Craft positioning strategy" },
    { step: 3, title: "Test", description: "Validate with target audience" },
    { step: 4, title: "Implement", description: "Roll out across touchpoints" },
  ],
  benefits: [
    "Clear market differentiation",
    "Stronger brand recognition",
    "Premium pricing ability",
    "Customer loyalty",
    "Consistent messaging",
    "Competitive advantage",
  ],
  faqs: [
    {
      question: "How do you determine brand positioning?",
      answer: "Through market research, competitive analysis, and customer insights.",
    },
    {
      question: "Can we reposition an existing brand?",
      answer: "Yes, we help brands evolve their positioning strategically.",
    },
    {
      question: "How long does positioning take?",
      answer: "Typically 6-8 weeks for research and strategy development.",
    },
  ],
}

export const metadata = {
  title: "Brand Positioning Services | Brand Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function BrandPositioningPage() {
  return <ServicePageTemplate {...serviceData} />
}
