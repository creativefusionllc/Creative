import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Virtual Tours Photography | 360-Degree | Creative Fusion",
  description:
    "Interactive virtual tour photography services. Immersive 360° experiences for properties and businesses.",
}

export default function VirtualToursPage() {
  return (
    <CategoryPageTemplate
      title="Virtual Tours Photography"
      subtitle="Immersive Digital Experiences"
      description="Virtual tours allow viewers to explore spaces remotely with interactive 360-degree navigation. Perfect for real estate, hospitality, and retail businesses."
      parentService={{ name: "Photography", href: "/services/photography" }}
      subService={{ name: "360-Degree Photography", href: "/services/photography/360-degree" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "24/7 Access", description: "View properties anytime" },
        { title: "Interactive", description: "User-controlled exploration" },
        { title: "Time Saving", description: "Pre-qualify visitors" },
        { title: "Global Reach", description: "Attract remote viewers" },
      ]}
      process={[
        { step: 1, title: "Site Survey", description: "Planning capture points" },
        { step: 2, title: "Photography", description: "360° image capture" },
        { step: 3, title: "Processing", description: "Stitching and editing" },
        { step: 4, title: "Tour Building", description: "Creating navigation" },
        { step: 5, title: "Delivery", description: "Web embed and hosting" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 1,500",
          features: ["Up to 10 Scenes", "Basic Navigation", "Web Embed"],
          popular: false,
        },
        {
          name: "Standard",
          price: "AED 3,500",
          features: ["Up to 25 Scenes", "Floor Plan Integration", "Hotspots", "1 Year Hosting"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 7,000",
          features: ["Unlimited Scenes", "Dollhouse View", "Video Integration", "Lifetime Hosting"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What platforms do you support?",
          answer: "We create tours compatible with Matterport, Google Street View, and custom web players.",
        },
        {
          question: "How long does a tour take to create?",
          answer: "Typically 3-5 business days from photography to delivery, depending on size.",
        },
      ]}
      relatedCategories={[
        { name: "Panoramas", href: "/services/photography/360-degree/panoramas" },
        { name: "Real Estate 360", href: "/services/photography/360-degree/real-estate-360" },
        { name: "Hospitality 360", href: "/services/photography/360-degree/hospitality-360" },
      ]}
    />
  )
}
