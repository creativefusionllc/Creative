import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Blog Writing | Content Marketing | Creative Fusion",
  description: "Professional blog writing services. SEO-optimized content that drives organic traffic.",
}

export default function BlogWritingPage() {
  return (
    <CategoryPageTemplate
      title="Blog Writing"
      subtitle="Content That Ranks"
      description="Consistent, quality blog content drives organic traffic and establishes authority. We create SEO-optimized articles that attract and engage your target audience."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "Content Marketing", href: "/services/digital-marketing/content-marketing" }}
      heroImage="/blog-writing-content-seo.jpg"
      benefits={[
        { title: "Traffic", description: "Organic visitors" },
        { title: "SEO", description: "Search rankings" },
        { title: "Authority", description: "Industry expertise" },
        { title: "Leads", description: "Content conversions" },
      ]}
      process={[
        { step: 1, title: "Strategy", description: "Topic research" },
        { step: 2, title: "Keywords", description: "SEO targeting" },
        { step: 3, title: "Writing", description: "Expert content creation" },
        { step: 4, title: "Edit", description: "Quality assurance" },
        { step: 5, title: "Publish", description: "Optimization and posting" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 2,000/mo",
          features: ["4 Articles", "1,000 words each", "Basic SEO"],
          popular: false,
        },
        {
          name: "Growth",
          price: "AED 4,500/mo",
          features: ["8 Articles", "1,500 words each", "Full SEO", "Images"],
          popular: true,
        },
        {
          name: "Authority",
          price: "AED 8,000/mo",
          features: ["12 Articles", "2,000+ words", "Research-backed", "Promotion"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How long should blog posts be?",
          answer: "1,500-2,500 words typically performs best for SEO and engagement.",
        },
        { question: "How often should we publish?", answer: "2-4 times per week for optimal organic growth." },
      ]}
      relatedCategories={[
        { name: "SEO Services", href: "/services/digital-marketing/seo" },
        { name: "Copywriting", href: "/services/digital-marketing/content-marketing/copywriting" },
        { name: "Social Media", href: "/services/digital-marketing/social-media" },
      ]}
    />
  )
}
