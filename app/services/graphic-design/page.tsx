import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Palette, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { generateSEOMetadata } from "@/utils/seo"

export const metadata = generateSEOMetadata({
  title: "Graphic Design Services Dubai | Visual Design & Branding | Creative Fusion LLC",
  description:
    "Professional graphic design services in Dubai, UAE. Brand identity, motion graphics, UI/UX design, social media graphics, marketing collateral. Award-winning designers serving Dubai, Sharjah, Abu Dhabi & GCC.",
  keywords: [
    "graphic design dubai",
    "visual design uae",
    "brand identity design",
    "motion graphics dubai",
    "ui ux design sharjah",
    "social media design",
    "marketing collateral design",
    "logo design dubai",
    "creative design agency",
    "graphic designer uae",
    "branding design dubai",
    "design agency sharjah",
  ],
  path: "/services/graphic-design",
})

export default function GraphicDesignPage() {
  const subservices = [
    {
      title: "Brand Identity & Corporate Design",
      description: "Complete visual identity systems",
      href: "/services/graphic-design/brand-identity",
    },
    {
      title: "Social Media Content & Design",
      description: "Engaging posts and story templates",
      href: "/services/graphic-design/social-media-design",
    },
    {
      title: "Animation & Motion Graphics",
      description: "Dynamic animated content",
      href: "/services/graphic-design/motion-graphics",
    },
    {
      title: "UI/UX Design & Digital Experience",
      description: "User-centered interface design",
      href: "/services/graphic-design/ui-ux-design",
    },
    {
      title: "Visual Design Systems",
      description: "Consistent brand guidelines",
      href: "/services/graphic-design/visual-design-systems",
    },
    {
      title: "Marketing Collateral",
      description: "Brochures, flyers, and promotional materials",
      href: "/services/graphic-design/marketing-collateral",
    },
  ]

  const benefits = [
    "Creative excellence with award-winning designers",
    "Brand consistency across all touchpoints",
    "Multi-format output for print and digital",
    "Unlimited revisions until you're satisfied",
    "Fast turnaround times",
    "Strategic design thinking",
  ]

  return (
    <>
      <Header />
      <main>
        <section className="relative pt-32 pb-20 bg-[#1F2937] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-[#C4D600]/20 rounded-2xl flex items-center justify-center">
                <Palette className="h-8 w-8 text-[#C4D600]" />
              </div>
              <div>
                <p className="text-[#C4D600] font-semibold text-sm uppercase tracking-wide">Creative & Design</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Graphic & Visual Design</h1>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Transform your brand narrative into high-impact visual media—from compelling graphics to motion animations
              that captivate your audience and build lasting brand recognition.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Services Include</h2>
            <div className="h-1 w-24 bg-[#C4D600] mb-12" />

            <div className="grid md:grid-cols-2 gap-6">
              {subservices.map((service, idx) => (
                <Link
                  key={idx}
                  href={service.href}
                  className="group flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#C4D600] hover:shadow-lg transition-all"
                >
                  <div className="w-8 h-8 bg-[#C4D600]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-[#C4D600]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                    <span className="mt-2 flex items-center gap-1 text-[#C4D600] text-sm font-medium">
                      Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Design Services</h2>
            <div className="h-1 w-24 bg-[#E8573F] mb-12" />

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <Check className="h-5 w-5 text-[#C4D600] shrink-0" />
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#1F2937] text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Brand?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's create visual designs that captivate and convert your audience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold px-8" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold px-8 bg-transparent"
                asChild
              >
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
