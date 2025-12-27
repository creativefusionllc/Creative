import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Supply Chain Optimization",
  subtitle: "Operations Consulting",
  description: "Streamline your supply chain for better efficiency, lower costs, and improved customer satisfaction.",
  heroImage: "/supply-chain-logistics-optimization.jpg",
  features: [
    { title: "Supply Chain Analysis", description: "Map end-to-end supply chain", icon: "truck" },
    { title: "Inventory Optimization", description: "Right-size inventory levels", icon: "package" },
    { title: "Vendor Management", description: "Optimize supplier relationships", icon: "users" },
    { title: "Logistics Planning", description: "Improve distribution", icon: "map-pin" },
    { title: "Demand Forecasting", description: "Predict demand accurately", icon: "trending-up" },
    { title: "Cost Reduction", description: "Reduce supply chain costs", icon: "dollar-sign" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Evaluate current supply chain" },
    { step: 2, title: "Design", description: "Plan optimization strategy" },
    { step: 3, title: "Implement", description: "Execute improvements" },
    { step: 4, title: "Monitor", description: "Track and refine performance" },
  ],
  benefits: [
    "Lower inventory costs",
    "Faster delivery times",
    "Improved supplier reliability",
    "Reduced stockouts",
    "Better demand planning",
    "Higher customer satisfaction",
  ],
  faqs: [
    {
      question: "What aspects of supply chain do you optimize?",
      answer: "Procurement, inventory, logistics, distribution, and vendor management.",
    },
    { question: "How much can we save?", answer: "Typically 10-25% reduction in supply chain costs." },
    {
      question: "Do you work with our existing suppliers?",
      answer: "Yes, we help optimize existing relationships and identify new opportunities.",
    },
  ],
}

export const metadata = {
  title: "Supply Chain Optimization Services | Operations Consulting | Creative Fusion",
  description: serviceData.description,
}

export default function SupplyChainPage() {
  return <ServicePageTemplate {...serviceData} />
}
