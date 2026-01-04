"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Loader2, Upload } from "lucide-react"
import { PortfolioImageManager } from "./portfolio-image-manager"

export function PortfolioManagement() {
  const [portfolio, setPortfolio] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    client_name: "",
    category: "Photography",
    featured_image: "",
    gallery_images: [],
    is_featured: false,
    status: "published" as "draft" | "published" | "archived",
  })

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
    "Graphic Design",
    "Social Media",
  ]

  useEffect(() => {
    fetchPortfolio()
  }, [])

  async function fetchPortfolio() {
    setLoading(true)
    const { data } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false })
    setPortfolio(data || [])
    setLoading(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from("portfolio").upload(filePath, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath)

      setFormData({ ...formData, featured_image: publicUrl })
    } catch (error) {
      alert("Error uploading image")
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (editingId) {
      await supabase.from("portfolio").update(formData).eq("id", editingId)
    } else {
      await supabase.from("portfolio").insert([formData])
    }

    setShowForm(false)
    setEditingId(null)
    setFormData({
      title: "",
      slug: "",
      description: "",
      client_name: "",
      category: "Photography",
      featured_image: "",
      gallery_images: [],
      is_featured: false,
      status: "published",
    })
    fetchPortfolio()
  }

  async function handleDelete(id: string, imageUrl: string) {
    if (confirm("Are you sure you want to delete this portfolio item?")) {
      if (imageUrl && imageUrl.includes("supabase")) {
        const path = imageUrl.split("/portfolio/")[1]
        if (path) {
          await supabase.storage.from("portfolio").remove([path])
        }
      }

      await supabase.from("portfolio").delete().eq("id", id)
      fetchPortfolio()
    }
  }

  function handleEdit(item: any) {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const filteredPortfolio =
    selectedCategory === "All" ? portfolio : portfolio.filter((p) => p.category === selectedCategory)

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 bg-[#C4D600] text-gray-900 hover:bg-[#b0c200]">
          <Plus className="h-4 w-4" />
          Add New Portfolio Item
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

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? "Edit" : "Add"} Portfolio Item</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                  }
                  placeholder="project-url-slug"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the project..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client">Client Name</Label>
                <Input
                  id="client"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Client or company name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  required
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
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
            </div>

            <div>
              <Label htmlFor="image">Featured Image</Label>
              <div className="flex gap-2">
                <label className="flex-1">
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 bg-transparent"
                    disabled={uploading}
                    asChild
                  >
                    <span>
                      {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      {uploading ? "Uploading..." : "Upload Image"}
                    </span>
                  </Button>
                </label>
              </div>
              {formData.featured_image && (
                <img
                  src={formData.featured_image || "/placeholder.svg"}
                  alt="Preview"
                  className="mt-2 h-32 w-auto object-cover rounded border"
                />
              )}
            </div>

            <div>
              <Label>Project Gallery</Label>
              <PortfolioImageManager
                portfolioId={editingId || "new"}
                currentImages={formData.gallery_images || []}
                onImagesUpdate={(images) => setFormData({ ...formData, gallery_images: images })}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">Featured</span>
              </label>

              <select
                className="h-10 px-3 rounded-md border border-input bg-background"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="bg-[#C4D600] text-gray-900 hover:bg-[#b0c200]">
                {editingId ? "Update" : "Create"} Portfolio Item
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({
                    title: "",
                    slug: "",
                    description: "",
                    client_name: "",
                    category: "Photography",
                    featured_image: "",
                    gallery_images: [],
                    is_featured: false,
                    status: "published",
                  })
                }}
              >
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
      ) : filteredPortfolio.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No portfolio items found in this category.</p>
          <Button onClick={() => setShowForm(true)} className="bg-[#C4D600] hover:bg-[#C4D600]/90 text-gray-900">
            Add Your First Portfolio Item
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={item.featured_image || "/placeholder.svg?height=200&width=400&query=portfolio project"}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.status === "published"
                        ? "bg-green-100 text-green-700"
                        : item.status === "draft"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-[#C4D600] font-medium mb-1">{item.category}</p>
                {item.client_name && <p className="text-sm text-gray-500 mb-2">Client: {item.client_name}</p>}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id, item.featured_image)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
