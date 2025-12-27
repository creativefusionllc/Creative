"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Check, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
  is_active: boolean
}

interface PricingPackagesDisplayProps {
  category?: string
  showAll?: boolean
  limit?: number
}

export function PricingPackagesDisplay({ category, showAll = false, limit }: PricingPackagesDisplayProps) {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchPackages()
  }, [category])

  async function fetchPackages() {
    setLoading(true)
    let query = supabase.from("packages").select("*").eq("is_active", true).order("display_order")

    if (!showAll && category) {
      query = query.eq("category", category)
    }

    const { data } = await query

    let filteredData = data || []
    if (limit) {
      filteredData = filteredData.slice(0, limit)
    }

    setPackages(filteredData)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  if (packages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No pricing packages available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
            pkg.is_featured ? "ring-2 ring-[#C4D600]" : ""
          }`}
        >
          {pkg.is_special_offer && (
            <div className="bg-[#E8573F] text-white text-center py-2 text-sm font-semibold flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              Special Offer - {pkg.discount_percentage}% OFF
            </div>
          )}
          {pkg.is_featured && !pkg.is_special_offer && (
            <div className="bg-[#C4D600] text-gray-900 text-center py-2 text-sm font-semibold">Most Popular</div>
          )}

          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
              <p className="text-sm text-gray-600">{pkg.category}</p>
            </div>

            <div className="mb-6">
              {pkg.is_special_offer && pkg.original_price && (
                <p className="text-lg line-through text-gray-400">
                  {pkg.currency} {pkg.original_price}
                </p>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#C4D600]">
                  {pkg.currency} {pkg.price}
                </span>
                <span className="text-gray-600">/ {pkg.duration}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {pkg.features?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#C4D600] shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-[#C4D600] hover:bg-[#b0c200] text-gray-900 font-semibold" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
