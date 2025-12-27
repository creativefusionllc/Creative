import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Off-Page SEO | SEO Services | Creative Fusion",
  description: "Off-page SEO and link building services. Build authority through quality backlinks.",
}

export default function OffPagePage() {
  return (
    <CategoryPageTemplate
      title="Off-Page SEO"
      subtitle="Build Domain Authority"
      description="Off-page SEO builds your website's authority through quality backlinks, brand mentions, and online presence. We use white-hat strategies for sustainable growth."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "SEO Services", href: "/services/digital-marketing/seo" }}
      heroImage="/off-page-seo-backlinks.jpg"
      benefits={[
        { title: "Authority", description: "Increase domain strength" },
        { title: "Trust", description: "Build credibility signals" },
        { title: "Rankings", description: "Improve positions" },
        { title: "Traffic", description: "Referral visitors" },
      ]}
      process={[
        { step: 1, title: "Analysis", description: "Backlink profile audit" },
        { step: 2, title: "Strategy", description: "Link building plan" },
        { step: 3, title: "Outreach", description: "Quality link acquisition" },
        { step: 4, title: "Content", description: "Linkable asset creation" },
        { step: 5, title: "Monitor", description: "Track authority growth" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 3,000/mo",
          features: ["5 Quality Links", "Directory Submissions", "Monthly Report"],
          popular: false,
        },
        {
          name: "Growth",
          price: "AED 6,000/mo",
          features: ["15 Quality Links", "Guest Posts", "PR Outreach"],
          popular: true,
        },
        {
          name: "Authority",
          price: "AED 12,000/mo",
          features: ["30+ Quality Links", "Premium Placements", "Brand Building"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What makes a quality backlink?",
          answer: "Links from relevant, authoritative websites in your industry with natural anchor text.",
        },
        {
          question: "Are your methods safe?",
          answer: "Yes, we only use white-hat, Google-approved link building strategies.",
        },
      ]}
      relatedCategories={[
        { name: "On-Page SEO", href: "/services/digital-marketing/seo/on-page" },
        { name: "Local SEO", href: "/services/digital-marketing/seo/local-seo" },
        { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
      ]}
    />
  )
}
