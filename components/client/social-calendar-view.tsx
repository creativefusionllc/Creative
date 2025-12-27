"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Video,
  FileText,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  TrendingUp,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import { PageNavigation } from "@/components/ui/page-navigation"

interface CalendarItem {
  id: string
  title: string
  caption: string | null
  scheduled_date: string
  scheduled_time: string | null
  platform: string
  content_type: string
  status: string
  hashtags: string[]
  media_urls: string[]
  engagement_likes: number
  engagement_comments: number
  engagement_shares: number
  engagement_views: number
  published_at: string | null
}

interface SocialCalendarViewProps {
  items: CalendarItem[]
}

// Platform configurations
const platforms = [
  { id: "instagram", name: "Instagram", color: "#E4405F" },
  { id: "facebook", name: "Facebook", color: "#1877F2" },
  { id: "linkedin", name: "LinkedIn", color: "#0A66C2" },
  { id: "twitter", name: "Twitter/X", color: "#000000" },
  { id: "youtube", name: "YouTube", color: "#FF0000" },
  { id: "tiktok", name: "TikTok", color: "#000000" },
]

const statusColors: Record<string, string> = {
  approved: "bg-green-100 text-green-600 border-green-200",
  scheduled: "bg-blue-100 text-blue-600 border-blue-200",
  published: "bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30",
  pending_approval: "bg-yellow-100 text-yellow-600 border-yellow-200",
}

// Platform Icon Component
function PlatformIcon({ platform, className = "h-4 w-4" }: { platform: string; className?: string }) {
  const platformConfig = platforms.find((p) => p.id === platform)

  switch (platform) {
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: platformConfig?.color }}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.204.013-3.663.072-4.948.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    case "facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: platformConfig?.color }}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: platformConfig?.color }}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case "twitter":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: platformConfig?.color }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case "youtube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: platformConfig?.color }}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    case "tiktok":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: platformConfig?.color }}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      )
    default:
      return <Share2 className={className} />
  }
}

const contentTypeIcons: Record<string, React.ReactNode> = {
  image: <ImageIcon className="h-4 w-4" />,
  post: <ImageIcon className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  reel: <Video className="h-4 w-4" />,
  story: <Clock className="h-4 w-4" />,
  text: <FileText className="h-4 w-4" />,
  carousel: <ImageIcon className="h-4 w-4" />,
}

export function SocialCalendarView({ items: initialItems }: SocialCalendarViewProps) {
  const [items, setItems] = useState<CalendarItem[]>(initialItems)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [loading, setLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState<CalendarItem | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  // Fetch items when month changes
  useEffect(() => {
    fetchItems()
  }, [currentMonth])

  async function fetchItems() {
    setLoading(true)
    try {
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString()
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString()

      const { data } = await supabase
        .from("social_calendar")
        .select("*")
        .gte("scheduled_date", startOfMonth.split("T")[0])
        .lte("scheduled_date", endOfMonth.split("T")[0])
        .in("status", ["approved", "scheduled", "published"])
        .order("scheduled_date", { ascending: true })

      if (data) setItems(data)
    } catch (error) {
      console.error("Error fetching items:", error)
    }
    setLoading(false)
  }

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  const getItemsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return items.filter((item) => item.scheduled_date === dateStr)
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const upcomingItems = items.filter((item) => new Date(item.scheduled_date) >= new Date(new Date().toDateString()))

  // Stats
  const totalEngagement = items.reduce(
    (sum, item) =>
      sum +
      (item.engagement_likes || 0) +
      (item.engagement_comments || 0) +
      (item.engagement_shares || 0) +
      (item.engagement_views || 0),
    0,
  )

  const publishedCount = items.filter((item) => item.status === "published").length
  const scheduledCount = items.filter((item) => item.status === "scheduled" || item.status === "approved").length

  return (
    <div className="p-6 lg:p-8">
      {/* Navigation */}
      <PageNavigation showBack={true} backLabel="Dashboard" backHref="/client/dashboard" className="mb-4" />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Social Media Calendar</h1>
        <p className="text-gray-600">View your scheduled and published social media content.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-900">{scheduledCount}</p>
            <p className="text-xs text-blue-600">Scheduled</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-900">{publishedCount}</p>
            <p className="text-xs text-green-600">Published</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-pink-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-pink-900">{totalEngagement}</p>
            <p className="text-xs text-pink-600">Engagements</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-900">{items.length}</p>
            <p className="text-xs text-purple-600">Total Posts</p>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("calendar")}
            className={view === "calendar" ? "bg-[#C4D600] text-black hover:bg-[#a8b800]" : ""}
          >
            Calendar View
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
            className={view === "list" ? "bg-[#C4D600] text-black hover:bg-[#a8b800]" : ""}
          >
            List View
          </Button>
        </div>
        {loading && <Loader2 className="h-5 w-5 animate-spin text-[#C4D600]" />}
      </div>

      {view === "calendar" ? (
        <div className="bg-white rounded-xl shadow-sm border">
          {/* Calendar Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="font-bold text-lg">{monthName}</h2>
            <Button variant="ghost" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayItems = getItemsForDate(day)
                const isToday =
                  new Date().getDate() === day &&
                  new Date().getMonth() === currentMonth.getMonth() &&
                  new Date().getFullYear() === currentMonth.getFullYear()

                return (
                  <div
                    key={day}
                    className={`min-h-[80px] p-1 rounded-lg border ${
                      isToday ? "border-[#C4D600] bg-[#C4D600]/10" : "border-gray-100"
                    }`}
                  >
                    <div className={`text-xs font-medium mb-1 ${isToday ? "text-[#C4D600]" : "text-gray-700"}`}>
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {dayItems.slice(0, 2).map((item) => {
                        const platformConfig = platforms.find((p) => p.id === item.platform)
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedPost(item)}
                            className="text-[10px] px-1.5 py-0.5 rounded cursor-pointer truncate flex items-center gap-1"
                            style={{ backgroundColor: `${platformConfig?.color}15`, color: platformConfig?.color }}
                            title={item.title}
                          >
                            <PlatformIcon platform={item.platform} className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{item.title.substring(0, 10)}...</span>
                          </div>
                        )
                      })}
                      {dayItems.length > 2 && (
                        <div className="text-[10px] text-gray-500 text-center">+{dayItems.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="font-bold text-gray-900">Upcoming & Published Posts</h2>
          </div>

          {items.length > 0 ? (
            <div className="divide-y">
              {items.map((item) => {
                const platformConfig = platforms.find((p) => p.id === item.platform)
                return (
                  <div
                    key={item.id}
                    className="p-4 flex items-start gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedPost(item)}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${platformConfig?.color}15` }}
                    >
                      <PlatformIcon platform={item.platform} className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                        <Badge variant="outline" className={statusColors[item.status] || "border-gray-300"}>
                          {item.status}
                        </Badge>
                      </div>
                      {item.caption && <p className="text-sm text-gray-500 line-clamp-2 mb-2">{item.caption}</p>}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          {contentTypeIcons[item.content_type]}
                          {item.content_type}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(item.scheduled_date).toLocaleDateString()}
                          {item.scheduled_time && ` at ${item.scheduled_time}`}
                        </span>
                      </div>
                      {/* Engagement stats for published posts */}
                      {item.status === "published" && (
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-pink-500" />
                            {item.engagement_likes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3 text-blue-500" />
                            {item.engagement_comments || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-3 w-3 text-green-500" />
                            {item.engagement_shares || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3 text-purple-500" />
                            {item.engagement_views || 0}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <CalendarDays className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No posts scheduled for this month</p>
            </div>
          )}
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${platforms.find((p) => p.id === selectedPost.platform)?.color}15` }}
                >
                  <PlatformIcon platform={selectedPost.platform} className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedPost.title}</h3>
                  <p className="text-xs text-gray-500">
                    {platforms.find((p) => p.id === selectedPost.platform)?.name} • {selectedPost.content_type}
                  </p>
                </div>
              </div>

              {selectedPost.caption && (
                <div className="mb-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedPost.caption}</p>
                </div>
              )}

              {selectedPost.hashtags && selectedPost.hashtags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1">
                  {selectedPost.hashtags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-gray-200 text-gray-500">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>
                  {new Date(selectedPost.scheduled_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <Badge variant="outline" className={statusColors[selectedPost.status]}>
                  {selectedPost.status}
                </Badge>
              </div>

              {selectedPost.status === "published" && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Engagement Stats</p>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <Heart className="h-5 w-5 text-pink-500 mx-auto mb-1" />
                      <p className="font-semibold text-gray-900">{selectedPost.engagement_likes || 0}</p>
                      <p className="text-xs text-gray-500">Likes</p>
                    </div>
                    <div>
                      <MessageCircle className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                      <p className="font-semibold text-gray-900">{selectedPost.engagement_comments || 0}</p>
                      <p className="text-xs text-gray-500">Comments</p>
                    </div>
                    <div>
                      <Share2 className="h-5 w-5 text-green-500 mx-auto mb-1" />
                      <p className="font-semibold text-gray-900">{selectedPost.engagement_shares || 0}</p>
                      <p className="text-xs text-gray-500">Shares</p>
                    </div>
                    <div>
                      <Eye className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                      <p className="font-semibold text-gray-900">{selectedPost.engagement_views || 0}</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={() => setSelectedPost(null)} className="w-full mt-4 bg-[#C4D600] text-black">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
