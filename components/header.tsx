"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, Mail, ChevronDown, Sparkles, Smartphone, Apple } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdvancedBookingForm from "@/components/advanced-booking-form"
import InquiryForm from "@/components/inquiry-form"

const serviceLinks = [
  { href: "/services/creative-branding", label: "Creative Branding" },
  { href: "/services/photography", label: "Photography" },
  { href: "/services/videography", label: "Videography" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
  { href: "/services/marketing-pr", label: "Marketing & PR" },
  { href: "/services/web-development", label: "Web Development" },
  { href: "/services/domain-hosting", label: "Domain & Hosting" },
  { href: "/services/software-apps", label: "Software & Apps" },
  { href: "/services/exhibition-stands", label: "Exhibition Stands" },
  { href: "/services/print-exhibitions", label: "Print & Exhibitions" },
  { href: "/services/gift-items", label: "Gift Items" },
  { href: "/services/support-maintenance", label: "Support & Maintenance" },
  { href: "/services/sales-retail", label: "Sales & Retail" },
  { href: "/services/photo-lab", label: "Photo Lab" },
]

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Solutions", hasDropdown: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

const socialLinks = [
  { href: "https://www.facebook.com/CreativeFusionPro.LLC", icon: "facebook", label: "Facebook" },
  { href: "https://www.instagram.com/creativefusion.llc/", icon: "instagram", label: "Instagram" },
  { href: "https://www.linkedin.com/company/creativefusionllc", icon: "linkedin", label: "LinkedIn" },
  { href: "https://x.com/CreativesFusion", icon: "twitter", label: "Twitter" },
  { href: "https://www.youtube.com/@CreativeFusionLLC", icon: "youtube", label: "YouTube" },
  { href: "https://www.tiktok.com/@creativefusion.llc", icon: "tiktok", label: "TikTok" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar - Decorated with accents */}
      <div className="hidden lg:block bg-gradient-to-r from-[#1C1C1C] via-[#252525] to-[#1C1C1C] py-2.5 border-b border-[#C4D600]/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(196,214,0,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(196,214,0,0.03),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between text-xs relative z-10">
          <div className="flex items-center gap-6">
            <Sparkles className="h-4 w-4 text-[#C4D600] animate-pulse" />
            <a
              href="mailto:info@creativefusion.llc"
              className="flex items-center gap-2 text-white/80 hover:text-[#C4D600] transition-colors group"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">info@creativefusion.llc</span>
            </a>
            <div className="h-4 w-px bg-[#C4D600]/30" />
            <a
              href="tel:+971581174911"
              className="flex items-center gap-2 text-white/80 hover:text-[#C4D600] transition-colors group"
            >
              <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">+971 58 117 4911</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-[#C4D600]/10 border border-[#C4D600]/30 rounded-full flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4D600] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4D600]"></span>
              </span>
              <span className="text-[#C4D600] font-semibold">Available 24/7</span>
            </div>
            <div className="h-4 w-px bg-[#C4D600]/30" />
            <div className="flex items-center gap-2">
              <a
                href="https://apps.apple.com/ae/app/creative-fusion/id6736254891"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 px-2.5 py-1.5 rounded-lg transition-all hover:shadow-lg font-medium text-xs"
                title="Download Creative Fusion on iOS App Store"
              >
                <Apple className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">iOS</span>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.creativefusion.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 px-2.5 py-1.5 rounded-lg transition-all hover:shadow-lg font-medium text-xs"
                title="Download Creative Fusion on Google Play Store"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Android</span>
              </a>
            </div>
            <div className="h-4 w-px bg-[#C4D600]/30" />
            <Link
              href="/admin"
              className="flex items-center gap-1.5 bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 px-2.5 py-1.5 rounded-lg transition-all hover:shadow-lg font-medium text-xs"
              title="Admin Panel Access"
            >
              Admin
              <ChevronDown className="h-3 w-3" />
            </Link>
            <div className="h-4 w-px bg-[#C4D600]/30" />
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 px-2.5 py-1.5 rounded-lg transition-all hover:shadow-lg font-medium text-xs"
            >
              Login
              <ChevronDown className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/50" : ""}`}
        style={{
          background: scrolled ? "linear-gradient(135deg, #1C1C1C 0%, #252525 50%, #1C1C1C 100%)" : "#1C1C1C",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/creative-fusion-logo-dark.png"
                alt="Creative Fusion LLC"
                width={200}
                height={60}
                className="h-10 sm:h-12 lg:h-14 w-auto group-hover:scale-105 transition-transform"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white hover:text-[#C4D600] transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </Link>
                    {servicesOpen && (
                      <div className="absolute top-full left-0 pt-2 w-64">
                        <div className="bg-[#1C1C1C] border border-[#C4D600]/20 rounded-lg shadow-xl py-2 max-h-[70vh] overflow-y-auto backdrop-blur-sm">
                          {serviceLinks.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block px-4 py-2 text-sm text-white/80 hover:text-[#C4D600] hover:bg-[#C4D600]/10 transition-colors"
                            >
                              {service.label}
                            </Link>
                          ))}
                          <div className="border-t border-[#C4D600]/20 mt-2 pt-2">
                            <Link
                              href="/services"
                              className="block px-4 py-2 text-sm font-medium text-[#C4D600] hover:bg-[#C4D600]/10 transition-colors"
                            >
                              View All Solutions →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white hover:text-[#C4D600] transition-colors"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3 xl:gap-4">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#C4D600] to-[#a8b800] text-gray-900 hover:from-[#b0c200] hover:to-[#95a200] font-semibold px-6 xl:px-8 h-10 xl:h-11 shadow-lg shadow-[#C4D600]/20"
                onClick={() => setInquiryModalOpen(true)}
              >
                Inquiry Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-[#C4D600]/20 max-h-[80vh] overflow-y-auto">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.href}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full text-left text-sm font-medium text-white hover:text-[#C4D600] transition-colors flex items-center justify-between py-2"
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-4 border-l border-[#C4D600]/20 ml-2 space-y-1">
                          {serviceLinks.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block text-sm text-white/70 hover:text-[#C4D600] transition-colors py-1.5"
                              onClick={() => setIsOpen(false)}
                            >
                              {service.label}
                            </Link>
                          ))}
                          <Link
                            href="/services"
                            className="block text-sm font-medium text-[#C4D600] py-1.5"
                            onClick={() => setIsOpen(false)}
                          >
                            View All Solutions →
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-white hover:text-[#C4D600] transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 px-3 py-1.5 rounded-lg transition-all font-medium text-xs flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 px-3 py-1.5 rounded-lg transition-all font-medium text-xs flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                {/* Mobile app download buttons */}
                <div className="flex gap-2 py-2">
                  <a
                    href="https://apps.apple.com/ae/app/creative-fusion/id6736254891"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 px-3 py-1.5 rounded-lg transition-all font-medium text-xs flex-1"
                  >
                    <Apple className="h-3.5 w-3.5" />
                    iOS
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.creativefusion.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 px-3 py-1.5 rounded-lg transition-all font-medium text-xs flex-1"
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    Android
                  </a>
                </div>
                <Button
                  size="sm"
                  className="w-fit bg-gradient-to-r from-[#C4D600] to-[#a8b800] text-gray-900 hover:from-[#b0c200] hover:to-[#95a200] font-semibold mt-2"
                  onClick={() => {
                    setInquiryModalOpen(true)
                    setIsOpen(false)
                  }}
                >
                  Inquiry Now
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Booking Modal Overlay */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
            <div className="p-8">
              <AdvancedBookingForm onClose={() => setBookingModalOpen(false)} isModal={true} />
            </div>
          </div>
        </div>
      )}

      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full my-8">
            <InquiryForm onClose={() => setInquiryModalOpen(false)} isModal={true} />
          </div>
        </div>
      )}
    </>
  )
}
