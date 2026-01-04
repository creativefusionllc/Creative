import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { BookingFormSection } from "@/components/home/booking-form-section"
import { ClientsMarquee } from "@/components/home/clients-marquee"
import { TrustBadgesSection } from "@/components/home/trust-badges-section"
import { ServicesShowcase } from "@/components/home/services-showcase"
import { WhyChooseSection } from "@/components/home/why-choose-section"
import { ProcessSection } from "@/components/home/process-section"
import { AboutPreview } from "@/components/home/about-preview"
import { LocationsStrip } from "@/components/home/locations-strip"
import { PricingPackagesSection } from "@/components/home/pricing-packages-section" // Import PricingPackagesSection
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { generateSEOMetadata } from "@/utils/seo-metadata"

const PortfolioPreviewSection = dynamic(
  () => import("@/components/home/portfolio-preview-section").then((mod) => ({ default: mod.PortfolioPreviewSection })),
  {
    loading: () => <div className="h-96 bg-background" />,
    ssr: true,
  },
)

const TestimonialsSection = dynamic(
  () => import("@/components/home/testimonials-section").then((mod) => ({ default: mod.TestimonialsSection })),
  {
    loading: () => <div className="h-96 bg-background" />,
    ssr: true,
  },
)

const BlogSection = dynamic(
  () => import("@/components/home/blog-section").then((mod) => ({ default: mod.BlogSection })),
  {
    loading: () => <div className="h-96 bg-background" />,
    ssr: true,
  },
)

export const metadata = generateSEOMetadata({
  title: "Creative Fusion | Creative Fusion LLC - #1 Branding & Digital Marketing Agency Dubai UAE",
  description:
    "Creative Fusion LLC (Creative Fusion) is the #1 premier Creative Fusion branding, digital marketing, web development & media production agency. Creative Fusion serves Dubai, UAE, Sharjah, Abu Dhabi, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman. Award-winning Creative Fusion team with 15+ years experience. SHAMS licensed. Call +971 58 117 4911 for Creative Fusion services.",
  keywords: [
    "creative fusion",
    "creative fusion llc",
    "creative fusion dubai",
    "creative fusion uae",
    "creative fusion agency",
    "creative fusion branding",
    "creative fusion marketing",
    "creative fusion web development",
    "creative fusion photography",
    "creative fusion videography",
    "creative fusion llc dubai",
    "creative fusion sharjah",
    "creative fusion gcc",
    "creative fusion services",
    "creative fusion agency dubai",
    "branding agency dubai",
    "digital marketing agency uae",
    "web development dubai",
    "creative agency sharjah",
    "brand identity dubai",
    "social media marketing uae",
    "photography dubai",
    "videography uae",
    "logo design dubai",
    "graphic design sharjah",
    "seo services uae",
    "media production dubai",
    "exhibition stands uae",
    "corporate branding dubai",
    "marketing agency abu dhabi",
    "creative agency gcc",
    "branding company saudi arabia",
    "digital agency qatar",
    "web design kuwait",
    "advertising agency bahrain",
    "media production oman",
    "creative services middle east",
    "best marketing agency dubai",
    "top branding agency uae",
    "affordable web development dubai",
    "professional photography uae",
    "corporate video production dubai",
    "ecommerce development dubai",
    "mobile app development uae",
  ],
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ClientsMarquee />
        <TrustBadgesSection />
        <ServicesShowcase />
        <WhyChooseSection />
        <ProcessSection />
        <AboutPreview />
        <Suspense fallback={<div className="h-96 bg-background" />}>
          <PortfolioPreviewSection />
        </Suspense>
        <LocationsStrip />
        <PricingPackagesSection /> // Insert PricingPackagesSection here
        <Suspense fallback={<div className="h-96 bg-background" />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-background" />}>
          <BlogSection />
        </Suspense>
        <BookingFormSection />
      </main>
      <Footer />
    </>
  )
}
