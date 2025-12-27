import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Testimonial Ads | TV Commercials | Creative Fusion",
  description: "Customer testimonial commercial production. Real stories that build trust and credibility.",
}

export default function TestimonialAdsPage() {
  return (
    <CategoryPageTemplate
      title="Testimonial Ads"
      subtitle="Real Stories, Real Impact"
      description="Testimonial ads feature real customers sharing authentic experiences. Nothing builds trust like genuine customer stories."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "TV Commercials", href: "/services/videography/tv-commercials" }}
      heroImage="/testimonial-commercial-filming.jpg"
      benefits={[
        { title: "Trust", description: "Third-party credibility" },
        { title: "Authenticity", description: "Real customer voices" },
        { title: "Relatability", description: "Prospects see themselves" },
        { title: "Conversion", description: "Proven to increase sales" },
      ]}
      process={[
        { step: 1, title: "Selection", description: "Identifying best customers" },
        { step: 2, title: "Preparation", description: "Interview preparation" },
        { step: 3, title: "Filming", description: "Professional interviews" },
        { step: 4, title: "Editing", description: "Compelling story assembly" },
        { step: 5, title: "Compliance", description: "Release and approvals" },
      ]}
      pricing={[
        {
          name: "Single",
          price: "AED 8,000",
          features: ["1 Testimonial", "30-sec Edit", "On-location"],
          popular: false,
        },
        {
          name: "Multi",
          price: "AED 20,000",
          features: ["3 Testimonials", "45-sec Compilation", "B-roll Footage"],
          popular: true,
        },
        {
          name: "Campaign",
          price: "AED 45,000",
          features: ["6 Testimonials", "Multiple Edits", "Social Cuts", "Photography"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How do you find customers to feature?",
          answer: "We help identify satisfied customers and guide the selection process.",
        },
        {
          question: "Do customers need to be on camera?",
          answer: "Yes, but we make them comfortable and coach them through the process.",
        },
      ]}
      relatedCategories={[
        { name: "Service Ads", href: "/services/videography/tv-commercials/service-ads" },
        { name: "Corporate Videos", href: "/services/videography/corporate-videos/testimonials" },
        { name: "Brand Commercials", href: "/services/videography/tv-commercials/brand-commercials" },
      ]}
    />
  )
}
