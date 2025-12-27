import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Hospitality 360 Photography | 360-Degree | Creative Fusion",
  description: "360-degree photography for hotels and restaurants. Virtual tours that increase bookings.",
}

export default function Hospitality360Page() {
  return (
    <CategoryPageTemplate
      title="Hospitality 360 Photography"
      subtitle="Showcase Your Venue"
      description="Virtual tours for hotels, restaurants, and venues let guests explore before booking. Increase direct bookings and reduce cancellations with immersive previews."
      parentService={{ name: "Photography", href: "/services/photography" }}
      subService={{ name: "360-Degree Photography", href: "/services/photography/360-degree" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Bookings", description: "Increase reservations" },
        { title: "Trust", description: "Show exactly what guests get" },
        { title: "Engagement", description: "Longer website visits" },
        { title: "Google", description: "Street View integration" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Identifying key areas" },
        { step: 2, title: "Capture", description: "360° photography" },
        { step: 3, title: "Enhancement", description: "Professional editing" },
        { step: 4, title: "Tour Building", description: "Interactive navigation" },
        { step: 5, title: "Publishing", description: "Website and Google integration" },
      ]}
      pricing={[
        {
          name: "Restaurant",
          price: "AED 2,000",
          features: ["Up to 10 Scenes", "Google Street View", "Website Embed"],
          popular: false,
        },
        {
          name: "Hotel",
          price: "AED 5,000",
          features: ["Up to 30 Scenes", "Room Types", "Amenities", "Booking Integration"],
          popular: true,
        },
        {
          name: "Resort",
          price: "AED 12,000",
          features: ["Unlimited Scenes", "Aerial 360", "Video Integration", "Multi-language"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Do you add to Google Street View?",
          answer: "Yes, we're Google Street View trusted photographers and can add your business to Google.",
        },
        {
          question: "Can tours integrate with booking systems?",
          answer: "Yes, we can add booking buttons and links throughout the tour.",
        },
      ]}
      relatedCategories={[
        { name: "Restaurant 360", href: "/services/photography/360-degree/restaurant-360" },
        { name: "Retail 360", href: "/services/photography/360-degree/retail-360" },
        { name: "Virtual Tours", href: "/services/photography/360-degree/virtual-tours" },
      ]}
    />
  )
}
