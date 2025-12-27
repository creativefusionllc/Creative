import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Play } from "lucide-react"

export const metadata: Metadata = {
  title: "Motion Graphics Dubai | Animation Services | Creative Fusion LLC",
  description:
    "Professional motion graphics and animation services. Logo animations, explainer videos, social media animations, and dynamic visual content.",
  keywords: ["motion graphics dubai", "animation services uae", "logo animation", "explainer videos dubai"],
}

export default function MotionGraphicsPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ title: "Graphic Design", href: "/services/graphic-design" }}
        title="Motion Graphics & Animation"
        subtitle="Dynamic Visual Content"
        description="Bring your brand to life with captivating motion graphics and animations that engage audiences across all platforms."
        heroImage="/images/motion-graphics.jpg"
        icon={Play}
        features={[
          "Logo animations",
          "Explainer video graphics",
          "Social media animations",
          "Animated infographics",
          "Title sequences",
          "Product animations",
        ]}
        pricingTiers={[
          { name: "Basic", price: "AED 2,000", features: ["5-10 sec animation", "Logo reveal", "2 revisions"] },
          {
            name: "Standard",
            price: "AED 5,000",
            features: ["30 sec animation", "Custom graphics", "Sound design"],
            highlighted: true,
          },
          {
            name: "Premium",
            price: "AED 12,000+",
            features: ["60+ sec animation", "Full production", "Multiple formats"],
          },
        ]}
        relatedSubServices={[
          { title: "Social Media Design", href: "/services/graphic-design/social-media-design" },
          { title: "UI/UX Design", href: "/services/graphic-design/ui-ux-design" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
