"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AdminLayout } from "@/components/admin/admin-layout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit,
  Trash2,
  Target,
  Share2,
  Sparkles,
  Send,
  ImageIcon,
  Video,
  Copy,
  BarChart3,
  Heart,
  MessageCircle,
  Repeat2,
  Loader2,
  RefreshCw,
  Users,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Platform configurations with brand colors
const platforms = [
  { id: "instagram", name: "Instagram", color: "#E4405F", icon: "instagram" },
  { id: "facebook", name: "Facebook", color: "#1877F2", icon: "facebook" },
  { id: "linkedin", name: "LinkedIn", color: "#0A66C2", icon: "linkedin" },
  { id: "twitter", name: "Twitter/X", color: "#000000", icon: "twitter" },
  { id: "youtube", name: "YouTube", color: "#FF0000", icon: "youtube" },
  { id: "tiktok", name: "TikTok", color: "#000000", icon: "tiktok" },
]

const contentTypes = [
  { id: "post", name: "Post", icon: ImageIcon },
  { id: "reel", name: "Reel/Short", icon: Video },
  { id: "story", name: "Story", icon: Clock },
  { id: "carousel", name: "Carousel", icon: Copy },
  { id: "video", name: "Video", icon: Video },
]

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  pending_approval: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  published: "bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30",
  failed: "bg-red-500/20 text-red-400 border-red-500/30",
}

// Platform Icons Component
function PlatformIcon({ platform, className = "h-5 w-5" }: { platform: string; className?: string }) {
  switch (platform) {
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.204.013-3.663.072-4.948.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    case "facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case "twitter":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case "youtube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    case "tiktok":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      )
    default:
      return <Share2 className={className} />
  }
}

export function AdminSocialCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [posts, setPosts] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [socialAccounts, setSocialAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewPost, setShowNewPost] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [selectedClient, setSelectedClient] = useState<string>("all")
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all")
  const [generating, setGenerating] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)

  // Form state
  const [formData, setFormData] = useState({
    client_id: "",
    social_account_id: "",
    title: "",
    caption: "",
    hashtags: "",
    platform: "instagram",
    content_type: "post",
    scheduled_date: "",
    scheduled_time: "10:00",
    media_urls: [] as string[],
    ai_generated: false,
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchData()
  }, [currentMonth, selectedClient, selectedPlatform])

  async function fetchData() {
    setLoading(true)
    try {
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString()
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString()

      let query = supabase
        .from("social_calendar")
        .select("*, clients(name, company_name), social_accounts(platform, account_name, account_handle)")
        .gte("scheduled_date", startOfMonth.split("T")[0])
        .lte("scheduled_date", endOfMonth.split("T")[0])
        .order("scheduled_date", { ascending: true })

      if (selectedClient !== "all") {
        query = query.eq("client_id", selectedClient)
      }
      if (selectedPlatform !== "all") {
        query = query.eq("platform", selectedPlatform)
      }

      const [postsRes, clientsRes, accountsRes] = await Promise.all([
        query,
        supabase.from("clients").select("*").eq("is_active", true),
        supabase.from("social_accounts").select("*"),
      ])

      setPosts(postsRes.data || [])
      setClients(clientsRes.data || [])
      setSocialAccounts(accountsRes.data || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // AI Caption Generator
  async function generateAICaption() {
    if (!formData.title) {
      toast.error("Please enter a title first")
      return
    }

    setGenerating(true)
    try {
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate an engaging social media caption for ${formData.platform} about: "${formData.title}". 
          Make it ${formData.platform === "linkedin" ? "professional" : "engaging and casual"}. 
          Include a call-to-action. Keep it under 280 characters for Twitter, or up to 500 for other platforms.
          DO NOT include hashtags in the caption.`,
          provider: "auto",
        }),
      })

      const data = await response.json()
      if (data.content) {
        setFormData({ ...formData, caption: data.content, ai_generated: true })
        toast.success("AI generated caption!")
      }
    } catch (error) {
      toast.error("Failed to generate caption")
    }
    setGenerating(false)
  }

  // AI Hashtag Generator
  async function generateAIHashtags() {
    if (!formData.title && !formData.caption) {
      toast.error("Please enter a title or caption first")
      return
    }

    setGenerating(true)
    try {
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate 10-15 relevant hashtags for a ${formData.platform} post about: "${formData.title || formData.caption}". 
          Include a mix of popular and niche hashtags. Format as comma-separated without # symbol.
          Focus on: digital marketing, branding, UAE business, Dubai, creative agency.`,
          provider: "auto",
        }),
      })

      const data = await response.json()
      if (data.content) {
        setFormData({ ...formData, hashtags: data.content.replace(/#/g, "").trim() })
        toast.success("AI generated hashtags!")
      }
    } catch (error) {
      toast.error("Failed to generate hashtags")
    }
    setGenerating(false)
  }

  // Save post
  async function handleSavePost(status = "draft") {
    if (!formData.title || !formData.scheduled_date) {
      toast.error("Please fill in required fields")
      return
    }

    try {
      const postData = {
        client_id: formData.client_id || null,
        social_account_id: formData.social_account_id || null,
        title: formData.title,
        caption: formData.caption,
        hashtags: formData.hashtags
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
        platform: formData.platform,
        content_type: formData.content_type,
        scheduled_date: formData.scheduled_date,
        scheduled_time: formData.scheduled_time,
        media_urls: formData.media_urls,
        ai_generated: formData.ai_generated,
        status: status,
        updated_at: new Date().toISOString(),
      }

      if (editingPost) {
        const { error } = await supabase.from("social_calendar").update(postData).eq("id", editingPost.id)
        if (error) throw error
        toast.success("Post updated!")
      } else {
        const { error } = await supabase.from("social_calendar").insert(postData)
        if (error) throw error
        toast.success(`Post ${status === "draft" ? "saved as draft" : "scheduled"}!`)
      }

      setShowNewPost(false)
      setEditingPost(null)
      resetForm()
      fetchData()
    } catch (error: any) {
      toast.error("Failed to save post")
      console.error(error)
    }
  }

  // Delete post
  async function handleDeletePost(postId: string) {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const { error } = await supabase.from("social_calendar").delete().eq("id", postId)
      if (error) throw error
      toast.success("Post deleted")
      fetchData()
    } catch (error) {
      toast.error("Failed to delete post")
    }
  }

  // Update post status
  async function handleStatusChange(postId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from("social_calendar")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", postId)

      if (error) throw error
      toast.success(`Status updated to ${newStatus}`)
      fetchData()
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  function resetForm() {
    setFormData({
      client_id: "",
      social_account_id: "",
      title: "",
      caption: "",
      hashtags: "",
      platform: "instagram",
      content_type: "post",
      scheduled_date: "",
      scheduled_time: "10:00",
      media_urls: [],
      ai_generated: false,
    })
  }

  function openEditDialog(post: any) {
    setEditingPost(post)
    setFormData({
      client_id: post.client_id || "",
      social_account_id: post.social_account_id || "",
      title: post.title || "",
      caption: post.caption || "",
      hashtags: post.hashtags?.join(", ") || "",
      platform: post.platform || "instagram",
      content_type: post.content_type || "post",
      scheduled_date: post.scheduled_date || "",
      scheduled_time: post.scheduled_time || "10:00",
      media_urls: post.media_urls || [],
      ai_generated: post.ai_generated || false,
    })
    setShowNewPost(true)
  }

  // Calendar helpers
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  const getPostsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return posts.filter((post) => post.scheduled_date === dateStr)
  }

  // Stats
  const stats = {
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
    pending: posts.filter((p) => p.status === "pending_approval").length,
    totalEngagement: posts.reduce(
      (sum, p) => sum + (p.engagement_likes || 0) + (p.engagement_comments || 0) + (p.engagement_shares || 0),
      0,
    ),
  }

  // Get client's social accounts
  const filteredAccounts =
    formData.client_id && formData.client_id !== ""
      ? socialAccounts.filter((a) => a.client_id === formData.client_id)
      : socialAccounts

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              Social Media Calendar
            </h1>
            <p className="text-gray-400 mt-1">AI-powered social media scheduling for all platforms</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={fetchData} className="border-gray-700 text-gray-300 bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-gray-800">
              <Button
                variant={view === "calendar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("calendar")}
                className={view === "calendar" ? "bg-[#C4D600] text-black" : "text-gray-400"}
              >
                Calendar
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
                className={view === "list" ? "bg-[#C4D600] text-black" : "text-gray-400"}
              >
                List
              </Button>
            </div>
            <Dialog
              open={showNewPost}
              onOpenChange={(open) => {
                setShowNewPost(open)
                if (!open) {
                  setEditingPost(null)
                  resetForm()
                }
              }}
            >
              <DialogTrigger asChild>
                <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a1a] border-gray-800 max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">{editingPost ? "Edit Post" : "Schedule New Post"}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Create and schedule social media content with AI assistance
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  {/* Client & Platform Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Client (Optional)</Label>
                      <Select
                        value={formData.client_id}
                        onValueChange={(v) => setFormData({ ...formData, client_id: v })}
                      >
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-gray-800">
                          <SelectItem value="no_client">No client (Agency post)</SelectItem>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.company_name || client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Social Account</Label>
                      <Select
                        value={formData.social_account_id}
                        onValueChange={(v) => setFormData({ ...formData, social_account_id: v })}
                      >
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-gray-800">
                          <SelectItem value="select_later">Select later</SelectItem>
                          {filteredAccounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              <div className="flex items-center gap-2">
                                <PlatformIcon platform={account.platform} className="h-4 w-4" />
                                {account.account_name || account.account_handle}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Platform & Content Type */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Platform</Label>
                    <div className="flex flex-wrap gap-2">
                      {platforms.map((platform) => (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, platform: platform.id })}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                            formData.platform === platform.id
                              ? "border-[#C4D600] bg-[#C4D600]/10 text-white"
                              : "border-gray-700 text-gray-400 hover:border-gray-600"
                          }`}
                        >
                          <PlatformIcon platform={platform.id} className="h-4 w-4" />
                          {platform.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Content Type</Label>
                    <div className="flex flex-wrap gap-2">
                      {contentTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, content_type: type.id })}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                            formData.content_type === type.id
                              ? "border-[#C4D600] bg-[#C4D600]/10 text-white"
                              : "border-gray-700 text-gray-400 hover:border-gray-600"
                          }`}
                        >
                          <type.icon className="h-4 w-4" />
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Post Title / Topic</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="What is this post about?"
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>

                  {/* Caption with AI */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Caption</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generateAICaption}
                        disabled={generating}
                        className="border-[#C4D600]/50 text-[#C4D600] hover:bg-[#C4D600]/10 bg-transparent"
                      >
                        {generating ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 mr-2" />
                        )}
                        AI Generate
                      </Button>
                    </div>
                    <Textarea
                      value={formData.caption}
                      onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                      placeholder="Write your caption..."
                      className="bg-gray-900 border-gray-700 text-white min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500">{formData.caption.length} characters</p>
                  </div>

                  {/* Hashtags with AI */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Hashtags</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generateAIHashtags}
                        disabled={generating}
                        className="border-[#C4D600]/50 text-[#C4D600] hover:bg-[#C4D600]/10 bg-transparent"
                      >
                        {generating ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 mr-2" />
                        )}
                        AI Hashtags
                      </Button>
                    </div>
                    <Textarea
                      value={formData.hashtags}
                      onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                      placeholder="marketing, branding, uae, dubai (comma separated)"
                      className="bg-gray-900 border-gray-700 text-white"
                      rows={2}
                    />
                    <div className="flex flex-wrap gap-1">
                      {formData.hashtags
                        .split(",")
                        .filter((h) => h.trim())
                        .slice(0, 10)
                        .map((tag, i) => (
                          <Badge key={i} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                            #{tag.trim()}
                          </Badge>
                        ))}
                      {formData.hashtags.split(",").filter((h) => h.trim()).length > 10 && (
                        <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                          +{formData.hashtags.split(",").filter((h) => h.trim()).length - 10} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Schedule Date</Label>
                      <Input
                        type="date"
                        value={formData.scheduled_date}
                        onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                        className="bg-gray-900 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Time (Dubai)</Label>
                      <Input
                        type="time"
                        value={formData.scheduled_time}
                        onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
                        className="bg-gray-900 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-800">
                    <Button
                      variant="outline"
                      onClick={() => handleSavePost("draft")}
                      className="flex-1 border-gray-700 text-gray-300 bg-transparent"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Save as Draft
                    </Button>
                    <Button
                      onClick={() => handleSavePost("scheduled")}
                      className="flex-1 bg-[#C4D600] text-black hover:bg-[#a8b800]"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Schedule Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-700/30">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stats.scheduled}</p>
              <p className="text-xs text-blue-300">Scheduled</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border-emerald-700/30">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stats.published}</p>
              <p className="text-xs text-emerald-300">Published</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border-gray-700/30">
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stats.draft}</p>
              <p className="text-xs text-gray-300">Drafts</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 border-yellow-700/30">
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
              <p className="text-xs text-yellow-300">Pending</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 border-pink-700/30">
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stats.totalEngagement}</p>
              <p className="text-xs text-pink-300">Engagements</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[200px] bg-gray-900 border-gray-700 text-white">
              <Users className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-gray-800">
              <SelectItem value="all">All Clients</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.company_name || client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
              <Share2 className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-gray-800">
              <SelectItem value="all">All Platforms</SelectItem>
              {platforms.map((platform) => (
                <SelectItem key={platform.id} value={platform.id}>
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={platform.id} className="h-4 w-4" />
                    {platform.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Calendar View */}
        {view === "calendar" ? (
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  className="text-gray-400 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-bold text-white">{monthName}</h2>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  className="text-gray-400 hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                  const dayPosts = getPostsForDate(day)
                  const isToday =
                    new Date().getDate() === day &&
                    new Date().getMonth() === currentMonth.getMonth() &&
                    new Date().getFullYear() === currentMonth.getFullYear()

                  return (
                    <div
                      key={day}
                      onClick={() => {
                        setFormData({ ...formData, scheduled_date: dateStr })
                        setShowNewPost(true)
                      }}
                      className={`min-h-[100px] p-2 rounded-lg border cursor-pointer transition-all hover:border-[#C4D600]/50 ${
                        isToday ? "border-[#C4D600] bg-[#C4D600]/10" : "border-gray-800"
                      } ${selectedDate === dateStr ? "ring-2 ring-[#C4D600]" : ""}`}
                    >
                      <div className={`text-sm font-medium mb-1 ${isToday ? "text-[#C4D600]" : "text-gray-300"}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayPosts.slice(0, 3).map((post) => {
                          const platformConfig = platforms.find((p) => p.id === post.platform)
                          return (
                            <div
                              key={post.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                openEditDialog(post)
                              }}
                              className="text-[10px] px-1.5 py-1 rounded flex items-center gap-1 truncate"
                              style={{ backgroundColor: `${platformConfig?.color}20`, color: platformConfig?.color }}
                            >
                              <PlatformIcon platform={post.platform} className="h-2.5 w-2.5 flex-shrink-0" />
                              <span className="truncate">{post.title}</span>
                            </div>
                          )
                        })}
                        {dayPosts.length > 3 && (
                          <div className="text-[10px] text-gray-500 text-center">+{dayPosts.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* List View */
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">All Scheduled Posts</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Search posts..." className="w-64 bg-gray-900 border-gray-700 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No posts scheduled for this month</p>
                  <Button
                    onClick={() => setShowNewPost(true)}
                    className="mt-4 bg-[#C4D600] text-black hover:bg-[#a8b800]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Your First Post
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post) => {
                    const platformConfig = platforms.find((p) => p.id === post.platform)
                    return (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: `${platformConfig?.color}30` }}
                          >
                            <PlatformIcon
                              platform={post.platform}
                              className="h-6 w-6"
                              style={{ color: platformConfig?.color }}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-white">{post.title}</h4>
                              {post.ai_generated && (
                                <Badge variant="outline" className="border-[#C4D600]/50 text-[#C4D600] text-xs">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  AI
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">
                              {platformConfig?.name} • {post.content_type} •{" "}
                              {new Date(post.scheduled_date).toLocaleDateString()} {post.scheduled_time}
                            </p>
                            {post.clients && (
                              <p className="text-xs text-gray-500">{post.clients.company_name || post.clients.name}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Engagement stats */}
                          {post.status === "published" && (
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                              <span className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                {post.engagement_likes || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {post.engagement_comments || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <Repeat2 className="h-4 w-4" />
                                {post.engagement_shares || 0}
                              </span>
                            </div>
                          )}

                          <Select value={post.status} onValueChange={(value) => handleStatusChange(post.id, value)}>
                            <SelectTrigger className={`w-[140px] ${statusColors[post.status]} border`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a1a] border-gray-800">
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="pending_approval">Pending</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>

                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(post)}
                              className="text-gray-400 hover:text-white h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-gray-400 hover:text-red-400 h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-pink-900/30 to-fuchsia-900/30 border-pink-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Social Lead Generation</h3>
                    <p className="text-sm text-gray-400">Track leads from social media</p>
                  </div>
                </div>
                <Link href="/admin/leads/social">
                  <Button
                    variant="outline"
                    className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10 bg-transparent"
                  >
                    View Leads
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Analytics Dashboard</h3>
                    <p className="text-sm text-gray-400">View social media performance</p>
                  </div>
                </div>
                <Link href="/admin/social-analytics">
                  <Button
                    variant="outline"
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                  >
                    View Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
