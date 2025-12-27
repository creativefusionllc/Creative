import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Business Portraits | Corporate Photography | Creative Fusion",
  description: "Executive and business portrait photography for professionals.",
}

export default function BusinessPortraitsPage() {
  return (
    <CategoryPageTemplate
      title="Business Portraits"
      description="Distinguished business portraits that capture leadership, expertise, and professional excellence."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Corporate Photography", href: "/services/photography/corporate" }}
      heroImage="/executive-business-portrait-photography.jpg"
      benefits={[
        { title: "Executive Image", description: "Portraits that command respect and trust" },
        { title: "Personal Branding", description: "Images that reflect your professional identity" },
        { title: "Versatile Use", description: "Perfect for press, speaking engagements, books" },
        { title: "Artistic Quality", description: "Magazine-quality portraits" },
      ]}
      process={[
        { step: 1, title: "Consultation", description: "Discuss your brand and goals" },
        { step: 2, title: "Wardrobe Planning", description: "Outfit recommendations" },
        { step: 3, title: "Photo Session", description: "Multiple looks and setups" },
        { step: 4, title: "Selection", description: "Choose your favorites" },
        { step: 5, title: "Retouching", description: "Professional enhancement" },
      ]}
      pricing={[
        {
          name: "Standard",
          price: "AED 800",
          features: ["1-hour session", "5 edited photos", "2 outfits", "Studio setting"],
        },
        {
          name: "Premium",
          price: "AED 1,500",
          features: ["2-hour session", "12 edited photos", "3 outfits", "Multiple locations"],
          popular: true,
        },
        {
          name: "Editorial",
          price: "AED 3,000",
          features: ["Half-day session", "25 edited photos", "Styling included", "Magazine quality"],
        },
      ]}
      faqs={[
        {
          question: "What's the difference from headshots?",
          answer: "Business portraits are more artistic and comprehensive, often including environmental shots.",
        },
        {
          question: "Do you provide styling?",
          answer: "Our Editorial package includes professional styling consultation.",
        },
      ]}
      relatedCategories={[
        { name: "Headshots", href: "/services/photography/corporate/headshots" },
        { name: "Personal Branding", href: "/services/photography/corporate/personal-branding" },
        { name: "Team Photos", href: "/services/photography/corporate/team-photos" },
      ]}
    />
  )
}
