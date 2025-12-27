import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "LinkedIn Ads | PPC Advertising | Creative Fusion",
  description: "LinkedIn advertising for B2B businesses. Reach professionals and decision-makers.",
}

export default function LinkedinAdsPage() {
  return (
    <CategoryPageTemplate
      title="LinkedIn Ads"
      subtitle="B2B Advertising"
      description="LinkedIn Ads reach professionals and decision-makers. We create campaigns targeting by job title, company, industry, and more for quality B2B lead generation."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "PPC Advertising", href: "/services/digital-marketing/ppc" }}
      heroImage="/linkedin-ads-b2b-advertising.jpg"
      benefits={[
        { title: "Professional", description: "B2B audience" },
        { title: "Targeting", description: "Job title and company" },
        { title: "Quality", description: "High-value leads" },
        { title: "Authority", description: "Professional context" },
      ]}
      process={[
        { step: 1, title: "ICP", description: "Ideal customer profile" },
        { step: 2, title: "Targeting", description: "Audience building" },
        { step: 3, title: "Creative", description: "Professional ad content" },
        { step: 4, title: "Launch", description: "Campaign activation" },
        { step: 5, title: "Optimize", description: "Lead quality focus" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 3,000/mo",
          features: ["Sponsored Content", "Up to AED 15K Spend", "Monthly Report"],
          popular: false,
        },
        {
          name: "Growth",
          price: "AED 6,000/mo",
          features: ["Full Ad Suite", "Lead Gen Forms", "Weekly Optimization"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 12,000/mo",
          features: ["ABM Campaigns", "InMail", "Dedicated Manager"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Is LinkedIn Ads expensive?",
          answer: "CPCs are higher than other platforms, but lead quality is typically much better for B2B.",
        },
        {
          question: "What audience size is needed?",
          answer: "Minimum 50,000 for most campaigns, though smaller ABM audiences can work.",
        },
      ]}
      relatedCategories={[
        { name: "LinkedIn Marketing", href: "/services/digital-marketing/social-media/linkedin-marketing" },
        { name: "Google Ads", href: "/services/digital-marketing/ppc/google-ads" },
        { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
      ]}
    />
  )
}
