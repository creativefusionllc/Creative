import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Personal Branding Photography | Corporate Photography | Creative Fusion",
  description: "Build your personal brand with professional photography for entrepreneurs and professionals.",
}

export default function PersonalBrandingPage() {
  return (
    <CategoryPageTemplate
      title="Personal Branding Photography"
      description="Elevate your personal brand with a complete visual identity package for entrepreneurs, coaches, and thought leaders."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Corporate Photography", href: "/services/photography/corporate" }}
      heroImage="/personal-branding-photography-entrepreneur.jpg"
      benefits={[
        { title: "Authentic Storytelling", description: "Images that tell your unique story" },
        { title: "Social Media Ready", description: "Content optimized for all platforms" },
        { title: "Website Assets", description: "Complete image library for your site" },
        { title: "Consistent Identity", description: "Cohesive visual brand across all channels" },
      ]}
      process={[
        { step: 1, title: "Brand Discovery", description: "Understand your brand values and audience" },
        { step: 2, title: "Mood Board", description: "Create visual direction" },
        { step: 3, title: "Location Scouting", description: "Find perfect settings" },
        { step: 4, title: "Photo Session", description: "Capture varied content" },
        { step: 5, title: "Delivery", description: "Curated image library" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 1,500",
          features: ["2-hour session", "20 edited photos", "1 location", "Social media sizes"],
        },
        {
          name: "Growth",
          price: "AED 3,000",
          features: ["Half-day session", "50 edited photos", "2 locations", "Website + social"],
          popular: true,
        },
        {
          name: "Authority",
          price: "AED 5,500",
          features: ["Full-day session", "100+ photos", "3 locations", "Video clips included"],
        },
      ]}
      faqs={[
        {
          question: "What's included in personal branding?",
          answer: "Headshots, lifestyle shots, working shots, and environmental portraits.",
        },
        {
          question: "How often should I update my brand photos?",
          answer: "We recommend updating every 1-2 years or when your brand evolves.",
        },
      ]}
      relatedCategories={[
        { name: "Business Portraits", href: "/services/photography/corporate/business-portraits" },
        { name: "Headshots", href: "/services/photography/corporate/headshots" },
        { name: "Lifestyle Shots", href: "/services/photography/corporate/lifestyle" },
      ]}
    />
  )
}
