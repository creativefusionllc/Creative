import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services/services-hero"
import { AllServicesGrid } from "@/components/services/all-services-grid"
import { BookingFormSection } from "@/components/home/booking-form-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { generateSEOMetadata } from "@/lib/seo/metadata-generator"

export const metadata = generateSEOMetadata({
  title: "Our Services | Creative Fusion LLC - Branding, Web, Marketing, PR, Exhibition & Media Production UAE",
  description:
    "Explore our comprehensive services: Creative Branding, Photography, Videography, Digital Marketing, Marketing & PR, Web Development, Software Solutions, Exhibition Stands, Gift Items, Print & more. Serving Dubai, Sharjah, Abu Dhabi & all UAE.",
  keywords: [
    "creative services dubai",
    "branding services uae",
    "photography services dubai",
    "videography sharjah",
    "digital marketing agency dubai",
    "marketing pr uae",
    "web development dubai",
    "software development sharjah",
    "exhibition stands dubai",
    "corporate gifts uae",
    "print services dubai",
    "media production uae",
    "consulting services dubai",
    "domain hosting uae",
    "whatsapp marketing dubai",
    "sales retail services uae",
    "graphic design dubai",
    "creative agency sharjah",
    "full service agency dubai",
    "business services uae",
    "professional services gcc",
  ],
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <AllServicesGrid />
        <BookingFormSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
