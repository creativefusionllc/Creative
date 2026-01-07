"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Loader2, Eye, EyeOff } from "lucide-react"

export default function PagesManagement() {
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    page_type: "custom",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    is_published: false,
    is_featured: false,
  })

  const supabase = createClient()

  const pageTypes = ["home", "about", "services", "blog", "contact", "portfolio", "custom"]

  useEffect(() => {
    fetchPages()
  }, [])

  async function fetchPages() {
    setLoading(true)
    const { data } = await supabase.from("cms_pages").select("*").order("created_at", { ascending: false })
    setPages(data || [])
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const dataToSave = {
      ...formData,
      slug: formData.slug.toLowerCase().replace(/\s+/g, "-"),
    }

    if (editingId) {
      await supabase.from("cms_pages").update(dataToSave).eq("id", editingId)
    } else {
      await supabase.from("cms_pages").insert([dataToSave])
    }

    resetForm()
    fetchPages()
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this page?")) {
      await supabase.from("cms_pages").delete().eq("id", id)
      fetchPages()
    }
  }

  function handleEdit(page: any) {
    setFormData({
      title: page.title,
      slug: page.slug,
      page_type: page.page_type,
      meta_title: page.meta_title || "",
      meta_description: page.meta_description || "",
      meta_keywords: page.meta_keywords || "",
      is_published: page.is_published,
      is_featured: page.is_featured,
    })
    setEditingId(page.id)
    setShowForm(true)
  }

  function resetForm() {
    setFormData({
      title: "",
      slug: "",
      page_type: "custom",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      is_published: false,
      is_featured: false,
    })
    setEditingId(null)
    setShowForm(false)
  }

  async function togglePublish(id: string, currentStatus: boolean) {
    await supabase.from("cms_pages").update({ is_published: !currentStatus }).eq("id", id)
    fetchPages()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Page Management</h1>
        <Button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add New Page
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit" : "Create"} Page</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Page Title *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Page title"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                  }
                  placeholder="page-url-slug"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="page_type">Page Type</Label>
              <select
                id="page_type"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                value={formData.page_type}
                onChange={(e) => setFormData({ ...formData, page_type: e.target.value })}
              >
                {pageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="meta_title">SEO Title</Label>
              <Input
                id="meta_title"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="Page title for search engines (max 60 chars)"
                maxLength={60}
              />
            </div>

            <div>
              <Label htmlFor="meta_description">SEO Description</Label>
              <Textarea
                id="meta_description"
                rows={2}
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="Page description for search engines (max 155 chars)"
                maxLength={155}
              />
            </div>

            <div>
              <Label htmlFor="meta_keywords">SEO Keywords</Label>
              <Input
                id="meta_keywords"
                value={formData.meta_keywords}
                onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                placeholder="Comma-separated keywords"
              />
            </div>

            <div className="flex items-center gap-6 pt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Publish</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Featured</span>
              </label>
            </div>

            <div className="flex gap-2 pt-6">
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {editingId ? "Update" : "Create"} Page
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
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : pages.length === 0 ? (
        <div className="bg-card rounded-lg shadow p-12 text-center">
          <p className="text-muted-foreground mb-4">No pages created yet</p>
          <Button
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Your First Page
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Title</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Slug</th>
                <th className="text-center py-3 px-4 font-semibold">Status</th>
                <th className="text-center py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">{page.title}</td>
                  <td className="py-3 px-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {page.page_type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{page.slug}</td>
                  <td className="py-3 px-4 text-center">
                    {page.is_published ? (
                      <span className="text-green-600 font-medium">Published</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Draft</span>
                    )}
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePublish(page.id, page.is_published)}
                      title={page.is_published ? "Unpublish" : "Publish"}
                    >
                      {page.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(page)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(page.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
