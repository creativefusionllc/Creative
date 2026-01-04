import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactSection } from "@/components/contact/contact-section"
import { generateSEOMetadata } from "@/lib/seo/metadata-generator"

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Creative Fusion LLC | Head Office UAE Sharjah - Get in Touch",
  description:
    "Contact Creative Fusion LLC, head office in Sharjah Media City (SHAMS), UAE. Call +971 58 117 4911 or email info@creativefusion.llc for branding, web development, digital marketing & media production. Global offices in Germany & USA.",
  keywords: [
    "contact creative fusion",
    "creative fusion uae",
    "creative fusion sharjah",
    "creative fusion head office",
    "creative fusion llc contact",
    "branding agency sharjah",
    "digital marketing agency dubai uae",
    "web development sharjah",
    "creative agency contact uae",
    "get in touch creative fusion",
    "inquiry creative fusion",
    "consultation dubai",
    "business inquiry sharjah media city",
    "creative fusion appointment",
    "call creative fusion uae",
    "email creative fusion",
    "creative fusion locations",
    "creative fusion office germany",
    "creative fusion office usa",
    "contact branding agency uae",
    "professional design services sharjah",
    "marketing consultation dubai",
    "free quote creative services",
  ],
  path: "/contact",
  image: "/og-contact.jpg",
  type: "website",
})

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactSection />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://creativefusion.llc/contact#localbusiness",
              name: "Creative Fusion LLC",
              alternateName: "Creative Fusion",
              description:
                "Creative Fusion LLC is a SHAMS-licensed creative agency headquartered in Sharjah, UAE providing branding, digital marketing, web development, photography, videography and media production services across UAE, GCC and globally.",
              url: "https://creativefusion.llc",
              telephone: "+971-58-117-4911",
              email: "info@creativefusion.llc",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Shams Business Center, Shams Media City",
                addressLocality: "Sharjah",
                addressRegion: "Sharjah",
                postalCode: "00000",
                addressCountry: "AE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 25.3463,
                longitude: 55.4209,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday", "Sunday"],
                  openingHours: "By Appointment",
                },
              ],
              priceRange: "AED 1000 - AED 100000",
              image: "https://creativefusion.llc/og-contact.jpg",
              sameAs: [
                "https://www.instagram.com/creativefusionllc",
                "https://www.facebook.com/creativefusionllc",
                "https://www.linkedin.com/company/creativefusionllc",
                "https://www.youtube.com/@creativefusionllc",
              ],
              areaServed: ["AE", "SA", "QA", "KW", "BH", "OM", "DE", "US"],
              serviceType: [
                "Branding & Design",
                "Digital Marketing",
                "Web Development",
                "Photography",
                "Videography",
                "Media Production",
              ],
              additionalLocations: [
                {
                  "@type": "LocalBusiness",
                  name: "Creative Fusion - Germany Office",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Marksstraße 118",
                    addressLocality: "Bochum",
                    addressCountry: "DE",
                  },
                  telephone: "+49-1577-900-1033",
                  email: "de@creativefusion.llc",
                },
                {
                  "@type": "LocalBusiness",
                  name: "Creative Fusion - USA Office",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "3450 Breckinridge BLVD APT 1508",
                    addressLocality: "Duluth",
                    addressRegion: "GA",
                    postalCode: "30096-4929",
                    addressCountry: "US",
                  },
                  telephone: "+1-470-753-3308",
                  email: "usa@creativefusion.llc",
                },
              ],
            }),
          }}
        />
      </main>
      <Footer />
    </>
  )
}
