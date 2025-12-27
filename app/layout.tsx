import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://creativefusion.llc"),
  title: {
    default: "Creative Fusion | Creative Fusion LLC - #1 Branding & Digital Marketing Agency Dubai UAE",
    template: "%s | Creative Fusion LLC Dubai",
  },
  description:
    "Creative Fusion LLC (Creative Fusion) - #1 Premier branding, digital marketing, web development & media production agency. Creative Fusion serves Dubai, UAE, Sharjah, Abu Dhabi, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman. Award-winning Creative Fusion team with 15+ years experience. SHAMS licensed. Call +971 58 117 4911",
  keywords: [
    "creative fusion",
    "creative fusion llc",
    "creative fusion dubai",
    "creative fusion uae",
    "creative fusion agency",
    "creative fusion branding",
    "creative fusion marketing",
    "creative fusion llc dubai",
    "creative fusion sharjah",
    "creative fusion gcc",
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
  authors: [{ name: "Creative Fusion LLC", url: "https://creativefusion.llc" }],
  creator: "Creative Fusion LLC",
  publisher: "Creative Fusion LLC",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Creative Fusion",
    startupImage: [
      {
        url: "/splash-screens/splash-1242x2688.png",
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
        type: "image/png",
      },
    ],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://creativefusion.llc",
    siteName: "Creative Fusion LLC",
    title: "Creative Fusion | Creative Fusion LLC - #1 Branding & Digital Agency Dubai UAE GCC",
    description:
      "Creative Fusion LLC is the premier Creative Fusion agency in Dubai, UAE & GCC. Creative Fusion specializes in branding, digital marketing, web development, photography & videography. 15+ years experience. SHAMS Licensed.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creative Fusion LLC - Strategic Branding & Digital Growth Dubai UAE",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Fusion | Creative Fusion LLC - Branding & Digital Agency Dubai UAE GCC",
    description:
      "Creative Fusion LLC - Premier creative fusion agency in Dubai & GCC. Branding, marketing, web & media production.",
    images: ["/og-image.jpg"],
    creator: "@creativefusionllc",
    site: "@creativefusionllc",
  },
  alternates: {
    canonical: "https://creativefusion.llc",
    languages: {
      "en-AE": "https://creativefusion.llc",
      "en-US": "https://creativefusion.llc",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/creative-fusion-logo.jpg", type: "image/jpeg" },
    ],
    apple: "/images/creative-fusion-logo.jpg",
    shortcut: "/favicon.ico",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
  },
  category: "business",
  classification: "Creative Agency, Digital Marketing, Branding",
  generator: "Next.js",
  applicationName: "Creative Fusion LLC",
  referrer: "origin-when-cross-origin",
  appLinks: [
    {
      url: "https://apps.apple.com/ae/app/creative-fusion/id6736254891",
      platform: "itunes",
    },
    {
      url: "https://play.google.com/store/apps/details?id=com.creativefusion.app",
      platform: "play",
    },
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C4D600" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.jpg" />
        <link rel="alternate" href="https://apps.apple.com/ae/app/creative-fusion/id6736254891" />
        <link rel="alternate" href="https://play.google.com/store/apps/details?id=com.creativefusion.app" />

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://creativefusion.llc/#organization",
              name: "Creative Fusion | Creative Fusion LLC",
              legalName: "Creative Fusion LLC",
              alternateName: "Creative Fusion",
              url: "https://creativefusion.llc",
              logo: {
                "@type": "ImageObject",
                url: "https://creativefusion.llc/images/creative-fusion-logo.jpg",
                width: 512,
                height: 512,
              },
              description:
                "Creative Fusion LLC is the #1 premier Creative Fusion branding, digital marketing, web development and media production agency in UAE. Creative Fusion is SHAMS licensed with 15+ years experience serving Dubai, Sharjah, Abu Dhabi and GCC.",
              foundingDate: "2009",
              founder: {
                "@type": "Person",
                name: "Naveed Ahmad",
                jobTitle: "Founder & CEO",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sharjah Media City (SHAMS)",
                addressLocality: "Sharjah",
                addressRegion: "Sharjah",
                postalCode: "00000",
                addressCountry: "AE",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+971-58-117-4911",
                  contactType: "customer service",
                  email: "info@creativefusion.llc",
                  availableLanguage: ["English", "Arabic", "Urdu", "Hindi"],
                  areaServed: ["AE", "SA", "QA", "KW", "BH", "OM"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+971-58-117-4911",
                  contactType: "sales",
                  email: "sales@creativefusion.llc",
                },
              ],
              sameAs: [
                "https://www.instagram.com/creativefusionllc",
                "https://www.facebook.com/creativefusionllc",
                "https://www.linkedin.com/company/creativefusionllc",
                "https://www.youtube.com/@creativefusionllc",
                "https://twitter.com/creativefusllc",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://creativefusion.llc/#localbusiness",
              name: "Creative Fusion | Creative Fusion LLC",
              alternateName: "Creative Fusion Dubai",
              image: "https://creativefusion.llc/images/creative-fusion-logo.jpg",
              telephone: "+971-58-117-4911",
              email: "info@creativefusion.llc",
              url: "https://creativefusion.llc",
              priceRange: "AED 1000 - AED 100000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sharjah Media City (SHAMS)",
                addressLocality: "Sharjah",
                addressRegion: "Sharjah",
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
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://creativefusion.llc/#website",
              name: "Creative Fusion | Creative Fusion LLC",
              alternateName: "Creative Fusion Dubai",
              url: "https://creativefusion.llc",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://creativefusion.llc/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Script id="security-init" strategy="lazyOnload">
          {`
            (function() {
              // Disable right-click
              document.addEventListener('contextmenu', e => e.preventDefault());
              
              // Disable key combinations
              document.addEventListener('keydown', e => {
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
                    (e.ctrlKey && e.key === 'U')) {
                  e.preventDefault();
                }
              });
              
              // Disable text selection and drag on images only
              document.addEventListener('selectstart', e => {
                if (e.target.tagName === 'IMG') e.preventDefault();
              });
              
              document.addEventListener('dragstart', e => {
                if (e.target.tagName === 'IMG') e.preventDefault();
              });
            })();
          `}
        </Script>
        {/* Download banner now in Header component */}
        <ScrollToTop />
        <Toaster />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
