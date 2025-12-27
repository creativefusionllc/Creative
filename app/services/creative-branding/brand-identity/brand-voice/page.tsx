import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Brand Voice Development | Brand Identity | Creative Fusion",
  description:
    "Define your brand's unique voice and tone. Create consistent messaging that resonates with your audience.",
}

export default function BrandVoicePage() {
  return (
    <CategoryPageTemplate
      title="Brand Voice Development"
      subtitle="Your Brand's Personality in Words"
      description="Brand voice defines how your brand communicates - the tone, language, and personality expressed through all written and spoken content."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Brand Identity", href: "/services/creative-branding/brand-identity" }}
      heroImage="/brand-voice-tone-messaging-communication.jpg"
      benefits={[
        { title: "Consistency", description: "Same voice across all channels" },
        { title: "Connection", description: "Resonate with target audience" },
        { title: "Authenticity", description: "True to brand values" },
        { title: "Differentiation", description: "Unique communication style" },
      ]}
      process={[
        { step: 1, title: "Discovery", description: "Understanding brand personality" },
        { step: 2, title: "Audience Analysis", description: "How your audience speaks" },
        { step: 3, title: "Voice Definition", description: "Defining tone and style" },
        { step: 4, title: "Guidelines", description: "Creating voice documentation" },
        { step: 5, title: "Examples", description: "Sample content in brand voice" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 3,000",
          features: ["Voice Definition", "Tone Guide", "Do's & Don'ts"],
          popular: false,
        },
        {
          name: "Standard",
          price: "AED 6,000",
          features: ["Full Voice System", "Channel Guidelines", "Sample Copy"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 12,000",
          features: ["Complete Voice Strategy", "Content Templates", "Team Training"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is brand voice?",
          answer:
            "Brand voice is the distinct personality your brand expresses through words - whether friendly, professional, playful, or authoritative.",
        },
        {
          question: "Why is brand voice important?",
          answer: "A consistent voice builds trust and recognition, making your brand feel more human and relatable.",
        },
      ]}
      relatedCategories={[
        { name: "Visual Identity", href: "/services/creative-branding/brand-identity/visual-identity" },
        { name: "Brand Messaging", href: "/services/creative-branding/brand-identity/brand-messaging" },
        { name: "Content Strategy", href: "/services/creative-branding/brand-identity/content-strategy" },
      ]}
    />
  )
}
