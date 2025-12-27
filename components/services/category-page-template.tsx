"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Check, Phone, MessageCircle, MapPin } from "lucide-react"

interface ProcessStep {
  step: number
  title: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

interface CategoryPageProps {
  breadcrumb: {
    service: { title: string; href: string }
    subService: { title: string; href: string }
  }
  title: string
  subtitle: string
  description: string
  heroImage: string
  benefits: string[]
  process: ProcessStep[]
  pricing: {
    startingFrom: string
    includes: string[]
  }
  faqs: FAQ[]
  relatedCategories: { title: string; href: string }[]
}

export function CategoryPageTemplate({
  breadcrumb,
  title,
  subtitle,
  description,
  heroImage,
  benefits,
  process,
  pricing,
  faqs,
  relatedCategories,
}: CategoryPageProps) {
  const areasServed = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage || "/placeholder.svg?height=800&width=1200&query=creative service"}
            alt={title}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#C4D600]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#C4D600]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
            <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
              Services
            </Link>
            <span className="text-gray-600">/</span>
            <Link href={breadcrumb.service.href} className="text-gray-400 hover:text-white transition-colors">
              {breadcrumb.service.title}
            </Link>
            <span className="text-gray-600">/</span>
            <Link href={breadcrumb.subService.href} className="text-gray-400 hover:text-white transition-colors">
              {breadcrumb.subService.title}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#C4D600] font-medium">{title}</span>
          </div>

          {/* Back Link */}
          <Link
            href={breadcrumb.subService.href}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to {breadcrumb.subService.title}
          </Link>

          {/* Content */}
          <div className="max-w-3xl">
            <p className="text-[#C4D600] text-sm font-semibold tracking-widest uppercase mb-4">{subtitle}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">{description}</p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold h-12 sm:h-14 px-6 sm:px-10"
                asChild
              >
                <Link href="/contact">
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-10"
                asChild
              >
                <a href="https://wa.me/971581174911" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served Section */}
      <section className="py-4 bg-[#1C1C1C] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <MapPin className="w-3 h-3 text-[#C4D600]" />
            <span className="text-gray-400">Available in:</span>
            {areasServed.map((area, index) => (
              <span key={area} className="text-gray-300">
                {area}
                {index < areasServed.length - 1 && <span className="mx-1 text-gray-600">|</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C4D600] text-sm font-semibold tracking-widest uppercase mb-3">WHY CHOOSE US</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Benefits of Our <span className="text-[#C4D600]">{title}</span>
              </h2>
              <p className="text-gray-600 mb-8">
                We deliver exceptional quality with attention to detail, ensuring your project exceeds expectations.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#C4D600] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-gray-900" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#C4D600]/10 rounded-3xl transform -rotate-3" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage || "/placeholder.svg?height=500&width=600&query=creative design benefits"}
                  alt={`${title} benefits`}
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#C4D600] text-sm font-semibold tracking-widest uppercase mb-3">OUR PROCESS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How We <span className="text-[#C4D600]">Work</span>
            </h2>
            <div className="h-1 w-24 bg-[#C4D600] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="w-12 h-12 bg-[#C4D600] rounded-full flex items-center justify-center text-gray-900 font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#C4D600]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 bg-[#1C1C1C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C4D600] text-sm font-semibold tracking-widest uppercase mb-3">INVESTMENT</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              {title} <span className="text-[#C4D600]">Pricing</span>
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-3xl p-8 sm:p-12 border border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Starting From</p>
                <p className="text-4xl sm:text-5xl font-bold text-[#C4D600]">{pricing.startingFrom}</p>
              </div>
              <div className="h-px md:h-24 w-full md:w-px bg-gray-700" />
              <div className="flex-1">
                <p className="text-white font-semibold mb-4">Package Includes:</p>
                <ul className="space-y-2">
                  {pricing.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <Check className="h-4 w-4 text-[#C4D600]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold h-12 sm:h-14 px-8"
                asChild
              >
                <Link href="/contact">Request Custom Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-8"
                asChild
              >
                <a href="tel:+971581174911">
                  <Phone className="mr-2 h-5 w-5" /> Call for Details
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C4D600] text-sm font-semibold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-[#C4D600]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#C4D600]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your {title} Project?
          </h2>
          <p className="text-lg text-gray-800/80 mb-8">Get in touch today for a free consultation and quote.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 h-12 sm:h-14 px-8" asChild>
              <Link href="/contact">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900/10 bg-transparent h-12 sm:h-14 px-8"
              asChild
            >
              <a href="https://wa.me/971581174911" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-lg font-semibold text-gray-900">Related Services</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {relatedCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-300 text-gray-700 hover:border-[#C4D600] hover:bg-[#C4D600]/10 transition-all duration-300 text-sm sm:text-base"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
