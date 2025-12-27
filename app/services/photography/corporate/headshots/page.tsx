import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Professional Headshots | Corporate Photography | Creative Fusion",
  description: "Professional corporate headshots for executives, teams, and LinkedIn profiles.",
}

export default function HeadshotsPage() {
  return (
    <CategoryPageTemplate
      title="Professional Headshots"
      description="High-quality corporate headshots that make a lasting impression for LinkedIn, company websites, and professional profiles."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Corporate Photography", href: "/services/photography/corporate" }}
      heroImage="/professional-headshot-photography-studio.jpg"
      benefits={[
        { title: "Executive Presence", description: "Polished headshots that convey confidence and professionalism" },
        { title: "Brand Consistency", description: "Uniform style across all team member portraits" },
        { title: "Quick Turnaround", description: "Same-day delivery for urgent requirements" },
        { title: "Retouching Included", description: "Professional editing and skin retouching" },
      ]}
      process={[
        { step: 1, title: "Consultation", description: "Discuss style, backdrop, and outfit recommendations" },
        { step: 2, title: "Photo Session", description: "15-30 minute session with multiple poses" },
        { step: 3, title: "Selection", description: "Review and select your favorite shots" },
        { step: 4, title: "Retouching", description: "Professional editing and enhancement" },
        { step: 5, title: "Delivery", description: "High-resolution files in multiple formats" },
      ]}
      pricing={[
        {
          name: "Individual",
          price: "AED 350",
          features: ["15-min session", "3 edited photos", "1 outfit", "Digital delivery"],
        },
        {
          name: "Executive",
          price: "AED 650",
          features: ["30-min session", "8 edited photos", "2 outfits", "LinkedIn optimization"],
          popular: true,
        },
        {
          name: "Team Package",
          price: "AED 250/person",
          features: ["On-site session", "5 photos each", "Same-day editing", "Min 5 people"],
        },
      ]}
      faqs={[
        {
          question: "What should I wear?",
          answer: "Solid colors work best. Avoid busy patterns. We recommend bringing 2-3 outfit options.",
        },
        {
          question: "How long does the session take?",
          answer: "Individual sessions take 15-30 minutes depending on the package.",
        },
        {
          question: "Do you offer on-site photography?",
          answer: "Yes, we can set up a professional studio at your office location.",
        },
      ]}
      relatedCategories={[
        { name: "Team Photos", href: "/services/photography/corporate/team-photos" },
        { name: "Office Environment", href: "/services/photography/corporate/office-environment" },
        { name: "Business Portraits", href: "/services/photography/corporate/business-portraits" },
      ]}
    />
  )
}
