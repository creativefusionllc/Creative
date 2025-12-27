import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "International SEO | SEO Services | Creative Fusion",
  description: "International SEO services. Multi-language and multi-region search optimization.",
}

export default function InternationalSeoPage() {
  return (
    <CategoryPageTemplate
      title="International SEO"
      subtitle="Go Global"
      description="International SEO helps your website rank in multiple countries and languages, expanding your global reach and market presence."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "SEO Services", href: "/services/digital-marketing/seo" }}
      heroImage="/international-seo-global.jpg"
      benefits={[
        { title: "Global", description: "Multiple markets" },
        { title: "Languages", description: "Multi-language SEO" },
        { title: "Localization", description: "Regional relevance" },
        { title: "Growth", description: "New market entry" },
      ]}
      process={[
        { step: 1, title: "Market Research", description: "Target market analysis" },
        { step: 2, title: "Structure", description: "URL strategy (ccTLD/subdomain)" },
        { step: 3, title: "Hreflang", description: "Language targeting setup" },
        { step: 4, title: "Localization", description: "Content localization" },
        { step: 5, title: "Local Links", description: "Regional link building" },
      ]}
      pricing={[
        {
          name: "Single Market",
          price: "AED 6,000/mo",
          features: ["1 New Market", "Translation SEO", "Local Citations"],
          popular: false,
        },
        {
          name: "Multi-Market",
          price: "AED 12,000/mo",
          features: ["3 Markets", "Full Localization", "Regional Strategy"],
          popular: true,
        },
        {
          name: "Global",
          price: "AED 25,000/mo",
          features: ["5+ Markets", "Enterprise Setup", "Dedicated Team"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is hreflang?",
          answer: "Hreflang tags tell Google which language and region each page version targets.",
        },
        {
          question: "Should I translate or localize?",
          answer: "Localization is better - it adapts content to local culture, not just language.",
        },
      ]}
      relatedCategories={[
        { name: "Technical SEO", href: "/services/digital-marketing/seo/technical" },
        { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
        { name: "Multilingual Websites", href: "/services/web-development/corporate-websites/multilingual" },
      ]}
    />
  )
}
