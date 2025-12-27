import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Drone Wedding Films | Wedding Films | Creative Fusion",
  description: "Aerial drone wedding videography. Breathtaking aerial perspectives of your venue and ceremony.",
}

export default function DroneWeddingPage() {
  return (
    <CategoryPageTemplate
      title="Drone Wedding Films"
      subtitle="Breathtaking Aerial Perspectives"
      description="Drone videography adds stunning aerial perspectives to your wedding film - venue reveals, outdoor ceremonies, and cinematic establishing shots."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Wedding Films", href: "/services/videography/wedding-films" }}
      heroImage="/drone-wedding-aerial.jpg"
      benefits={[
        { title: "Scale", description: "Show venue grandeur" },
        { title: "Cinematic", description: "Hollywood-style shots" },
        { title: "Unique", description: "Perspectives impossible otherwise" },
        { title: "Stunning", description: "Wow factor guaranteed" },
      ]}
      process={[
        { step: 1, title: "Permission", description: "Flight authorization" },
        { step: 2, title: "Planning", description: "Aerial shot planning" },
        { step: 3, title: "Safety", description: "Guest safety measures" },
        { step: 4, title: "Filming", description: "Aerial capture" },
        { step: 5, title: "Integration", description: "Seamless editing" },
      ]}
      pricing={[
        {
          name: "Drone Add-on",
          price: "AED 2,000",
          features: ["2 Hours Flying", "Venue Shots", "Ceremony Aerial"],
          popular: false,
        },
        {
          name: "Aerial Package",
          price: "AED 4,000",
          features: ["Full Day Drone", "Multiple Flights", "Sunset Shots"],
          popular: true,
        },
        {
          name: "Premium Aerial",
          price: "AED 8,000",
          features: ["Multi-drone", "Pilot Team", "Follow Shots", "Night Capability"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Is drone filming allowed everywhere?",
          answer: "We check regulations and obtain necessary permits for each venue.",
        },
        {
          question: "What about indoor venues?",
          answer: "Drone footage is primarily for outdoor venues, arrivals, and establishing shots.",
        },
      ]}
      relatedCategories={[
        { name: "Cinematic Films", href: "/services/videography/wedding-films/cinematic" },
        { name: "Destination Weddings", href: "/services/videography/wedding-films/destination" },
        { name: "Drone & Aerial", href: "/services/videography/drone-aerial" },
      ]}
    />
  )
}
