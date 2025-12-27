import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "ID Card Design | Business Stationery | Creative Fusion",
  description: "Professional employee ID card design. Secure and branded identification cards for your team.",
}

export default function IdCardsPage() {
  return (
    <CategoryPageTemplate
      title="ID Card Design"
      subtitle="Professional Team Identification"
      description="Employee ID cards serve both security and branding purposes. We design professional cards that identify your team and reinforce company culture."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Business Stationery", href: "/services/creative-branding/business-stationery" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Security", description: "Team identification" },
        { title: "Branding", description: "Daily brand exposure" },
        { title: "Unity", description: "Team belonging" },
        { title: "Professional", description: "Corporate appearance" },
      ]}
      process={[
        { step: 1, title: "Requirements", description: "Security and info needs" },
        { step: 2, title: "Design", description: "Creating card layout" },
        { step: 3, title: "Features", description: "Adding security elements" },
        { step: 4, title: "Template", description: "Creating variable template" },
        { step: 5, title: "Production", description: "Printing and encoding" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 500", features: ["Card Design", "Print Template", "2 Revisions"], popular: false },
        {
          name: "Standard",
          price: "AED 1,000",
          features: ["Card Design", "Lanyard Design", "50 Cards Printed", "Unlimited Revisions"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 2,500",
          features: ["Smart Card Design", "Access Integration", "100 Cards", "Lanyard + Holder"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What card types are available?",
          answer: "PVC cards, smart cards with chips, RFID cards, and standard printed cards.",
        },
        {
          question: "Can you add security features?",
          answer: "Yes - holograms, barcodes, QR codes, and microprinting are available.",
        },
      ]}
      relatedCategories={[
        { name: "Lanyards", href: "/services/creative-branding/business-stationery/lanyards" },
        { name: "Name Badges", href: "/services/creative-branding/business-stationery/name-badges" },
        { name: "Access Cards", href: "/services/creative-branding/business-stationery/access-cards" },
      ]}
    />
  )
}
