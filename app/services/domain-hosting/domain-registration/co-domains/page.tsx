import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: ".co Domain Registration Dubai | Short Domains | Creative Fusion LLC",
  description:
    "Register .co domains in Dubai UAE. Short, memorable alternative to .com perfect for companies and startups.",
  keywords: [".co domain dubai", "short domain uae", "company domain"],
}

export default function CoDomainsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
      }}
      title=".co Domain Registration"
      subtitle="Short & Professional"
      description="Register your .co domain - a short, memorable alternative to .com. Perfect for companies looking for a clean, professional web address."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "Short & memorable",
        "Professional appearance",
        "Global recognition",
        "Free privacy protection",
        "Instant registration",
        "No restrictions",
      ]}
      process={[
        { step: 1, title: "Search", description: "Check .co availability" },
        { step: 2, title: "Register", description: "Secure your domain" },
        { step: 3, title: "Configure", description: "DNS and email setup" },
        { step: 4, title: "Activate", description: "Go live instantly" },
      ]}
      pricing={{
        startingFrom: "AED 120/year",
        includes: [
          "1 year registration",
          "WHOIS privacy",
          "DNS management",
          "Email forwarding",
          "Domain lock",
          "24/7 support",
        ],
      }}
      faqs={[
        {
          question: "Is .co as good as .com?",
          answer: ".co is a great alternative when .com isn't available. Many major companies use .co successfully.",
        },
        {
          question: "What does .co stand for?",
          answer:
            "While it's Colombia's country code, it's marketed globally as representing 'company' or 'corporation'.",
        },
        {
          question: "Can I redirect .co to my .com?",
          answer: "Yes, you can set up redirects or use both domains to point to the same website.",
        },
      ]}
      relatedCategories={[
        { title: ".com Domains", href: "/services/domain-hosting/domain-registration/com-domains" },
        { title: ".io Domains", href: "/services/domain-hosting/domain-registration/io-domains" },
        { title: "Premium Domains", href: "/services/domain-hosting/domain-registration/premium-domains" },
      ]}
    />
  )
}
