import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Remarketing | PPC Advertising | Creative Fusion",
  description: "Remarketing and retargeting services. Re-engage website visitors and increase conversions.",
}

export default function RemarketingPage() {
  return (
    <CategoryPageTemplate
      title="Remarketing"
      subtitle="Re-engage Your Visitors"
      description="Remarketing shows ads to people who have visited your website or interacted with your brand, bringing them back to convert."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "PPC Advertising", href: "/services/digital-marketing/ppc" }}
      heroImage="/remarketing-retargeting-ads.jpg"
      benefits={[
        { title: "Recovery", description: "Win back visitors" },
        { title: "ROI", description: "Higher conversion rates" },
        { title: "Awareness", description: "Stay top of mind" },
        { title: "Precision", description: "Target by behavior" },
      ]}
      process={[
        { step: 1, title: "Tracking", description: "Pixel implementation" },
        { step: 2, title: "Audiences", description: "Segment creation" },
        { step: 3, title: "Creative", description: "Relevant ad content" },
        { step: 4, title: "Funnel", description: "Sequential messaging" },
        { step: 5, title: "Optimize", description: "Frequency and timing" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 1,500/mo",
          features: ["Standard Remarketing", "Up to AED 5K Spend", "Basic Audiences"],
          popular: false,
        },
        {
          name: "Advanced",
          price: "AED 3,500/mo",
          features: ["Dynamic Remarketing", "Multi-platform", "Custom Audiences"],
          popular: true,
        },
        {
          name: "Full Funnel",
          price: "AED 6,000/mo",
          features: ["Complete Strategy", "All Platforms", "Sequential Ads"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How long should remarketing last?",
          answer: "Typically 30-90 days, depending on your sales cycle.",
        },
        {
          question: "Is remarketing creepy?",
          answer: "When done right with frequency caps and relevant messaging, it's helpful not creepy.",
        },
      ]}
      relatedCategories={[
        { name: "Google Ads", href: "/services/digital-marketing/ppc/google-ads" },
        { name: "Meta Ads", href: "/services/digital-marketing/ppc/meta-ads" },
        { name: "Display Ads", href: "/services/digital-marketing/ppc/display-ads" },
      ]}
    />
  )
}
