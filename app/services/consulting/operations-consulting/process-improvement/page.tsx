import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Process Improvement",
  subtitle: "Operations Consulting",
  description: "Optimize business processes to eliminate waste, reduce costs, and improve operational efficiency.",
  heroImage: "/process-improvement-lean-operations.jpg",
  features: [
    { title: "Process Mapping", description: "Document current processes", icon: "map" },
    { title: "Lean Analysis", description: "Identify waste and inefficiency", icon: "search" },
    { title: "Workflow Redesign", description: "Optimize process flows", icon: "shuffle" },
    { title: "Automation", description: "Automate repetitive tasks", icon: "cpu" },
    { title: "KPI Development", description: "Define success metrics", icon: "bar-chart" },
    { title: "Change Management", description: "Implement improvements", icon: "users" },
  ],
  process: [
    { step: 1, title: "Map", description: "Document current state processes" },
    { step: 2, title: "Analyze", description: "Identify improvement opportunities" },
    { step: 3, title: "Design", description: "Create optimized processes" },
    { step: 4, title: "Implement", description: "Roll out improvements" },
  ],
  benefits: [
    "Reduced operational costs",
    "Faster cycle times",
    "Improved quality",
    "Better resource utilization",
    "Higher employee satisfaction",
    "Scalable operations",
  ],
  faqs: [
    {
      question: "What methodologies do you use?",
      answer: "Lean, Six Sigma, and custom approaches based on your needs.",
    },
    {
      question: "How long does process improvement take?",
      answer: "Quick wins in weeks; major transformations take 3-6 months.",
    },
    {
      question: "What results can we expect?",
      answer: "Typically 20-40% improvement in efficiency and cost reduction.",
    },
  ],
}

export const metadata = {
  title: "Process Improvement Services | Operations Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function ProcessImprovementPage() {
  return <ServicePageTemplate {...serviceData} />
}
