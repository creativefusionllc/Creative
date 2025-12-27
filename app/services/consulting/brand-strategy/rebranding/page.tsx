import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Rebranding",
  subtitle: "Brand Strategy",
  description: "Transform your brand identity to reflect your evolved business and better connect with your audience.",
  heroImage: "/rebranding-transformation-before-after.jpg",
  features: [
    { title: "Brand Assessment", description: "Evaluate rebrand need", icon: "search" },
    { title: "Strategy Development", description: "Plan rebrand approach", icon: "map" },
    { title: "Identity Design", description: "Create new visual identity", icon: "palette" },
    { title: "Messaging Update", description: "Refresh brand voice", icon: "message-circle" },
    { title: "Rollout Planning", description: "Launch strategy", icon: "calendar" },
    { title: "Change Management", description: "Internal alignment", icon: "users" },
  ],
  process: [
    { step: 1, title: "Assess", description: "Determine rebrand scope and goals" },
    { step: 2, title: "Create", description: "Develop new brand identity" },
    { step: 3, title: "Plan", description: "Prepare rollout strategy" },
    { step: 4, title: "Launch", description: "Execute rebrand across touchpoints" },
  ],
  benefits: [
    "Refreshed market presence",
    "Better audience connection",
    "Competitive repositioning",
    "Unified brand experience",
    "Increased brand value",
    "New growth opportunities",
  ],
  faqs: [
    {
      question: "When should we consider rebranding?",
      answer: "When your brand no longer reflects your business or resonates with your audience.",
    },
    {
      question: "How long does rebranding take?",
      answer: "Typically 4-8 months for strategy and design; rollout varies.",
    },
    { question: "How much does rebranding cost?", answer: "Varies widely based on scope; we provide custom quotes." },
  ],
}

export const metadata = {
  title: "Rebranding Services | Brand Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function RebrandingPage() {
  return <ServicePageTemplate {...serviceData} />
}
