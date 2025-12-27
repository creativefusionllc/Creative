import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Quote,
  Check,
  Briefcase,
  Camera,
  Video,
  Globe,
  Megaphone,
  MessageSquare,
  Code,
  Palette,
  TrendingUp,
  Users,
  Target,
  Zap,
  Award,
  ShoppingCart,
  Search,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ServicePricingTiers } from "./service-pricing-tiers"

interface FeatureObject {
  title: string
  description: string
  icon: string
  href?: string // Added href for linking to sub-service pages
}

interface ProcessStepObject {
  number?: string
  title: string
  description: string
}

interface RelatedService {
  title: string
  href: string
}

interface PricingTier {
  name: string
  price: number
  features: string[]
}

interface ServicePageProps {
  serviceNumber?: string
  title: string
  subtitle: string
  description: string
  heroImage: string
  icon: string
  brandColor?: "lime" | "coral" | "blue" | "cyan" | "emerald" | "purple" | "orange" | "red" | "teal" | "indigo" | "pink"
  features: string[] | FeatureObject[]
  process?: ProcessStepObject[]
  processSteps?: ProcessStepObject[]
  benefits?: string[]
  relatedServices?: RelatedService[]
  packages?: unknown[]
  portfolioImages?: string[]
  pricingTiers?: PricingTier[]
}

export function ServicePageTemplate({
  serviceNumber = "01",
  title,
  subtitle,
  description,
  heroImage,
  icon: iconName,
  brandColor = "lime",
  features,
  process,
  processSteps,
  benefits,
  relatedServices,
  pricingTiers,
}: ServicePageProps) {
  const iconMap: Record<string, LucideIcon> = {
    Briefcase,
    Camera,
    Video,
    Globe,
    Megaphone,
    MessageSquare,
    Code,
    Palette,
    TrendingUp,
    Users,
    Target,
    Zap,
    Award,
    ShoppingCart,
    Search,
    Mail,
    Phone,
    MapPin,
  }

  const Icon = iconMap[iconName] || Briefcase // Default to Briefcase if icon not found

  const colors = {
    lime: {
      primary: "#C4D600",
      dark: "#a8b800",
      bg: "bg-[#C4D600]",
      bgLight: "bg-[#C4D600]/10",
      text: "text-[#C4D600]",
      border: "border-[#C4D600]",
      hover: "hover:bg-[#b0c200]",
    },
    coral: {
      primary: "#E8573F",
      dark: "#d04a33",
      bg: "bg-[#E8573F]",
      bgLight: "bg-[#E8573F]/10",
      text: "text-[#E8573F]",
      border: "border-[#E8573F]",
      hover: "hover:bg-[#d74d35]",
    },
    blue: {
      primary: "#3B82F6",
      dark: "#2563EB",
      bg: "bg-[#3B82F6]",
      bgLight: "bg-[#3B82F6]/10",
      text: "text-[#3B82F6]",
      border: "border-[#3B82F6]",
      hover: "hover:bg-[#2563EB]",
    },
    cyan: {
      primary: "#06B6D4",
      dark: "#0891B2",
      bg: "bg-[#06B6D4]",
      bgLight: "bg-[#06B6D4]/10",
      text: "text-[#06B6D4]",
      border: "border-[#06B6D4]",
      hover: "hover:bg-[#0891B2]",
    },
    emerald: {
      primary: "#10B981",
      dark: "#059669",
      bg: "bg-[#10B981]",
      bgLight: "bg-[#10B981]/10",
      text: "text-[#10B981]",
      border: "border-[#10B981]",
      hover: "hover:bg-[#059669]",
    },
    purple: {
      primary: "#8B5CF6",
      dark: "#7C3AED",
      bg: "bg-[#8B5CF6]",
      bgLight: "bg-[#8B5CF6]/10",
      text: "text-[#8B5CF6]",
      border: "border-[#8B5CF6]",
      hover: "hover:bg-[#7C3AED]",
    },
    orange: {
      primary: "#F97316",
      dark: "#EA580C",
      bg: "bg-[#F97316]",
      bgLight: "bg-[#F97316]/10",
      text: "text-[#F97316]",
      border: "border-[#F97316]",
      hover: "hover:bg-[#EA580C]",
    },
    red: {
      primary: "#EF4444",
      dark: "#DC2626",
      bg: "bg-[#EF4444]",
      bgLight: "bg-[#EF4444]/10",
      text: "text-[#EF4444]",
      border: "border-[#EF4444]",
      hover: "hover:bg-[#DC2626]",
    },
    teal: {
      primary: "#14B8A6",
      dark: "#0D9488",
      bg: "bg-[#14B8A6]",
      bgLight: "bg-[#14B8A6]/10",
      text: "text-[#14B8A6]",
      border: "border-[#14B8A6]",
      hover: "hover:bg-[#0D9488]",
    },
    indigo: {
      primary: "#6366F1",
      dark: "#4F46E5",
      bg: "bg-[#6366F1]",
      bgLight: "bg-[#6366F1]/10",
      text: "text-[#6366F1]",
      border: "border-[#6366F1]",
      hover: "hover:bg-[#4F46E5]",
    },
    pink: {
      primary: "#EC4899",
      dark: "#DB2777",
      bg: "bg-[#EC4899]",
      bgLight: "bg-[#EC4899]/10",
      text: "text-[#EC4899]",
      border: "border-[#EC4899]",
      hover: "hover:bg-[#DB2777]",
    },
  }

  const c = colors[brandColor as keyof typeof colors] || colors.lime

  if (!c) {
    console.error(`Invalid brandColor: ${brandColor}. Using lime as fallback.`)
  }

  const normalizedFeatures: FeatureObject[] = (features || []).map((feature, index) => {
    if (typeof feature === "string") {
      return {
        title: feature,
        description: "Expert solutions tailored to your business needs.",
        icon: ["🎯", "⭐", "💡", "🚀", "✨", "🔥"][index % 6],
      }
    }
    return feature as FeatureObject
  })

  const actualProcess = process || processSteps || []

  const normalizedProcess: ProcessStepObject[] = (actualProcess || []).map((step, index) => ({
    number: step.number || String(index + 1).padStart(2, "0"),
    title: step.title,
    description: step.description,
  }))

  const normalizedBenefits = benefits || [
    "15+ years of industry experience",
    "Award-winning creative team",
    "End-to-end project management",
    "Competitive pricing",
    "Quick turnaround times",
    "Dedicated account manager",
  ]

  const areasServed = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Clean White with Accent */}
      <section className="relative min-h-[70vh] flex items-center bg-[#1C1C1C] overflow-hidden">
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/counter-one-pattern.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
            }}
          />
        </div>

        {/* Decorative Elements */}
        <div className={`absolute top-20 right-20 w-72 h-72 ${c.bgLight} rounded-full blur-3xl`} />
        <div className={`absolute bottom-20 left-20 w-96 h-96 ${c.bgLight} rounded-full blur-3xl`} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              {/* Service Number & Badge */}
              <div className="flex items-center gap-4 mb-6">
                <span className={`font-mono text-sm ${c.text} tracking-wider font-semibold text-white`}>
                  SERVICE {serviceNumber}
                </span>
                <div className={`h-px w-16 ${c.bg}`} />
                <span className="text-gray-300 text-sm uppercase tracking-widest">{subtitle}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                {title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">{description}</p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className={`${c.bg} text-gray-900 ${c.hover} font-semibold h-14 px-10 text-base`}
                  asChild
                >
                  <Link href="/contact">
                    Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-white hover:bg-white/10 bg-transparent h-14 px-10 text-base"
                  asChild
                >
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className={`absolute -inset-4 ${c.bgLight} rounded-3xl transform rotate-3`} />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage || "/placeholder.svg"}
                  alt={title}
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating Icon Badge */}
              <div
                className={`absolute -bottom-6 -left-6 w-24 h-24 ${c.bg} rounded-2xl flex items-center justify-center shadow-xl`}
              >
                <Icon className="h-12 w-12 text-gray-900" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served Section for SEO */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-gray-500 font-medium">Serving:</span>
            {areasServed.map((area, index) => (
              <span key={area} className="text-gray-600">
                {area}
                {index < areasServed.length - 1 && <span className="mx-1 text-gray-300">•</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - White Background */}
      <section className="py-24 lg:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className={`${c.text} text-sm font-semibold tracking-widest uppercase mb-3`}>WHAT WE OFFER</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Services <span className={c.text}>Include</span>
            </h2>
            <div className={`h-1 w-24 ${c.bg} mx-auto`} />
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {normalizedFeatures.slice(0, 6).map((feature, index) => {
              const CardWrapper = feature.href ? Link : "div"
              const cardProps = feature.href ? { href: feature.href } : {}

              return (
                <CardWrapper
                  key={index}
                  {...cardProps}
                  className={`group relative bg-white rounded-2xl border border-gray-200 p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300 ${feature.href ? "cursor-pointer" : ""}`}
                >
                  {/* Icon */}
                  <span className="text-4xl mb-6 block">{feature.icon}</span>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  {feature.href && (
                    <div className={`mt-4 flex items-center gap-2 ${c.text} font-medium text-sm`}>
                      Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}

                  {/* Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${c.bg} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                  />
                </CardWrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section - Dark Charcoal Background */}
      {normalizedProcess.length > 0 && (
        <section className="py-24 lg:py-32 bg-[#1C1C1C] relative overflow-hidden">
          {/* Texture Pattern */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: "url('/images/counter-one-pattern.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
            }}
          />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20">
              <p className={`${c.text} text-sm font-semibold tracking-widest uppercase mb-3`}>OUR PROCESS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                How We <span className={c.text}>Work</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A streamlined process designed to deliver exceptional results while keeping you involved at every stage.
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {normalizedProcess.map((step, index) => (
                <div key={index} className="relative text-center group">
                  {/* Number Circle */}
                  <div
                    className={`w-20 h-20 ${c.bg} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-gray-900 font-bold text-2xl">{step.number}</span>
                  </div>

                  {/* Connector Line (hidden on last item) */}
                  {index < normalizedProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-transparent" />
                  )}

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section - Light Gray Background */}
      <section className="py-24 lg:py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Benefits List */}
            <div>
              <p className={`${c.text} text-sm font-semibold tracking-widest uppercase mb-3`}>WHY CHOOSE US</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                The Creative Fusion <span className={c.text}>Advantage</span>
              </h2>

              <div className="space-y-4">
                {normalizedBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`w-10 h-10 ${c.bg} rounded-full flex items-center justify-center shrink-0`}>
                      <Check className="h-5 w-5 text-gray-900" />
                    </div>
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Card */}
            <div className="relative">
              <div className={`absolute -top-8 -left-8 w-24 h-24 ${c.bgLight} rounded-full blur-2xl`} />
              <div className="relative bg-white border border-gray-200 rounded-3xl p-10 shadow-lg">
                <Quote className={`h-12 w-12 ${c.text} mb-6`} />
                <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                  "Working with Creative Fusion transformed our brand completely. Their attention to detail and creative
                  vision exceeded all our expectations."
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${c.bg} rounded-full flex items-center justify-center`}>
                    <span className="text-gray-900 font-bold">JD</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">John Doe</p>
                    <p className="text-gray-500 text-sm">CEO, Tech Company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      {pricingTiers && pricingTiers.length > 0 && <ServicePricingTiers tiers={pricingTiers} brandColor={c.primary} />}

      {/* CTA Section - Brand Color Background */}
      <section className={`py-20 lg:py-24 ${c.bg} relative overflow-hidden`}>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-800/80 mb-10 max-w-2xl mx-auto">
            Let's discuss your project and create something extraordinary together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 font-semibold h-14 px-10 text-base"
              asChild
            >
              <Link href="/contact">
                Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900/10 bg-transparent h-14 px-10 text-base"
              asChild
            >
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section - White Background */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <p className={`${c.text} text-sm font-semibold tracking-widest uppercase mb-3`}>GET IN TOUCH</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Visit Our <span className={c.text}>Studio</span>
              </h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Located in Sharjah Media City (SHAMS), our creative studio is equipped with state-of-the-art facilities.
                We'd love to meet you and discuss your project in person.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-[#C4D600]" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1">Address</h4>
                    <p className="text-gray-600">Sharjah Media City (SHAMS), Sharjah, UAE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-[#C4D600]" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1">Phone</h4>
                    <a href="tel:+971581174911" className="text-gray-600 hover:text-[#C4D600] transition-colors block">
                      +971 58 117 4911
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-[#C4D600]" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:info@creativefusion.llc"
                      className="text-gray-600 hover:text-[#C4D600] transition-colors block"
                    >
                      info@creativefusion.llc
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-[#C4D600]" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1">Business Hours</h4>
                    <p className="text-gray-600">
                      Sunday - Thursday: 9:00 AM - 6:00 PM
                      <br />
                      Friday - Saturday: By Appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden h-[500px] border border-gray-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.106533249564!2d55.67697481549818!3d25.27830029535745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef593a32ca797c9%3A0x939290c0f6f3576c!2sCreative%20Fusion%20LLC!5e1!3m2!1sen!2sae!4v1765518887653!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Creative Fusion Location - Dubai Media City"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Services - Light Gray Background */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="py-16 border-t">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Services</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {relatedServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className={`px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-white transition-all duration-300`}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
