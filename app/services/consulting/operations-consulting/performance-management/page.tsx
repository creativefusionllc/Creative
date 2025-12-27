import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Performance Management",
  subtitle: "Operations Consulting",
  description:
    "Build performance management systems that drive accountability, engagement, and continuous improvement.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "KPI Development", description: "Define meaningful metrics", icon: "target" },
    { title: "Dashboard Design", description: "Visualize performance", icon: "bar-chart" },
    { title: "Goal Setting", description: "Align objectives", icon: "flag" },
    { title: "Review Systems", description: "Performance evaluation", icon: "clipboard" },
    { title: "Incentive Design", description: "Reward high performers", icon: "award" },
    { title: "Coaching Programs", description: "Develop talent", icon: "users" },
  ],
  process: [
    { step: 1, title: "Design", description: "Create performance framework" },
    { step: 2, title: "Implement", description: "Deploy systems and tools" },
    { step: 3, title: "Train", description: "Educate managers and teams" },
    { step: 4, title: "Refine", description: "Continuously improve system" },
  ],
  benefits: [
    "Clear accountability",
    "Improved performance",
    "Better goal alignment",
    "Data-driven decisions",
    "Higher engagement",
    "Continuous improvement culture",
  ],
  faqs: [
    {
      question: "What metrics should we track?",
      answer: "We help identify KPIs aligned with your strategic objectives.",
    },
    {
      question: "How do you handle underperformers?",
      answer: "We design coaching and improvement plans alongside accountability systems.",
    },
    {
      question: "Do you provide performance software?",
      answer: "We help select and configure appropriate performance management tools.",
    },
  ],
}

export const metadata = {
  title: "Performance Management Services | Operations Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function PerformanceManagementPage() {
  return <ServicePageTemplate {...serviceData} />
}
