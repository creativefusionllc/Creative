import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Envelope Design | Business Stationery | Creative Fusion",
  description: "Custom envelope design for business correspondence. Complete your stationery suite professionally.",
}

export default function EnvelopesPage() {
  return (
    <CategoryPageTemplate
      title="Envelope Design"
      subtitle="Complete Your Stationery Suite"
      description="Branded envelopes complete your stationery system and ensure every piece of mail reinforces your professional image from the moment it arrives."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Business Stationery", href: "/services/creative-branding/business-stationery" }}
      heroImage="/envelope-design-business-branded.jpg"
      benefits={[
        { title: "Brand Touch", description: "Branded before opening" },
        { title: "Professional", description: "Complete stationery set" },
        { title: "Variety", description: "Multiple sizes available" },
        { title: "Impact", description: "Stand out in mailbox" },
      ]}
      process={[
        { step: 1, title: "Size Selection", description: "Choosing envelope sizes" },
        { step: 2, title: "Design", description: "Creating envelope artwork" },
        { step: 3, title: "Coordination", description: "Matching letterhead" },
        { step: 4, title: "Print Files", description: "Production-ready artwork" },
        { step: 5, title: "Printing", description: "Optional print service" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 300", features: ["1 Size", "2 Revisions", "Print Files"], popular: false },
        {
          name: "Standard",
          price: "AED 600",
          features: ["3 Sizes", "Unlimited Revisions", "Window Option", "Print Coordination"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 1,200",
          features: ["All Sizes", "Unlimited Revisions", "Special Finishes", "500 Printed"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What envelope sizes do you design?",
          answer: "DL, C5, C4, and custom sizes. We can also design window envelopes.",
        },
        {
          question: "Can envelopes have special finishes?",
          answer: "Yes - foil stamping, embossing, and custom colors are available.",
        },
      ]}
      relatedCategories={[
        { name: "Letterheads", href: "/services/creative-branding/business-stationery/letterheads" },
        { name: "Business Cards", href: "/services/creative-branding/business-stationery/business-cards" },
        { name: "Folders", href: "/services/creative-branding/business-stationery/folders" },
      ]}
    />
  )
}
