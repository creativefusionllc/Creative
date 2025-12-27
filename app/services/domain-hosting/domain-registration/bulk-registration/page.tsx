import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Bulk Domain Registration Dubai | Multiple Domains | Creative Fusion LLC",
  description:
    "Register multiple domains at discounted rates in Dubai UAE. Bulk domain registration for brand protection and portfolio management.",
  keywords: ["bulk domain registration dubai", "multiple domains uae", "domain portfolio"],
}

export default function BulkRegistrationPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
      }}
      title="Bulk Domain Registration"
      subtitle="Protect Your Brand"
      description="Register multiple domains at discounted rates. Perfect for brand protection, securing variations, and building a domain portfolio."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "Volume discounts",
        "Brand protection",
        "Single dashboard management",
        "Bulk renewal options",
        "Portfolio reporting",
        "Dedicated account manager",
      ]}
      process={[
        { step: 1, title: "List", description: "Provide your domain list" },
        { step: 2, title: "Check", description: "Bulk availability check" },
        { step: 3, title: "Quote", description: "Custom bulk pricing" },
        { step: 4, title: "Register", description: "Complete bulk registration" },
      ]}
      pricing={{
        startingFrom: "AED 45/domain",
        includes: [
          "10+ domains discount",
          "WHOIS privacy all",
          "Centralized management",
          "Bulk DNS updates",
          "Auto-renewal setup",
          "Priority support",
        ],
      }}
      faqs={[
        {
          question: "What's the minimum for bulk pricing?",
          answer: "Bulk discounts start at 10+ domains. Larger volumes receive greater discounts.",
        },
        {
          question: "Can I mix different extensions?",
          answer: "Yes, you can include any combination of domain extensions in your bulk order.",
        },
        {
          question: "Do you offer portfolio management?",
          answer: "Yes, we provide full portfolio management with renewal reminders and consolidated billing.",
        },
      ]}
      relatedCategories={[
        { title: ".com Domains", href: "/services/domain-hosting/domain-registration/com-domains" },
        { title: "Premium Domains", href: "/services/domain-hosting/domain-registration/premium-domains" },
        { title: "Domain Transfer", href: "/services/domain-hosting/domain-transfer" },
      ]}
    />
  )
}
