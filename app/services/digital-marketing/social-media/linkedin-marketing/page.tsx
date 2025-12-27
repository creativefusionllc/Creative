import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "LinkedIn Marketing | Social Media | Creative Fusion",
  description: "LinkedIn marketing for B2B businesses. Build thought leadership and generate leads.",
}

export default function LinkedinMarketingPage() {
  return (
    <CategoryPageTemplate
      title="LinkedIn Marketing"
      subtitle="B2B Lead Generation"
      description="LinkedIn is the platform for B2B marketing. We build your company's presence and executives' personal brands to generate quality leads."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "Social Media Marketing", href: "/services/digital-marketing/social-media" }}
      heroImage="/linkedin-marketing-b2b.jpg"
      benefits={[
        { title: "B2B", description: "Reach decision-makers" },
        { title: "Authority", description: "Thought leadership" },
        { title: "Leads", description: "Quality lead generation" },
        { title: "Networking", description: "Business relationships" },
      ]}
      process={[
        { step: 1, title: "Profile", description: "Optimize company and personal profiles" },
        { step: 2, title: "Content", description: "Thought leadership content" },
        { step: 3, title: "Network", description: "Connection building" },
        { step: 4, title: "Engage", description: "Community participation" },
        { step: 5, title: "Ads", description: "LinkedIn advertising" },
      ]}
      pricing={[
        {
          name: "Company",
          price: "AED 4,000/mo",
          features: ["Company Page", "12 Posts", "Basic Engagement"],
          popular: false,
        },
        {
          name: "Executive",
          price: "AED 8,000/mo",
          features: ["Personal Brand", "20 Posts", "Ghostwriting", "Networking"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 15,000/mo",
          features: ["Multiple Profiles", "Daily Content", "Lead Gen Campaigns"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Company page vs personal brand?",
          answer: "Personal brands get 10x more reach - focus on executive profiles.",
        },
        {
          question: "What content works on LinkedIn?",
          answer: "Insights, lessons learned, industry trends, and authentic stories.",
        },
      ]}
      relatedCategories={[
        { name: "LinkedIn Ads", href: "/services/digital-marketing/ppc/linkedin-ads" },
        { name: "LinkedIn Videos", href: "/services/videography/social-media-content/linkedin-videos" },
        { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
      ]}
    />
  )
}
