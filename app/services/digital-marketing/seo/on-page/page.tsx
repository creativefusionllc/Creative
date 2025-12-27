import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "On-Page SEO | SEO Services | Creative Fusion",
  description: "On-page SEO optimization services. Optimize content, meta tags, and structure for search rankings.",
}

export default function OnPagePage() {
  return (
    <CategoryPageTemplate
      title="On-Page SEO"
      subtitle="Optimize Your Website Content"
      description="On-page SEO optimizes individual web pages to rank higher in search results. We enhance content, meta tags, headings, and internal linking for maximum visibility."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "SEO Services", href: "/services/digital-marketing/seo" }}
      heroImage="/on-page-seo-optimization.jpg"
      benefits={[
        { title: "Rankings", description: "Higher search positions" },
        { title: "Relevance", description: "Match search intent" },
        { title: "Click-through", description: "Better meta descriptions" },
        { title: "Structure", description: "Organized content" },
      ]}
      process={[
        { step: 1, title: "Audit", description: "Current page analysis" },
        { step: 2, title: "Keywords", description: "Target keyword mapping" },
        { step: 3, title: "Optimization", description: "Content and meta updates" },
        { step: 4, title: "Structure", description: "Headings and internal links" },
        { step: 5, title: "Monitor", description: "Track improvements" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 2,000",
          features: ["10 Pages", "Meta Optimization", "Basic Report"],
          popular: false,
        },
        {
          name: "Business",
          price: "AED 5,000",
          features: ["30 Pages", "Content Optimization", "Schema Markup"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 12,000",
          features: ["100+ Pages", "Full Optimization", "Monthly Updates"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is on-page SEO?",
          answer:
            "On-page SEO refers to optimizing elements within your web pages like content, meta tags, and structure.",
        },
        {
          question: "How long until I see results?",
          answer: "Typically 2-4 months for significant ranking improvements.",
        },
      ]}
      relatedCategories={[
        { name: "Off-Page SEO", href: "/services/digital-marketing/seo/off-page" },
        { name: "Technical SEO", href: "/services/digital-marketing/seo/technical" },
        { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
      ]}
    />
  )
}
