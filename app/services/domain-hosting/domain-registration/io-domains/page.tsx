import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: ".io Domain Registration Dubai | Tech Startup Domains | Creative Fusion LLC",
  description:
    "Register .io domains in Dubai UAE. The preferred choice for tech startups, SaaS companies, and innovative businesses.",
  keywords: [".io domain dubai", "tech startup domain", "saas domain uae"],
}

export default function IoDomainsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
      }}
      title=".io Domain Registration"
      subtitle="The Tech Industry Favorite"
      description="Register your .io domain - the preferred choice for tech startups, SaaS companies, and innovative businesses. Short, memorable, and instantly recognizable in the tech world."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "Tech industry recognition",
        "Short & memorable",
        "No restrictions",
        "Free WHOIS privacy",
        "Instant activation",
        "Global availability",
      ]}
      process={[
        { step: 1, title: "Search", description: "Find your perfect .io domain" },
        { step: 2, title: "Register", description: "Instant registration" },
        { step: 3, title: "Configure", description: "Set up DNS settings" },
        { step: 4, title: "Launch", description: "Go live immediately" },
      ]}
      pricing={{
        startingFrom: "AED 180/year",
        includes: [
          "1 year registration",
          "WHOIS privacy free",
          "DNS management",
          "Email forwarding",
          "SSL ready",
          "24/7 support",
        ],
      }}
      faqs={[
        {
          question: "Why choose .io for my startup?",
          answer: ".io is widely recognized in the tech industry and gives your brand instant tech credibility.",
        },
        {
          question: "Are there any restrictions?",
          answer: "No restrictions. Anyone can register a .io domain regardless of location or business type.",
        },
        {
          question: "Can I use .io for non-tech businesses?",
          answer: "While popular with tech, .io works great for any modern, innovative business.",
        },
      ]}
      relatedCategories={[
        { title: ".com Domains", href: "/services/domain-hosting/domain-registration/com-domains" },
        { title: ".co Domains", href: "/services/domain-hosting/domain-registration/co-domains" },
        { title: ".ae Domains", href: "/services/domain-hosting/domain-registration/ae-domains" },
      ]}
    />
  )
}
