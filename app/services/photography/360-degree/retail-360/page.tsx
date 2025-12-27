import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Retail 360 Photography | 360-Degree | Creative Fusion",
  description: "360-degree photography for retail stores. Virtual showrooms that drive foot traffic.",
}

export default function Retail360Page() {
  return (
    <CategoryPageTemplate
      title="Retail 360 Photography"
      subtitle="Virtual Showroom Experience"
      description="Let customers explore your store virtually before visiting. 360-degree retail photography increases foot traffic and helps customers plan their shopping trip."
      parentService={{ name: "Photography", href: "/services/photography" }}
      subService={{ name: "360-Degree Photography", href: "/services/photography/360-degree" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Discovery", description: "Customers find products" },
        { title: "Confidence", description: "Know store layout" },
        { title: "Visibility", description: "Google Maps presence" },
        { title: "Engagement", description: "Interactive shopping" },
      ]}
      process={[
        { step: 1, title: "Store Prep", description: "Visual merchandising review" },
        { step: 2, title: "Photography", description: "Complete store capture" },
        { step: 3, title: "Product Tags", description: "Adding clickable products" },
        { step: 4, title: "Tour Building", description: "Navigation and info spots" },
        { step: 5, title: "Launch", description: "Website and Google integration" },
      ]}
      pricing={[
        {
          name: "Small Store",
          price: "AED 1,500",
          features: ["Up to 15 Scenes", "Google Street View", "Basic Hotspots"],
          popular: false,
        },
        {
          name: "Medium Store",
          price: "AED 3,500",
          features: ["Up to 30 Scenes", "Product Tags", "Info Points", "Analytics"],
          popular: true,
        },
        {
          name: "Large Store",
          price: "AED 7,000",
          features: ["Unlimited Scenes", "E-commerce Links", "Multi-floor", "Staff Training"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Can customers buy from the tour?",
          answer: "Yes, we can add clickable product tags that link to your e-commerce store.",
        },
        {
          question: "How often should we update?",
          answer: "We recommend updating quarterly or when major merchandising changes occur.",
        },
      ]}
      relatedCategories={[
        { name: "Hospitality 360", href: "/services/photography/360-degree/hospitality-360" },
        { name: "Showroom 360", href: "/services/photography/360-degree/showroom-360" },
        { name: "Virtual Tours", href: "/services/photography/360-degree/virtual-tours" },
      ]}
    />
  )
}
