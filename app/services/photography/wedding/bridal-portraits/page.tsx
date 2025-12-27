import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Bridal Portraits | Wedding Photography | Creative Fusion",
  description: "Elegant bridal portrait photography showcasing the bride.",
}

export default function BridalPortraitsPage() {
  return (
    <CategoryPageTemplate
      title="Bridal Portraits"
      description="Elegant and timeless bridal portraits that celebrate the bride's beauty and the stunning wedding attire."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Wedding Photography", href: "/services/photography/wedding" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Timeless Elegance", description: "Classic bridal portraits" },
        { title: "Dress Showcase", description: "Feature your gown beautifully" },
        { title: "Relaxed Session", description: "No wedding-day rush" },
        { title: "Display Ready", description: "Perfect for framing" },
      ]}
      process={[
        { step: 1, title: "Consultation", description: "Vision and style" },
        { step: 2, title: "Location", description: "Studio or on-site" },
        { step: 3, title: "Hair & Makeup", description: "Bridal styling" },
        { step: 4, title: "Portrait Session", description: "Elegant posing" },
        { step: 5, title: "Delivery", description: "Retouched portraits" },
      ]}
      pricing={[
        {
          name: "Classic",
          price: "AED 1,500",
          features: ["1 hour session", "15 edited photos", "Studio setting", "Basic retouching"],
        },
        {
          name: "Elegant",
          price: "AED 2,800",
          features: ["2 hour session", "30 edited photos", "2 locations", "Premium retouching"],
          popular: true,
        },
        {
          name: "Luxury",
          price: "AED 4,500",
          features: ["3 hour session", "50 edited photos", "Hair & makeup", "Album included"],
        },
      ]}
      faqs={[
        {
          question: "When should bridal portraits be done?",
          answer: "1-2 weeks before the wedding to allow time for prints and displays.",
        },
        {
          question: "Should I have hair and makeup done?",
          answer: "Yes, we recommend a trial run of your wedding day look.",
        },
      ]}
      relatedCategories={[
        { name: "Groom Portraits", href: "/services/photography/wedding/groom-portraits" },
        { name: "Couple Portraits", href: "/services/photography/wedding/couple-portraits" },
        { name: "Getting Ready", href: "/services/photography/wedding/getting-ready" },
      ]}
    />
  )
}
