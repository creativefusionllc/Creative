import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Process Automation",
  subtitle: "Digital Transformation",
  description:
    "Streamline operations and boost productivity with intelligent automation solutions that eliminate manual tasks and reduce errors.",
  heroImage: "/business-process-automation-workflow.png",
  features: [
    { title: "Workflow Analysis", description: "Identify automation opportunities", icon: "search" },
    { title: "RPA Implementation", description: "Robotic process automation deployment", icon: "cpu" },
    { title: "Integration", description: "Connect systems seamlessly", icon: "link" },
    { title: "Custom Solutions", description: "Tailored automation tools", icon: "code" },
    { title: "Monitoring", description: "Real-time performance tracking", icon: "activity" },
    { title: "Optimization", description: "Continuous improvement", icon: "trending-up" },
  ],
  process: [
    { step: 1, title: "Discover", description: "Map existing processes and pain points" },
    { step: 2, title: "Design", description: "Create automation blueprints" },
    { step: 3, title: "Implement", description: "Deploy automation solutions" },
    { step: 4, title: "Scale", description: "Expand automation across operations" },
  ],
  benefits: [
    "Up to 80% reduction in manual tasks",
    "Improved accuracy and consistency",
    "Faster processing times",
    "Lower operational costs",
    "Better employee productivity",
    "Enhanced customer experience",
  ],
  faqs: [
    {
      question: "What processes can be automated?",
      answer: "Data entry, reporting, approvals, notifications, and many repetitive tasks.",
    },
    {
      question: "How quickly will we see ROI?",
      answer: "Most clients see positive ROI within 6-12 months of implementation.",
    },
    {
      question: "Do we need technical expertise?",
      answer: "No, we provide full training and ongoing support for your team.",
    },
  ],
}

export const metadata = {
  title: "Process Automation Services | Digital Transformation | Creative Fusion",
  description: serviceData.description,
}

export default function ProcessAutomationPage() {
  return <ServicePageTemplate {...serviceData} />
}
