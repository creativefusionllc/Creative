import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Mascot Logo Design | Creative Branding | Creative Fusion",
  description: "Custom mascot logo design services. Create a memorable character to represent your brand.",
}

export default function MascotPage() {
  return (
    <CategoryPageTemplate
      title="Mascot Logo Design"
      subtitle="Character-Based Branding"
      description="Mascot logos feature illustrated characters that become the face of your brand. Perfect for creating friendly, approachable brand personalities."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Logo Design", href: "/services/creative-branding/logo-design" }}
      heroImage="/mascot-character-logo-design-illustration.jpg"
      benefits={[
        { title: "Personality", description: "Humanizes your brand" },
        { title: "Engagement", description: "Appeals to all ages" },
        { title: "Storytelling", description: "Creates narrative opportunities" },
        { title: "Memorability", description: "Highly distinctive and memorable" },
      ]}
      process={[
        { step: 1, title: "Character Brief", description: "Defining mascot personality traits" },
        { step: 2, title: "Sketching", description: "Initial character explorations" },
        { step: 3, title: "Character Design", description: "Detailed mascot development" },
        { step: 4, title: "Expressions", description: "Creating pose and emotion variations" },
        { step: 5, title: "Final Package", description: "Complete mascot asset delivery" },
      ]}
      pricing={[
        {
          name: "Basic Mascot",
          price: "AED 3,500",
          features: ["1 Character", "3 Poses", "Vector Files"],
          popular: false,
        },
        {
          name: "Full Mascot",
          price: "AED 6,000",
          features: ["1 Character", "6 Poses", "Expressions Pack", "Animation Ready"],
          popular: true,
        },
        {
          name: "Mascot Suite",
          price: "AED 10,000",
          features: ["1 Character", "12 Poses", "Full Expression Set", "3D Ready", "Style Guide"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is a mascot logo?",
          answer:
            "A mascot logo features an illustrated character that represents your brand, like KFC's Colonel or Pringles' Mr. P.",
        },
        {
          question: "What businesses suit mascot logos?",
          answer:
            "Sports teams, food brands, kids products, and entertainment companies often use mascot logos effectively.",
        },
      ]}
      relatedCategories={[
        { name: "Character Design", href: "/services/creative-branding/logo-design/character" },
        { name: "Illustration Logos", href: "/services/creative-branding/logo-design/illustration" },
        { name: "Combination Logos", href: "/services/creative-branding/logo-design/combination" },
      ]}
    />
  )
}
