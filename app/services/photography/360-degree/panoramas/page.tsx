import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Panorama Photography | 360-Degree | Creative Fusion",
  description:
    "Professional panoramic photography services. Wide-angle and spherical panoramas for stunning visual impact.",
}

export default function PanoramasPage() {
  return (
    <CategoryPageTemplate
      title="Panorama Photography"
      subtitle="Wide-Angle Visual Impact"
      description="Panoramic photography captures expansive views in single images, perfect for showcasing large spaces, landscapes, and architectural achievements."
      parentService={{ name: "Photography", href: "/services/photography" }}
      subService={{ name: "360-Degree Photography", href: "/services/photography/360-degree" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Scale", description: "Show full scope of spaces" },
        { title: "Impact", description: "Impressive visual effect" },
        { title: "Detail", description: "High-resolution capture" },
        { title: "Versatile", description: "Print and digital use" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Selecting optimal viewpoints" },
        { step: 2, title: "Capture", description: "Multi-shot photography" },
        { step: 3, title: "Stitching", description: "Seamless image merging" },
        { step: 4, title: "Editing", description: "Color and exposure correction" },
        { step: 5, title: "Delivery", description: "High-res file delivery" },
      ]}
      pricing={[
        {
          name: "Single Panorama",
          price: "AED 500",
          features: ["1 Panorama", "High Resolution", "Basic Editing"],
          popular: false,
        },
        {
          name: "Package",
          price: "AED 1,800",
          features: ["5 Panoramas", "Advanced Editing", "Print-Ready Files"],
          popular: true,
        },
        {
          name: "Project",
          price: "AED 4,000",
          features: ["15 Panoramas", "Aerial Included", "Interactive Viewing", "Rush Delivery"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What resolution are panoramas?",
          answer: "Our panoramas typically range from 10,000 to 50,000 pixels wide for maximum detail.",
        },
        {
          question: "Can panoramas be printed large?",
          answer: "Yes, our high-resolution panoramas are perfect for wall murals and large format prints.",
        },
      ]}
      relatedCategories={[
        { name: "Virtual Tours", href: "/services/photography/360-degree/virtual-tours" },
        { name: "Aerial Panoramas", href: "/services/photography/360-degree/aerial-panoramas" },
        { name: "Interactive Views", href: "/services/photography/360-degree/interactive-views" },
      ]}
    />
  )
}
