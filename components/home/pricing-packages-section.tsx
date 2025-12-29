"use client"

import { useState, useEffect } from "react"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"

interface Package {
  id: string
  name: string
  category: string
  price: number
  currency: string
  duration: string
  features: string[]
  is_featured: boolean
  is_special_offer: boolean
  discount_percentage: number
  original_price: number | null
}

const categories = [
  { id: "branding", name: "Branding", icon: "🎨" },
  { id: "photography", name: "Photography", icon: "📷" },
  { id: "videography", name: "Videography", icon: "🎬" },
  { id: "digital-marketing", name: "Digital Marketing", icon: "📱" },
  { id: "web-development", name: "Web Development", icon: "💻" },
  { id: "social-media", name: "Social Media", icon: "📣" },
]

const fallbackPackages: Record<string, Package[]> = {
  branding: [
    {
      id: "1",
      name: "Starter",
      category: "branding",
      price: 500,
      currency: "AED",
      duration: "project",
      features: ["Logo Design", "Color Palette", "Basic Guidelines", "2 Revisions"],
      is_featured: false,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "2",
      name: "Professional",
      category: "branding",
      price: 1500,
      currency: "AED",
      duration: "project",
      features: ["Logo Design", "Full Brand Guidelines", "Stationery Design", "Social Media Kit", "5 Revisions"],
      is_featured: true,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "3",
      name: "Enterprise",
      category: "branding",
      price: 3500,
      currency: "AED",
      duration: "project",
      features: ["Complete Brand Identity", "Brand Strategy", "All Collateral", "Brand Book", "Unlimited Revisions"],
      is_featured: false,
      is_special_offer: true,
      discount_percentage: 15,
      original_price: 4100,
    },
  ],
  photography: [
    {
      id: "4",
      name: "Basic Shoot",
      category: "photography",
      price: 800,
      currency: "AED",
      duration: "session",
      features: ["2 Hour Session", "20 Edited Photos", "Online Gallery", "1 Location"],
      is_featured: false,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "5",
      name: "Premium Shoot",
      category: "photography",
      price: 2000,
      currency: "AED",
      duration: "session",
      features: ["4 Hour Session", "50 Edited Photos", "Online Gallery", "2 Locations", "Styling Assistance"],
      is_featured: true,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "6",
      name: "Full Day",
      category: "photography",
      price: 4500,
      currency: "AED",
      duration: "day",
      features: ["8 Hour Coverage", "100+ Edited Photos", "Multiple Locations", "Team of 2", "Same Day Preview"],
      is_featured: false,
      is_special_offer: true,
      discount_percentage: 20,
      original_price: 5600,
    },
  ],
  videography: [
    {
      id: "7",
      name: "Promo Video",
      category: "videography",
      price: 2500,
      currency: "AED",
      duration: "video",
      features: ["30-60 Sec Video", "Professional Editing", "Background Music", "2 Revisions"],
      is_featured: false,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "8",
      name: "Corporate Video",
      category: "videography",
      price: 5000,
      currency: "AED",
      duration: "video",
      features: ["2-3 Min Video", "Scripting", "Voice Over", "Motion Graphics", "4 Revisions"],
      is_featured: true,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "9",
      name: "Full Production",
      category: "videography",
      price: 12000,
      currency: "AED",
      duration: "project",
      features: ["5+ Min Video", "Full Production", "Drone Footage", "Actors/Models", "Unlimited Revisions"],
      is_featured: false,
      is_special_offer: true,
      discount_percentage: 10,
      original_price: 13500,
    },
  ],
  "digital-marketing": [
    {
      id: "10",
      name: "Starter",
      category: "digital-marketing",
      price: 1500,
      currency: "AED",
      duration: "month",
      features: ["SEO Audit", "Google Ads Setup", "Monthly Report", "Email Support"],
      is_featured: false,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "11",
      name: "Growth",
      category: "digital-marketing",
      price: 3500,
      currency: "AED",
      duration: "month",
      features: ["Full SEO", "Google & Meta Ads", "Content Strategy", "Weekly Reports", "Dedicated Manager"],
      is_featured: true,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "12",
      name: "Enterprise",
      category: "digital-marketing",
      price: 8000,
      currency: "AED",
      duration: "month",
      features: ["All Channels", "Lead Generation", "CRM Integration", "A/B Testing", "24/7 Support"],
      is_featured: false,
      is_special_offer: true,
      discount_percentage: 15,
      original_price: 9500,
    },
  ],
  "web-development": [
    {
      id: "13",
      name: "Landing Page",
      category: "web-development",
      price: 2000,
      currency: "AED",
      duration: "project",
      features: ["Single Page", "Mobile Responsive", "Contact Form", "SEO Basic", "1 Month Support"],
      is_featured: false,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "14",
      name: "Business Website",
      category: "web-development",
      price: 5000,
      currency: "AED",
      duration: "project",
      features: ["5-7 Pages", "CMS Integration", "SEO Optimized", "Analytics", "3 Months Support"],
      is_featured: true,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "15",
      name: "E-Commerce",
      category: "web-development",
      price: 12000,
      currency: "AED",
      duration: "project",
      features: ["Full Store", "Payment Gateway", "Inventory System", "Admin Panel", "6 Months Support"],
      is_featured: false,
      is_special_offer: true,
      discount_percentage: 20,
      original_price: 15000,
    },
  ],
  "social-media": [
    {
      id: "16",
      name: "Basic",
      category: "social-media",
      price: 1200,
      currency: "AED",
      duration: "month",
      features: ["2 Platforms", "12 Posts/Month", "Basic Graphics", "Monthly Report"],
      is_featured: false,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "17",
      name: "Standard",
      category: "social-media",
      price: 2500,
      currency: "AED",
      duration: "month",
      features: ["3 Platforms", "20 Posts/Month", "Reels/Stories", "Community Management", "Bi-weekly Reports"],
      is_featured: true,
      is_special_offer: false,
      discount_percentage: 0,
      original_price: null,
    },
    {
      id: "18",
      name: "Premium",
      category: "social-media",
      price: 5000,
      currency: "AED",
      duration: "month",
      features: ["All Platforms", "30+ Posts/Month", "Video Content", "Influencer Outreach", "Weekly Reports"],
      is_featured: false,
      is_special_offer: true,
      discount_percentage: 10,
      original_price: 5500,
    },
  ],
}

export function PricingPackagesSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [packages, setPackages] = useState<Record<string, Package[]>>(fallbackPackages)

  useEffect(() => {
    async function fetchPackages() {
      const supabase = createBrowserClient()
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("is_active", true)
        .order("price", { ascending: true })

      if (data && data.length > 0 && !error) {
        const grouped: Record<string, Package[]> = {}

        data.forEach((pkg) => {
          const cat = pkg.category || "branding"
          if (!grouped[cat]) grouped[cat] = []

          grouped[cat].push({
            id: pkg.id,
            name: pkg.name,
            category: pkg.category,
            price: pkg.price,
            currency: pkg.currency || "AED",
            duration: pkg.duration,
            features: Array.isArray(pkg.features) ? pkg.features : pkg.features?.items || [],
            is_featured: pkg.is_featured || false,
            is_special_offer: pkg.is_special_offer || false,
            discount_percentage: pkg.discount_percentage || 0,
            original_price: pkg.original_price,
          })
        })

        const merged = { ...fallbackPackages }
        Object.keys(grouped).forEach((key) => {
          if (grouped[key].length > 0) {
            merged[key] = grouped[key].slice(0, 3)
          }
        })

        setPackages(merged)
      }
    }

    fetchPackages()
  }, [])

  const currentCategory = categories[activeCategory]
  const currentPackages = packages[currentCategory.id] || fallbackPackages.branding

  return (
    <section className="py-20 lg:py-28 bg-[#1C1C1C] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4D600]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C4D600]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#C4D600] text-sm font-semibold tracking-widest uppercase mb-3">PRICING PACKAGES</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Simple, Transparent <span className="text-[#C4D600]">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the perfect package for your business needs. All packages include dedicated support and our quality
            guarantee.
          </p>
          <div className="h-1 w-24 bg-[#C4D600] mx-auto mt-6" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === index
                  ? "bg-[#C4D600] text-gray-900 shadow-lg shadow-[#C4D600]/20"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {currentPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                pkg.is_featured
                  ? "border-[#C4D600] shadow-xl shadow-[#C4D600]/10 scale-105"
                  : "border-white/10 hover:border-[#C4D600]/50"
              }`}
            >
              {pkg.is_special_offer && (
                <div className="absolute top-4 right-4 bg-[#C4D600] text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  {pkg.discount_percentage}% OFF
                </div>
              )}

              {pkg.is_featured && (
                <div className="bg-[#C4D600] text-gray-900 text-center py-2.5 text-sm font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{currentCategory.name} Package</p>

                <div className="mb-8">
                  {pkg.is_special_offer && pkg.original_price && (
                    <p className="text-base line-through text-gray-500 mb-1">
                      {pkg.currency} {pkg.original_price.toLocaleString()}
                    </p>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">{pkg.price.toLocaleString()}</span>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">{pkg.currency}</span>
                      <span className="text-sm text-gray-400">/{pkg.duration}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#C4D600]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#C4D600] stroke-[3]" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#C4D600] text-[#C4D600] hover:bg-[#C4D600] hover:text-gray-900 font-semibold h-12 px-8 bg-transparent"
                  asChild
                >
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className={`h-1 ${pkg.is_featured ? "bg-[#C4D600]" : "bg-white/10"}`} />
            </div>
          ))}
        </div>

        <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-3">Need a Custom Solution?</h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Every business is unique. Let's discuss your specific requirements and create a tailored package that
            perfectly fits your needs.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-[#C4D600] text-[#C4D600] hover:bg-[#C4D600] hover:text-gray-900 font-semibold h-12 px-8 bg-transparent"
            asChild
          >
            <Link href="/contact" className="flex items-center justify-center gap-2">
              Contact Us for Custom Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
