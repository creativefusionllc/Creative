import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { CompanyIntro } from "@/components/about/company-intro"
import { MissionVision } from "@/components/about/mission-vision"
import { CoreValues } from "@/components/about/core-values"
import { TeamSection } from "@/components/about/team-section"
import { CTASection } from "@/components/home/cta-section"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const ChairmanSection = dynamic(() =>
  import("@/components/about/chairman-section").then((mod) => ({ default: mod.ChairmanSection })),
)
const FounderSection = dynamic(() =>
  import("@/components/about/founder-section").then((mod) => ({ default: mod.FounderSection })),
)

export const metadata: Metadata = {
  title: "About Us | Creative Fusion LLC - Leading Digital Agency in UAE Since 2009",
  description:
    "Learn about Creative Fusion LLC, a SHAMS-licensed creative agency in Sharjah Media City. 15+ years of excellence in branding, digital marketing, web development & media production across UAE.",
  keywords: [
    "about creative fusion",
    "digital agency UAE",
    "creative agency sharjah",
    "branding company dubai",
    "SHAMS licensed agency",
    "media production UAE",
    "marketing agency sharjah media city",
    "creative fusion team",
    "naveed ahmad founder",
  ],
  openGraph: {
    title: "About Creative Fusion LLC | Digital Agency UAE",
    description:
      "15+ years of creative excellence. SHAMS-licensed agency delivering branding, marketing & media solutions across UAE.",
    type: "website",
    locale: "en_AE",
    url: "https://creativefusion.llc/about",
    siteName: "Creative Fusion LLC",
    images: [{ url: "/og-about.jpg", width: 1200, height: 630, alt: "About Creative Fusion LLC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Creative Fusion LLC",
    description: "15+ years of creative excellence in UAE",
  },
  alternates: {
    canonical: "https://creativefusion.llc/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <CompanyIntro />
        <MissionVision />
        <Suspense fallback={<div className="h-96" />}>
          <ChairmanSection />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <FounderSection />
        </Suspense>
        <CoreValues />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
