import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Wordmark Logo Design Dubai | Text-Based Logos | Creative Fusion LLC",
  description:
    "Professional wordmark logo design services in Dubai UAE. Custom typographic logos that make your brand name memorable. Serving Dubai, Sharjah, Abu Dhabi, and the UAE.",
  keywords: [
    "wordmark logo design dubai",
    "text-based logo design",
    "typographic logo dubai",
    "wordmark logo uae",
    "custom wordmark design",
    "text logo design",
    "logotype design dubai",
    "wordmark designer uae",
    "professional wordmark logos",
    "creative wordmark design",
    "wordmark logo sharjah",
    "typography logo design",
    "brand wordmark creation",
    "custom typographic logos",
    "professional logo design",
  ],
  openGraph: {
    title: "Wordmark Logo Design Dubai | Creative Fusion LLC",
    description: "Text-Based Brand Identity - Professional wordmark logos that build name recognition",
  },
}

export default function WordmarkPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        breadcrumb={{
          service: { title: "Creative Branding", href: "/services/creative-branding" },
          subService: { title: "Logo Design", href: "/services/creative-branding/logo-design" },
        }}
        title="Wordmark Logo Design"
        subtitle="Text-Based Brand Identity"
        description="Wordmark logos use stylized typography to transform your brand name into a visual identity. Perfect for brands with unique names that want to build strong name recognition across Dubai, Sharjah, and UAE."
        heroImage="/wordmark-logo-design-typography.jpg"
        benefits={[
          "Instant name recognition with distinctive typography",
          "Versatile usage across all media and platforms",
          "Timeless appeal that remains relevant for years",
          "Professional appearance for corporate brands",
          "Strong brand recall with custom letterforms",
          "Scalable design for all applications",
        ]}
        process={[
          { step: 1, title: "Brand Analysis", description: "Understanding your brand personality and values" },
          { step: 2, title: "Typography Research", description: "Exploring fonts that match your brand voice" },
          { step: 3, title: "Concept Development", description: "Creating multiple wordmark variations" },
          { step: 4, title: "Refinement", description: "Perfecting kerning, weight, and details" },
          { step: 5, title: "Delivery", description: "Final files in all formats needed" },
        ]}
        pricing={{
          startingFrom: "AED 1,500",
          includes: ["Multiple Concepts", "Unlimited Revisions", "All File Formats", "Usage Guidelines"],
        }}
        faqs={[
          {
            question: "What is a wordmark logo?",
            answer:
              "A wordmark is a text-only logo that uses custom typography to display your brand name in a distinctive way. It's ideal for building strong name recognition.",
          },
          {
            question: "When should I use a wordmark logo?",
            answer:
              "Wordmarks work best when your brand name is short, unique, and you want to build strong name recognition. Companies like Google, Coca-Cola, and FedEx use wordmarks.",
          },
          {
            question: "How long does wordmark design take?",
            answer:
              "Our wordmark design typically takes 2-3 weeks from initial concepts to final delivery, depending on complexity and revisions.",
          },
          {
            question: "Can I trademark a wordmark logo?",
            answer:
              "Yes, wordmarks can absolutely be trademarked. In fact, distinctive wordmarks often have strong trademark protection because they're unique typographic creations.",
          },
        ]}
        relatedCategories={[
          { title: "Symbol Logos", href: "/services/creative-branding/logo-design/symbol" },
          { title: "Combination Logos", href: "/services/creative-branding/logo-design/combination" },
          { title: "Brand Guidelines", href: "/services/creative-branding/brand-guidelines" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
