"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Play,
  Award,
  Star,
  Camera,
  Video,
  Megaphone,
  Palette,
  Globe,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
} from "lucide-react"
import { useEffect, useState, useCallback } from "react"

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/CreativeFusionPro.LLC",
    color: "#1877F2",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/creativefusion.llc/",
    color: "#E4405F",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 5.09V7H20.11C19.22 7 18.43 7.83 18.43 8.74V9.53H16.59V20.54H14.6V9.53H12.76V20.54H10.84V9.53H8.95V8.74C8.95 7.83 8.16 7 7.27 7H5.09V5.09H7.27V3.2C7.27 2.29 8.1 1.5 9 1.5S10.73 2.29 10.73 3.2V5.09H12.76V3.2C12.76 2.29 13.59 1.5 14.48 1.5S16.21 2.29 16.21 3.2V5.09H18.43V3.2C18.43 2.29 19.22 1.5 20.11 1.5S21.9 2.29 21.9 3.2V5.09H22z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/creativefusionllc",
    color: "#0A66C2",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/CreativesFusion",
    color: "#1DA1F2",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@CreativeFusionLLC",
    color: "#FF0000",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@creativefusion.llc",
    color: "#000000",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
]

const heroSlides = [
  {
    id: "main",
    badge: "UAE's Premier Creative Agency",
    title: ["We Create", "Brands That", "Stand Out"],
    titleHighlight: 1,
    description:
      "Full-service creative agency delivering strategic branding, digital solutions, and visual storytelling that drives business growth.",
    cta: { text: "Start Your Project", href: "/contact" },
    rightContent: "services",
  },
  {
    id: "photography",
    badge: "Professional Photography",
    title: ["Capturing", "Moments That", "Matter"],
    titleHighlight: 1,
    description:
      "From corporate headshots to product photography, we deliver stunning visuals that elevate your brand and tell your story.",
    cta: { text: "Book a Shoot", href: "/services/photography" },
    rightContent: "image",
    image: "/professional-photography-studio-camera-equipment.jpg",
    icon: Camera,
  },
  {
    id: "videography",
    badge: "Cinematic Videography",
    title: ["Stories", "Brought To", "Life"],
    titleHighlight: 1,
    description:
      "Professional video production from concept to delivery. Corporate films, commercials, events, and social media content that captivates.",
    cta: { text: "Start Production", href: "/services/videography" },
    rightContent: "image",
    image: "/professional-video-production-cinema-camera-filmin.jpg",
    icon: Video,
  },
  {
    id: "digital-marketing",
    badge: "Digital Marketing",
    title: ["Growth", "Strategies That", "Deliver"],
    titleHighlight: 1,
    description:
      "Data-driven digital marketing solutions including SEO, PPC, social media, and content marketing to scale your business online.",
    cta: { text: "Boost Your Growth", href: "/services/digital-marketing" },
    rightContent: "image",
    image: "/digital-marketing-analytics-dashboard-growth-chart.jpg",
    icon: Megaphone,
  },
  {
    id: "branding",
    badge: "Creative Branding",
    title: ["Identities", "That Leave A", "Mark"],
    titleHighlight: 1,
    description:
      "Strategic brand development from logo design to complete visual identity systems that differentiate you in the marketplace.",
    cta: { text: "Build Your Brand", href: "/services/creative-branding" },
    rightContent: "image",
    image: "/brand-identity-design-logo-mockups-creative.jpg",
    icon: Palette,
  },
  {
    id: "web-development",
    badge: "Web Development",
    title: ["Digital", "Experiences That", "Convert"],
    titleHighlight: 1,
    description:
      "Custom websites and web applications built with cutting-edge technology. Fast, secure, and optimized for conversions.",
    cta: { text: "Launch Your Site", href: "/services/web-development" },
    rightContent: "image",
    image: "/web-development-coding-modern-website-design.jpg",
    icon: Globe,
  },
  {
    id: "reviews",
    badge: "Client Testimonials",
    title: ["What Our", "Clients", "Say"],
    titleHighlight: 1,
    description:
      "Don't just take our word for it. Hear from the businesses we've helped transform with our creative solutions.",
    cta: { text: "See All Reviews", href: "/testimonials" },
    rightContent: "reviews",
  },
]

const services = [
  { name: "Photography", icon: Camera, color: "bg-blue-500/20 text-blue-400" },
  { name: "Videography", icon: Video, color: "bg-purple-500/20 text-purple-400" },
  { name: "Marketing", icon: Megaphone, color: "bg-orange-500/20 text-orange-400" },
  { name: "Branding", icon: Palette, color: "bg-pink-500/20 text-pink-400" },
  { name: "Web Dev", icon: Globe, color: "bg-cyan-500/20 text-cyan-400" },
  { name: "Creative", icon: Sparkles, color: "bg-[#C4D600]/20 text-[#C4D600]" },
]

const reviews = [
  {
    name: "Ahmed Al Rashid",
    company: "TechStart Dubai",
    text: "Exceptional work! They transformed our brand completely.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    company: "Luxe Properties",
    text: "The best creative agency we've worked with. Highly recommend!",
    rating: 5,
  },
  {
    name: "Omar Hassan",
    company: "Gulf Innovations",
    text: "Professional team, outstanding results. 10/10 experience.",
    rating: 5,
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 8000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const slide = heroSlides[currentSlide]

  const renderRightContent = () => {
    switch (slide.rightContent) {
      case "services":
        return (
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-32 h-32 border border-[#C4D600] rounded-full" />
              <div className="absolute bottom-4 left-4 w-24 h-24 border border-[#C4D600] rounded-full" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Our Services</h3>
                <span className="text-[#C4D600] text-sm font-medium">Since 2009</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-[#1C1C1C]/50 rounded-2xl p-5 text-center hover:bg-[#1C1C1C]/70 transition-colors cursor-pointer group"
                  >
                    <div
                      className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-medium text-white">{service.name}</div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm">11+ Service Categories</p>
                <p className="text-[#C4D600] text-xs mt-1">Click to explore</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#C4D600] text-[#1C1C1C] px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-[#C4D600]/30">
              SHAMS Licensed
            </div>
          </div>
        )

      case "image":
        const IconComponent = slide.icon
        return (
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/50">
              <Image
                src={slide.image || "/placeholder.svg?height=600&width=800"}
                alt={slide.badge || "Service image"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent" />
              {IconComponent && (
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#C4D600] rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-7 h-7 text-[#1C1C1C]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{slide.badge}</p>
                    <p className="text-gray-400 text-sm">Premium Quality</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -top-4 -right-4 bg-[#C4D600] text-[#1C1C1C] px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-[#C4D600]/30">
              Top Rated
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C4D600] text-[#C4D600]" />
                ))}
              </div>
              <p className="text-white text-xs mt-1">5.0 Client Rating</p>
            </div>
          </div>
        )

      case "reviews":
        return (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${index === 0 ? "from-[#C4D600]/20 to-[#C4D600]/5 border-[#C4D600]/30" : "from-white/10 to-white/5 border-white/10"} backdrop-blur-xl border rounded-2xl p-5 relative overflow-hidden transition-all hover:scale-[1.02]`}
              >
                <Quote
                  className={`w-8 h-8 ${index === 0 ? "text-[#C4D600]/30" : "text-white/10"} absolute top-4 right-4`}
                />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C4D600] text-[#C4D600]" />
                  ))}
                </div>
                <p className="text-white text-sm mb-4 italic">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.company}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center pt-2">
              <p className="text-[#C4D600] text-sm font-medium">200+ Happy Clients</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section
      className="relative bg-[#1C1C1C] min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C4D600]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C4D600]/3 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#C4D600 1px, transparent 1px), linear-gradient(90deg, #C4D600 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/30"
            style={{ ["--brand-color" as string]: social.color }}
            aria-label={social.name}
          >
            <span className="text-white/60 transition-colors duration-300 group-hover:text-[var(--brand-color)]">
              {social.icon}
            </span>
            <span className="absolute left-full ml-3 px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {social.name}
            </span>
          </a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-2" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 md:pl-20 lg:pl-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#C4D600]/10 border border-[#C4D600]/20 text-[#C4D600] px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
                <Award className="w-4 h-4" />
                <span>{slide.badge}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1]">
                  {slide.title.map((line, index) => (
                    <span key={index} className={`block ${index === slide.titleHighlight ? "text-[#C4D600]" : ""}`}>
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="text-lg sm:text-xl text-gray-400 max-w-lg leading-relaxed">{slide.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="gap-2 bg-[#C4D600] text-[#1C1C1C] hover:bg-[#d4e600] font-semibold h-14 px-8 text-base rounded-full"
                  asChild
                >
                  <Link href={slide.cta.href}>
                    {slide.cta.text}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/20 text-white hover:bg-white/5 h-14 px-8 bg-transparent rounded-full"
                  asChild
                >
                  <Link href="/portfolio">
                    <Play className="h-5 w-5" />
                    View Our Work
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-[#1C1C1C] flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-white">{["AZ", "RH", "GP", "PC"][i - 1]}</span>
                    </div>
                  ))}
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C4D600] text-[#C4D600]" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Trusted by 200+ businesses</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="hidden lg:block">{renderRightContent()}</div>
          </div>

          {/* Slide Navigation */}
          <div className="mt-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {heroSlides.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-8 bg-[#C4D600]" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="ml-4 text-sm text-gray-500">
                {String(currentSlide + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
