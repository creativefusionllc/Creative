"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  Edit,
  Trash2,
  ImageIcon,
  Video,
  Package,
  Users,
  Upload,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BarChart3,
  TrendingUp,
  Share2,
  ExternalLink,
  Loader2,
  AlertCircle,
  Zap,
  Plug,
  RefreshCw,
  LinkIcon,
  Building2,
  Filter,
} from "lucide-react"
import { toast } from "sonner"
import * as XLSX from "xlsx"

interface SMMPackage {
  id: string
  name: string
  description: string
  price: number
  billing_cycle: string
  posts_per_month: number
  reels_per_month: number
  stories_per_month: number
  platforms_allowed: number
  includes_design: boolean
  includes_shooting: boolean
  features: string[]
  is_active: boolean
}

interface SMMSubscription {
  id: string
  client_id: string
  package_id: string
  status: string
  start_date: string
  end_date: string | null
  auto_renew: boolean
  posts_used: number
  reels_used: number
  stories_used: number
  clients?: { name: string; client_number: string }
  smm_packages?: SMMPackage
}

interface SocialAccount {
  id: string
  client_id: string
  platform: string
  account_name: string
  account_handle: string
  profile_url: string
  followers_count: number
  following_count: number
  posts_count: number
  engagement_rate: number
  bio: string
  api_connected: boolean
  is_active: boolean
  clients?: { name: string; client_number: string }
}

interface ContentItem {
  id: string
  client_id: string
  social_account_id: string
  title: string
  content_type: string
  caption: string
  hashtags: string[]
  media_urls: string[]
  scheduled_date: string
  scheduled_time: string
  status: string
  clients?: { name: string }
  social_accounts?: { platform: string; account_name: string }
  engagement_views?: number
  engagement_likes?: number
  engagement_comments?: number
  engagement_shares?: number
}

interface Client {
  id: string
  name: string
  client_number: string
}

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  ),
}

const platformColors: Record<string, string> = {
  instagram: "#E4405F",
  facebook: "#1877F2",
  twitter: "#000000",
  linkedin: "#0A66C2",
  youtube: "#FF0000",
  tiktok: "#000000",
}

export function SocialMediaManagement() {
  const [packages, setPackages] = useState<SMMPackage[]>([])
  const [subscriptions, setSubscriptions] = useState<SMMSubscription[]>([])
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([])
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("calendar")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showPackageDialog, setShowPackageDialog] = useState(false)
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false)
  const [showAccountDialog, setShowAccountDialog] = useState(false)
  const [showContentDialog, setShowContentDialog] = useState(false)
  const [editingPackage, setEditingPackage] = useState<SMMPackage | null>(null)
  const [connectingAccount, setConnectingAccount] = useState<string | null>(null)
  const [syncingAnalytics, setSyncingAnalytics] = useState<string | null>(null)
  const [selectedClientId, setSelectedClientId] = useState<string>("all")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  // Form states
  const [packageForm, setPackageForm] = useState({
    name: "",
    description: "",
    price: 0,
    billing_cycle: "monthly",
    posts_per_month: 0,
    reels_per_month: 0,
    stories_per_month: 0,
    platforms_allowed: 1,
    includes_design: false,
    includes_shooting: false,
    features: "",
  })

  const [subscriptionForm, setSubscriptionForm] = useState({
    client_id: "",
    package_id: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: "",
    auto_renew: true,
  })

  const [accountForm, setAccountForm] = useState({
    client_id: "",
    platform: "instagram",
    account_name: "",
    account_handle: "",
    profile_url: "",
    followers_count: 0,
    following_count: 0,
    posts_count: 0,
    bio: "",
  })

  const [contentForm, setContentForm] = useState({
    client_id: "",
    social_account_id: "",
    title: "",
    content_type: "post",
    caption: "",
    hashtags: "",
    scheduled_date: new Date().toISOString().split("T")[0],
    scheduled_time: "10:00",
    status: "draft",
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const [packagesRes, subscriptionsRes, accountsRes, contentRes, clientsRes] = await Promise.all([
        supabase.from("smm_packages").select("*").order("price"),
        supabase.from("smm_subscriptions").select("*, clients(name, client_number), smm_packages(*)"),
        supabase.from("social_accounts").select("*, clients(name, client_number)"),
        supabase.from("content_calendar").select("*, clients(name), social_accounts(platform, account_name)"),
        supabase.from("clients").select("id, name, client_number").order("name"),
      ])

      if (packagesRes.data) setPackages(packagesRes.data)
      if (subscriptionsRes.data) setSubscriptions(subscriptionsRes.data)
      if (accountsRes.data) setSocialAccounts(accountsRes.data)
      if (contentRes.data) setContentItems(contentRes.data)
      if (clientsRes.data) setClients(clientsRes.data)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load data")
    }
    setLoading(false)
  }

  // Connect social account via OAuth
  async function connectAccount(accountId: string, platform: string) {
    setConnectingAccount(accountId)
    try {
      const account = socialAccounts.find((a) => a.id === accountId)
      if (!account) return

      const response = await fetch(
        `/api/social/auth/${platform}?client_id=${account.client_id}&account_id=${accountId}`,
      )
      const data = await response.json()

      if (data.setup_required) {
        toast.error(`${platform} API not configured. Go to API Setup to configure.`)
        return
      }

      if (data.auth_url) {
        window.location.href = data.auth_url
      } else {
        toast.error(data.error || "Failed to get auth URL")
      }
    } catch (error) {
      console.error("Connect error:", error)
      toast.error("Failed to connect account")
    }
    setConnectingAccount(null)
  }

  // Sync analytics for account
  async function syncAnalytics(accountId: string) {
    setSyncingAnalytics(accountId)
    try {
      const response = await fetch(`/api/social/analytics/${accountId}`)
      const data = await response.json()

      if (data.manual_entry_required) {
        toast.info("Account not connected via API. Please enter analytics manually or connect the account.")
      } else if (data.success) {
        toast.success("Analytics synced successfully!")
        fetchData() // Refresh data
      } else {
        toast.error(data.error || "Failed to sync analytics")
      }
    } catch (error) {
      console.error("Sync error:", error)
      toast.error("Failed to sync analytics")
    }
    setSyncingAnalytics(null)
  }

  // Publish content
  async function publishContent(contentId: string) {
    const content = contentItems.find((c) => c.id === contentId)
    if (!content) return

    try {
      const response = await fetch("/api/social/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content_id: contentId,
          platform: content.social_accounts?.platform,
          account_id: content.social_account_id,
        }),
      })

      const data = await response.json()

      if (data.needs_oauth) {
        toast.error("Account not connected. Please connect the account via OAuth first.")
      } else if (data.success) {
        toast.success("Content published successfully!")
        fetchData()
      } else {
        toast.error(data.error || "Failed to publish")
      }
    } catch (error) {
      console.error("Publish error:", error)
      toast.error("Failed to publish content")
    }
  }

  async function savePackage() {
    try {
      const features = packageForm.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean)
      const data = {
        ...packageForm,
        features,
      }

      if (editingPackage) {
        await supabase.from("smm_packages").update(data).eq("id", editingPackage.id)
        toast.success("Package updated!")
      } else {
        await supabase.from("smm_packages").insert(data)
        toast.success("Package created!")
      }

      setShowPackageDialog(false)
      setEditingPackage(null)
      resetPackageForm()
      fetchData()
    } catch (error) {
      toast.error("Failed to save package")
    }
  }

  async function saveSubscription() {
    try {
      await supabase.from("smm_subscriptions").insert({
        ...subscriptionForm,
        end_date: subscriptionForm.end_date || null,
        status: "active",
      })
      toast.success("Subscription created!")
      setShowSubscriptionDialog(false)
      resetSubscriptionForm()
      fetchData()
    } catch (error) {
      toast.error("Failed to save subscription")
    }
  }

  async function saveAccount() {
    try {
      await supabase.from("social_accounts").insert({
        ...accountForm,
        is_active: true,
        api_connected: false,
      })
      toast.success("Account added!")
      setShowAccountDialog(false)
      resetAccountForm()
      fetchData()
    } catch (error) {
      toast.error("Failed to save account")
    }
  }

  async function saveContent() {
    try {
      const hashtags = contentForm.hashtags
        .split(",")
        .map((h) => h.trim().replace("#", ""))
        .filter(Boolean)
      await supabase.from("content_calendar").insert({
        ...contentForm,
        hashtags,
      })
      toast.success("Content scheduled!")
      setShowContentDialog(false)
      resetContentForm()
      fetchData()
    } catch (error) {
      toast.error("Failed to save content")
    }
  }

  async function deletePackage(id: string) {
    if (!confirm("Delete this package?")) return
    await supabase.from("smm_packages").delete().eq("id", id)
    toast.success("Package deleted!")
    fetchData()
  }

  async function deleteAccount(id: string) {
    if (!confirm("Delete this account?")) return
    await supabase.from("social_accounts").delete().eq("id", id)
    toast.success("Account deleted!")
    fetchData()
  }

  async function deleteContent(id: string) {
    if (!confirm("Delete this content?")) return
    await supabase.from("content_calendar").delete().eq("id", id)
    toast.success("Content deleted!")
    fetchData()
  }

  async function updateContentStatus(id: string, status: string) {
    await supabase.from("content_calendar").update({ status }).eq("id", id)
    toast.success("Status updated!")
    fetchData()
  }

  function resetPackageForm() {
    setPackageForm({
      name: "",
      description: "",
      price: 0,
      billing_cycle: "monthly",
      posts_per_month: 0,
      reels_per_month: 0,
      stories_per_month: 0,
      platforms_allowed: 1,
      includes_design: false,
      includes_shooting: false,
      features: "",
    })
  }

  function resetSubscriptionForm() {
    setSubscriptionForm({
      client_id: "",
      package_id: "",
      start_date: new Date().toISOString().split("T")[0],
      end_date: "",
      auto_renew: true,
    })
  }

  function resetAccountForm() {
    setAccountForm({
      client_id: "",
      platform: "instagram",
      account_name: "",
      account_handle: "",
      profile_url: "",
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      bio: "",
    })
  }

  function resetContentForm() {
    setContentForm({
      client_id: "",
      social_account_id: "",
      title: "",
      content_type: "post",
      caption: "",
      hashtags: "",
      scheduled_date: new Date().toISOString().split("T")[0],
      scheduled_time: "10:00",
      status: "draft",
    })
  }

  // Excel import handler
  function handleExcelImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(sheet)

        let imported = 0
        for (const row of jsonData as Record<string, string>[]) {
          if (row.title && row.scheduled_date) {
            const hashtags = row.hashtags
              ? row.hashtags
                  .split(",")
                  .map((h: string) => h.trim().replace("#", ""))
                  .filter(Boolean)
              : []
            await supabase.from("content_calendar").insert({
              client_id: row.client_id || clients[0]?.id,
              title: row.title,
              content_type: row.content_type || "post",
              caption: row.caption || "",
              hashtags,
              scheduled_date: row.scheduled_date,
              scheduled_time: row.scheduled_time || "10:00",
              status: "draft",
            })
            imported++
          }
        }

        toast.success(`Imported ${imported} content items!`)
        fetchData()
      } catch (error) {
        toast.error("Failed to import Excel file")
      }
    }
    reader.readAsArrayBuffer(file)
    e.target.value = ""
  }

  // Calendar helpers
  function getDaysInMonth(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    const startPadding = firstDay.getDay()
    for (let i = startPadding - 1; i >= 0; i--) {
      const d = new Date(year, month, -i)
      days.push({ date: d, isCurrentMonth: false })
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }

    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
    }

    return days
  }

  const filteredSocialAccounts =
    selectedClientId === "all" ? socialAccounts : socialAccounts.filter((a) => a.client_id === selectedClientId)

  const filteredContentItems =
    selectedClientId === "all" ? contentItems : contentItems.filter((c) => c.client_id === selectedClientId)

  const filteredSubscriptions =
    selectedClientId === "all" ? subscriptions : subscriptions.filter((s) => s.client_id === selectedClientId)

  // Group accounts by client for overview
  const accountsByClient = socialAccounts.reduce(
    (acc, account) => {
      const clientName = account.clients?.name || "Unknown"
      if (!acc[clientName]) {
        acc[clientName] = []
      }
      acc[clientName].push(account)
      return acc
    },
    {} as Record<string, SocialAccount[]>,
  )

  function getContentForDate(date: Date) {
    const dateStr = date.toISOString().split("T")[0]
    return filteredContentItems.filter((c) => c.scheduled_date === dateStr)
  }

  const statusColors: Record<string, string> = {
    draft: "bg-zinc-600",
    scheduled: "bg-blue-600",
    pending_approval: "bg-yellow-600",
    approved: "bg-[#C4D600]",
    published: "bg-green-600",
    failed: "bg-red-600",
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  // Show alert if no clients
  if (clients.length === 0) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-12 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Clients Found</h3>
          <p className="text-zinc-400 mb-6">You need to add clients before managing their social media accounts.</p>
          <Button asChild className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
            <Link href="/admin/clients">
              <Users className="h-4 w-4 mr-2" />
              Go to Clients
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-[#C4D600]" />
              <div>
                <h3 className="text-white font-medium">Multi-Client Management</h3>
                <p className="text-zinc-400 text-sm">
                  {clients.length} client{clients.length !== 1 ? "s" : ""} • {socialAccounts.length} total accounts
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Filter className="h-4 w-4 text-zinc-400" />
              <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                <SelectTrigger className="w-full md:w-[280px] bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Filter by client" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="all" className="text-white hover:bg-zinc-700">
                    All Clients ({socialAccounts.length} accounts)
                  </SelectItem>
                  {clients.map((client) => {
                    const clientAccounts = socialAccounts.filter((a) => a.client_id === client.id)
                    return (
                      <SelectItem key={client.id} value={client.id} className="text-white hover:bg-zinc-700">
                        {client.name} ({clientAccounts.length} accounts)
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick client overview cards */}
          {selectedClientId === "all" && Object.keys(accountsByClient).length > 0 && (
            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(accountsByClient).map(([clientName, accounts]) => (
                <div
                  key={clientName}
                  className="p-3 bg-zinc-800 rounded-lg border border-zinc-700 cursor-pointer hover:border-[#C4D600] transition-colors"
                  onClick={() => {
                    const client = clients.find((c) => c.name === clientName)
                    if (client) setSelectedClientId(client.id)
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{clientName}</h4>
                    <Badge variant="outline" className="border-[#C4D600] text-[#C4D600] text-xs">
                      {accounts.length} accounts
                    </Badge>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {accounts.map((account) => {
                      const Icon = platformIcons[account.platform] || Share2
                      return (
                        <div
                          key={account.id}
                          className="p-1.5 bg-zinc-900 rounded"
                          style={{ color: platformColors[account.platform] }}
                          title={`${account.account_name} (@${account.account_handle})`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-2 text-xs text-zinc-400">
                    {accounts.reduce((sum, a) => sum + a.followers_count, 0).toLocaleString()} total followers
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Overview - Updated to use filtered data */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg">
                <Package className="h-5 w-5 text-[#C4D600]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{packages.filter((p) => p.is_active).length}</p>
                <p className="text-xs text-zinc-400">Active Packages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {filteredSubscriptions.filter((s) => s.status === "active").length}
                </p>
                <p className="text-xs text-zinc-400">Active Subscriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg">
                <Share2 className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{filteredSocialAccounts.length}</p>
                <p className="text-xs text-zinc-400">
                  {selectedClientId === "all" ? "Total Accounts" : "Client Accounts"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {filteredContentItems.filter((c) => c.status === "published").length}
                </p>
                <p className="text-xs text-zinc-400">Published Content</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Setup Banner */}
      <Card className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-zinc-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#C4D600]/10 rounded-lg">
                <Plug className="h-5 w-5 text-[#C4D600]" />
              </div>
              <div>
                <p className="text-white font-medium">Connect Social Media APIs</p>
                <p className="text-zinc-400 text-sm">Enable direct posting and analytics by connecting platform APIs</p>
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-[#C4D600] text-[#C4D600] hover:bg-[#C4D600]/10 bg-transparent"
            >
              <Link href="/admin/social-media/setup">
                <Zap className="h-4 w-4 mr-2" />
                Setup APIs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#141414] border border-white/10">
          <TabsTrigger
            value="calendar"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Content Calendar
          </TabsTrigger>
          <TabsTrigger
            value="accounts"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Social Accounts
          </TabsTrigger>
          <TabsTrigger
            value="packages"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Package className="h-4 w-4 mr-2" />
            Packages
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Users className="h-4 w-4 mr-2" />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Zap className="h-4 w-4 mr-2" />
            API Setup
          </TabsTrigger>
        </TabsList>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Content Calendar</CardTitle>
                <CardDescription className="text-zinc-400">
                  {selectedClientId === "all"
                    ? "Schedule and manage content for all clients"
                    : `Showing content for ${clients.find((c) => c.id === selectedClientId)?.name}`}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".xlsx,.xls"
                  onChange={handleExcelImport}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Excel
                </Button>
                <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Content
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Schedule Content</DialogTitle>
                      <DialogDescription className="text-zinc-400">Create new social media content</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-zinc-400">Client</Label>
                          <Select
                            value={contentForm.client_id}
                            onValueChange={(v) => {
                              setContentForm({ ...contentForm, client_id: v, social_account_id: "" })
                            }}
                          >
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                              <SelectValue placeholder="Select client" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              {clients.map((c) => (
                                <SelectItem key={c.id} value={c.id} className="text-white">
                                  {c.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-zinc-400">Account</Label>
                          <Select
                            value={contentForm.social_account_id}
                            onValueChange={(v) => setContentForm({ ...contentForm, social_account_id: v })}
                          >
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              {socialAccounts
                                .filter((a) => a.client_id === contentForm.client_id)
                                .map((a) => {
                                  const Icon = platformIcons[a.platform] || Share2
                                  return (
                                    <SelectItem key={a.id} value={a.id} className="text-white">
                                      <div className="flex items-center gap-2">
                                        <Icon className="h-4 w-4" />
                                        {a.account_name}
                                      </div>
                                    </SelectItem>
                                  )
                                })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-zinc-400">Title</Label>
                        <Input
                          value={contentForm.title}
                          onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-zinc-400">Content Type</Label>
                          <Select
                            value={contentForm.content_type}
                            onValueChange={(v) => setContentForm({ ...contentForm, content_type: v })}
                          >
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="post" className="text-white">
                                Post
                              </SelectItem>
                              <SelectItem value="reel" className="text-white">
                                Reel
                              </SelectItem>
                              <SelectItem value="story" className="text-white">
                                Story
                              </SelectItem>
                              <SelectItem value="carousel" className="text-white">
                                Carousel
                              </SelectItem>
                              <SelectItem value="video" className="text-white">
                                Video
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-zinc-400">Status</Label>
                          <Select
                            value={contentForm.status}
                            onValueChange={(v) => setContentForm({ ...contentForm, status: v })}
                          >
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="draft" className="text-white">
                                Draft
                              </SelectItem>
                              <SelectItem value="scheduled" className="text-white">
                                Scheduled
                              </SelectItem>
                              <SelectItem value="pending_approval" className="text-white">
                                Pending Approval
                              </SelectItem>
                              <SelectItem value="approved" className="text-white">
                                Approved
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-zinc-400">Caption</Label>
                        <Textarea
                          value={contentForm.caption}
                          onChange={(e) => setContentForm({ ...contentForm, caption: e.target.value })}
                          className="bg-zinc-800 border-zinc-700"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-400">Hashtags (comma separated)</Label>
                        <Input
                          value={contentForm.hashtags}
                          onChange={(e) => setContentForm({ ...contentForm, hashtags: e.target.value })}
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="#marketing, #socialmedia"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-zinc-400">Date</Label>
                          <Input
                            type="date"
                            value={contentForm.scheduled_date}
                            onChange={(e) => setContentForm({ ...contentForm, scheduled_date: e.target.value })}
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                        <div>
                          <Label className="text-zinc-400">Time</Label>
                          <Input
                            type="time"
                            value={contentForm.scheduled_time}
                            onChange={(e) => setContentForm({ ...contentForm, scheduled_time: e.target.value })}
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                      </div>
                      <Button onClick={saveContent} className="w-full bg-[#C4D600] text-black hover:bg-[#a8b800]">
                        Schedule Content
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Navigation */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold text-white">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center text-xs font-medium text-zinc-400">
                    {day}
                  </div>
                ))}
                {getDaysInMonth(currentMonth).map((day, idx) => {
                  const dayContent = getContentForDate(day.date)
                  return (
                    <div
                      key={idx}
                      className={`min-h-[80px] p-1 border border-zinc-800 rounded ${
                        day.isCurrentMonth ? "bg-zinc-900" : "bg-zinc-950"
                      }`}
                    >
                      <div className={`text-xs mb-1 ${day.isCurrentMonth ? "text-zinc-300" : "text-zinc-600"}`}>
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayContent.slice(0, 3).map((content) => {
                          const Icon =
                            content.content_type === "reel" || content.content_type === "video" ? Video : ImageIcon
                          return (
                            <div
                              key={content.id}
                              className={`text-[10px] px-1 py-0.5 rounded truncate ${statusColors[content.status]} text-white`}
                              title={`${content.title} - ${content.clients?.name || "Unknown"}`}
                            >
                              <Icon className="h-3 w-3 inline mr-1" />
                              {content.title}
                            </div>
                          )
                        })}
                        {dayContent.length > 3 && (
                          <div className="text-[10px] text-zinc-400">+{dayContent.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Content List */}
              <div className="mt-6">
                <h4 className="text-white font-medium mb-3">Scheduled Content ({filteredContentItems.length})</h4>
                <div className="space-y-2">
                  {filteredContentItems.slice(0, 10).map((content) => {
                    const Icon = platformIcons[content.social_accounts?.platform || ""] || Share2
                    return (
                      <div key={content.id} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded"
                            style={{ backgroundColor: platformColors[content.social_accounts?.platform || ""] + "20" }}
                          >
                            <Icon
                              className="h-4 w-4"
                              style={{ color: platformColors[content.social_accounts?.platform || ""] }}
                            />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{content.title}</p>
                            <p className="text-zinc-400 text-xs">
                              {content.clients?.name} • {content.social_accounts?.account_name} •{" "}
                              {content.scheduled_date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${statusColors[content.status]} text-white text-xs`}>
                            {content.status.replace("_", " ")}
                          </Badge>
                          {content.status === "approved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => publishContent(content.id)}
                              className="border-green-600 text-green-400 hover:bg-green-600/20"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Publish
                            </Button>
                          )}
                          <Select value={content.status} onValueChange={(v) => updateContentStatus(content.id, v)}>
                            <SelectTrigger className="w-[130px] h-8 bg-zinc-700 border-zinc-600 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="draft" className="text-white text-xs">
                                Draft
                              </SelectItem>
                              <SelectItem value="scheduled" className="text-white text-xs">
                                Scheduled
                              </SelectItem>
                              <SelectItem value="pending_approval" className="text-white text-xs">
                                Pending
                              </SelectItem>
                              <SelectItem value="approved" className="text-white text-xs">
                                Approved
                              </SelectItem>
                              <SelectItem value="published" className="text-white text-xs">
                                Published
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteContent(content.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Accounts Tab - Updated to use filtered accounts */}
        <TabsContent value="accounts">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Social Media Accounts</CardTitle>
                <CardDescription className="text-zinc-400">
                  {selectedClientId === "all"
                    ? `Manage accounts for all ${clients.length} clients`
                    : `Accounts for ${clients.find((c) => c.id === selectedClientId)?.name}`}
                </CardDescription>
              </div>
              <Dialog open={showAccountDialog} onOpenChange={setShowAccountDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Add Social Account</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                      Add a new social media account for a client
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="text-zinc-400">Client</Label>
                      <Select
                        value={accountForm.client_id}
                        onValueChange={(v) => setAccountForm({ ...accountForm, client_id: v })}
                      >
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {clients.map((c) => (
                            <SelectItem key={c.id} value={c.id} className="text-white">
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-zinc-400">Platform</Label>
                      <Select
                        value={accountForm.platform}
                        onValueChange={(v) => setAccountForm({ ...accountForm, platform: v })}
                      >
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="instagram" className="text-white">
                            Instagram
                          </SelectItem>
                          <SelectItem value="facebook" className="text-white">
                            Facebook
                          </SelectItem>
                          <SelectItem value="twitter" className="text-white">
                            Twitter/X
                          </SelectItem>
                          <SelectItem value="linkedin" className="text-white">
                            LinkedIn
                          </SelectItem>
                          <SelectItem value="youtube" className="text-white">
                            YouTube
                          </SelectItem>
                          <SelectItem value="tiktok" className="text-white">
                            TikTok
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-zinc-400">Account Name</Label>
                        <Input
                          value={accountForm.account_name}
                          onChange={(e) => setAccountForm({ ...accountForm, account_name: e.target.value })}
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="Creative Fusion"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-400">Handle</Label>
                        <Input
                          value={accountForm.account_handle}
                          onChange={(e) => setAccountForm({ ...accountForm, account_handle: e.target.value })}
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="@creativefusion"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-zinc-400">Profile URL</Label>
                      <Input
                        value={accountForm.profile_url}
                        onChange={(e) => setAccountForm({ ...accountForm, profile_url: e.target.value })}
                        className="bg-zinc-800 border-zinc-700"
                        placeholder="https://instagram.com/creativefusion"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-zinc-400">Followers</Label>
                        <Input
                          type="number"
                          value={accountForm.followers_count}
                          onChange={(e) =>
                            setAccountForm({ ...accountForm, followers_count: Number.parseInt(e.target.value) || 0 })
                          }
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-400">Following</Label>
                        <Input
                          type="number"
                          value={accountForm.following_count}
                          onChange={(e) =>
                            setAccountForm({ ...accountForm, following_count: Number.parseInt(e.target.value) || 0 })
                          }
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-400">Posts</Label>
                        <Input
                          type="number"
                          value={accountForm.posts_count}
                          onChange={(e) =>
                            setAccountForm({ ...accountForm, posts_count: Number.parseInt(e.target.value) || 0 })
                          }
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-zinc-400">Bio</Label>
                      <Textarea
                        value={accountForm.bio}
                        onChange={(e) => setAccountForm({ ...accountForm, bio: e.target.value })}
                        className="bg-zinc-800 border-zinc-700"
                        rows={2}
                      />
                    </div>
                    <Button onClick={saveAccount} className="w-full bg-[#C4D600] text-black hover:bg-[#a8b800]">
                      Add Account
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {selectedClientId === "all" ? (
                <div className="space-y-6">
                  {Object.entries(accountsByClient).map(([clientName, accounts]) => (
                    <div key={clientName}>
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-[#C4D600]" />
                        {clientName}
                        <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-xs ml-2">
                          {accounts.length} accounts
                        </Badge>
                      </h4>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {accounts.map((account) => {
                          const Icon = platformIcons[account.platform] || Share2
                          return (
                            <Card key={account.id} className="bg-zinc-800 border-zinc-700">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="p-2 rounded-lg"
                                      style={{ backgroundColor: platformColors[account.platform] + "20" }}
                                    >
                                      <Icon className="h-5 w-5" style={{ color: platformColors[account.platform] }} />
                                    </div>
                                    <div>
                                      <p className="text-white font-medium">{account.account_name}</p>
                                      <p className="text-zinc-400 text-sm">@{account.account_handle}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-1">
                                    {account.api_connected ? (
                                      <Badge className="bg-green-600 text-white text-xs">
                                        <Plug className="h-3 w-3 mr-1" />
                                        API
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-xs">
                                        Manual
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                                  <div className="p-2 bg-zinc-900 rounded">
                                    <p className="text-white font-semibold">
                                      {account.followers_count.toLocaleString()}
                                    </p>
                                    <p className="text-zinc-500 text-xs">Followers</p>
                                  </div>
                                  <div className="p-2 bg-zinc-900 rounded">
                                    <p className="text-white font-semibold">
                                      {account.following_count.toLocaleString()}
                                    </p>
                                    <p className="text-zinc-500 text-xs">Following</p>
                                  </div>
                                  <div className="p-2 bg-zinc-900 rounded">
                                    <p className="text-white font-semibold">{account.posts_count.toLocaleString()}</p>
                                    <p className="text-zinc-500 text-xs">Posts</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {!account.api_connected && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => connectAccount(account.id, account.platform)}
                                      disabled={connectingAccount === account.id}
                                      className="flex-1 border-[#C4D600] text-[#C4D600] hover:bg-[#C4D600]/20"
                                    >
                                      {connectingAccount === account.id ? (
                                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                      ) : (
                                        <LinkIcon className="h-3 w-3 mr-1" />
                                      )}
                                      Connect API
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => syncAnalytics(account.id)}
                                    disabled={syncingAnalytics === account.id}
                                    className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                                  >
                                    {syncingAnalytics === account.id ? (
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    ) : (
                                      <RefreshCw className="h-3 w-3 mr-1" />
                                    )}
                                    Sync
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteAccount(account.id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                  {Object.keys(accountsByClient).length === 0 && (
                    <div className="text-center py-12 text-zinc-400">
                      <Share2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No social accounts added yet</p>
                      <p className="text-sm">Click "Add Account" to get started</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSocialAccounts.map((account) => {
                    const Icon = platformIcons[account.platform] || Share2
                    return (
                      <Card key={account.id} className="bg-zinc-800 border-zinc-700">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: platformColors[account.platform] + "20" }}
                              >
                                <Icon className="h-5 w-5" style={{ color: platformColors[account.platform] }} />
                              </div>
                              <div>
                                <p className="text-white font-medium">{account.account_name}</p>
                                <p className="text-zinc-400 text-sm">@{account.account_handle}</p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {account.api_connected ? (
                                <Badge className="bg-green-600 text-white text-xs">
                                  <Plug className="h-3 w-3 mr-1" />
                                  API
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-xs">
                                  Manual
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                            <div className="p-2 bg-zinc-900 rounded">
                              <p className="text-white font-semibold">{account.followers_count.toLocaleString()}</p>
                              <p className="text-zinc-500 text-xs">Followers</p>
                            </div>
                            <div className="p-2 bg-zinc-900 rounded">
                              <p className="text-white font-semibold">{account.following_count.toLocaleString()}</p>
                              <p className="text-zinc-500 text-xs">Following</p>
                            </div>
                            <div className="p-2 bg-zinc-900 rounded">
                              <p className="text-white font-semibold">{account.posts_count.toLocaleString()}</p>
                              <p className="text-zinc-500 text-xs">Posts</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!account.api_connected && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => connectAccount(account.id, account.platform)}
                                disabled={connectingAccount === account.id}
                                className="flex-1 border-[#C4D600] text-[#C4D600] hover:bg-[#C4D600]/20"
                              >
                                {connectingAccount === account.id ? (
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                ) : (
                                  <LinkIcon className="h-3 w-3 mr-1" />
                                )}
                                Connect API
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => syncAnalytics(account.id)}
                              disabled={syncingAnalytics === account.id}
                              className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                            >
                              {syncingAnalytics === account.id ? (
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              ) : (
                                <RefreshCw className="h-3 w-3 mr-1" />
                              )}
                              Sync
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteAccount(account.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                  {filteredSocialAccounts.length === 0 && (
                    <div className="col-span-full text-center py-12 text-zinc-400">
                      <Share2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No social accounts for this client</p>
                      <p className="text-sm">Click "Add Account" to get started</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Packages Tab - No changes needed, packages are global */}
        <TabsContent value="packages">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">SMM Packages</CardTitle>
                <CardDescription className="text-zinc-400">
                  Create subscription packages for social media management
                </CardDescription>
              </div>
              <Dialog open={showPackageDialog} onOpenChange={setShowPackageDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-[#C4D600] text-black hover:bg-[#a8b800]"
                    onClick={() => {
                      setEditingPackage(null)
                      resetPackageForm()
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Package
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{editingPackage ? "Edit Package" : "Create Package"}</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                      Define pricing and features for SMM services
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-zinc-400">Package Name</Label>
                        <Input
                          value={packageForm.name}
                          onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="Starter"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-400">Billing Cycle</Label>
                        <Select
                          value={packageForm.billing_cycle}
                          onValueChange={(v) => setPackageForm({ ...packageForm, billing_cycle: v })}
                        >
                          <SelectTrigger className="bg-zinc-800 border-zinc-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="monthly" className="text-white">
                              Monthly
                            </SelectItem>
                            <SelectItem value="quarterly" className="text-white">
                              Quarterly
                            </SelectItem>
                            <SelectItem value="yearly" className="text-white">
                              Yearly
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-zinc-400">Description</Label>
                      <Textarea
                        value={packageForm.description}
                        onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                        className="bg-zinc-800 border-zinc-700"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-zinc-400">Price (AED)</Label>
                        <Input
                          type="number"
                          value={packageForm.price}
                          onChange={(e) =>
                            setPackageForm({ ...packageForm, price: Number.parseFloat(e.target.value) || 0 })
                          }
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-400">Platforms Allowed</Label>
                        <Input
                          type="number"
                          value={packageForm.platforms_allowed}
                          onChange={(e) =>
                            setPackageForm({ ...packageForm, platforms_allowed: Number.parseInt(e.target.value) || 1 })
                          }
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-zinc-400">Posts/Month</Label>
                        <Input
                          type="number"
                          value={packageForm.posts_per_month}
                          onChange={(e) =>
                            setPackageForm({ ...packageForm, posts_per_month: Number.parseInt(e.target.value) || 0 })
                          }
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-400">Reels/Month</Label>
                        <Input
                          type="number"
                          value={packageForm.reels_per_month}
                          onChange={(e) =>
                            setPackageForm({ ...packageForm, reels_per_month: Number.parseInt(e.target.value) || 0 })
                          }
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-400">Stories/Month</Label>
                        <Input
                          type="number"
                          value={packageForm.stories_per_month}
                          onChange={(e) =>
                            setPackageForm({ ...packageForm, stories_per_month: Number.parseInt(e.target.value) || 0 })
                          }
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-zinc-300">
                        <input
                          type="checkbox"
                          checked={packageForm.includes_design}
                          onChange={(e) => setPackageForm({ ...packageForm, includes_design: e.target.checked })}
                          className="rounded"
                        />
                        Includes Design
                      </label>
                      <label className="flex items-center gap-2 text-zinc-300">
                        <input
                          type="checkbox"
                          checked={packageForm.includes_shooting}
                          onChange={(e) => setPackageForm({ ...packageForm, includes_shooting: e.target.checked })}
                          className="rounded"
                        />
                        Includes Shooting
                      </label>
                    </div>
                    <div>
                      <Label className="text-zinc-400">Features (one per line)</Label>
                      <Textarea
                        value={packageForm.features}
                        onChange={(e) => setPackageForm({ ...packageForm, features: e.target.value })}
                        className="bg-zinc-800 border-zinc-700"
                        rows={4}
                        placeholder="12 Posts/month&#10;4 Reels/month&#10;Monthly Report"
                      />
                    </div>
                    <Button onClick={savePackage} className="w-full bg-[#C4D600] text-black hover:bg-[#a8b800]">
                      {editingPackage ? "Update Package" : "Create Package"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {packages.map((pkg) => (
                  <Card key={pkg.id} className={`bg-zinc-800 border-zinc-700 ${!pkg.is_active ? "opacity-50" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{pkg.name}</h3>
                          <p className="text-zinc-400 text-sm">{pkg.description}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingPackage(pkg)
                              setPackageForm({
                                ...pkg,
                                features: Array.isArray(pkg.features) ? pkg.features.join("\n") : "",
                              })
                              setShowPackageDialog(true)
                            }}
                            className="text-zinc-400 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deletePackage(pkg.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-[#C4D600]">AED {pkg.price}</span>
                        <span className="text-zinc-400">/{pkg.billing_cycle}</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Posts</span>
                          <span className="text-white">{pkg.posts_per_month}/mo</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Reels</span>
                          <span className="text-white">{pkg.reels_per_month}/mo</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Stories</span>
                          <span className="text-white">{pkg.stories_per_month}/mo</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Platforms</span>
                          <span className="text-white">{pkg.platforms_allowed}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {pkg.includes_design && <Badge className="bg-blue-600 text-white text-xs">Design</Badge>}
                        {pkg.includes_shooting && <Badge className="bg-purple-600 text-white text-xs">Shooting</Badge>}
                      </div>
                      {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                        <ul className="space-y-1">
                          {pkg.features.slice(0, 5).map((feature, idx) => (
                            <li key={idx} className="text-zinc-400 text-xs flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-[#C4D600]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {packages.length === 0 && (
                  <div className="col-span-full text-center py-12 text-zinc-400">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No packages created yet</p>
                    <p className="text-sm">Click "Add Package" to create your first SMM package</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab - Updated to use filtered subscriptions */}
        <TabsContent value="subscriptions">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Client Subscriptions</CardTitle>
                <CardDescription className="text-zinc-400">
                  {selectedClientId === "all"
                    ? "Manage SMM subscriptions for all clients"
                    : `Subscriptions for ${clients.find((c) => c.id === selectedClientId)?.name}`}
                </CardDescription>
              </div>
              <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-[#C4D600] text-black hover:bg-[#a8b800]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subscription
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Create Subscription</DialogTitle>
                    <DialogDescription className="text-zinc-400">Assign an SMM package to a client</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="text-zinc-400">Client</Label>
                      <Select
                        value={subscriptionForm.client_id}
                        onValueChange={(v) => setSubscriptionForm({ ...subscriptionForm, client_id: v })}
                      >
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {clients.map((c) => (
                            <SelectItem key={c.id} value={c.id} className="text-white">
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-zinc-400">Package</Label>
                      <Select
                        value={subscriptionForm.package_id}
                        onValueChange={(v) => setSubscriptionForm({ ...subscriptionForm, package_id: v })}
                      >
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Select package" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {packages
                            .filter((p) => p.is_active)
                            .map((p) => (
                              <SelectItem key={p.id} value={p.id} className="text-white">
                                {p.name} - AED {p.price}/{p.billing_cycle}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-zinc-400">Start Date</Label>
                        <Input
                          type="date"
                          value={subscriptionForm.start_date}
                          onChange={(e) => setSubscriptionForm({ ...subscriptionForm, start_date: e.target.value })}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-400">End Date (optional)</Label>
                        <Input
                          type="date"
                          value={subscriptionForm.end_date}
                          onChange={(e) => setSubscriptionForm({ ...subscriptionForm, end_date: e.target.value })}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-zinc-300">
                      <input
                        type="checkbox"
                        checked={subscriptionForm.auto_renew}
                        onChange={(e) => setSubscriptionForm({ ...subscriptionForm, auto_renew: e.target.checked })}
                        className="rounded"
                      />
                      Auto-renew subscription
                    </label>
                    <Button onClick={saveSubscription} className="w-full bg-[#C4D600] text-black hover:bg-[#a8b800]">
                      Create Subscription
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSubscriptions.map((sub) => {
                  const pkg = sub.smm_packages
                  const postsProgress = pkg ? (sub.posts_used / pkg.posts_per_month) * 100 : 0
                  const reelsProgress = pkg ? (sub.reels_used / pkg.reels_per_month) * 100 : 0
                  const storiesProgress = pkg ? (sub.stories_used / pkg.stories_per_month) * 100 : 0

                  return (
                    <Card key={sub.id} className="bg-zinc-800 border-zinc-700">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-white font-semibold">{sub.clients?.name}</h3>
                            <p className="text-zinc-400 text-sm">
                              {pkg?.name} • AED {pkg?.price}/{pkg?.billing_cycle}
                            </p>
                          </div>
                          <Badge
                            className={`${
                              sub.status === "active"
                                ? "bg-green-600"
                                : sub.status === "paused"
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                            } text-white`}
                          >
                            {sub.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-zinc-400">Posts</span>
                              <span className="text-white">
                                {sub.posts_used}/{pkg?.posts_per_month}
                              </span>
                            </div>
                            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#C4D600] rounded-full"
                                style={{ width: `${Math.min(postsProgress, 100)}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-zinc-400">Reels</span>
                              <span className="text-white">
                                {sub.reels_used}/{pkg?.reels_per_month}
                              </span>
                            </div>
                            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${Math.min(reelsProgress, 100)}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-zinc-400">Stories</span>
                              <span className="text-white">
                                {sub.stories_used}/{pkg?.stories_per_month}
                              </span>
                            </div>
                            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${Math.min(storiesProgress, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-zinc-400">
                          <span>Started: {new Date(sub.start_date).toLocaleDateString()}</span>
                          {sub.end_date && <span>Ends: {new Date(sub.end_date).toLocaleDateString()}</span>}
                          {sub.auto_renew && (
                            <Badge variant="outline" className="border-[#C4D600] text-[#C4D600] text-xs">
                              Auto-renew
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
                {filteredSubscriptions.length === 0 && (
                  <div className="text-center py-12 text-zinc-400">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No subscriptions found</p>
                    <p className="text-sm">Click "Add Subscription" to assign a package to a client</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab - Updated to use filtered accounts */}
        <TabsContent value="analytics">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Performance Analytics</CardTitle>
              <CardDescription className="text-zinc-400">
                {selectedClientId === "all"
                  ? "Engagement metrics across all client accounts"
                  : `Analytics for ${clients.find((c) => c.id === selectedClientId)?.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Overall Stats */}
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-[#C4D600] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">
                      {filteredContentItems.reduce((sum, c) => sum + (c.engagement_views || 0), 0).toLocaleString()}
                    </p>
                    <p className="text-zinc-400 text-sm">Total Views</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4 text-center">
                    <Share2 className="h-8 w-8 text-red-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">
                      {filteredContentItems.reduce((sum, c) => sum + (c.engagement_likes || 0), 0).toLocaleString()}
                    </p>
                    <p className="text-zinc-400 text-sm">Total Likes</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">
                      {filteredContentItems.reduce((sum, c) => sum + (c.engagement_comments || 0), 0).toLocaleString()}
                    </p>
                    <p className="text-zinc-400 text-sm">Total Comments</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4 text-center">
                    <ExternalLink className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">
                      {filteredContentItems.reduce((sum, c) => sum + (c.engagement_shares || 0), 0).toLocaleString()}
                    </p>
                    <p className="text-zinc-400 text-sm">Total Shares</p>
                  </CardContent>
                </Card>
              </div>

              {/* Account-level analytics */}
              <h4 className="text-white font-medium mb-4">Account Performance</h4>
              <div className="space-y-4">
                {filteredSocialAccounts.map((account) => {
                  const Icon = platformIcons[account.platform] || Share2
                  const accountContent = filteredContentItems.filter((c) => c.social_account_id === account.id)
                  const totalEngagement = accountContent.reduce(
                    (sum, c) =>
                      sum + (c.engagement_likes || 0) + (c.engagement_comments || 0) + (c.engagement_shares || 0),
                    0,
                  )

                  return (
                    <Card key={account.id} className="bg-zinc-800 border-zinc-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: platformColors[account.platform] + "20" }}
                            >
                              <Icon className="h-5 w-5" style={{ color: platformColors[account.platform] }} />
                            </div>
                            <div>
                              <p className="text-white font-medium">{account.account_name}</p>
                              <p className="text-zinc-400 text-sm">
                                {account.clients?.name} • @{account.account_handle}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-center">
                            <div>
                              <p className="text-white font-semibold">{account.followers_count.toLocaleString()}</p>
                              <p className="text-zinc-500 text-xs">Followers</p>
                            </div>
                            <div>
                              <p className="text-white font-semibold">{accountContent.length}</p>
                              <p className="text-zinc-500 text-xs">Posts</p>
                            </div>
                            <div>
                              <p className="text-white font-semibold">{totalEngagement.toLocaleString()}</p>
                              <p className="text-zinc-500 text-xs">Engagement</p>
                            </div>
                            <div>
                              <p className="text-white font-semibold">
                                {account.engagement_rate ? `${account.engagement_rate.toFixed(2)}%` : "N/A"}
                              </p>
                              <p className="text-zinc-500 text-xs">Rate</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => syncAnalytics(account.id)}
                              disabled={syncingAnalytics === account.id}
                              className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                            >
                              {syncingAnalytics === account.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <RefreshCw className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
                {filteredSocialAccounts.length === 0 && (
                  <div className="text-center py-12 text-zinc-400">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No accounts to show analytics for</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Setup Tab */}
        <TabsContent value="api">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">API Integration Setup</CardTitle>
              <CardDescription className="text-zinc-400">
                Configure OAuth credentials for direct posting and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Meta (Instagram/Facebook) */}
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Facebook className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Meta (Facebook & Instagram)</h4>
                        <p className="text-zinc-400 text-xs">Graph API for posting and insights</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-zinc-400">
                      <p>1. Go to developers.facebook.com</p>
                      <p>2. Create an app with "Business" type</p>
                      <p>3. Add Facebook Login & Instagram Graph API</p>
                      <p>4. Configure OAuth redirect URL:</p>
                      <code className="block p-2 bg-zinc-900 rounded text-xs text-[#C4D600] break-all">
                        {typeof window !== "undefined" ? window.location.origin : ""}/api/social/callback/facebook
                      </code>
                      <p>5. Add these environment variables:</p>
                      <ul className="list-disc list-inside text-xs">
                        <li>FACEBOOK_APP_ID</li>
                        <li>FACEBOOK_APP_SECRET</li>
                        <li>INSTAGRAM_CLIENT_ID</li>
                        <li>INSTAGRAM_CLIENT_SECRET</li>
                      </ul>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full border-blue-500 text-blue-400 hover:bg-blue-500/20 bg-transparent"
                    >
                      <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Meta Developer Portal
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Twitter/X */}
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-zinc-700 rounded-lg">
                        <Twitter className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Twitter / X</h4>
                        <p className="text-zinc-400 text-xs">API v2 for tweets and analytics</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-zinc-400">
                      <p>1. Go to developer.twitter.com</p>
                      <p>2. Create a project and app</p>
                      <p>3. Enable OAuth 2.0 with PKCE</p>
                      <p>4. Configure callback URL:</p>
                      <code className="block p-2 bg-zinc-900 rounded text-xs text-[#C4D600] break-all">
                        {typeof window !== "undefined" ? window.location.origin : ""}/api/social/callback/twitter
                      </code>
                      <p>5. Add environment variables:</p>
                      <ul className="list-disc list-inside text-xs">
                        <li>TWITTER_CLIENT_ID</li>
                        <li>TWITTER_CLIENT_SECRET</li>
                        <li>TWITTER_API_KEY</li>
                        <li>TWITTER_API_SECRET_KEY</li>
                      </ul>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full border-zinc-500 text-zinc-300 hover:bg-zinc-700 bg-transparent"
                    >
                      <a href="https://developer.twitter.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Twitter Developer Portal
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* LinkedIn */}
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-600/20 rounded-lg">
                        <Linkedin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">LinkedIn</h4>
                        <p className="text-zinc-400 text-xs">Marketing API for company pages</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-zinc-400">
                      <p>1. Go to linkedin.com/developers</p>
                      <p>2. Create an app</p>
                      <p>3. Request Marketing API access</p>
                      <p>4. Configure OAuth redirect:</p>
                      <code className="block p-2 bg-zinc-900 rounded text-xs text-[#C4D600] break-all">
                        {typeof window !== "undefined" ? window.location.origin : ""}/api/social/callback/linkedin
                      </code>
                      <p>5. Add environment variables:</p>
                      <ul className="list-disc list-inside text-xs">
                        <li>LINKEDIN_CLIENT_ID</li>
                        <li>LINKEDIN_CLIENT_SECRET</li>
                      </ul>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full border-blue-600 text-blue-400 hover:bg-blue-600/20 bg-transparent"
                    >
                      <a href="https://www.linkedin.com/developers" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open LinkedIn Developer Portal
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* TikTok */}
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-zinc-700 rounded-lg">
                        {platformIcons.tiktok && <span className="text-white">{platformIcons.tiktok({})}</span>}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">TikTok</h4>
                        <p className="text-zinc-400 text-xs">Content Posting API for videos</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-zinc-400">
                      <p>1. Go to developers.tiktok.com</p>
                      <p>2. Create an app</p>
                      <p>3. Enable Content Posting API</p>
                      <p>4. Configure redirect URL:</p>
                      <code className="block p-2 bg-zinc-900 rounded text-xs text-[#C4D600] break-all">
                        {typeof window !== "undefined" ? window.location.origin : ""}/api/social/callback/tiktok
                      </code>
                      <p>5. Add environment variables:</p>
                      <ul className="list-disc list-inside text-xs">
                        <li>TIKTOK_CLIENT_KEY</li>
                        <li>TIKTOK_CLIENT_SECRET</li>
                      </ul>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full border-zinc-500 text-zinc-300 hover:bg-zinc-700 bg-transparent"
                    >
                      <a href="https://developers.tiktok.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open TikTok Developer Portal
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* YouTube */}
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Youtube className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">YouTube</h4>
                        <p className="text-zinc-400 text-xs">Data API v3 for uploads and analytics</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-zinc-400">
                      <p>1. Go to console.cloud.google.com</p>
                      <p>2. Create a project</p>
                      <p>3. Enable YouTube Data API v3</p>
                      <p>4. Create OAuth 2.0 credentials</p>
                      <p>5. Configure redirect URI:</p>
                      <code className="block p-2 bg-zinc-900 rounded text-xs text-[#C4D600] break-all">
                        {typeof window !== "undefined" ? window.location.origin : ""}/api/social/callback/youtube
                      </code>
                      <p>6. Add environment variables:</p>
                      <ul className="list-disc list-inside text-xs">
                        <li>GOOGLE_CLIENT_ID</li>
                        <li>GOOGLE_CLIENT_SECRET</li>
                      </ul>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full border-red-500 text-red-400 hover:bg-red-500/20 bg-transparent"
                    >
                      <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Google Cloud Console
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Setup Link */}
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#C4D600]/20 rounded-lg">
                        <Zap className="h-5 w-5 text-[#C4D600]" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Quick Setup Guide</h4>
                        <p className="text-zinc-400 text-xs">Detailed setup instructions</p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4">
                      For detailed step-by-step instructions with screenshots, visit the API Setup page.
                    </p>
                    <Button asChild className="w-full bg-[#C4D600] text-black hover:bg-[#a8b800]">
                      <Link href="/admin/social-media/setup">
                        <Plug className="h-4 w-4 mr-2" />
                        Open Full Setup Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
