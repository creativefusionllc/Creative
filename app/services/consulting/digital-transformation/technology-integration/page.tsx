import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Technology Integration",
  subtitle: "Digital Transformation",
  description: "Connect your business systems and tools for seamless data flow and improved operational efficiency.",
  heroImage: "/technology-integration-systems-connected.jpg",
  features: [
    { title: "API Development", description: "Custom API solutions", icon: "code" },
    { title: "System Integration", description: "Connect disparate systems", icon: "link" },
    { title: "Data Sync", description: "Real-time data synchronization", icon: "refresh-cw" },
    { title: "Legacy Modernization", description: "Update old systems", icon: "layers" },
    { title: "Middleware", description: "Integration platform solutions", icon: "server" },
    { title: "Testing", description: "Comprehensive integration testing", icon: "check-circle" },
  ],
  process: [
    { step: 1, title: "Audit", description: "Review existing systems and needs" },
    { step: 2, title: "Architecture", description: "Design integration framework" },
    { step: 3, title: "Connect", description: "Implement integrations" },
    { step: 4, title: "Monitor", description: "Ensure ongoing reliability" },
  ],
  benefits: [
    "Unified data across systems",
    "Eliminated manual data entry",
    "Faster information access",
    "Reduced errors and duplicates",
    "Better collaboration",
    "Improved productivity",
  ],
  faqs: [
    {
      question: "Can you integrate legacy systems?",
      answer: "Yes, we specialize in connecting modern and legacy systems.",
    },
    {
      question: "How long does integration take?",
      answer: "Simple integrations take weeks, complex ones may take months.",
    },
    {
      question: "Will integration disrupt operations?",
      answer: "We plan carefully to minimize any business disruption.",
    },
  ],
}

export const metadata = {
  title: "Technology Integration Services | Digital Transformation | Creative Fusion",
  description: serviceData.description,
}

export default function TechnologyIntegrationPage() {
  return <ServicePageTemplate {...serviceData} />
}
