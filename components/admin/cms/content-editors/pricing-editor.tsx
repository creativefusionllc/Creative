"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"

export default function PricingContentEditor() {
  const [pricing, setPricing] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPricing = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )

      const { data } = await supabase.from("website_cms_sections").select("*").eq("section_name", "pricing").single()

      if (data) setPricing(data.content || [])
      setLoading(false)
    }

    fetchPricing()
  }, [])

  const handleAddPackage = () => {
    setPricing([...pricing, { name: "", price: "", features: [] }])
  }

  const handleUpdatePackage = (index, updated) => {
    const newPricing = [...pricing]
    newPricing[index] = updated
    setPricing(newPricing)
  }

  const handleSave = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    await supabase.from("website_cms_sections").upsert({
      section_name: "pricing",
      content: pricing,
      is_published: true,
    })
  }

  if (loading) return <div>Loading pricing...</div>

  return (
    <div className="space-y-6">
      {pricing.map((pkg, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <Input
            value={pkg.name || ""}
            onChange={(e) => handleUpdatePackage(index, { ...pkg, name: e.target.value })}
            placeholder="Package name"
          />
          <Input
            value={pkg.price || ""}
            onChange={(e) => handleUpdatePackage(index, { ...pkg, price: e.target.value })}
            placeholder="Price"
          />
          <Textarea
            value={(pkg.features || []).join("\n")}
            onChange={(e) => handleUpdatePackage(index, { ...pkg, features: e.target.value.split("\n") })}
            placeholder="Features (one per line)"
            className="h-24"
          />
        </div>
      ))}
      <Button onClick={handleAddPackage} className="bg-lime-500 text-black hover:bg-lime-600">
        Add Pricing Package
      </Button>
      <Button onClick={handleSave} className="bg-lime-500 text-black hover:bg-lime-600">
        Save Pricing
      </Button>
    </div>
  )
}
