import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: ".com Domain Registration Dubai | Buy .com Domains | Creative Fusion LLC",
  description:
    "Register .com domains in Dubai UAE. The world's most recognized domain extension with free privacy protection and DNS management.",
  keywords: [".com domain dubai", "buy .com domain uae", "domain registration"],
}

export default function ComDomainsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
      }}
      title=".com Domain Registration"
      subtitle="The World's Most Trusted Extension"
      description="Register your .com domain - the most recognized and trusted domain extension worldwide. Perfect for businesses targeting a global audience."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "Global recognition & trust",
        "Free WHOIS privacy protection",
        "DNS management included",
        "Email forwarding setup",
        "Auto-renewal available",
        "24/7 support",
      ]}
      process={[
        { step: 1, title: "Search", description: "Check domain availability instantly" },
        { step: 2, title: "Register", description: "Secure your domain with payment" },
        { step: 3, title: "Configure", description: "Set up DNS and email forwarding" },
        { step: 4, title: "Go Live", description: "Connect to your website or hosting" },
      ]}
      pricing={{
        startingFrom: "AED 55/year",
        includes: [
          "1 year registration",
          "WHOIS privacy free",
          "DNS management",
          "Email forwarding",
          "Domain lock protection",
          "24/7 support",
        ],
      }}
      faqs={[
        {
          question: "How long does registration take?",
          answer: "Registration is instant. Your domain will be active within minutes of payment confirmation.",
        },
        {
          question: "Can I transfer my domain later?",
          answer: "Yes, you can transfer your domain to another registrar after 60 days of registration.",
        },
        {
          question: "Is WHOIS privacy included?",
          answer: "Yes, we provide free WHOIS privacy protection with all .com domain registrations.",
        },
      ]}
      relatedCategories={[
        { title: ".ae Domains", href: "/services/domain-hosting/domain-registration/ae-domains" },
        { title: ".io Domains", href: "/services/domain-hosting/domain-registration/io-domains" },
        { title: "Premium Domains", href: "/services/domain-hosting/domain-registration/premium-domains" },
      ]}
    />
  )
}
