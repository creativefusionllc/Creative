import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Service Ads | TV Commercials | Creative Fusion",
  description: "Service-focused TV commercial production. Ads that explain benefits and build trust.",
}

export default function ServiceAdsPage() {
  return (
    <CategoryPageTemplate
      title="Service Ads"
      subtitle="Communicate Your Value"
      description="Service ads communicate intangible benefits and build trust. We create commercials that clearly explain your service value proposition."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "TV Commercials", href: "/services/videography/tv-commercials" }}
      heroImage="/service-commercial-filming.jpg"
      benefits={[
        { title: "Clarity", description: "Explain complex services" },
        { title: "Trust", description: "Build credibility" },
        { title: "Differentiation", description: "Stand out from competitors" },
        { title: "Leads", description: "Generate inquiries" },
      ]}
      process={[
        { step: 1, title: "Briefing", description: "Understanding service benefits" },
        { step: 2, title: "Messaging", description: "Key message development" },
        { step: 3, title: "Script", description: "Compelling narrative" },
        { step: 4, title: "Production", description: "Professional filming" },
        { step: 5, title: "Delivery", description: "Multi-format output" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 18,000",
          features: ["30-sec Ad", "1 Location", "Professional VO"],
          popular: false,
        },
        {
          name: "Business",
          price: "AED 35,000",
          features: ["45-sec Ad", "Customer Testimonials", "Graphics Package"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 70,000",
          features: ["60-sec Ad", "Multiple Testimonials", "Animation", "Campaign Series"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How do you make services tangible?",
          answer: "We use customer stories, demonstrations, and visual metaphors to show value.",
        },
        {
          question: "Can you include testimonials?",
          answer: "Yes, customer testimonials are highly effective for service ads.",
        },
      ]}
      relatedCategories={[
        { name: "Testimonial Ads", href: "/services/videography/tv-commercials/testimonial-ads" },
        { name: "Corporate Videos", href: "/services/videography/corporate-videos" },
        { name: "Brand Commercials", href: "/services/videography/tv-commercials/brand-commercials" },
      ]}
    />
  )
}
