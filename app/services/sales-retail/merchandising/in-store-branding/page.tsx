import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "In-Store Branding Dubai | Retail Branding UAE GCC",
  description:
    "Professional in-store branding services in Dubai, UAE & GCC. POP displays, shelf talkers, hanging signs, and branded retail environments.",
  keywords: ["in-store branding dubai", "retail branding uae", "pop displays gcc", "store signage dubai"],
}

export default function InStoreBrandingPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Merchandising", href: "/services/sales-retail/merchandising" },
          }}
          title="In-Store Branding"
          subtitle="Branded Retail Experience"
          description="Create cohesive brand experiences with professional in-store branding in Dubai, UAE & GCC. From shelf talkers to floor graphics, we bring your brand to life in retail."
          heroImage="/in-store-branding-retail-dubai.jpg"
          benefits={[
            "POP display design and production",
            "Shelf talkers and wobblers",
            "Floor and ceiling graphics",
            "End-cap branding",
            "Checkout displays",
            "Installation services",
          ]}
          process={[
            { step: 1, title: "Brand Audit", description: "Assessing current in-store presence" },
            { step: 2, title: "Design", description: "Creating branded POSM materials" },
            { step: 3, title: "Production", description: "Manufacturing quality displays" },
            { step: 4, title: "Installation", description: "Professional in-store setup" },
          ]}
          pricing={{
            startingFrom: "AED 1,500/store",
            includes: ["Design", "Materials", "Installation", "Maintenance"],
          }}
          faqs={[
            {
              question: "Do you handle retailer approvals?",
              answer: "Yes, we work with retailer marketing teams to get approvals for in-store branding materials.",
            },
            {
              question: "What materials do you use?",
              answer:
                "We use high-quality materials including acrylic, foamboard, vinyl, fabric, and eco-friendly options.",
            },
          ]}
          relatedCategories={[
            { title: "Visual Merchandising", href: "/services/sales-retail/merchandising/visual" },
            { title: "Product Placement", href: "/services/sales-retail/merchandising/placement" },
            { title: "Window Displays", href: "/services/sales-retail/merchandising/window-displays" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
