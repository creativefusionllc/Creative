import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Resource Planning",
  subtitle: "Operations Consulting",
  description: "Optimize resource allocation to maximize productivity and minimize waste across your organization.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Capacity Planning", description: "Match resources to demand", icon: "calendar" },
    { title: "Workforce Planning", description: "Optimize staffing levels", icon: "users" },
    { title: "Asset Management", description: "Maximize asset utilization", icon: "tool" },
    { title: "Budget Optimization", description: "Allocate resources efficiently", icon: "dollar-sign" },
    { title: "Forecasting", description: "Predict resource needs", icon: "trending-up" },
    { title: "Performance Tracking", description: "Monitor resource efficiency", icon: "activity" },
  ],
  process: [
    { step: 1, title: "Analyze", description: "Assess current resource utilization" },
    { step: 2, title: "Plan", description: "Develop resource strategy" },
    { step: 3, title: "Allocate", description: "Implement resource allocation" },
    { step: 4, title: "Monitor", description: "Track and adjust as needed" },
  ],
  benefits: [
    "Improved resource utilization",
    "Reduced labor costs",
    "Better project delivery",
    "Optimized capacity",
    "Informed decision making",
    "Scalable operations",
  ],
  faqs: [
    { question: "What resources do you help plan?", answer: "People, equipment, facilities, budget, and time." },
    {
      question: "Do you provide planning software?",
      answer: "We help select and implement appropriate planning tools.",
    },
    {
      question: "How accurate is resource forecasting?",
      answer: "With good data, we achieve 85-95% forecast accuracy.",
    },
  ],
}

export const metadata = {
  title: "Resource Planning Services | Operations Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function ResourcePlanningPage() {
  return <ServicePageTemplate {...serviceData} />
}
