import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Brand Guidelines",
  subtitle: "Brand Strategy",
  description: "Create comprehensive brand guidelines that ensure consistency across all touchpoints and teams.",
  heroImage: "/brand-guidelines-style-guide-book.jpg",
  features: [
    { title: "Visual Standards", description: "Logo, colors, typography rules", icon: "palette" },
    { title: "Voice & Tone", description: "Communication guidelines", icon: "mic" },
    { title: "Usage Rules", description: "Dos and donts", icon: "check-circle" },
    { title: "Templates", description: "Ready-to-use assets", icon: "file" },
    { title: "Digital Guidelines", description: "Online brand standards", icon: "monitor" },
    { title: "Training Materials", description: "Team education", icon: "book" },
  ],
  process: [
    { step: 1, title: "Document", description: "Capture all brand elements" },
    { step: 2, title: "Systematize", description: "Create rules and standards" },
    { step: 3, title: "Design", description: "Produce guideline document" },
    { step: 4, title: "Train", description: "Educate teams on usage" },
  ],
  benefits: [
    "Brand consistency",
    "Faster content creation",
    "Reduced brand errors",
    "Easier onboarding",
    "Protected brand integrity",
    "Professional appearance",
  ],
  faqs: [
    {
      question: "What is included in brand guidelines?",
      answer: "Logo usage, colors, typography, imagery, voice, and application examples.",
    },
    {
      question: "Do you provide digital or print guidelines?",
      answer: "Both - interactive digital guides and print-ready PDFs.",
    },
    { question: "How do we ensure guidelines are followed?", answer: "We provide training and easy-to-use templates." },
  ],
}

export const metadata = {
  title: "Brand Guidelines Services | Brand Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function BrandGuidelinesPage() {
  return <ServicePageTemplate {...serviceData} />
}
