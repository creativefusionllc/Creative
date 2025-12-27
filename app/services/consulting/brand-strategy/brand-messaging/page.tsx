import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Brand Messaging",
  subtitle: "Brand Strategy",
  description: "Develop compelling brand messages that communicate your value and connect emotionally with audiences.",
  heroImage: "/brand-messaging-copywriting.jpg",
  features: [
    { title: "Message Strategy", description: "Define key messages", icon: "message-circle" },
    { title: "Tone of Voice", description: "Establish brand voice", icon: "mic" },
    { title: "Taglines", description: "Memorable brand lines", icon: "type" },
    { title: "Value Propositions", description: "Communicate value", icon: "award" },
    { title: "Story Framework", description: "Brand storytelling", icon: "book-open" },
    { title: "Message Testing", description: "Validate messaging", icon: "check-circle" },
  ],
  process: [
    { step: 1, title: "Discover", description: "Understand brand and audience" },
    { step: 2, title: "Create", description: "Develop messaging framework" },
    { step: 3, title: "Test", description: "Validate with target audience" },
    { step: 4, title: "Deploy", description: "Implement across channels" },
  ],
  benefits: [
    "Consistent communication",
    "Stronger emotional connection",
    "Clearer value communication",
    "Better conversion rates",
    "Memorable brand",
    "Aligned team messaging",
  ],
  faqs: [
    {
      question: "What is a messaging framework?",
      answer: "A structured guide for all brand communications and key messages.",
    },
    {
      question: "Do you write copy or just strategy?",
      answer: "We provide both strategic frameworks and copywriting services.",
    },
    { question: "How do you test messaging?", answer: "Through surveys, A/B testing, and focus groups." },
  ],
}

export const metadata = {
  title: "Brand Messaging Services | Brand Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function BrandMessagingPage() {
  return <ServicePageTemplate {...serviceData} />
}
