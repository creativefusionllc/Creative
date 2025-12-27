import { ServicePageTemplate } from "@/components/services/service-page-template"
import { Briefcase } from "lucide-react"

const serviceData = {
  title: "Brand Architecture",
  subtitle: "Brand Strategy",
  description: "Organize and structure your brand portfolio for clarity, efficiency, and maximum market impact.",
  heroImage: "/brand-architecture-portfolio-structure.jpg",
  icon: Briefcase, // Changed from string back to icon component
  features: [
    { title: "Portfolio Analysis", description: "Assess brand relationships", icon: "layers" },
    { title: "Architecture Design", description: "Structure brand hierarchy", icon: "git-branch" },
    { title: "Sub-brand Strategy", description: "Define sub-brand roles", icon: "folder" },
    { title: "Naming Strategy", description: "Consistent naming system", icon: "tag" },
    { title: "Migration Planning", description: "Transition existing brands", icon: "shuffle" },
    { title: "Guidelines", description: "Brand usage rules", icon: "book" },
  ],
  process: [
    { number: "01", title: "Audit", description: "Review current brand portfolio" },
    { number: "02", title: "Design", description: "Create optimal architecture" },
    { number: "03", title: "Plan", description: "Develop migration roadmap" },
    { number: "04", title: "Implement", description: "Roll out new structure" },
  ],
  benefits: [
    "Clear brand hierarchy",
    "Efficient marketing spend",
    "Reduced brand confusion",
    "Easier brand management",
    "Strategic flexibility",
    "Stronger brand equity",
  ],
  faqs: [
    {
      question: "What is brand architecture?",
      answer: "The structure and relationship between brands in a company's portfolio.",
    },
    {
      question: "When do we need brand architecture?",
      answer: "When you have multiple brands, products, or are planning acquisitions.",
    },
    {
      question: "How long does restructuring take?",
      answer: "Strategy in 2-3 months; full implementation can take 1-2 years.",
    },
  ],
}

export const metadata = {
  title: "Brand Architecture Services | Brand Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function BrandArchitecturePage() {
  return <ServicePageTemplate {...serviceData} />
}
