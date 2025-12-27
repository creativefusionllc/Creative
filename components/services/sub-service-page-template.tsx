"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Check, Phone, Mail, MessageCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface FeatureObject {
  title: string
  description: string
  icon?: string
}

interface PricingTier {
  name: string
  price: string
  description?: string
  features: string[]
  popular?: boolean
}

interface RelatedSubService {
  title: string
  href: string
}

interface SubServicePageProps {
  parentService: {
    title: string
    href: string
  }
  title: string
  subtitle: string
  description: string
  heroImage: string
  icon?: LucideIcon
  features: FeatureObject[]
  pricing?: PricingTier[]
  pricingTiers?: PricingTier[] // Added alias for pricing
  relatedSubServices: RelatedSubService[]
}

export function SubServicePageTemplate({
  parentService,
  title,
  subtitle,
  description,
  heroImage,
  icon: Icon,
  features,
  pricing,
  pricingTiers, // Accept both pricing and pricingTiers
  relatedSubServices,
}: SubServicePageProps) {
  const brandColor = "#C4D600"
  const pricingData = pricing || pricingTiers

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb & Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gray-50 overflow-hidden">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#C4D600]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#C4D600]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/services" className="text-gray-500 hover:text-gray-700">
              Services
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={parentService.href} className="text-gray-500 hover:text-gray-700">
              {parentService.title}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#C4D600] font-medium">{title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              {/* Back Link */}
              <Link
                href={parentService.href}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to {parentService.title}
              </Link>

              {/* Badge - only show icon if provided */}
              <div className="flex items-center gap-3 mb-4">
                {Icon ? (
                  <div className="w-10 h-10 bg-[#C4D600] rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-gray-900" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-[#C4D600] rounded-lg flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-lg">{title.charAt(0)}</span>
                  </div>
                )}
                <span className="text-gray-500 text-sm uppercase tracking-widest">{subtitle}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {title}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">{description}</p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base"
                  asChild
                >
                  <Link href="/contact">
                    Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base"
                  asChild
                >
                  <Link href="/portfolio">View Examples</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#C4D600]/10 rounded-3xl transform rotate-3" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage || "/placeholder.svg?height=500&width=600&query=creative design service"}
                  alt={title}
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#C4D600] text-sm font-semibold tracking-widest uppercase mb-3">WHAT'S INCLUDED</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {title} <span className="text-[#C4D600]">Features</span>
            </h2>
            <div className="h-1 w-24 bg-[#C4D600] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
              >
                {feature.icon ? (
                  <span className="text-3xl sm:text-4xl mb-4 sm:mb-6 block">{feature.icon}</span>
                ) : (
                  <div className="w-10 h-10 bg-[#C4D600]/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                    <span className="text-[#C4D600] font-bold">{index + 1}</span>
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C4D600] rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - use pricingData instead of pricing */}
      {pricingData && pricingData.length > 0 && (
        <section className="py-16 sm:py-24 lg:py-32 bg-[#1C1C1C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[#C4D600] text-sm font-semibold tracking-widest uppercase mb-3">PRICING</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                Choose Your <span className="text-[#C4D600]">Package</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                Transparent pricing with no hidden fees. All packages include our quality guarantee.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {pricingData.map((tier, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-6 sm:p-8 ${
                    tier.popular ? "bg-[#C4D600] text-gray-900" : "bg-[#2a2a2a] text-white"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">{tier.price}</div>
                  {tier.description && (
                    <p className={`text-sm mb-4 ${tier.popular ? "text-gray-700" : "text-gray-400"}`}>
                      {tier.description}
                    </p>
                  )}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <Check
                          className={`h-5 w-5 shrink-0 mt-0.5 ${tier.popular ? "text-gray-900" : "text-[#C4D600]"}`}
                        />
                        <span className={`text-sm sm:text-base ${tier.popular ? "text-gray-800" : "text-gray-300"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full h-12 font-semibold ${
                      tier.popular
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-[#C4D600] text-gray-900 hover:bg-[#b0c200]"
                    }`}
                    asChild
                  >
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Contact CTA */}
      <section className="py-16 sm:py-20 bg-[#C4D600]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl text-gray-800/80 mb-8">
            Let's discuss your {title.toLowerCase()} project today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 h-12 sm:h-14 px-6 sm:px-8" asChild>
              <a href="https://wa.me/971581174911" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Us
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8"
              asChild
            >
              <a href="tel:+971581174911">
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8"
              asChild
            >
              <a href="mailto:info@creativefusion.llc">
                <Mail className="mr-2 h-5 w-5" /> Email Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Sub-Services */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Related Services</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {relatedSubServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-300 text-gray-700 hover:border-[#C4D600] hover:bg-[#C4D600]/10 transition-all duration-300 text-sm sm:text-base"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
