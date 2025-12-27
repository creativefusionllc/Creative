import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "WordPress Hosting Dubai | Managed WP Hosting | Creative Fusion LLC",
  description:
    "Optimized WordPress hosting in Dubai UAE. Pre-configured, secure, and lightning-fast hosting for WordPress websites.",
  keywords: ["wordpress hosting dubai", "managed wp hosting uae", "wordpress server"],
}

export default function WordPressHostingPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Web Hosting", href: "/services/domain-hosting/web-hosting" },
      }}
      title="WordPress Hosting"
      subtitle="Optimized for WP"
      description="Hosting specifically optimized for WordPress. Pre-configured caching, automatic updates, and expert WordPress support."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "WordPress pre-installed",
        "Automatic updates",
        "Built-in caching",
        "Staging environment",
        "Daily backups",
        "WordPress experts",
      ]}
      process={[
        { step: 1, title: "Choose", description: "Select WP plan" },
        { step: 2, title: "Install", description: "One-click WP setup" },
        { step: 3, title: "Migrate", description: "Free site migration" },
        { step: 4, title: "Optimize", description: "Performance tuning" },
      ]}
      pricing={{
        startingFrom: "AED 79/month",
        includes: [
          "WordPress pre-installed",
          "LiteSpeed caching",
          "Free SSL",
          "Staging site",
          "Daily backups",
          "Malware scanning",
        ],
      }}
      faqs={[
        {
          question: "Is WordPress pre-installed?",
          answer: "Yes, WordPress comes pre-installed with optimized settings for best performance.",
        },
        {
          question: "Do you handle updates?",
          answer: "Yes, we automatically update WordPress core, themes, and plugins with testing.",
        },
        {
          question: "Can I install any plugins?",
          answer: "Yes, you have full access to install any plugins. We provide recommendations for best performance.",
        },
      ]}
      relatedCategories={[
        { title: "Shared Hosting", href: "/services/domain-hosting/web-hosting/shared-hosting" },
        { title: "Cloud Hosting", href: "/services/domain-hosting/web-hosting/cloud-hosting" },
        { title: "E-Commerce Hosting", href: "/services/domain-hosting/web-hosting/ecommerce-hosting" },
      ]}
    />
  )
}
