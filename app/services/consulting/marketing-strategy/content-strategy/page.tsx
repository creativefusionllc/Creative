import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Content Strategy",
  subtitle: "Marketing Strategy",
  description: "Develop a strategic content framework that attracts, engages, and converts your target audience.",
  heroImage: "/content-strategy-planning-editorial.jpg",
  features: [
    { title: "Content Audit", description: "Assess existing content", icon: "file-text" },
    { title: "Audience Research", description: "Understand content needs", icon: "users" },
    { title: "Editorial Calendar", description: "Plan content production", icon: "calendar" },
    { title: "Channel Strategy", description: "Optimize distribution", icon: "share-2" },
    { title: "SEO Integration", description: "Search-optimized content", icon: "search" },
    { title: "Performance Tracking", description: "Measure content ROI", icon: "bar-chart" },
  ],
  process: [
    { step: 1, title: "Audit", description: "Review current content and performance" },
    { step: 2, title: "Plan", description: "Develop content strategy and calendar" },
    { step: 3, title: "Create", description: "Produce high-quality content" },
    { step: 4, title: "Optimize", description: "Refine based on performance" },
  ],
  benefits: [
    "Increased organic traffic",
    "Higher engagement rates",
    "Improved lead generation",
    "Stronger brand authority",
    "Better SEO rankings",
    "Consistent brand voice",
  ],
  faqs: [
    {
      question: "Do you create content or just strategy?",
      answer: "We offer both strategic planning and content creation services.",
    },
    {
      question: "How often should we publish content?",
      answer: "Frequency depends on goals and resources; we recommend consistency over volume.",
    },
    {
      question: "How do you measure content success?",
      answer: "Through traffic, engagement, conversions, and SEO metrics.",
    },
  ],
}

export const metadata = {
  title: "Content Strategy Services | Marketing Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function ContentStrategyPage() {
  return <ServicePageTemplate {...serviceData} />
}
