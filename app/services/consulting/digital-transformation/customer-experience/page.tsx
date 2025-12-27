import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Customer Experience",
  subtitle: "Digital Transformation",
  description: "Design and implement exceptional digital customer experiences that drive loyalty and growth.",
  heroImage: "/customer-experience-digital-touchpoints.jpg",
  features: [
    { title: "Journey Mapping", description: "Map customer touchpoints", icon: "map" },
    { title: "UX Research", description: "Understand customer needs", icon: "users" },
    { title: "Personalization", description: "Tailored experiences", icon: "user-check" },
    { title: "Omnichannel", description: "Consistent cross-channel experience", icon: "layers" },
    { title: "Feedback Systems", description: "Capture customer insights", icon: "message-circle" },
    { title: "CX Analytics", description: "Measure experience metrics", icon: "bar-chart" },
  ],
  process: [
    { step: 1, title: "Research", description: "Understand customer needs and pain points" },
    { step: 2, title: "Design", description: "Create ideal customer journeys" },
    { step: 3, title: "Implement", description: "Build and launch experiences" },
    { step: 4, title: "Optimize", description: "Continuously improve based on feedback" },
  ],
  benefits: [
    "Increased customer satisfaction",
    "Higher retention rates",
    "Improved brand loyalty",
    "More referrals and advocacy",
    "Higher lifetime value",
    "Competitive differentiation",
  ],
  faqs: [
    {
      question: "How do you measure customer experience?",
      answer: "We use NPS, CSAT, CES, and custom metrics aligned to your goals.",
    },
    {
      question: "Can you improve our existing CX?",
      answer: "Yes, we audit current experiences and recommend improvements.",
    },
    { question: "How long to see CX improvements?", answer: "Quick wins in weeks, significant changes in 3-6 months." },
  ],
}

export const metadata = {
  title: "Customer Experience Services | Digital Transformation | Creative Fusion",
  description: serviceData.description,
}

export default function CustomerExperiencePage() {
  return <ServicePageTemplate {...serviceData} />
}
