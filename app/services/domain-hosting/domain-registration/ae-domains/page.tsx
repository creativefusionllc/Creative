import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: ".ae Domain Registration Dubai | UAE Domains | Creative Fusion LLC",
  description:
    "Register .ae domains for UAE businesses. Establish local presence with the official UAE country code domain extension.",
  keywords: [".ae domain registration", "uae domain", "dubai domain", "emirates domain"],
}

export default function AeDomainsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
      }}
      title=".ae Domain Registration"
      subtitle="UAE's Official Country Code"
      description="Register your .ae domain - the official country code for the United Arab Emirates. Perfect for businesses targeting UAE customers and establishing local credibility."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "UAE local presence",
        "Higher local search ranking",
        "Customer trust & credibility",
        "Trade license verification",
        "DNS management included",
        "Priority UAE support",
      ]}
      process={[
        { step: 1, title: "Verify", description: "Submit trade license for verification" },
        { step: 2, title: "Register", description: "Complete domain registration" },
        { step: 3, title: "Configure", description: "Set up DNS and email" },
        { step: 4, title: "Activate", description: "Domain goes live within 24 hours" },
      ]}
      pricing={{
        startingFrom: "AED 150/year",
        includes: [
          "1 year registration",
          "WHOIS privacy",
          "DNS management",
          "Email forwarding",
          "UAE support team",
          "Trade license assistance",
        ],
      }}
      faqs={[
        {
          question: "What documents are required?",
          answer:
            "You need a valid UAE trade license to register a .ae domain. We assist with the verification process.",
        },
        {
          question: "How long does verification take?",
          answer: "Typically 24-48 hours after document submission. We expedite the process for urgent requests.",
        },
        {
          question: "Can individuals register .ae domains?",
          answer: "Yes, UAE residents with valid Emirates ID can register .ae domains for personal use.",
        },
      ]}
      relatedCategories={[
        { title: ".com Domains", href: "/services/domain-hosting/domain-registration/com-domains" },
        { title: ".co Domains", href: "/services/domain-hosting/domain-registration/co-domains" },
        { title: "Premium Domains", href: "/services/domain-hosting/domain-registration/premium-domains" },
      ]}
    />
  )
}
