"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@/lib/supabase/client"

interface PortfolioItem {
  id: string
  title: string
  category: string
  featured_image: string
  slug: string
}

const fallbackItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Brand Identity for Tech Startup",
    category: "Branding",
    featured_image: "/modern-brand-identity.png",
    slug: "brand-identity-tech-startup",
  },
  {
    id: "2",
    title: "E-commerce Platform Development",
    category: "Web Development",
    featured_image: "/ecommerce-website-design.png",
    slug: "ecommerce-platform-development",
  },
  {
    id: "3",
    title: "Product Photography Campaign",
    category: "Photography",
    featured_image: "/luxury-product-photography.jpg",
    slug: "product-photography-campaign",
  },
  {
    id: "4",
    title: "Corporate Video Production",
    category: "Videography",
    featured_image: "/professional-video-production.jpg",
    slug: "corporate-video-production",
  },
  {
    id: "5",
    title: "Social Media Marketing Campaign",
    category: "Digital Marketing",
    featured_image: "/social-media-campaign.png",
    slug: "social-media-marketing-campaign",
  },
  {
    id: "6",
    title: "Mobile App UI/UX Design",
    category: "UI/UX Design",
    featured_image: "/mobile-app-ui-ux-design.jpg",
    slug: "mobile-app-ui-ux-design",
  },
]

export function PortfolioPreviewSection() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(fallbackItems)

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const supabase = createBrowserClient()
        const { data, error } = await supabase
          .from("portfolio")
          .select("id, title, category, featured_image, slug")
          .eq("status", "published")
          .order("display_order", { ascending: true })
          .limit(6)

        if (data && data.length > 0 && !error) {
          setPortfolioItems(data)
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err)
      }
    }

    fetchPortfolio()
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[#C4D600] font-semibold tracking-wide uppercase text-sm mb-3">Our Work</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C]">Featured Projects</h2>
          </div>
          <Button
            variant="outline"
            className="gap-2 border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white bg-transparent rounded-full"
            asChild
          >
            <Link href="/portfolio">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Portfolio Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, idx) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-[#1C1C1C] ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div className={`relative ${idx === 0 ? "h-[400px] md:h-full" : "h-64"}`}>
                <Image
                  src={item.featured_image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-[#C4D600] text-[#1C1C1C] text-xs font-semibold rounded-full mb-3">
                    {item.category}
                  </span>
                  <h3 className={`font-bold text-white ${idx === 0 ? "text-2xl" : "text-lg"}`}>{item.title}</h3>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
