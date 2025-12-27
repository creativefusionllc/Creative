"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Clock,
  Globe,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  { href: "/services/creative-branding", label: "Creative Branding" },
  { href: "/services/graphic-design", label: "Graphic Design" },
  { href: "/services/web-development", label: "Web Development" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
  { href: "/services/photography", label: "Photography" },
  { href: "/services/videography", label: "Videography" },
  { href: "/services/consulting", label: "Consulting" },
  { href: "/services/custom-software", label: "Custom Software" },
]

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "All Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/booking", label: "Book Consultation" },
  { href: "/pricing", label: "Pricing" },
]

const socials = [
  {
    href: "https://instagram.com/creativefusion.llc",
    icon: Instagram,
    label: "Instagram",
    color: "hover:bg-pink-500/20 hover:text-pink-400",
  },
  {
    href: "https://facebook.com/creativefusionpro.llc",
    icon: Facebook,
    label: "Facebook",
    color: "hover:bg-blue-500/20 hover:text-blue-400",
  },
  {
    href: "https://linkedin.com/company/creativefusionllc",
    icon: Linkedin,
    label: "LinkedIn",
    color: "hover:bg-blue-600/20 hover:text-blue-500",
  },
  {
    href: "https://youtube.com/@creativefusionllc",
    icon: Youtube,
    label: "YouTube",
    color: "hover:bg-red-500/20 hover:text-red-400",
  },
]

const additionalServices = [
  { href: "/services/domain-hosting", label: "Domain & Hosting" },
  { href: "/services/software-apps", label: "Software & Apps" },
  { href: "/services/exhibition-stands", label: "Exhibition Stands" },
  { href: "/services/print-exhibitions", label: "Print & Exhibitions" },
  { href: "/services/marketing-pr", label: "Marketing & PR" },
  { href: "/services/whatsapp-marketing", label: "WhatsApp Marketing" },
  { href: "/services/sales-retail", label: "Sales & Retail" },
  { href: "/services/support-maintenance", label: "Support & Maintenance" },
]

const gccRegions = ["Dubai", "Abu Dhabi", "Sharjah", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"]

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Save newsletter email to database
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      if (response.ok) {
        setNewsletterSubmitted(true)
        setNewsletterEmail("")
        setTimeout(() => setNewsletterSubmitted(false), 3000)
      }
    } catch (error) {
      console.error("Newsletter signup error:", error)
    }
  }

  return (
    <>
      <footer className="relative text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/aaaaa.png)",
          }}
        />

        <div className="absolute inset-0 bg-black/80" />

        {/* Decorative Elements - Hidden on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C4D600]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        </div>

        {/* Main Footer Content - Responsive */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-6">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-3">
              <Link href="/" className="inline-block mb-4 sm:mb-6 group">
                <Image
                  src="/images/creative-fusion-logo-dark.png"
                  alt="Creative Fusion LLC"
                  width={200}
                  height={60}
                  className="h-12 sm:h-14 lg:h-16 w-auto transition-transform group-hover:scale-105"
                />
              </Link>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-[400px]">
                Creative Fusion LLC – Your trusted partner for digital transformation in the UAE. We craft compelling
                brand experiences through creative design, cutting-edge technology, and strategic marketing. From
                concept to execution, we turn ideas into visually stunning, results-driven campaigns that elevate your
                brand.
              </p>

              {/* Social Links - Responsive */}
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                {socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 transition-all hover:border-[#C4D600] hover:text-[#C4D600]`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                ))}
              </div>

              {/* Trust Badges - Responsive */}
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-[#C4D600]" />
                  <span className="text-[10px] sm:text-xs text-gray-400">SHAMS Licensed</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2">
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-[#C4D600]" />
                  <span className="text-[10px] sm:text-xs text-gray-400">UAE Based</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-4 sm:mb-6 text-white flex items-center gap-2 text-sm sm:text-base">
                <div className="w-1 h-4 sm:h-5 bg-[#C4D600] rounded-full" />
                Quick Links
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-[#C4D600] transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 -ml-4 sm:-ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-4 sm:mb-6 text-white flex items-center gap-2 text-sm sm:text-base">
                <div className="w-1 h-4 sm:h-5 bg-[#C4D600] rounded-full" />
                Core Services
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-[#C4D600] transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 -ml-4 sm:-ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-4 sm:mb-6 text-white flex items-center gap-2 text-sm sm:text-base">
                <div className="w-1 h-4 sm:h-5 bg-[#C4D600] rounded-full" />
                More Services
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {additionalServices.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-[#C4D600] transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 -ml-4 sm:-ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Newsletter CTA */}
            <div className="sm:col-span-2 lg:col-span-3">
              <h4 className="font-semibold mb-4 sm:mb-6 text-white flex items-center gap-2 text-sm sm:text-base">
                <div className="w-1 h-4 sm:h-5 bg-[#C4D600] rounded-full" />
                Contact Us
              </h4>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-start gap-2 sm:gap-3 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C4D600]/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#C4D600]/20 transition-colors">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#C4D600]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-white font-medium">Sharjah Media City (SHAMS)</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">Sharjah, UAE</p>
                  </div>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C4D600]/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#C4D600]/20 transition-colors">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#C4D600]" />
                  </div>
                  <a
                    href="tel:+971581174911"
                    className="text-xs sm:text-sm text-gray-400 hover:text-[#C4D600] transition-colors"
                  >
                    +971 58 117 4911
                  </a>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C4D600]/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#C4D600]/20 transition-colors">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#C4D600]" />
                  </div>
                  <a
                    href="mailto:info@creativefusion.llc"
                    className="text-xs sm:text-sm text-gray-400 hover:text-[#C4D600] transition-colors break-all"
                  >
                    info@creativefusion.llc
                  </a>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C4D600]/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#C4D600]/20 transition-colors">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#C4D600]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Sun - Thu: 9AM - 6PM</p>
                  </div>
                </li>
              </ul>

              {/* Newsletter Signup Form */}
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C4D600] transition-colors text-sm"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#C4D600] to-[#a8b800] text-gray-900 hover:from-[#b0c200] hover:to-[#95a200] font-semibold h-11 rounded-lg shadow-lg shadow-[#C4D600]/20"
                >
                  Subscribe to Newsletter
                </Button>
                {newsletterSubmitted && (
                  <p className="text-xs sm:text-sm text-[#C4D600] text-center">Thanks for subscribing!</p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Responsive */}
        <div className="border-t border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-[10px] sm:text-xs text-gray-500">
              <span className="text-gray-400">Serving:</span>
              {gccRegions.map((region, index) => (
                <span key={region}>
                  {region}
                  {index < gccRegions.length - 1 && <span className="mx-1">•</span>}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                © {new Date().getFullYear()} Creative Fusion LLC. All rights reserved.
              </p>
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
                <Link
                  href="/privacy"
                  className="text-[10px] sm:text-xs text-gray-500 hover:text-[#C4D600] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-[10px] sm:text-xs text-gray-500 hover:text-[#C4D600] transition-colors"
                >
                  Terms of Service
                </Link>
                <span className="text-[10px] sm:text-xs text-gray-500">SHAMS License: 2430411.01</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
