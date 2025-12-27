import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Market Research",
  subtitle: "Marketing Strategy",
  description: "Gain deep insights into your market, competitors, and customers to make informed strategic decisions.",
  heroImage: "/market-research-analysis-data.jpg",
  features: [
    { title: "Competitor Analysis", description: "Understand competitive landscape", icon: "users" },
    { title: "Customer Research", description: "Deep customer insights", icon: "user-check" },
    { title: "Market Sizing", description: "Quantify market opportunity", icon: "bar-chart" },
    { title: "Trend Analysis", description: "Identify market trends", icon: "trending-up" },
    { title: "Survey Design", description: "Custom research surveys", icon: "clipboard" },
    { title: "Focus Groups", description: "Qualitative insights", icon: "message-circle" },
  ],
  process: [
    { step: 1, title: "Define", description: "Clarify research objectives" },
    { step: 2, title: "Collect", description: "Gather primary and secondary data" },
    { step: 3, title: "Analyze", description: "Extract meaningful insights" },
    { step: 4, title: "Report", description: "Deliver actionable recommendations" },
  ],
  benefits: [
    "Data-driven decisions",
    "Reduced market risk",
    "Identify opportunities",
    "Understand customer needs",
    "Competitive intelligence",
    "Strategic clarity",
  ],
  faqs: [
    {
      question: "What research methods do you use?",
      answer: "Surveys, interviews, focus groups, data analysis, and competitive intelligence.",
    },
    {
      question: "How long does market research take?",
      answer: "Typically 4-8 weeks depending on scope and complexity.",
    },
    {
      question: "Do you provide actionable recommendations?",
      answer: "Yes, all research includes strategic recommendations.",
    },
  ],
}

export const metadata = {
  title: "Market Research Services | Marketing Strategy | Creative Fusion",
  description: serviceData.description,
}

export default function MarketResearchPage() {
  return <ServicePageTemplate {...serviceData} />
}
