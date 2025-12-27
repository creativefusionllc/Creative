import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactSection } from "@/components/contact/contact-section"
import { generateSEOMetadata } from "@/lib/seo/metadata-generator"

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us | Creative Fusion LLC - Get in Touch for Creative Solutions UAE",
  description:
    "Contact Creative Fusion LLC in Sharjah Media City (SHAMS). Call +971 58 117 4911, email info@creativefusion.llc or visit us for branding, web development, digital marketing & media production services across Dubai, Sharjah, Abu Dhabi & UAE.",
  keywords: [
    "contact creative fusion",
    "creative agency contact UAE",
    "sharjah media city agency",
    "branding consultation dubai",
    "free quote UAE",
    "marketing agency contact",
    "SHAMS creative agency",
    "design agency sharjah",
    "get in touch dubai",
    "creative services inquiry",
    "business consultation uae",
  ],
  path: "/contact",
  image: "/og-contact.jpg",
})

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
