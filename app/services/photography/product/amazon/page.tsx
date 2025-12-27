import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Amazon Product Photography | Product Photography | Creative Fusion",
  description: "Amazon-compliant product photography that meets all marketplace requirements.",
}

export default function AmazonPage() {
  return (
    <CategoryPageTemplate
      title="Amazon Product Photography"
      description="Amazon-compliant product photography meeting all marketplace guidelines for higher rankings and conversions."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Product Photography", href: "/services/photography/product" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Amazon Compliant", description: "Meets all guidelines" },
        { title: "A+ Content Ready", description: "Enhanced brand content" },
        { title: "Infographics", description: "Feature callouts included" },
        { title: "Higher Rankings", description: "Quality images boost search" },
      ]}
      process={[
        { step: 1, title: "Product Analysis", description: "Review listing requirements" },
        { step: 2, title: "Main Image", description: "White background hero" },
        { step: 3, title: "Secondary", description: "Lifestyle and detail shots" },
        { step: 4, title: "Infographics", description: "Feature highlights" },
        { step: 5, title: "Optimization", description: "Amazon-ready files" },
      ]}
      pricing={[
        {
          name: "Basic Listing",
          price: "AED 300",
          features: ["7 images", "White background", "Basic infographic", "Amazon specs"],
        },
        {
          name: "Enhanced",
          price: "AED 600",
          features: ["9 images", "Lifestyle shots", "3 infographics", "A+ ready"],
          popular: true,
        },
        {
          name: "Premium Brand",
          price: "AED 1,000",
          features: ["12 images", "Video", "Full A+ content", "Brand story"],
        },
      ]}
      faqs={[
        {
          question: "Do you guarantee Amazon compliance?",
          answer: "Yes, all images meet Amazon's technical and style requirements.",
        },
        { question: "Can you create A+ Content?", answer: "Yes, our Premium package includes full A+ Content design." },
      ]}
      relatedCategories={[
        { name: "E-commerce", href: "/services/photography/product/ecommerce" },
        { name: "Noon Photography", href: "/services/photography/product/noon" },
        { name: "Product Infographics", href: "/services/photography/product/infographics" },
      ]}
    />
  )
}
