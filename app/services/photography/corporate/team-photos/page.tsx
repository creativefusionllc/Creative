import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Team Photos | Corporate Photography | Creative Fusion",
  description: "Professional team and group photography for companies and organizations.",
}

export default function TeamPhotosPage() {
  return (
    <CategoryPageTemplate
      title="Team Photos"
      description="Capture your company culture with professional team photography that showcases unity and professionalism."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Corporate Photography", href: "/services/photography/corporate" }}
      heroImage="/corporate-team-photo-professional.jpg"
      benefits={[
        { title: "Team Unity", description: "Photos that showcase your team's collaboration and spirit" },
        { title: "Flexible Locations", description: "Studio or on-site at your office" },
        { title: "Creative Concepts", description: "Formal or casual styles to match your brand" },
        { title: "Quick Coordination", description: "Efficient scheduling for large groups" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Coordinate schedule and location" },
        { step: 2, title: "Setup", description: "Arrange lighting and backdrop" },
        { step: 3, title: "Group Shots", description: "Capture various team configurations" },
        { step: 4, title: "Editing", description: "Professional retouching and color correction" },
        { step: 5, title: "Delivery", description: "High-resolution images for all uses" },
      ]}
      pricing={[
        {
          name: "Small Team",
          price: "AED 1,500",
          features: ["Up to 10 people", "2-hour session", "10 edited photos", "On-site"],
        },
        {
          name: "Medium Team",
          price: "AED 2,500",
          features: ["Up to 25 people", "3-hour session", "20 edited photos", "Multiple setups"],
          popular: true,
        },
        {
          name: "Large Team",
          price: "AED 4,000",
          features: ["Up to 50 people", "Half-day session", "30 edited photos", "Department groups"],
        },
      ]}
      faqs={[
        {
          question: "Can you photograph at our office?",
          answer: "Yes, we bring all equipment needed for on-site photography.",
        },
        {
          question: "How do we coordinate with large teams?",
          answer: "We provide a scheduling system and work with your HR team.",
        },
      ]}
      relatedCategories={[
        { name: "Headshots", href: "/services/photography/corporate/headshots" },
        { name: "Office Environment", href: "/services/photography/corporate/office-environment" },
        { name: "Corporate Events", href: "/services/photography/corporate/corporate-events" },
      ]}
    />
  )
}
