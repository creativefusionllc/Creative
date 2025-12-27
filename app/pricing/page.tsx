import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingPage } from "@/components/pricing/pricing-page"

export const metadata: Metadata = {
  title: "Pricing & Packages | Creative Fusion LLC - Affordable Creative Services UAE",
  description:
    "View our transparent pricing for branding, web development, digital marketing, photography & videography services. Flexible packages for startups to enterprises in Dubai, Sharjah & UAE.",
  keywords: [
    "creative agency pricing UAE",
    "branding packages dubai",
    "web development cost sharjah",
    "digital marketing pricing UAE",
    "photography packages",
    "videography rates UAE",
    "affordable design services",
    "startup packages UAE",
  ],
  openGraph: {
    title: "Pricing & Packages | Creative Fusion LLC",
    description: "Transparent, affordable pricing for all creative services in UAE",
    type: "website",
    locale: "en_AE",
    url: "https://creativefusion.llc/pricing",
    siteName: "Creative Fusion LLC",
    images: [{ url: "/og-pricing.jpg", width: 1200, height: 630, alt: "Creative Fusion Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Fusion Pricing",
    description: "Affordable creative services in UAE",
  },
  alternates: {
    canonical: "https://creativefusion.llc/pricing",
  },
}

export default function Pricing() {
  return (
    <>
      <Header />
      <PricingPage />
      <Footer />
    </>
  )
}
