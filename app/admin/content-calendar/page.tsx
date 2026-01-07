"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Upload, ImageIcon, Video, FileText, Clock } from "lucide-react"
import { toast } from "sonner"
import * as XLSX from "xlsx"

export default function ContentCalendarPage() {
  const [content, setContent] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [socialAccounts, setSocialAccounts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showContentDialog, setShowContentDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedClient, setSelectedClient] = useState<string>("all")
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchData()
  }, [currentDate, selectedClient])

  const fetchData = async () => {
    setLoading(true)
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    let contentQuery = supabase
      .from("content_calendar")
      .select("*, clients(*), social_accounts(*)")
      .gte("scheduled_date", startOfMonth.toISOString().split("T")[0])
      .lte("scheduled_date", endOfMonth.toISOString().split("T")[0])
      .order("scheduled_date")

    if (selectedClient !== "all") {
      contentQuery = contentQuery.eq("client_id", selectedClient)
    }

    const [contentRes, clientsRes, accountsRes, categoriesRes] = await Promise.all([
      contentQuery,
      supabase.from("clients").select("*").eq("is_active", true),
      supabase.from("social_accounts").select("*"),
      supabase.from("content_categories").select("*"),
    ])

    if (contentRes.data) setContent(contentRes.data)
    if (clientsRes.data) setClients(clientsRes.data)
    if (accountsRes.data) setSocialAccounts(accountsRes.data)
    if (categoriesRes.data) setCategories(categoriesRes.data)
    setLoading(false)
  }

  const handleCreateContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const contentData = {
      client_id: formData.get("client_id") as string,
      social_account_id: (formData.get("social_account_id") as string) || null,
      title: formData.get("title") as string,
      content_type: formData.get("content_type") as string,
      caption: formData.get("caption") as string,
      scheduled_date: formData.get("scheduled_date") as string,
      scheduled_time: (formData.get("scheduled_time") as string) || null,
      status: "draft",
      notes: formData.get("notes") as string,
    }

    const { error } = await supabase.from("content_calendar").insert(contentData)
    if (error) {
      toast.error("Failed to create content")
      return
    }

    toast.success("Content created successfully")
    setShowContentDialog(false)
    fetchData()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const workbook = XLSX.read(event.target?.result, { type: "binary" })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet)

        // Expected columns: title, content_type, caption, scheduled_date, scheduled_time, notes
        const contentItems = data
          .map((row: any) => ({
            client_id: selectedClient,
            title: row.title || row.Title,
            content_type: (row.content_type || row["Content Type"] || "post").toLowerCase(),
            caption: row.caption || row.Caption || "",
            scheduled_date: row.scheduled_date || row["Scheduled Date"],
            scheduled_time: row.scheduled_time || row["Scheduled Time"] || null,
            status: "draft",
            notes: row.notes || row.Notes || "",
          }))
          .filter((item: any) => item.title && item.scheduled_date)

        if (contentItems.length === 0) {
          toast.error("No valid content found in the file")
          return
        }

        const { error } = await supabase.from("content_calendar").insert(contentItems)
        if (error) {
          toast.error("Failed to import content")
          return
        }

        toast.success(`Successfully imported ${contentItems.length} content items`)
        setShowUploadDialog(false)
        fetchData()
      } catch (err) {
        toast.error("Failed to parse Excel file")
      }
    }
    reader.readAsBinaryString(file)
  }

  const handleStatusChange = async (contentId: string, newStatus: string) => {
    const { error } = await supabase
      .from("content_calendar")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", contentId)

    if (error) {
      toast.error("Failed to update status")
      return
    }

    toast.success("Status updated")
    fetchData()
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    return { daysInMonth, startingDay }
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate)
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const getContentForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return content.filter((c) => c.scheduled_date === dateStr)
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "post":
        return <ImageIcon className="h-3 w-3" />
      case "reel":
      case "video":
        return <Video className="h-3 w-3" />
      case "story":
        return <Clock className="h-3 w-3" />
      case "carousel":
        return <FileText className="h-3 w-3" />
      default:
        return <FileText className="h-3 w-3" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-zinc-500/20 text-zinc-400"
      case "scheduled":
        return "bg-blue-500/20 text-blue-400"
      case "pending_approval":
        return "bg-yellow-500/20 text-yellow-400"
      case "approved":
        return "bg-green-500/20 text-green-400"
      case "published":
        return "bg-[#C4D600]/20 text-[#C4D600]"
      case "failed":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-zinc-500/20 text-zinc-400"
    }
  }

  const filteredAccounts =
    selectedClient !== "all" ? socialAccounts.filter((a) => a.client_id === selectedClient) : socialAccounts

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Content Calendar</h1>
            <p className="text-zinc-400">Plan and schedule social media content</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-zinc-700 text-zinc-300 bg-transparent">
                  <Upload className="h-4 w-4 mr-2" /> Import Excel
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Import Content from Excel</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    Upload an Excel file with columns: title, content_type, caption, scheduled_date, scheduled_time,
                    notes
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Select Client</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="all">All Clients</SelectItem>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-zinc-500 mx-auto mb-2" />
                    <p className="text-zinc-400 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-zinc-500">Excel files (.xlsx, .xls)</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      className="mt-4 bg-[#C4D600] text-black hover:bg-[#a8b800]"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={selectedClient === "all"}
                    >
                      Select File
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                  <Plus className="h-4 w-4 mr-2" /> Add Content
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800 max-w-xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Create Content</DialogTitle>
                  <DialogDescription className="text-zinc-400">Schedule new social media content</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateContent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Client</Label>
                      <Select name="client_id" required>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Content Type</Label>
                      <Select name="content_type" required>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="post">Post</SelectItem>
                          <SelectItem value="reel">Reel</SelectItem>
                          <SelectItem value="story">Story</SelectItem>
                          <SelectItem value="carousel">Carousel</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Title</Label>
                    <Input name="title" required className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Caption</Label>
                    <Textarea name="caption" rows={3} className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Scheduled Date</Label>
                      <Input
                        name="scheduled_date"
                        type="date"
                        required
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Scheduled Time</Label>
                      <Input name="scheduled_time" type="time" className="bg-zinc-800 border-zinc-700 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Notes</Label>
                    <Textarea name="notes" rows={2} className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowContentDialog(false)}
                      className="border-zinc-700 text-zinc-300"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                      Create Content
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[200px] bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              <SelectItem value="all">All Clients</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Calendar Navigation */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                className="text-zinc-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-semibold text-white">{monthName}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                className="text-zinc-400"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-zinc-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the first of the month */}
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[100px] bg-zinc-800/30 rounded-lg" />
              ))}
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayContent = getContentForDay(day)
                const isToday =
                  new Date().toDateString() ===
                  new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

                return (
                  <div
                    key={day}
                    className={`min-h-[100px] p-2 rounded-lg border ${isToday ? "border-[#C4D600] bg-[#C4D600]/10" : "border-zinc-800 bg-zinc-800/50"} hover:bg-zinc-800 transition-colors`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? "text-[#C4D600]" : "text-zinc-400"}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayContent.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="text-xs p-1 rounded bg-zinc-700/50 cursor-pointer hover:bg-zinc-700 flex items-center gap-1 truncate"
                          onClick={() => setSelectedContent(item)}
                        >
                          {getContentTypeIcon(item.content_type)}
                          <span className="truncate text-zinc-300">{item.title}</span>
                        </div>
                      ))}
                      {dayContent.length > 3 && (
                        <div className="text-xs text-zinc-500 text-center">+{dayContent.length - 3} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Content Detail Dialog */}
        <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                {selectedContent && getContentTypeIcon(selectedContent.content_type)}
                {selectedContent?.title}
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                {selectedContent?.clients?.name} - {selectedContent?.scheduled_date}
              </DialogDescription>
            </DialogHeader>
            {selectedContent && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(selectedContent.status)}>{selectedContent.status}</Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    {selectedContent.content_type}
                  </Badge>
                </div>
                {selectedContent.caption && (
                  <div>
                    <Label className="text-zinc-400 text-xs">Caption</Label>
                    <p className="text-zinc-300 text-sm mt-1">{selectedContent.caption}</p>
                  </div>
                )}
                {selectedContent.notes && (
                  <div>
                    <Label className="text-zinc-400 text-xs">Notes</Label>
                    <p className="text-zinc-300 text-sm mt-1">{selectedContent.notes}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <Select
                    value={selectedContent.status}
                    onValueChange={(value) => {
                      handleStatusChange(selectedContent.id, value)
                      setSelectedContent({ ...selectedContent, status: value })
                    }}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="pending_approval">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
