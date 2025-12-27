import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Meta Ads | PPC Advertising | Creative Fusion",
  description: "Meta (Facebook & Instagram) advertising services. Visual ads that drive awareness and conversions.",
}

export default function MetaAdsPage() {
  return (
    <CategoryPageTemplate
      title="Meta Ads"
      subtitle="Facebook & Instagram Advertising"
      description="Meta Ads reach 3+ billion users across Facebook and Instagram. We create and manage campaigns that build awareness, engagement, and drive conversions."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "PPC Advertising", href: "/services/digital-marketing/ppc" }}
      heroImage="/meta-ads-facebook-instagram.jpg"
      benefits={[
        { title: "Reach", description: "3+ billion users" },
        { title: "Targeting", description: "Precise audience options" },
        { title: "Visual", description: "Image and video ads" },
        { title: "Retargeting", description: "Powerful remarketing" },
      ]}
      process={[
        { step: 1, title: "Audience", description: "Define target audiences" },
        { step: 2, title: "Creative", description: "Ad design and copy" },
        { step: 3, title: "Setup", description: "Campaign structure" },
        { step: 4, title: "Test", description: "A/B testing" },
        { step: 5, title: "Scale", description: "Optimize and grow" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 2,000/mo",
          features: ["Basic Campaigns", "Up to AED 8K Spend", "Monthly Report"],
          popular: false,
        },
        {
          name: "Growth",
          price: "AED 4,500/mo",
          features: ["Full Funnel", "Up to AED 25K Spend", "Weekly Optimization"],
          popular: true,
        },
        {
          name: "Scale",
          price: "AED 8,000/mo",
          features: ["Advanced Campaigns", "Unlimited Spend", "Creative Production"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Facebook or Instagram ads?",
          answer: "We typically run across both platforms, letting the algorithm optimize delivery.",
        },
        {
          question: "What ad formats work best?",
          answer: "Video ads and Reels typically outperform static images in engagement and conversions.",
        },
      ]}
      relatedCategories={[
        { name: "Google Ads", href: "/services/digital-marketing/ppc/google-ads" },
        { name: "Instagram Marketing", href: "/services/digital-marketing/social-media/instagram-marketing" },
        { name: "Remarketing", href: "/services/digital-marketing/ppc/remarketing" },
      ]}
    />
  )
}
