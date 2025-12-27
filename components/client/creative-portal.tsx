"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Palette,
  Clock,
  CheckCircle,
  FileText,
  Download,
  MessageSquare,
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  ArrowLeft,
  Send,
  Eye,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

const platformOptions = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "facebook", label: "Facebook", icon: Facebook },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "twitter", label: "Twitter/X", icon: Twitter },
  { id: "youtube", label: "YouTube", icon: Youtube },
]

const statusColors: Record<string, string> = {
  pending: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10",
  "in-progress": "border-blue-500/30 text-blue-400 bg-blue-500/10",
  review: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  completed: "border-green-500/30 text-green-400 bg-green-500/10",
  cancelled: "border-red-500/30 text-red-400 bg-red-500/10",
}

export function ClientCreativePortal() {
  const supabase = createClient()
  const [requests, setRequests] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [brandKits, setBrandKits] = useState<any[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platforms: [] as string[],
    brand_kit_id: "",
    deadline: "",
    priority: "normal",
    reference_urls: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [requestsRes, projectsRes, brandKitsRes] = await Promise.all([
      supabase.from("creative_requests").select("*").order("created_at", { ascending: false }),
      supabase
        .from("creative_projects")
        .select("*, design_canvas(*), platform_templates(name, platform, width, height)")
        .order("created_at", { ascending: false }),
      supabase.from("brand_kits").select("*"),
    ])
    setRequests(requestsRes.data || [])
    setProjects(projectsRes.data || [])
    setBrandKits(brandKitsRes.data || [])
  }

  async function handleSubmitRequest() {
    await supabase.from("creative_requests").insert({
      ...formData,
      brand_kit_id: formData.brand_kit_id || null,
      platforms: formData.platforms,
      reference_urls: formData.reference_urls ? formData.reference_urls.split("\n").filter((u) => u.trim()) : [],
      deadline: formData.deadline || null,
    })

    setDialogOpen(false)
    setFormData({
      title: "",
      description: "",
      platforms: [],
      brand_kit_id: "",
      deadline: "",
      priority: "normal",
      reference_urls: "",
    })
    fetchData()
  }

  function togglePlatform(platform: string) {
    setFormData({
      ...formData,
      platforms: formData.platforms.includes(platform)
        ? formData.platforms.filter((p) => p !== platform)
        : [...formData.platforms, platform],
    })
  }

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    inProgress: requests.filter((r) => r.status === "in-progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#141414] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/client" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C4D600] rounded-lg flex items-center justify-center">
                  <Palette className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h1 className="font-bold text-white">Creative Studio</h1>
                  <p className="text-xs text-gray-400">Request & manage designs</p>
                </div>
              </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#141414] border-white/10 text-white max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#C4D600]" />
                    Request New Design
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Project Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="e.g., Holiday Campaign Posts"
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="Describe what you need..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Platforms Needed</Label>
                    <div className="flex flex-wrap gap-2">
                      {platformOptions.map((platform) => {
                        const Icon = platform.icon
                        const isSelected = formData.platforms.includes(platform.id)
                        return (
                          <button
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                              isSelected
                                ? "bg-[#C4D600]/20 border-[#C4D600] text-[#C4D600]"
                                : "border-white/10 text-gray-400 hover:border-white/20"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{platform.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Brand Kit</Label>
                      <Select
                        value={formData.brand_kit_id}
                        onValueChange={(v) => setFormData({ ...formData, brand_kit_id: v })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10">
                          {brandKits.map((kit) => (
                            <SelectItem key={kit.id} value={kit.id} className="text-white">
                              {kit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(v) => setFormData({ ...formData, priority: v })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10">
                          <SelectItem value="low" className="text-white">
                            Low
                          </SelectItem>
                          <SelectItem value="normal" className="text-white">
                            Normal
                          </SelectItem>
                          <SelectItem value="high" className="text-white">
                            High
                          </SelectItem>
                          <SelectItem value="urgent" className="text-white">
                            Urgent
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1"
                    />
                  </div>

                  <div>
                    <Label>Reference URLs (one per line)</Label>
                    <Textarea
                      value={formData.reference_urls}
                      onChange={(e) => setFormData({ ...formData, reference_urls: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="https://example.com/inspiration"
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                      className="border-white/20 text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitRequest}
                      disabled={!formData.title}
                      className="bg-[#C4D600] text-black hover:bg-[#d4e600]"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Request
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                  <p className="text-xs text-gray-400">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.pending}</p>
                  <p className="text-xs text-gray-400">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Palette className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
                  <p className="text-xs text-gray-400">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.completed}</p>
                  <p className="text-xs text-gray-400">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="bg-[#141414] border border-white/10">
            <TabsTrigger
              value="requests"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              My Requests
            </TabsTrigger>
            <TabsTrigger
              value="designs"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              Completed Designs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {requests.length > 0 ? (
              requests.map((request) => (
                <Card key={request.id} className="bg-[#141414] border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{request.title}</h3>
                          <Badge className={statusColors[request.status]}>{request.status}</Badge>
                          {request.priority === "urgent" && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>
                          )}
                          {request.priority === "high" && (
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">High</Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{request.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm">
                          {request.platforms && request.platforms.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Platforms:</span>
                              <div className="flex gap-1">
                                {request.platforms.map((p: string) => {
                                  const platform = platformOptions.find((po) => po.id === p)
                                  if (!platform) return null
                                  const Icon = platform.icon
                                  return <Icon key={p} className="h-4 w-4 text-gray-400" />
                                })}
                              </div>
                            </div>
                          )}
                          {request.deadline && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {format(new Date(request.deadline), "MMM d, yyyy")}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>Submitted: {format(new Date(request.created_at), "MMM d, yyyy")}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/20 text-white bg-transparent">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-[#141414] border-white/10 border-dashed">
                <CardContent className="py-12 text-center">
                  <Palette className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No design requests yet</p>
                  <p className="text-sm text-gray-500 mt-1">Submit your first request to get started</p>
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className="mt-4 bg-[#C4D600] text-black hover:bg-[#d4e600]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="designs" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.status === "completed")
                .map((project) => (
                  <Card key={project.id} className="bg-[#141414] border-white/10 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center relative group">
                      <Palette className="h-12 w-12 text-gray-600" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="sm" className="bg-[#C4D600] text-black">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white bg-transparent">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-white font-medium">{project.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {project.platform_templates?.platform} • {project.platform_templates?.width}x
                        {project.platform_templates?.height}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Completed: {format(new Date(project.updated_at), "MMM d, yyyy")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {projects.filter((p) => p.status === "completed").length === 0 && (
              <Card className="bg-[#141414] border-white/10 border-dashed">
                <CardContent className="py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No completed designs yet</p>
                  <p className="text-sm text-gray-500 mt-1">Your completed designs will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
