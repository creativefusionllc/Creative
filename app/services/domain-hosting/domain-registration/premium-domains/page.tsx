import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Premium Domain Acquisition Dubai | High-Value Domains | Creative Fusion LLC",
  description:
    "Acquire premium domain names in Dubai UAE. Expert negotiation and acquisition services for high-value domains.",
  keywords: ["premium domains dubai", "domain acquisition uae", "buy premium domain"],
}

export default function PremiumDomainsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
      }}
      title="Premium Domain Acquisition"
      subtitle="Secure High-Value Domains"
      description="Acquire premium, high-value domain names for your brand. Our expert team handles negotiations, legal transfers, and brand protection strategies."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "Expert negotiation",
        "Legal transfer handling",
        "Escrow protection",
        "Brand protection advice",
        "Market valuation",
        "Confidential acquisition",
      ]}
      process={[
        { step: 1, title: "Valuation", description: "Assess domain market value" },
        { step: 2, title: "Negotiate", description: "Expert negotiation with seller" },
        { step: 3, title: "Escrow", description: "Secure payment via escrow" },
        { step: 4, title: "Transfer", description: "Complete legal domain transfer" },
      ]}
      pricing={{
        startingFrom: "Custom Quote",
        includes: [
          "Domain valuation",
          "Negotiation service",
          "Escrow handling",
          "Legal documentation",
          "Transfer assistance",
          "Post-acquisition support",
        ],
      }}
      faqs={[
        {
          question: "How long does acquisition take?",
          answer: "Typically 2-8 weeks depending on seller responsiveness and negotiation complexity.",
        },
        {
          question: "What's the success rate?",
          answer: "We have an 85% success rate in acquiring targeted premium domains.",
        },
        {
          question: "Is the process confidential?",
          answer: "Yes, we can act as a blind agent to keep your identity confidential during negotiations.",
        },
      ]}
      relatedCategories={[
        { title: ".com Domains", href: "/services/domain-hosting/domain-registration/com-domains" },
        { title: "Bulk Registration", href: "/services/domain-hosting/domain-registration/bulk-registration" },
        { title: "Domain Transfer", href: "/services/domain-hosting/domain-transfer" },
      ]}
    />
  )
}
