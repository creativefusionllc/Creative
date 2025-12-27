"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { ClientLayout } from "@/components/client/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ImageIcon,
  Video,
  FileText,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ClientSocialMediaPage() {
  const [subscription, setSubscription] = useState<any>(null)
  const [socialAccounts, setSocialAccounts] = useState<any[]>([])
  const [content, setContent] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [clientId, setClientId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchClientData()
  }, [])

  useEffect(() => {
    if (clientId) {
      fetchContent()
    }
  }, [clientId, currentDate])

  const fetchClientData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data: client } = await supabase.from("clients").select("id").eq("user_id", user.id).single()
    if (!client) return

    setClientId(client.id)

    const [subscriptionRes, accountsRes, packagesRes] = await Promise.all([
      supabase
        .from("smm_subscriptions")
        .select("*, smm_packages(*)")
        .eq("client_id", client.id)
        .eq("status", "active")
        .single(),
      supabase.from("social_accounts").select("*").eq("client_id", client.id),
      supabase.from("smm_packages").select("*").eq("is_active", true).order("price"),
    ])

    if (subscriptionRes.data) setSubscription(subscriptionRes.data)
    if (accountsRes.data) setSocialAccounts(accountsRes.data)
    if (packagesRes.data) setPackages(packagesRes.data)
    setLoading(false)
  }

  const fetchContent = async () => {
    if (!clientId) return

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const { data } = await supabase
      .from("content_calendar")
      .select("*, social_accounts(*)")
      .eq("client_id", clientId)
      .gte("scheduled_date", startOfMonth.toISOString().split("T")[0])
      .lte("scheduled_date", endOfMonth.toISOString().split("T")[0])
      .order("scheduled_date")

    if (data) setContent(data)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />
      case "twitter":
        return <Twitter className="h-4 w-4 text-sky-500" />
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-700" />
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-600" />
      case "tiktok":
        return <Video className="h-4 w-4" />
      default:
        return <ImageIcon className="h-4 w-4" />
    }
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
      default:
        return "bg-zinc-500/20 text-zinc-400"
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    return { daysInMonth: lastDay.getDate(), startingDay: firstDay.getDay() }
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate)
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const getContentForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return content.filter((c) => c.scheduled_date === dateStr)
  }

  const pkg = subscription?.smm_packages

  return (
    <ClientLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Social Media</h1>
          <p className="text-zinc-400">View your subscription and content calendar</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-[#141414] border border-white/10">
            <TabsTrigger
              value="overview"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="accounts"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              Accounts
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              Packages
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {subscription ? (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Current Subscription</CardTitle>
                      <CardDescription className="text-zinc-400">{pkg?.name} Package</CardDescription>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Posts Used</span>
                        <span className="text-white">
                          {subscription.posts_used}/{pkg?.posts_per_month}
                        </span>
                      </div>
                      <Progress value={(subscription.posts_used / pkg?.posts_per_month) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Reels Used</span>
                        <span className="text-white">
                          {subscription.reels_used}/{pkg?.reels_per_month}
                        </span>
                      </div>
                      <Progress value={(subscription.reels_used / pkg?.reels_per_month) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Stories Used</span>
                        <span className="text-white">
                          {subscription.stories_used}/{pkg?.stories_per_month}
                        </span>
                      </div>
                      <Progress value={(subscription.stories_used / pkg?.stories_per_month) * 100} className="h-2" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <span>
                      Period: {new Date(subscription.start_date).toLocaleDateString()} -{" "}
                      {subscription.end_date ? new Date(subscription.end_date).toLocaleDateString() : "Ongoing"}
                    </span>
                    {subscription.auto_renew && (
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        Auto-Renew
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Active Subscription</h3>
                  <p className="text-zinc-400">Contact us to subscribe to a social media management package</p>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Content */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Content</CardTitle>
                <CardDescription className="text-zinc-400">Your scheduled posts for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {content
                    .filter((c) => c.status !== "published")
                    .slice(0, 5)
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded bg-zinc-700">{getContentTypeIcon(item.content_type)}</div>
                          <div>
                            <p className="text-white font-medium">{item.title}</p>
                            <p className="text-xs text-zinc-400">
                              {new Date(item.scheduled_date).toLocaleDateString()} {item.scheduled_time}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </div>
                    ))}
                  {content.length === 0 && <p className="text-center text-zinc-500 py-4">No content scheduled</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
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
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-zinc-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startingDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="min-h-[80px] bg-zinc-800/30 rounded-lg" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dayContent = getContentForDay(day)
                    const isToday =
                      new Date().toDateString() ===
                      new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

                    return (
                      <div
                        key={day}
                        className={`min-h-[80px] p-2 rounded-lg border ${isToday ? "border-[#C4D600] bg-[#C4D600]/10" : "border-zinc-800 bg-zinc-800/50"}`}
                      >
                        <div className={`text-sm font-medium mb-1 ${isToday ? "text-[#C4D600]" : "text-zinc-400"}`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayContent.slice(0, 2).map((item) => (
                            <div
                              key={item.id}
                              className="text-xs p-1 rounded bg-zinc-700/50 flex items-center gap-1 truncate"
                            >
                              {getContentTypeIcon(item.content_type)}
                              <span className="truncate text-zinc-300">{item.title}</span>
                            </div>
                          ))}
                          {dayContent.length > 2 && (
                            <div className="text-xs text-zinc-500 text-center">+{dayContent.length - 2}</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialAccounts.map((account) => (
                <Card key={account.id} className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-zinc-800">{getPlatformIcon(account.platform)}</div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{account.account_name}</p>
                        <p className="text-sm text-zinc-400">{account.account_handle}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                            {account.followers_count.toLocaleString()} followers
                          </Badge>
                          <Badge
                            className={
                              account.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }
                          >
                            {account.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {socialAccounts.length === 0 && (
                <Card className="bg-zinc-900 border-zinc-800 col-span-full">
                  <CardContent className="p-8 text-center text-zinc-500">
                    No social accounts linked yet. Contact support to connect your accounts.
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map((pkg) => {
                const isCurrentPlan = subscription?.package_id === pkg.id
                return (
                  <Card
                    key={pkg.id}
                    className={`bg-zinc-900 border-zinc-800 relative overflow-hidden ${isCurrentPlan ? "ring-2 ring-[#C4D600]" : ""}`}
                  >
                    {isCurrentPlan && (
                      <div className="absolute top-0 right-0 bg-[#C4D600] text-black text-xs px-2 py-1 rounded-bl">
                        Current Plan
                      </div>
                    )}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#C4D600]" />
                    <CardHeader>
                      <CardTitle className="text-white">{pkg.name}</CardTitle>
                      <CardDescription className="text-zinc-400">{pkg.description}</CardDescription>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-white">AED {pkg.price}</span>
                        <span className="text-zinc-400">
                          /{pkg.billing_cycle === "monthly" ? "mo" : pkg.billing_cycle}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <CheckCircle className="h-4 w-4 text-[#C4D600]" /> {pkg.posts_per_month} Posts/month
                      </div>
                      <div className="flex items-center gap-2 text-zinc-300">
                        <CheckCircle className="h-4 w-4 text-[#C4D600]" /> {pkg.reels_per_month} Reels/month
                      </div>
                      <div className="flex items-center gap-2 text-zinc-300">
                        <CheckCircle className="h-4 w-4 text-[#C4D600]" /> {pkg.stories_per_month} Stories/month
                      </div>
                      <div className="flex items-center gap-2 text-zinc-300">
                        <CheckCircle className="h-4 w-4 text-[#C4D600]" /> {pkg.platforms_allowed} Platforms
                      </div>
                      {pkg.includes_design && (
                        <div className="flex items-center gap-2 text-zinc-300">
                          <CheckCircle className="h-4 w-4 text-[#C4D600]" /> Graphic Design
                        </div>
                      )}
                      {pkg.includes_shooting && (
                        <div className="flex items-center gap-2 text-zinc-300">
                          <CheckCircle className="h-4 w-4 text-[#C4D600]" /> Video Shooting
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}
