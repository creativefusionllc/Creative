import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Interactive 360 Views | 360-Degree Photography | Creative Fusion",
  description: "Interactive 360-degree product and space views. Engaging visual content for websites and apps.",
}

export default function InteractiveViewsPage() {
  return (
    <CategoryPageTemplate
      title="Interactive 360 Views"
      subtitle="Engage Your Audience"
      description="Interactive 360-degree views allow users to click, drag, and explore products or spaces from every angle. Perfect for e-commerce, education, and marketing."
      parentService={{ name: "Photography", href: "/services/photography" }}
      subService={{ name: "360-Degree Photography", href: "/services/photography/360-degree" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Engagement", description: "Users interact with content" },
        { title: "Understanding", description: "See from all angles" },
        { title: "Conversion", description: "Increase sales" },
        { title: "Shareability", description: "Embed anywhere" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Defining interaction points" },
        { step: 2, title: "Capture", description: "Multi-angle photography" },
        { step: 3, title: "Assembly", description: "Creating interactive viewer" },
        { step: 4, title: "Features", description: "Adding hotspots and info" },
        { step: 5, title: "Integration", description: "Website embedding" },
      ]}
      pricing={[
        {
          name: "Single View",
          price: "AED 800",
          features: ["1 Interactive View", "36 Frames", "Web Embed"],
          popular: false,
        },
        {
          name: "Package",
          price: "AED 2,500",
          features: ["5 Interactive Views", "72 Frames Each", "Hotspots", "Analytics"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 6,000",
          features: ["15 Interactive Views", "Custom Features", "API Access", "Priority Support"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How many frames are in an interactive view?",
          answer: "Typically 36-72 frames for smooth rotation; more frames mean smoother interaction.",
        },
        {
          question: "Can I add clickable information?",
          answer: "Yes, we can add hotspots that reveal product info, specs, or links when clicked.",
        },
      ]}
      relatedCategories={[
        { name: "Product 360", href: "/services/photography/360-degree/product-360" },
        { name: "Virtual Tours", href: "/services/photography/360-degree/virtual-tours" },
        { name: "Panoramas", href: "/services/photography/360-degree/panoramas" },
      ]}
    />
  )
}
