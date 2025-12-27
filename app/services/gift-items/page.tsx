import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Gift } from "lucide-react"

export const metadata: Metadata = {
  title: "Corporate Gift Items & Promotional Products | Branded Merchandise | Creative Fusion LLC Dubai UAE",
  description:
    "Premium corporate gifts and promotional products in Dubai & UAE. Custom branded merchandise, executive gifts, event giveaways, and employee appreciation items for business promotion.",
  keywords: [
    "corporate gifts dubai",
    "promotional products uae",
    "branded merchandise sharjah",
    "custom business gifts",
    "executive gifts dubai",
    "exhibition giveaways uae",
    "employee gifts",
    "branded promotional items",
    "corporate gift supplier dubai",
  ],
  openGraph: {
    title: "Corporate Gift Items & Promotional Products | Creative Fusion LLC",
    description: "Premium corporate gifts and branded merchandise for business promotion in UAE.",
    type: "website",
    locale: "en_AE",
  },
}

export default function GiftItemsPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Corporate Gift Items"
          subtitle="Branded Merchandise"
          description="Elevate your brand with premium corporate gifts and promotional products. From executive gifts to exhibition giveaways, we provide customized solutions that leave lasting impressions on clients, partners, and employees."
          heroImage="/images/hero-slide-brand-identity-design.jpg"
          icon={Gift}
          features={[
            "Executive Gift Sets",
            "Branded Apparel & Uniforms",
            "Tech Gadgets & Accessories",
            "Eco-Friendly Products",
            "Drinkware & Mugs",
            "Bags & Luggage",
            "Stationery & Office Supplies",
            "Awards & Trophies",
            "Event Giveaways",
            "Festive Gift Hampers",
            "Welcome Kits",
            "Custom Packaging",
            "USB Drives & Power Banks",
            "Keychains & Lanyards",
            "Calendars & Planners",
            "Sports & Leisure Items",
          ]}
          packages={[
            {
              name: "Starter Kit",
              price: "AED 2,500",
              description: "Essential promotional items",
              features: [
                "Branded Pens (100 pcs)",
                "Notepads (100 pcs)",
                "Tote Bags (50 pcs)",
                "Keychains (100 pcs)",
                "Single Color Print",
                "Standard Packaging",
                "2-Week Delivery",
              ],
            },
            {
              name: "Business Pack",
              price: "AED 8,000",
              description: "Professional corporate gifts",
              features: [
                "Polo Shirts (50 pcs)",
                "Branded Mugs (100 pcs)",
                "Power Banks (25 pcs)",
                "Laptop Bags (25 pcs)",
                "Full Color Branding",
                "Gift Box Packaging",
                "Executive Pens (50 pcs)",
                "10-Day Express Delivery",
              ],
              popular: true,
            },
            {
              name: "Premium Collection",
              price: "AED 20,000+",
              description: "Luxury executive gifts",
              features: [
                "Premium Gift Sets",
                "Leather Accessories",
                "Smart Watches/Gadgets",
                "Crystal Awards",
                "Custom Trophy Design",
                "VIP Hamper Sets",
                "Designer Packaging",
                "Personalization",
                "White Glove Delivery",
                "Dedicated Account Manager",
              ],
            },
          ]}
          processSteps={[
            { title: "Consult", description: "Understand your budget, quantity, and branding requirements." },
            { title: "Source", description: "Select products from our catalog or source custom items." },
            { title: "Brand", description: "Apply your logo with premium printing techniques." },
            { title: "Deliver", description: "Quality check, packaging, and timely delivery." },
          ]}
          portfolioImages={[
            "/images/hero-slide-brand-identity-design.jpg",
            "/images/creative-team-brainstorming.jpg",
            "/images/ecommerce-website-mockup.jpg",
          ]}
          relatedServices={[
            { title: "Creative Branding", href: "/services/creative-branding" },
            { title: "Print & Exhibitions", href: "/services/print-exhibitions" },
            { title: "Exhibition Stands", href: "/services/exhibition-stands" },
            { title: "Marketing & PR", href: "/services/marketing-pr" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
