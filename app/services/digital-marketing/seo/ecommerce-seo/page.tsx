import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "E-commerce SEO | SEO Services | Creative Fusion",
  description: "E-commerce SEO services. Product page optimization and category ranking strategies.",
}

export default function EcommerceSeoPage() {
  return (
    <CategoryPageTemplate
      title="E-commerce SEO"
      subtitle="Sell More Online"
      description="E-commerce SEO optimizes your online store to rank for product searches, driving organic traffic that converts into sales."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "SEO Services", href: "/services/digital-marketing/seo" }}
      heroImage="/ecommerce-seo-product-optimization.jpg"
      benefits={[
        { title: "Products", description: "Rank product pages" },
        { title: "Categories", description: "Category visibility" },
        { title: "Conversions", description: "Buying-intent traffic" },
        { title: "Revenue", description: "Organic sales growth" },
      ]}
      process={[
        { step: 1, title: "Store Audit", description: "E-commerce SEO analysis" },
        { step: 2, title: "Product SEO", description: "Product page optimization" },
        { step: 3, title: "Categories", description: "Category structure" },
        { step: 4, title: "Technical", description: "E-commerce technical fixes" },
        { step: 5, title: "Content", description: "Product descriptions" },
      ]}
      pricing={[
        {
          name: "Small Store",
          price: "AED 4,000/mo",
          features: ["Up to 100 Products", "Basic Optimization", "Monthly Report"],
          popular: false,
        },
        {
          name: "Medium Store",
          price: "AED 8,000/mo",
          features: ["Up to 500 Products", "Full Optimization", "Content Creation"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 15,000/mo",
          features: ["Unlimited Products", "Advanced Strategy", "Dedicated Manager"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How is e-commerce SEO different?",
          answer:
            "E-commerce SEO focuses on product pages, categories, and transactional keywords that drive purchases.",
        },
        {
          question: "Can you write product descriptions?",
          answer: "Yes, we create SEO-optimized product descriptions that sell.",
        },
      ]}
      relatedCategories={[
        { name: "Technical SEO", href: "/services/digital-marketing/seo/technical" },
        { name: "E-commerce Development", href: "/services/web-development/ecommerce" },
        { name: "Google Shopping", href: "/services/digital-marketing/ppc/google-ads" },
      ]}
    />
  )
}
