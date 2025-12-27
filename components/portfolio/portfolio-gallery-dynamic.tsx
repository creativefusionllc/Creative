"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Loader2 } from "lucide-react"

const categories = [
  "All",
  "Photography",
  "Videography",
  "Brand Identity",
  "Website Development",
  "Digital Marketing",
  "Graphic Design",
  "Social Media",
  "ERP Solutions",
]

export function PortfolioGalleryDynamic() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [portfolio, setPortfolio] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchPortfolio() {
      setLoading(true)
      try {
        let query = supabase
          .from("portfolio")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false })

        if (activeCategory !== "All") {
          query = query.eq("category", activeCategory)
        }

        const { data, error } = await query

        if (error) throw error
        setPortfolio(data || [])
      } catch (error) {
        console.error("Error fetching portfolio:", error)
        setPortfolio([])
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [activeCategory, supabase])

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-[#C4D600] text-gray-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
          </div>
        ) : portfolio.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No portfolio items found for this category.</p>
          </div>
        ) : (
          /* Portfolio grid with dynamic data */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={item.featured_image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-[#C4D600] text-gray-900 text-xs font-semibold rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">{item.description}</p>
                  {item.client_name && <p className="text-xs text-gray-300 mt-2">Client: {item.client_name}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
