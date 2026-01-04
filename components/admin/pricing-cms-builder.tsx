"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingTier {
  id: string
  name: string
  price: string
  description: string
  features: { name: string; fieldType: "dropdown" | "radio" | "checkbox" | "text" }[]
  is_featured: boolean
  category: string
  is_active: boolean
}

const categories = [
  "Creative Branding",
  "Photography",
  "Videography",
  "Digital Marketing",
  "Web Development",
  "Social Media",
]

export function PricingCMSBuilder() {
  const [tiers, setTiers] = useState<PricingTier[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Creative Branding")
  const [featureInput, setFeatureInput] = useState("")
  const [featureType, setFeatureType] = useState<"text" | "dropdown" | "radio" | "checkbox">("text")

  const [formData, setFormData] = useState<Partial<PricingTier>>({
    name: "",
    price: "",
    description: "",
    features: [],
    is_featured: false,
    category: "Creative Branding",
    is_active: true,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchTiers()
  }, [selectedCategory])

  async function fetchTiers() {
    setLoading(true)
    const { data } = await supabase.from("packages").select("*").eq("category", selectedCategory).order("display_order")

    if (data) {
      setTiers(
        data.map((d) => ({
          id: d.id,
          name: d.name,
          price: d.price.toString(),
          description: d.description || "",
          features: d.features || [],
          is_featured: d.is_featured || false,
          category: d.category,
          is_active: d.is_active !== false,
        })),
      )
    }
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      ...formData,
      price: Number.parseFloat(formData.price || "0"),
      display_order: tiers.length,
    }

    if (editingId) {
      await supabase.from("packages").update(payload).eq("id", editingId)
    } else {
      await supabase.from("packages").insert([payload])
    }

    resetForm()
    fetchTiers()
  }

  function addFeature() {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), { name: featureInput, fieldType: featureType }],
      })
      setFeatureInput("")
      setFeatureType("text")
    }
  }

  function removeFeature(index: number) {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index),
    })
  }

  function startEdit(tier: PricingTier) {
    setFormData(tier)
    setEditingId(tier.id)
    setShowForm(true)
  }

  function resetForm() {
    setFormData({
      name: "",
      price: "",
      description: "",
      features: [],
      is_featured: false,
      category: selectedCategory,
      is_active: true,
    })
    setFeatureInput("")
    setFeatureType("text")
    setEditingId(null)
    setShowForm(false)
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this pricing tier?")) {
      await supabase.from("packages").delete().eq("id", id)
      fetchTiers()
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all",
              selectedCategory === cat ? "bg-[#C4D600] text-gray-900" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add New Tier Button */}
      <Button onClick={() => setShowForm(!showForm)} className="gap-2 bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900">
        <Plus className="h-4 w-4" />
        Add Pricing Tier
      </Button>

      {/* Form */}
      {showForm && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Tier" : "Add New Pricing Tier"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tier Name</label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Starter, Professional, Enterprise"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price (AED)</label>
                  <Input
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this tier"
                />
              </div>

              {/* Features with Dynamic Field Types */}
              <div>
                <label className="block text-sm font-medium mb-3">Features & Customization</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Feature name"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                  />

                  <select
                    value={featureType}
                    onChange={(e) => setFeatureType(e.target.value as "text" | "dropdown" | "radio" | "checkbox")}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="text">Text</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                  </select>

                  <Button type="button" onClick={addFeature} className="bg-blue-600">
                    Add Feature
                  </Button>
                </div>

                {/* Display Added Features */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {formData.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded border">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{feature.name}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {feature.fieldType}
                          </Badge>
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_featured || false}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  />
                  <span className="text-sm">Featured Tier</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active !== false}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button type="submit" className="gap-2 bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900">
                  <Save className="h-4 w-4" />
                  {editingId ? "Update" : "Create"} Tier
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Pricing Tiers Display */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C4D600] mx-auto" />
        </div>
      ) : tiers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">No pricing tiers in this category yet.</CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <Card key={tier.id} className={!tier.is_active ? "opacity-50" : ""}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <p className="text-2xl font-bold text-[#C4D600] mt-1">AED {tier.price}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => startEdit(tier)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(tier.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {tier.description && <p className="text-sm text-gray-600">{tier.description}</p>}

                {tier.features && tier.features.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-700">Features:</p>
                    {tier.features.map((f, idx) => (
                      <div key={idx} className="text-xs text-gray-600">
                        <span>✓ {f.name}</span>
                        <Badge variant="outline" className="ml-2 text-[10px]">
                          {f.fieldType}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-3">
                  {tier.is_featured && <Badge className="bg-[#C4D600] text-gray-900">Featured</Badge>}
                  {!tier.is_active && <Badge variant="secondary">Inactive</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
