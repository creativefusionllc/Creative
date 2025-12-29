"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Calendar, Clock, Pencil, Trash2, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BlogManagement() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [showBulkEdit, setShowBulkEdit] = useState(false)
  const [bulkData, setBulkData] = useState({
    category_id: "",
    status: "",
    scheduled_at: "",
  })
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category_id: "",
    status: "draft",
    read_time: 5,
    tags: "",
    meta_title: "",
    meta_description: "",
    scheduled_at: "",
  })
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [{ data: postsData }, { data: catsData }] = await Promise.all([
      supabase.from("blog_posts").select("*, category:blog_categories(*)").order("created_at", { ascending: false }),
      supabase.from("blog_categories").select("*").eq("is_active", true).order("sort_order"),
    ])

    setPosts(postsData || [])
    setCategories(catsData || [])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const data = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      published_at: formData.status === "published" ? new Date().toISOString() : null,
      scheduled_at:
        formData.status === "scheduled" && formData.scheduled_at ? new Date(formData.scheduled_at).toISOString() : null,
    }

    if (editingPost) {
      await supabase.from("blog_posts").update(data).eq("id", editingPost.id)
    } else {
      await supabase.from("blog_posts").insert(data)
    }

    setShowDialog(false)
    setEditingPost(null)
    resetForm()
    fetchData()
  }

  function resetForm() {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      category_id: "",
      status: "draft",
      read_time: 5,
      tags: "",
      meta_title: "",
      meta_description: "",
      scheduled_at: "",
    })
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this post?")) {
      await supabase.from("blog_posts").delete().eq("id", id)
      fetchData()
    }
  }

  function handleEdit(post: any) {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      featured_image: post.featured_image || "",
      category_id: post.category_id || "",
      status: post.status,
      read_time: post.read_time || 5,
      tags: post.tags?.join(", ") || "",
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      scheduled_at: post.scheduled_at ? new Date(post.scheduled_at).toISOString().slice(0, 16) : "",
    })
    setShowDialog(true)
  }

  async function handleBulkUpdate() {
    const updateData: any = {}
    if (bulkData.category_id) updateData.category_id = bulkData.category_id
    if (bulkData.status) updateData.status = bulkData.status
    if (bulkData.scheduled_at) {
      updateData.scheduled_at = new Date(bulkData.scheduled_at).toISOString()
    }

    for (const postId of selectedPosts) {
      await supabase.from("blog_posts").update(updateData).eq("id", postId)
    }

    setSelectedPosts([])
    setShowBulkEdit(false)
    setBulkData({ category_id: "", status: "", scheduled_at: "" })
    fetchData()
  }

  async function handleQuickSchedule(postId: string, scheduledTime: string) {
    await supabase
      .from("blog_posts")
      .update({
        scheduled_at: new Date(scheduledTime).toISOString(),
        status: "scheduled",
      })
      .eq("id", postId)
    fetchData()
  }

  async function handleQuickEditTopic(postId: string, title: string, categoryId: string) {
    await supabase
      .from("blog_posts")
      .update({
        title,
        category_id: categoryId,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      })
      .eq("id", postId)
    fetchData()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management CMS</h1>
          <p className="text-muted-foreground mt-1">Manage blog posts, topics, categories, and scheduling</p>
        </div>
        <div className="flex gap-2">
          {selectedPosts.length > 0 && (
            <Button variant="outline" onClick={() => setShowBulkEdit(true)}>
              Bulk Edit ({selectedPosts.length})
            </Button>
          )}
          <Button
            onClick={() => {
              setEditingPost(null)
              resetForm()
              setShowDialog(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        {["all", "draft", "published", "scheduled"].map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {posts
          .filter((post) => filterStatus === "all" || post.status === filterStatus)
          .map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 flex items-center justify-between bg-card hover:bg-accent/50 transition"
            >
              <input
                type="checkbox"
                checked={selectedPosts.includes(post.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPosts([...selectedPosts, post.id])
                  } else {
                    setSelectedPosts(selectedPosts.filter((id) => id !== post.id))
                  }
                }}
                className="mr-4 w-4 h-4"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold">{post.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                        : post.status === "draft"
                          ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                    }`}
                  >
                    {post.status}
                  </span>
                  {post.category && (
                    <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100">
                      {post.category.name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : post.scheduled_at
                        ? `Scheduled: ${new Date(post.scheduled_at).toLocaleDateString()} ${new Date(post.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                        : "Not published"}
                  </span>
                  {post.status === "scheduled" && (
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <Clock className="h-3 w-3" />
                      {new Date(post.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {post.view_count || 0} views
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
      </div>

      <Dialog open={showBulkEdit} onOpenChange={setShowBulkEdit}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bulk Edit Posts ({selectedPosts.length} selected)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Change Category</label>
              <Select
                value={bulkData.category_id}
                onValueChange={(value) => setBulkData({ ...bulkData, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Change Status</label>
              <Select value={bulkData.status} onValueChange={(value) => setBulkData({ ...bulkData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {bulkData.status === "scheduled" && (
              <div>
                <label className="text-sm font-medium">Schedule for Date & Time</label>
                <Input
                  type="datetime-local"
                  value={bulkData.scheduled_at}
                  onChange={(e) => setBulkData({ ...bulkData, scheduled_at: e.target.value })}
                />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowBulkEdit(false)}>
                Cancel
              </Button>
              <Button onClick={handleBulkUpdate}>Apply Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit Post" : "New Post"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value })
                    if (!editingPost) {
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                      })
                    }
                  }}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug *</label>
                <Input
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Excerpt</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Content *</label>
              <Textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Featured Image URL</label>
                <Input
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Read Time (minutes)</label>
                <Input
                  type="number"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>

            {formData.status === "scheduled" && (
              <div>
                <label className="text-sm font-medium">Publish Date & Time</label>
                <Input
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                  required={formData.status === "scheduled"}
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="marketing, branding, tips"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Meta Title</label>
                <Input
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <Input
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingPost ? "Update" : "Create"} Post</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
