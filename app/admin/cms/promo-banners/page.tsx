"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createBrowserClient } from "@supabase/ssr"
import { Trash2, Edit2 } from "lucide-react"

interface PromoBanner {
  id: string
  title: string
  subtitle: string
  description: string
  cta_text: string
  cta_link: string
  background_color: string
  text_color: string
  position: string
  is_active: boolean
  form_type: string
}

export default function PromoBannersPage() {
  const [banners, setBanners] = useState<PromoBanner[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    cta_text: "Learn More",
    cta_link: "",
    background_color: "#C4D600",
    text_color: "#1f2937",
    position: "bottom",
    is_active: true,
    form_type: "inquiry",
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    const { data } = await supabase.from("promo_banners").select("*").order("created_at", { ascending: false })

    if (data) setBanners(data)
  }

  const handleSave = async () => {
    if (!formData.title.trim()) return

    if (editingId) {
      await supabase.from("promo_banners").update(formData).eq("id", editingId)
    } else {
      await supabase.from("promo_banners").insert([formData])
    }

    resetForm()
    fetchBanners()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      await supabase.from("promo_banners").delete().eq("id", id)

      fetchBanners()
    }
  }

  const handleEdit = (banner: PromoBanner) => {
    setEditingId(banner.id)
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || "",
      description: banner.description || "",
      cta_text: banner.cta_text,
      cta_link: banner.cta_link || "",
      background_color: banner.background_color,
      text_color: banner.text_color,
      position: banner.position,
      is_active: banner.is_active,
      form_type: banner.form_type,
    })
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      cta_text: "Learn More",
      cta_link: "",
      background_color: "#C4D600",
      text_color: "#1f2937",
      position: "bottom",
      is_active: true,
      form_type: "inquiry",
    })
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Promotional Banners</h1>
        <p className="text-gray-400 mt-2">Create and manage promotional banners for your website</p>
      </div>

      {/* Editor Form */}
      <Card className="bg-[#1a1a1a] border-white/10">
        <CardHeader>
          <CardTitle className="text-white">{editingId ? "Edit Banner" : "Create New Banner"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-[#0a0a0a] border-white/10 text-white"
                placeholder="Banner title"
              />
            </div>

            <div>
              <Label className="text-white">Subtitle</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="bg-[#0a0a0a] border-white/10 text-white"
                placeholder="Optional subtitle"
              />
            </div>
          </div>

          <div>
            <Label className="text-white">Description</Label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg p-3 text-sm"
              rows={3}
              placeholder="Banner description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">CTA Text</Label>
              <Input
                value={formData.cta_text}
                onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                className="bg-[#0a0a0a] border-white/10 text-white"
                placeholder="Button text"
              />
            </div>

            <div>
              <Label className="text-white">CTA Link</Label>
              <Input
                value={formData.cta_link}
                onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                className="bg-[#0a0a0a] border-white/10 text-white"
                placeholder="/services or https://..."
              />
            </div>

            <div>
              <Label className="text-white">Position</Label>
              <select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg p-2"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="floating">Floating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">Background Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.background_color}
                  onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                  className="h-10 w-16 rounded cursor-pointer"
                />
                <Input
                  value={formData.background_color}
                  onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                  className="bg-[#0a0a0a] border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Text Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.text_color}
                  onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                  className="h-10 w-16 rounded cursor-pointer"
                />
                <Input
                  value={formData.text_color}
                  onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                  className="bg-[#0a0a0a] border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Active</Label>
              <label className="flex items-center gap-2 h-10">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded accent-[#C4D600]"
                />
                <span className="text-white text-sm">Enable this banner</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            {editingId && (
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10 bg-transparent"
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleSave} className="bg-[#C4D600] text-gray-900 hover:bg-[#B8C900] font-semibold">
              {editingId ? "Update Banner" : "Create Banner"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Banners List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Active Banners</h2>
        {banners.length === 0 ? (
          <p className="text-gray-400">No promotional banners created yet.</p>
        ) : (
          <div className="grid gap-4">
            {banners.map((banner) => (
              <Card
                key={banner.id}
                className="bg-[#1a1a1a] border-white/10 overflow-hidden"
                style={{ borderTopColor: banner.background_color, borderTopWidth: "4px" }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{banner.title}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            banner.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-600/20 text-gray-400"
                          }`}
                        >
                          {banner.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      {banner.subtitle && <p className="text-sm text-gray-300">{banner.subtitle}</p>}
                      {banner.description && <p className="text-xs text-gray-400 mt-1">{banner.description}</p>}
                      <div className="flex gap-4 mt-3 text-xs text-gray-500">
                        <span>Position: {banner.position}</span>
                        <span>CTA: {banner.cta_text}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(banner)}
                        size="sm"
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(banner.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
