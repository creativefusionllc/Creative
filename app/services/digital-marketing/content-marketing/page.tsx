import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Content Marketing Dubai | Blog & Article Writing | Creative Fusion LLC",
  description:
    "Professional content marketing in Dubai UAE. Blog posts, articles, infographics, and content strategy to drive organic traffic.",
  keywords: ["content marketing dubai", "blog writing uae", "article writing dubai", "content strategy sharjah"],
}

export default function ContentMarketingPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Digital Marketing", href: "/services/digital-marketing" }}
      title="Content Marketing"
      subtitle="Drive Organic Traffic"
      description="Compelling blog posts, articles, infographics, and content that drives organic traffic and establishes authority."
      heroImage="/images/digital-marketing-strategy.png"
      features={[
        { title: "Blog Writing", description: "SEO-optimized articles that rank" },
        { title: "Content Strategy", description: "Editorial calendar and topic planning" },
        { title: "Infographics", description: "Visual content that gets shared" },
        { title: "Whitepapers & Ebooks", description: "Lead generation content" },
        { title: "Case Studies", description: "Success stories that convert" },
        { title: "Video Scripts", description: "Engaging video content writing" },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 2,500/mo",
          description: "4 articles/month",
          features: ["4 blog posts", "Keyword research", "SEO optimization", "1 infographic"],
        },
        {
          name: "Growth",
          price: "AED 5,000/mo",
          description: "8 articles/month",
          features: ["8 blog posts", "Content strategy", "Social snippets", "2 infographics", "Email newsletter"],
          popular: true,
        },
        {
          name: "Authority",
          price: "AED 10,000/mo",
          description: "Full content suite",
          features: ["16 blog posts", "Whitepaper/ebook", "Case studies", "Video scripts", "Guest posting"],
        },
      ]}
      relatedSubServices={[
        { title: "SEO Services", href: "/services/digital-marketing/seo" },
        { title: "Social Media Marketing", href: "/services/digital-marketing/social-media" },
      ]}
    />
  )
}
