import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "E-commerce Product Photography | Product Photography | Creative Fusion",
  description: "Professional product photography for online stores and e-commerce platforms.",
}

export default function EcommercePage() {
  return (
    <CategoryPageTemplate
      title="E-commerce Product Photography"
      description="High-quality product photography optimized for online stores, marketplaces, and e-commerce platforms."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Product Photography", href: "/services/photography/product" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Conversion Optimized", description: "Images that drive sales" },
        { title: "Platform Ready", description: "Amazon, Noon, Shopify specs" },
        { title: "Consistent Style", description: "Uniform product catalog" },
        { title: "Fast Turnaround", description: "High volume capability" },
      ]}
      process={[
        { step: 1, title: "Receive Products", description: "Secure handling" },
        { step: 2, title: "Setup", description: "Lighting and backdrop" },
        { step: 3, title: "Photography", description: "Multiple angles" },
        { step: 4, title: "Editing", description: "Background removal, color" },
        { step: 5, title: "Delivery", description: "Web-optimized files" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 50/product",
          features: ["White background", "3 angles", "Basic editing", "Web ready"],
        },
        {
          name: "Professional",
          price: "AED 100/product",
          features: ["5 angles", "Lifestyle shot", "Advanced editing", "All platforms"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 180/product",
          features: ["8 angles", "360° spin", "Video clip", "Infographics"],
        },
      ]}
      faqs={[
        {
          question: "What platforms do you optimize for?",
          answer: "Amazon, Noon, Shopify, WooCommerce, and all major e-commerce platforms.",
        },
        {
          question: "Do you handle product styling?",
          answer: "Yes, we provide basic styling or you can add a dedicated stylist.",
        },
      ]}
      relatedCategories={[
        { name: "Amazon Photography", href: "/services/photography/product/amazon" },
        { name: "Fashion Products", href: "/services/photography/product/fashion" },
        { name: "Electronics", href: "/services/photography/product/electronics" },
      ]}
    />
  )
}
