import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Brand Commercials | TV Commercials | Creative Fusion",
  description: "Professional brand commercial production. TV ads that build brand awareness and emotional connections.",
}

export default function BrandCommercialsPage() {
  return (
    <CategoryPageTemplate
      title="Brand Commercials"
      subtitle="Build Emotional Connections"
      description="Brand commercials focus on building awareness and emotional connections rather than direct sales. We create cinematic ads that tell your brand story."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "TV Commercials", href: "/services/videography/tv-commercials" }}
      heroImage="/brand-commercial-filming.jpg"
      benefits={[
        { title: "Awareness", description: "Build brand recognition" },
        { title: "Emotion", description: "Connect with audiences" },
        { title: "Storytelling", description: "Share your brand story" },
        { title: "Premium", description: "High production value" },
      ]}
      process={[
        { step: 1, title: "Strategy", description: "Brand messaging alignment" },
        { step: 2, title: "Creative", description: "Concept and script development" },
        { step: 3, title: "Pre-production", description: "Casting, locations, planning" },
        { step: 4, title: "Production", description: "Professional filming" },
        { step: 5, title: "Post-production", description: "Editing, color, sound" },
      ]}
      pricing={[
        {
          name: "Standard",
          price: "AED 25,000",
          features: ["30-sec Commercial", "1 Location", "Basic Cast"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 50,000",
          features: ["60-sec Commercial", "3 Locations", "Professional Cast", "Licensed Music"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 100,000",
          features: ["90-sec Commercial", "Multiple Locations", "Celebrity Option", "Original Score"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "How long does production take?", answer: "Typically 4-8 weeks from concept to final delivery." },
        {
          question: "Do you handle TV placement?",
          answer: "We can coordinate with media agencies for broadcast placement.",
        },
      ]}
      relatedCategories={[
        { name: "Product Ads", href: "/services/videography/tv-commercials/product-ads" },
        { name: "Testimonial Ads", href: "/services/videography/tv-commercials/testimonial-ads" },
        { name: "Corporate Videos", href: "/services/videography/corporate-videos" },
      ]}
    />
  )
}
