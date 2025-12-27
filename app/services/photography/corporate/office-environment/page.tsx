import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Office Environment Photography | Corporate Photography | Creative Fusion",
  description: "Professional office and workspace photography for marketing and branding.",
}

export default function OfficeEnvironmentPage() {
  return (
    <CategoryPageTemplate
      title="Office Environment Photography"
      description="Showcase your workspace with stunning office photography for websites, marketing materials, and recruitment."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Corporate Photography", href: "/services/photography/corporate" }}
      heroImage="/modern-office-interior-photography.jpg"
      benefits={[
        { title: "Brand Storytelling", description: "Visual narrative of your company culture" },
        { title: "Recruitment Appeal", description: "Attract top talent with appealing workspace images" },
        { title: "Marketing Assets", description: "Professional images for all marketing channels" },
        { title: "Architectural Detail", description: "Highlight unique design elements" },
      ]}
      process={[
        { step: 1, title: "Site Visit", description: "Assess lighting and key areas" },
        { step: 2, title: "Styling", description: "Arrange spaces for optimal shots" },
        { step: 3, title: "Photography", description: "Capture all key areas and details" },
        { step: 4, title: "Post-Production", description: "Color correction and enhancement" },
        { step: 5, title: "Delivery", description: "Web and print-ready files" },
      ]}
      pricing={[
        {
          name: "Essential",
          price: "AED 2,000",
          features: ["Up to 1,000 sqft", "15 edited photos", "Half-day session", "Basic retouching"],
        },
        {
          name: "Professional",
          price: "AED 3,500",
          features: ["Up to 3,000 sqft", "30 edited photos", "Full-day session", "Advanced editing"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 6,000",
          features: ["Unlimited space", "50+ edited photos", "Multiple days", "Drone shots included"],
        },
      ]}
      faqs={[
        {
          question: "Do you work during business hours?",
          answer: "We can work after hours for empty office shots or during hours for lifestyle shots.",
        },
        {
          question: "Can you include employees in shots?",
          answer: "Yes, we can capture candid workplace moments with your team.",
        },
      ]}
      relatedCategories={[
        { name: "Team Photos", href: "/services/photography/corporate/team-photos" },
        { name: "Corporate Events", href: "/services/photography/corporate/corporate-events" },
        { name: "Business Portraits", href: "/services/photography/corporate/business-portraits" },
      ]}
    />
  )
}
