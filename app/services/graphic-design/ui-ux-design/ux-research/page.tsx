export const metadata = {
  title: "UX Research Services | Creative Fusion Dubai",
  description:
    "Professional UX research services including user testing, personas, journey mapping, and usability studies. Creative Fusion delivers data-driven UX insights in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function UXResearchPage() {
  return (
    <ServicePageTemplate
      title="UX Research & User Testing"
      description="Make data-driven design decisions with comprehensive UX research, user testing, and behavioral analysis to create products users love."
      category="Graphic Design"
      subcategory="UI/UX Design"
      icon="search"
      features={[
        "User interviews",
        "Usability testing",
        "User persona development",
        "Journey mapping",
        "Competitive analysis",
        "Heuristic evaluation",
        "A/B testing",
        "Analytics analysis",
        "Survey design",
        "Behavioral research",
      ]}
      benefits={[
        "Data-driven decisions",
        "Reduced development risk",
        "Improved user satisfaction",
        "Higher conversion rates",
        "Validated assumptions",
      ]}
      process={[
        "Research planning",
        "User recruitment",
        "Data collection",
        "Analysis and insights",
        "Actionable recommendations",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 3,000",
          features: ["5 user interviews", "Basic personas", "Journey map", "Research report"],
        },
        {
          name: "Professional",
          price: "AED 8,000",
          features: [
            "15 user tests",
            "Detailed personas",
            "Competitive analysis",
            "Usability report",
            "Recommendations",
          ],
        },
        {
          name: "Enterprise",
          price: "AED 20,000",
          features: [
            "Comprehensive research",
            "30+ participants",
            "Video analysis",
            "Ongoing testing",
            "Priority support",
          ],
        },
      ]}
      faqs={[
        {
          question: "Why is UX research important?",
          answer:
            "UX research eliminates guesswork by providing real user insights. It reduces costly redesigns, increases conversion rates, and ensures you build products that solve actual user problems.",
        },
        {
          question: "How many users should participate in testing?",
          answer:
            "For qualitative usability testing, 5-8 users typically uncover 85% of usability issues. For quantitative research, we recommend 30+ participants for statistical significance.",
        },
      ]}
      relatedServices={[
        { name: "Website UI Design", href: "/services/graphic-design/ui-ux-design/website-ui" },
        { name: "Mobile App UI", href: "/services/graphic-design/ui-ux-design/mobile-app-ui" },
        { name: "Conversion Optimization", href: "/services/digital-marketing/conversion-optimization" },
      ]}
    />
  )
}
