import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Invoice Template Design | Business Stationery | Creative Fusion",
  description:
    "Professional invoice and quotation template design. Branded financial documents that look professional.",
}

export default function InvoicesPage() {
  return (
    <CategoryPageTemplate
      title="Invoice Template Design"
      subtitle="Professional Financial Documents"
      description="Well-designed invoices and quotations reinforce professionalism and help ensure timely payments. We create branded templates that are easy to use."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Business Stationery", href: "/services/creative-branding/business-stationery" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Professional", description: "Polished appearance" },
        { title: "Branded", description: "Consistent identity" },
        { title: "Functional", description: "Easy to complete" },
        { title: "Compliant", description: "Required information included" },
      ]}
      process={[
        { step: 1, title: "Requirements", description: "Understanding your needs" },
        { step: 2, title: "Layout", description: "Designing template structure" },
        { step: 3, title: "Branding", description: "Applying brand elements" },
        { step: 4, title: "Formats", description: "Creating editable versions" },
        { step: 5, title: "Delivery", description: "All format handover" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 400",
          features: ["Invoice Template", "Word Format", "2 Revisions"],
          popular: false,
        },
        {
          name: "Standard",
          price: "AED 800",
          features: ["Invoice + Quote", "Excel & Word", "Unlimited Revisions", "PDF Versions"],
          popular: true,
        },
        {
          name: "Complete",
          price: "AED 1,500",
          features: ["Full Document Suite", "All Formats", "Receipt Template", "Purchase Order"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What formats do you provide?",
          answer: "Microsoft Word, Excel, Google Docs/Sheets, and PDF templates are included.",
        },
        {
          question: "Can you match our accounting software?",
          answer: "We can design templates that match your existing software's requirements.",
        },
      ]}
      relatedCategories={[
        { name: "Letterheads", href: "/services/creative-branding/business-stationery/letterheads" },
        { name: "Quotation Templates", href: "/services/creative-branding/business-stationery/quotations" },
        { name: "Receipt Templates", href: "/services/creative-branding/business-stationery/receipts" },
      ]}
    />
  )
}
