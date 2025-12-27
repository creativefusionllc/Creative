"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PortfolioGallery() {
  const [portfolio, setPortfolio] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const supabase = createClient()

  const categories = [
    "All",
    "Photography",
    "Product Shoot",
    "Perfume",
    "Creative Branding",
    "Videography",
    "Digital Marketing",
    "Web Development",
    "Graphic Design",
  ]

  useEffect(() => {
    fetchPortfolio()
  }, [])

  async function fetchPortfolio() {
    setLoading(true)
    const { data } = await supabase
      .from("portfolio")
      .select("*")
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
    setPortfolio(data || [])
    setLoading(false)
  }

  const getAllImages = (item: any) => {
    const images = []
    if (item.featured_image) images.push(item.featured_image)
    if (item.gallery_images && item.gallery_images.length > 0) {
      images.push(...item.gallery_images)
    }
    return images
  }

  const filteredItems = activeCategory === "All" ? portfolio : portfolio.filter((p) => p.category === activeCategory)

  if (loading) {
    return (
      <section className="py-24">
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? "bg-[#C4D600] text-gray-900 font-semibold"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              variant={activeCategory === category ? "default" : "outline"}
            >
              {category}
            </Button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-400">
            <p className="text-lg">No portfolio items in this category yet.</p>
          </div>
        ) : (
          <div className="grid auto-rows-max gap-4">
            {/* Dynamic masonry layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {filteredItems.map((item, projectIndex) => {
                const images = getAllImages(item)
                return images.map((image, imageIndex) => (
                  <button
                    key={`${projectIndex}-${imageIndex}`}
                    onClick={() => setLightboxImage(image)}
                    className={`group relative overflow-hidden rounded-lg cursor-pointer text-left bg-gray-800 hover:shadow-xl transition-all duration-300 ${
                      imageIndex === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} - Image ${imageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {imageIndex === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          <p className="text-[#C4D600] text-xs font-semibold mb-1">{item.category}</p>
                          <h3 className="text-white font-bold text-sm">{item.title}</h3>
                          {item.client_name && <p className="text-gray-300 text-xs mt-1">{item.client_name}</p>}
                        </div>
                      </div>
                    )}
                    {imageIndex === 0 && images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-[#C4D600] px-2 py-1 rounded text-xs font-semibold">
                        +{images.length - 1}
                      </div>
                    )}
                  </button>
                ))
              })}
            </div>
          </div>
        )}

        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 hover:bg-[#C4D600] hover:text-gray-900 rounded-full transition-colors"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative max-w-5xl max-h-[85vh] w-full">
              <img
                src={lightboxImage || "/placeholder.svg"}
                alt="Portfolio item fullscreen"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
