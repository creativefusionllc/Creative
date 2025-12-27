import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Brand Imagery Style | Brand Identity | Creative Fusion",
  description:
    "Define your brand's visual style for photography and graphics. Consistent imagery that tells your brand story.",
}

export default function BrandImageryPage() {
  return (
    <CategoryPageTemplate
      title="Brand Imagery Style"
      subtitle="Visual Storytelling Standards"
      description="Brand imagery guidelines define how photos, illustrations, and graphics should look to maintain consistency and reinforce your brand identity across all visual content."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Brand Identity", href: "/services/creative-branding/brand-identity" }}
      heroImage="/brand-imagery-photography-style-guide.jpg"
      benefits={[
        { title: "Consistency", description: "Cohesive visual language" },
        { title: "Recognition", description: "Distinctly your brand" },
        { title: "Quality", description: "Professional standards" },
        { title: "Efficiency", description: "Clear direction for creators" },
      ]}
      process={[
        { step: 1, title: "Visual Audit", description: "Reviewing current imagery" },
        { step: 2, title: "Mood Board", description: "Defining visual direction" },
        { step: 3, title: "Style Definition", description: "Creating imagery rules" },
        { step: 4, title: "Examples", description: "Sample imagery creation" },
        { step: 5, title: "Guidelines", description: "Complete documentation" },
      ]}
      pricing={[
        {
          name: "Essential",
          price: "AED 2,500",
          features: ["Mood Board", "Style Direction", "Basic Guide"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 5,000",
          features: ["Full Style Guide", "Photo Direction", "Illustration Style", "Icon Style"],
          popular: true,
        },
        {
          name: "Complete",
          price: "AED 10,000",
          features: ["Complete System", "Stock Library", "Custom Shoots", "Video Style"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is brand imagery?",
          answer:
            "Brand imagery includes all visual content - photography style, illustration approach, icon design, and graphic elements.",
        },
        {
          question: "Why are imagery guidelines important?",
          answer: "They ensure all visual content feels cohesive and reinforces brand recognition.",
        },
      ]}
      relatedCategories={[
        { name: "Visual Identity", href: "/services/creative-branding/brand-identity/visual-identity" },
        { name: "Photography Style", href: "/services/creative-branding/brand-identity/photography-style" },
        { name: "Illustration Style", href: "/services/creative-branding/brand-identity/illustration-style" },
      ]}
    />
  )
}
