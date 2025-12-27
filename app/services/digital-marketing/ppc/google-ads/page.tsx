import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Google Ads | PPC Advertising | Creative Fusion",
  description: "Google Ads management services. Search, Display, and Shopping campaigns that drive ROI.",
}

export default function GoogleAdsPage() {
  return (
    <CategoryPageTemplate
      title="Google Ads"
      subtitle="Reach Customers When They Search"
      description="Google Ads puts your business in front of customers actively searching for your products or services. We manage campaigns that maximize ROI."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "PPC Advertising", href: "/services/digital-marketing/ppc" }}
      heroImage="/google-ads-ppc-search.jpg"
      benefits={[
        { title: "Intent", description: "Reach active searchers" },
        { title: "Measurable", description: "Track every conversion" },
        { title: "Scalable", description: "Grow with budget" },
        { title: "Fast", description: "Immediate visibility" },
      ]}
      process={[
        { step: 1, title: "Audit", description: "Account analysis" },
        { step: 2, title: "Strategy", description: "Campaign structure" },
        { step: 3, title: "Setup", description: "Campaign creation" },
        { step: 4, title: "Optimize", description: "Continuous improvement" },
        { step: 5, title: "Report", description: "Performance reporting" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 2,500/mo",
          features: ["Search Campaigns", "Up to AED 10K Spend", "Weekly Optimization"],
          popular: false,
        },
        {
          name: "Growth",
          price: "AED 5,000/mo",
          features: ["Search + Display", "Up to AED 30K Spend", "Daily Optimization"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 10,000/mo",
          features: ["Full Suite", "Unlimited Spend", "Dedicated Manager"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How much should I spend?",
          answer: "Start with AED 5,000-10,000/month to gather meaningful data, then scale based on ROI.",
        },
        {
          question: "How fast will I see results?",
          answer: "Ads start showing immediately; optimization for best ROI takes 2-3 months.",
        },
      ]}
      relatedCategories={[
        { name: "Meta Ads", href: "/services/digital-marketing/ppc/meta-ads" },
        { name: "YouTube Ads", href: "/services/digital-marketing/ppc/youtube-ads" },
        { name: "SEO Services", href: "/services/digital-marketing/seo" },
      ]}
    />
  )
}
