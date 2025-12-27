import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Customer Acquisition",
  subtitle: "Marketing Strategy",
  description:
    "Build scalable customer acquisition systems that consistently attract and convert high-value customers.",
  heroImage: "/customer-acquisition-funnel-strategy.jpg",
  features: [
    { title: "Funnel Optimization", description: "Improve conversion rates", icon: "filter" },
    { title: "Lead Generation", description: "Attract qualified leads", icon: "user-plus" },
    { title: "CAC Analysis", description: "Optimize acquisition costs", icon: "dollar-sign" },
    { title: "Channel Testing", description: "Find best channels", icon: "shuffle" },
    { title: "Retargeting", description: "Re-engage prospects", icon: "refresh-cw" },
    { title: "Attribution", description: "Track acquisition sources", icon: "git-branch" },
  ],
  process: [
    { step: 1, title: "Analyze", description: "Understand current acquisition metrics" },
    { step: 2, title: "Test", description: "Experiment with channels and tactics" },
    { step: 3, title: "Scale", description: "Expand what works" },
    { step: 4, title: "Optimize", description: "Continuously improve efficiency" },
  ],
  benefits: [
    "Lower customer acquisition cost",
    "Higher quality leads",
    "Scalable acquisition systems",
    "Predictable growth",
    "Better ROI tracking",
    "Sustainable customer pipeline",
  ],
  faqs: [
    {
      question: "What is a good customer acquisition cost?",
      answer: "It depends on customer lifetime value; aim for CAC:LTV ratio of 1:3 or better.",
    },
    {
      question: "How long to build acquisition systems?",
      answer: "Initial systems in 2-3 months; optimization is ongoing.",
    },
    {
      question: "Do you help with paid advertising?",
      answer: "Yes, we manage and optimize paid acquisition channels.",
    },
  ],
}

export const metadata = {
  title: "Customer Acquisition Services | Marketing Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function CustomerAcquisitionPage() {
  return <ServicePageTemplate {...serviceData} />
}
