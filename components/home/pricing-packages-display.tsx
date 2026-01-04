"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

interface PricingTier {
  name: string
  price: string
  description: string
  features: { name: string; fieldType: string }[]
  is_featured: boolean
  is_active: boolean
  category: string
}

export function PricingPackagesDisplay({ category = "Creative Branding" }) {
  const [tiers, setTiers] = useState<PricingTier[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase
      .from("packages")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("price", { ascending: true })
      .then(({ data }) => {
        if (data) setTiers(data as PricingTier[])
        setLoading(false)
      })
  }, [category])

  if (loading) return <div className="animate-pulse h-64 bg-gray-200 rounded" />

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {tiers.map((tier, idx) => (
        <Card
          key={idx}
          className={`relative overflow-hidden transition-all hover:shadow-xl ${
            tier.is_featured ? "border-2 border-[#C4D600] shadow-lg" : ""
          }`}
        >
          {tier.is_featured && (
            <div className="bg-[#C4D600] text-gray-900 py-1 px-4 text-xs font-bold text-center">MOST POPULAR</div>
          )}

          <div className="p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <div className="text-4xl font-bold text-[#C4D600] mt-2">AED {tier.price}</div>
              {tier.description && <p className="text-gray-600 text-sm mt-2">{tier.description}</p>}
            </div>

            {/* Features with Field Type Indicators */}
            {tier.features && tier.features.length > 0 && (
              <ul className="space-y-3">
                {tier.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#C4D600] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{f.name}</p>
                      <span className="text-xs text-gray-500 capitalize">
                        {f.fieldType === "text" ? "Text" : f.fieldType}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <Button
              className={`w-full ${
                tier.is_featured
                  ? "bg-[#C4D600] text-gray-900 hover:bg-[#C4D600]/90"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
              asChild
            >
              <Link href="/contact" className="flex items-center justify-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
