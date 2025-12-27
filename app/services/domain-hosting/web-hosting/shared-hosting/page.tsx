import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Shared Hosting Dubai | Affordable Web Hosting | Creative Fusion LLC",
  description:
    "Affordable shared hosting in Dubai UAE. Perfect for small websites, blogs, and startups with 99.9% uptime guarantee.",
  keywords: ["shared hosting dubai", "cheap hosting uae", "affordable web hosting"],
}

export default function SharedHostingPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Web Hosting", href: "/services/domain-hosting/web-hosting" },
      }}
      title="Shared Hosting"
      subtitle="Affordable & Reliable"
      description="Cost-effective shared hosting perfect for small websites, blogs, and startups. Get enterprise features at budget-friendly prices."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "Budget-friendly pricing",
        "cPanel control panel",
        "One-click app installer",
        "Free SSL certificate",
        "99.9% uptime guarantee",
        "24/7 support",
      ]}
      process={[
        { step: 1, title: "Choose Plan", description: "Select your hosting plan" },
        { step: 2, title: "Setup", description: "Instant account activation" },
        { step: 3, title: "Migrate", description: "Free website migration" },
        { step: 4, title: "Launch", description: "Go live within hours" },
      ]}
      pricing={{
        startingFrom: "AED 49/month",
        includes: [
          "5GB SSD storage",
          "Unlimited bandwidth",
          "Free SSL certificate",
          "cPanel access",
          "Email accounts",
          "Daily backups",
        ],
      }}
      faqs={[
        {
          question: "What is shared hosting?",
          answer:
            "Shared hosting means your website shares server resources with other websites, making it affordable.",
        },
        {
          question: "Is shared hosting secure?",
          answer: "Yes, we implement strict security measures and account isolation to protect your data.",
        },
        {
          question: "Can I upgrade later?",
          answer: "You can upgrade to VPS or dedicated hosting anytime as your needs grow.",
        },
      ]}
      relatedCategories={[
        { title: "VPS Hosting", href: "/services/domain-hosting/web-hosting/vps-hosting" },
        { title: "WordPress Hosting", href: "/services/domain-hosting/web-hosting/wordpress-hosting" },
        { title: "Cloud Hosting", href: "/services/domain-hosting/web-hosting/cloud-hosting" },
      ]}
    />
  )
}
