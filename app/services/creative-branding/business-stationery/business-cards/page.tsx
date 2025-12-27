import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Business Card Design | Business Stationery | Creative Fusion",
  description: "Professional business card design services. Make lasting first impressions with premium card designs.",
}

export default function BusinessCardsPage() {
  return (
    <CategoryPageTemplate
      title="Business Card Design"
      subtitle="First Impressions That Last"
      description="Your business card is often the first physical touchpoint with your brand. We create memorable designs that leave lasting impressions and reinforce your professional image."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Business Stationery", href: "/services/creative-branding/business-stationery" }}
      heroImage="/business-card-design-professional-premium.jpg"
      benefits={[
        { title: "Memorable", description: "Designs that stand out" },
        { title: "Professional", description: "Polished brand presentation" },
        { title: "Tactile", description: "Premium paper and finishes" },
        { title: "Networking", description: "Essential business tool" },
      ]}
      process={[
        { step: 1, title: "Brief", description: "Understanding your needs" },
        { step: 2, title: "Concepts", description: "Multiple design options" },
        { step: 3, title: "Refinement", description: "Perfecting chosen design" },
        { step: 4, title: "Print Specs", description: "Production-ready files" },
        { step: 5, title: "Printing", description: "Optional print coordination" },
      ]}
      pricing={[
        {
          name: "Standard",
          price: "AED 500",
          features: ["2 Concepts", "2 Revisions", "Print-Ready Files"],
          popular: false,
        },
        {
          name: "Premium",
          price: "AED 1,000",
          features: ["4 Concepts", "Unlimited Revisions", "Special Finishes", "500 Cards Printed"],
          popular: true,
        },
        {
          name: "Luxury",
          price: "AED 2,500",
          features: ["6 Concepts", "Unlimited Revisions", "Premium Materials", "1000 Cards", "Foil/Emboss"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What size are standard business cards?",
          answer: "Standard size is 3.5 x 2 inches (89 x 51mm), though we also design square and custom sizes.",
        },
        {
          question: "What finishes are available?",
          answer: "Options include matte, gloss, soft-touch, foil stamping, embossing, spot UV, and letterpress.",
        },
      ]}
      relatedCategories={[
        { name: "Letterheads", href: "/services/creative-branding/business-stationery/letterheads" },
        { name: "Envelopes", href: "/services/creative-branding/business-stationery/envelopes" },
        { name: "ID Cards", href: "/services/creative-branding/business-stationery/id-cards" },
      ]}
    />
  )
}
