import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Letterhead Design | Business Stationery | Creative Fusion",
  description: "Professional letterhead design for official correspondence. Elevate your business communications.",
}

export default function LetterheadsPage() {
  return (
    <CategoryPageTemplate
      title="Letterhead Design"
      subtitle="Professional Correspondence"
      description="A well-designed letterhead elevates every piece of official communication. We create letterheads that balance professionalism with brand personality."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Business Stationery", href: "/services/creative-branding/business-stationery" }}
      heroImage="/letterhead-design-corporate-professional.jpg"
      benefits={[
        { title: "Credibility", description: "Professional appearance" },
        { title: "Branding", description: "Consistent identity" },
        { title: "Legal", description: "Required business info" },
        { title: "Versatile", description: "Print and digital use" },
      ]}
      process={[
        { step: 1, title: "Information", description: "Gathering required details" },
        { step: 2, title: "Layout", description: "Designing header and footer" },
        { step: 3, title: "Integration", description: "Matching brand identity" },
        { step: 4, title: "Templates", description: "Word/Google Docs versions" },
        { step: 5, title: "Delivery", description: "All format delivery" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 400", features: ["1 Design", "2 Revisions", "PDF & Word"], popular: false },
        {
          name: "Standard",
          price: "AED 800",
          features: ["2 Designs", "Unlimited Revisions", "All Formats", "Print Coordination"],
          popular: true,
        },
        {
          name: "Complete",
          price: "AED 1,500",
          features: ["Multiple Variants", "Unlimited Revisions", "Envelope Match", "500 Printed"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What information goes on a letterhead?",
          answer: "Logo, company name, address, phone, email, website, and optionally registration numbers.",
        },
        {
          question: "Do I get editable templates?",
          answer: "Yes, we provide Microsoft Word and Google Docs templates for easy editing.",
        },
      ]}
      relatedCategories={[
        { name: "Business Cards", href: "/services/creative-branding/business-stationery/business-cards" },
        { name: "Envelopes", href: "/services/creative-branding/business-stationery/envelopes" },
        { name: "Invoices", href: "/services/creative-branding/business-stationery/invoices" },
      ]}
    />
  )
}
