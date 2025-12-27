import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Seasonal Campaigns | TV Commercials | Creative Fusion",
  description: "Seasonal and holiday TV commercial production. Timely ads for festive and promotional periods.",
}

export default function SeasonalCampaignsPage() {
  return (
    <CategoryPageTemplate
      title="Seasonal Campaigns"
      subtitle="Timely, Impactful Advertising"
      description="Seasonal commercials capitalize on holidays, events, and promotional periods. We create timely ads that resonate with current consumer mindsets."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "TV Commercials", href: "/services/videography/tv-commercials" }}
      heroImage="/seasonal-holiday-commercial.jpg"
      benefits={[
        { title: "Relevance", description: "Timely messaging" },
        { title: "Urgency", description: "Drive immediate action" },
        { title: "Emotion", description: "Holiday sentiment" },
        { title: "Sales", description: "Peak period conversions" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Calendar alignment" },
        { step: 2, title: "Theme", description: "Seasonal concept development" },
        { step: 3, title: "Pre-production", description: "Advanced preparation" },
        { step: 4, title: "Production", description: "Themed filming" },
        { step: 5, title: "Fast Delivery", description: "Timeline-driven completion" },
      ]}
      pricing={[
        {
          name: "Single Season",
          price: "AED 20,000",
          features: ["1 Commercial", "30-sec", "Quick Turnaround"],
          popular: false,
        },
        {
          name: "Quarterly",
          price: "AED 60,000",
          features: ["4 Commercials", "Seasonal Themes", "Social Versions"],
          popular: true,
        },
        {
          name: "Annual",
          price: "AED 180,000",
          features: ["12 Commercials", "All Major Seasons", "Campaign Strategy", "Priority Production"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How far in advance should we plan?",
          answer: "We recommend 6-8 weeks lead time for seasonal campaigns.",
        },
        {
          question: "What seasons do you cover?",
          answer: "Ramadan, Eid, National Days, New Year, Summer, Back-to-School, and custom occasions.",
        },
      ]}
      relatedCategories={[
        { name: "Brand Commercials", href: "/services/videography/tv-commercials/brand-commercials" },
        { name: "Product Ads", href: "/services/videography/tv-commercials/product-ads" },
        { name: "Social Media Content", href: "/services/videography/social-media-content" },
      ]}
    />
  )
}
