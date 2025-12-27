"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Edit, Trash2, Save, X } from "lucide-react"

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
  offer_valid_until: string | null
  display_order: number
  is_active: boolean
}

export function PackagesManagement() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [formData, setFormData] = useState<Partial<Package>>({
    name: "",
    category: "Photography",
    price: 0,
    currency: "AED",
    duration: "Per Project",
    features: [],
    is_featured: false,
    is_special_offer: false,
    discount_percentage: 0,
    display_order: 0,
    is_active: true,
  })
  const [featureInput, setFeatureInput] = useState("")

  const supabase = createClient()

  const categories = [
    "Creative Branding",
    "Photography",
    "Videography",
    "Digital Marketing",
    "Marketing & PR",
    "Web Development",
    "Software & Apps",
    "Exhibition Stands",
    "Print & Exhibitions",
    "Gift Items",
    "Support & Maintenance",
    "Sales & Retail",
    "Photo Lab",
  ]

  useEffect(() => {
    fetchPackages()
  }, [])

  async function fetchPackages() {
    setLoading(true)
    const { data } = await supabase.from("packages").select("*").order("display_order")
    setPackages(data || [])
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (editingId) {
      await supabase.from("packages").update(formData).eq("id", editingId)
    } else {
      await supabase.from("packages").insert([formData])
    }

    resetForm()
    fetchPackages()
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this package?")) {
      await supabase.from("packages").delete().eq("id", id)
      fetchPackages()
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      category: "Photography",
      price: 0,
      currency: "AED",
      duration: "Per Project",
      features: [],
      is_featured: false,
      is_special_offer: false,
      discount_percentage: 0,
      display_order: 0,
      is_active: true,
    })
    setFeatureInput("")
    setEditingId(null)
    setShowAddForm(false)
  }

  function startEdit(pkg: Package) {
    setFormData(pkg)
    setEditingId(pkg.id)
    setShowAddForm(true)
  }

  function addFeature() {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()],
      })
      setFeatureInput("")
    }
  }

  function removeFeature(index: number) {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || [],
    })
  }

  const filteredPackages =
    selectedCategory === "All" ? packages : packages.filter((p) => p.category === selectedCategory)

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-2 bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900"
        >
          <Plus className="h-4 w-4" />
          Add New Package
        </Button>

        <select
          className="px-4 py-2 border rounded-md bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Package" : "Add New Package"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Package Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Starter, Professional, Premium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price (AED)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="Per Day, Per Project, Monthly, One-time"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Display Order</label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Features</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature (e.g., 4 Hours Coverage)"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature}>
                  Add
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <span className="flex-1 text-sm">{feature}</span>
                    <Button type="button" size="sm" variant="ghost" onClick={() => removeFeature(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                />
                <label>Featured Package</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_special_offer}
                  onChange={(e) => setFormData({ ...formData, is_special_offer: e.target.checked })}
                />
                <label>Special Offer</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <label>Active</label>
              </div>
            </div>

            {formData.is_special_offer && (
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-orange-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-1">Discount %</label>
                  <Input
                    type="number"
                    value={formData.discount_percentage}
                    onChange={(e) => setFormData({ ...formData, discount_percentage: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Original Price</label>
                  <Input
                    type="number"
                    value={formData.original_price || ""}
                    onChange={(e) => setFormData({ ...formData, original_price: Number.parseFloat(e.target.value) })}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" className="gap-2 bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900">
                <Save className="h-4 w-4" />
                {editingId ? "Update" : "Create"} Package
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No packages found in this category.</p>
          <Button onClick={() => setShowAddForm(true)} className="bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900">
            Add Your First Package
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => startEdit(pkg)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(pkg.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">{pkg.category}</p>

              {pkg.is_special_offer && pkg.original_price && (
                <p className="text-sm line-through text-gray-400">AED {pkg.original_price}</p>
              )}
              <p className="text-2xl font-bold text-[#C4D600] mb-1">AED {pkg.price}</p>
              <p className="text-sm text-gray-600 mb-3">{pkg.duration}</p>

              <ul className="space-y-1 mb-3">
                {pkg.features?.slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    ✓ {feature}
                  </li>
                ))}
                {pkg.features?.length > 4 && (
                  <li className="text-sm text-gray-400">+{pkg.features.length - 4} more features</li>
                )}
              </ul>

              <div className="flex gap-2 flex-wrap">
                {pkg.is_featured && (
                  <span className="text-xs px-2 py-1 bg-[#C4D600] text-gray-900 rounded">Featured</span>
                )}
                {pkg.is_special_offer && (
                  <span className="text-xs px-2 py-1 bg-[#E8573F] text-white rounded">
                    {pkg.discount_percentage}% Off
                  </span>
                )}
                {!pkg.is_active && (
                  <span className="text-xs px-2 py-1 bg-gray-300 text-gray-700 rounded">Inactive</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
