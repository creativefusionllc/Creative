import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Technical SEO | SEO Services | Creative Fusion",
  description: "Technical SEO services. Site speed, crawlability, indexing, and core web vitals optimization.",
}

export default function TechnicalPage() {
  return (
    <CategoryPageTemplate
      title="Technical SEO"
      subtitle="Optimize Your Foundation"
      description="Technical SEO ensures search engines can efficiently crawl, index, and rank your website. We optimize site speed, structure, and technical elements."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "SEO Services", href: "/services/digital-marketing/seo" }}
      heroImage="/technical-seo-audit.jpg"
      benefits={[
        { title: "Crawlability", description: "Search engines find content" },
        { title: "Speed", description: "Faster page loads" },
        { title: "Mobile", description: "Mobile optimization" },
        { title: "Indexing", description: "All pages indexed" },
      ]}
      process={[
        { step: 1, title: "Audit", description: "Technical site analysis" },
        { step: 2, title: "Issues", description: "Identify problems" },
        { step: 3, title: "Fixes", description: "Implement solutions" },
        { step: 4, title: "Speed", description: "Performance optimization" },
        { step: 5, title: "Monitor", description: "Ongoing maintenance" },
      ]}
      pricing={[
        {
          name: "Audit",
          price: "AED 2,500",
          features: ["Full Technical Audit", "Priority Issues", "Recommendations"],
          popular: false,
        },
        {
          name: "Implementation",
          price: "AED 6,000",
          features: ["Audit + Fixes", "Speed Optimization", "Schema Setup"],
          popular: true,
        },
        {
          name: "Ongoing",
          price: "AED 4,000/mo",
          features: ["Monthly Monitoring", "Continuous Optimization", "Core Web Vitals"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is technical SEO?",
          answer:
            "Technical SEO focuses on website infrastructure - speed, crawlability, security, and mobile optimization.",
        },
        {
          question: "How often should we audit?",
          answer: "Quarterly audits are recommended, with continuous monitoring for issues.",
        },
      ]}
      relatedCategories={[
        { name: "On-Page SEO", href: "/services/digital-marketing/seo/on-page" },
        { name: "Site Speed", href: "/services/web-development/cloud-hosting/performance" },
        { name: "Web Development", href: "/services/web-development" },
      ]}
    />
  )
}
