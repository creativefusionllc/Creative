import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Presentation Folder Design | Business Stationery | Creative Fusion",
  description: "Custom presentation folder design. Professional document folders for client meetings and proposals.",
}

export default function FoldersPage() {
  return (
    <CategoryPageTemplate
      title="Presentation Folder Design"
      subtitle="Professional Document Presentation"
      description="Presentation folders organize and present your documents professionally. Perfect for proposals, contracts, and client meetings."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Business Stationery", href: "/services/creative-branding/business-stationery" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Organization", description: "Keep documents together" },
        { title: "Impression", description: "Professional presentation" },
        { title: "Branding", description: "Extended brand exposure" },
        { title: "Versatile", description: "Multiple pocket options" },
      ]}
      process={[
        { step: 1, title: "Specification", description: "Size and pocket options" },
        { step: 2, title: "Design", description: "Creating folder artwork" },
        { step: 3, title: "Die-line", description: "Technical production files" },
        { step: 4, title: "Approval", description: "Final design review" },
        { step: 5, title: "Production", description: "Print and assembly" },
      ]}
      pricing={[
        { name: "Standard", price: "AED 800", features: ["A4 Size", "Single Pocket", "Print Files"], popular: false },
        {
          name: "Professional",
          price: "AED 1,500",
          features: ["A4 Size", "Double Pocket", "Business Card Slot", "100 Printed"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 3,000",
          features: ["Custom Size", "Multiple Pockets", "Foil/Emboss", "250 Printed"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What folder sizes are available?",
          answer: "Standard A4, US Letter, and custom sizes. We can design any pocket configuration.",
        },
        {
          question: "What paper is used?",
          answer: "Typically 300-400gsm card stock with optional lamination or soft-touch finish.",
        },
      ]}
      relatedCategories={[
        { name: "Business Cards", href: "/services/creative-branding/business-stationery/business-cards" },
        { name: "Letterheads", href: "/services/creative-branding/business-stationery/letterheads" },
        { name: "Company Profile", href: "/services/creative-branding/company-profile" },
      ]}
    />
  )
}
