"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = ["All", "Photography", "Videography", "Drone", "Real Estate", "Products", "Events"]

const portfolioItems = [
  {
    title: "Luxury Villa Showcase",
    category: "Real Estate",
    image: "/portfolio-luxury-villa-real-estate-interior.jpg",
  },
  {
    title: "Corporate Gala Night",
    category: "Events",
    image: "/portfolio-corporate-gala-event-photography.jpg",
  },
  {
    title: "Jewelry Collection",
    category: "Products",
    image: "/portfolio-jewelry-product-photography-luxury.jpg",
  },
  {
    title: "Dubai Skyline Aerial",
    category: "Drone",
    image: "/portfolio-dubai-skyline-aerial-drone-sunset.jpg",
  },
  {
    title: "Brand Commercial",
    category: "Videography",
    image: "/portfolio-brand-commercial-video-production.jpg",
  },
  {
    title: "Fashion Editorial",
    category: "Photography",
    image: "/portfolio-fashion-editorial-photography-model.jpg",
  },
  {
    title: "Restaurant Interior",
    category: "Real Estate",
    image: "/portfolio-restaurant-interior-photography.jpg",
  },
  {
    title: "Wedding Highlights",
    category: "Events",
    image: "/portfolio-wedding-photography-ceremony-luxury.jpg",
  },
  {
    title: "Watch Collection",
    category: "Products",
    image: "/portfolio-luxury-watch-product-photography.jpg",
  },
  {
    title: "Coastal Properties",
    category: "Drone",
    image: "/portfolio-coastal-drone-aerial-real-estate.jpg",
  },
  {
    title: "Documentary Film",
    category: "Videography",
    image: "/portfolio-documentary-film-production-bts.jpg",
  },
  {
    title: "Portrait Session",
    category: "Photography",
    image: "/portfolio-portrait-photography-studio-creative.jpg",
  },
]

export function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filteredItems =
    activeCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={activeCategory !== category ? "bg-transparent" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <button
              key={item.title}
              onClick={() => setLightboxImage(item.image)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer text-left"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-primary text-sm font-medium mb-1">{item.category}</p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
              <Image src={lightboxImage || "/placeholder.svg"} alt="Portfolio item" fill className="object-contain" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
