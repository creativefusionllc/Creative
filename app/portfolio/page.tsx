import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PortfolioHero } from "@/components/portfolio/portfolio-hero"
import { PortfolioGalleryDynamic } from "@/components/portfolio/portfolio-gallery-dynamic"
import { CTASection } from "@/components/home/cta-section"
import { generateSEOMetadata } from "@/lib/seo/metadata-generator"

export const metadata = generateSEOMetadata({
  title: "Portfolio | Creative Fusion LLC - Our Best Work in Branding, Web & Media UAE",
  description:
    "Explore Creative Fusion's portfolio showcasing our best branding projects, website designs, photography, videography & digital marketing campaigns for clients across Dubai, Sharjah, Abu Dhabi & UAE. View our case studies and success stories.",
  keywords: [
    "creative portfolio UAE",
    "branding projects dubai",
    "web design portfolio sharjah",
    "photography portfolio UAE",
    "videography work samples",
    "digital marketing case studies",
    "logo design examples UAE",
    "creative agency work",
    "portfolio gallery dubai",
    "design showcase uae",
    "client projects sharjah",
    "case studies dubai",
    "success stories uae",
  ],
  path: "/portfolio",
  image: "/og-portfolio.jpg",
})

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <PortfolioHero />
        <PortfolioGalleryDynamic />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
