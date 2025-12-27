"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bot,
  Zap,
  Target,
  Globe,
  TrendingUp,
  Users,
  Search,
  Link2,
  MapPin,
  BarChart3,
  Brain,
  Sparkles,
  Play,
  Settings,
  RefreshCw,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Download,
  Plus,
  Rocket,
  Award,
} from "lucide-react"

// Target Countries for Lead Generation
const TARGET_COUNTRIES = [
  { code: "UAE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
]

// Services for targeting
const SERVICES = [
  "Digital Marketing",
  "Social Media Marketing",
  "SEO Services",
  "Web Development",
  "Branding & Design",
  "Content Marketing",
  "PPC Advertising",
  "Email Marketing",
  "Video Production",
  "Mobile App Development",
]

export function AutoSeoEngine() {
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loading, setLoading] = useState(true)
  const [automationEnabled, setAutomationEnabled] = useState(false)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [keywords, setKeywords] = useState<any[]>([])
  const [rankings, setRankings] = useState<any[]>([])
  const [backlinks, setBacklinks] = useState<any[]>([])
  const [localListings, setLocalListings] = useState<any[]>([])

  // Stats
  const [stats, setStats] = useState({
    totalLeads: 0,
    leadsThisMonth: 0,
    avgLeadScore: 0,
    topCountry: "UAE",
    keywordsTracked: 0,
    avgPosition: 0,
    totalBacklinks: 0,
    localListings: 0,
    automationRuns: 0,
  })

  // Campaign Form
  const [showCampaignDialog, setShowCampaignDialog] = useState(false)
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    targetCountries: [] as string[],
    targetServices: [] as string[],
    targetKeywords: "",
    dailyBudget: 0,
    automationType: "full",
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const [leadsRes, keywordsRes, backlinksRes] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("seo_keywords").select("*").order("created_at", { ascending: false }),
      supabase.from("seo_backlinks").select("*").order("created_at", { ascending: false }),
    ])

    setLeads(leadsRes.data || [])
    setKeywords(keywordsRes.data || [])
    setBacklinks(backlinksRes.data || [])

    // Calculate stats
    const leadsData = leadsRes.data || []
    const thisMonth = new Date()
    thisMonth.setDate(1)
    const leadsThisMonth = leadsData.filter((l) => new Date(l.created_at) >= thisMonth).length
    const avgScore =
      leadsData.length > 0 ? Math.round(leadsData.reduce((a, b) => a + (b.lead_score || 0), 0) / leadsData.length) : 0

    setStats({
      totalLeads: leadsData.length,
      leadsThisMonth,
      avgLeadScore: avgScore,
      topCountry: "UAE",
      keywordsTracked: (keywordsRes.data || []).length,
      avgPosition: 12,
      totalBacklinks: (backlinksRes.data || []).length,
      localListings: 15,
      automationRuns: 47,
    })

    setLoading(false)
  }

  async function runAutomation() {
    // Simulate automation run
    setAutomationEnabled(true)
    // In production, this would trigger actual SEO automation tasks
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C4D600] to-green-500 rounded-lg flex items-center justify-center">
              <Rocket className="h-5 w-5 text-[#0a0a0a]" />
            </div>
            Auto SEO & Lead Generation Engine
          </h1>
          <p className="text-gray-400 mt-1">
            AI-powered automated SEO for multi-country lead generation across all services
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#141414] rounded-lg px-4 py-2 border border-white/10">
            <span className="text-sm text-gray-400">Automation</span>
            <Switch checked={automationEnabled} onCheckedChange={setAutomationEnabled} />
            <Badge className={automationEnabled ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
              {automationEnabled ? "Active" : "Paused"}
            </Badge>
          </div>
          <Button onClick={runAutomation} className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">
            <Play className="h-4 w-4 mr-2" />
            Run Now
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-300">Total Leads</p>
                <p className="text-2xl font-bold text-white">{stats.totalLeads}</p>
                <p className="text-xs text-green-400">+{stats.leadsThisMonth} this month</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-300">Avg Lead Score</p>
                <p className="text-2xl font-bold text-white">{stats.avgLeadScore}</p>
                <p className="text-xs text-green-400">Quality index</p>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-300">Keywords Tracked</p>
                <p className="text-2xl font-bold text-white">{stats.keywordsTracked}</p>
                <p className="text-xs text-purple-400">Avg pos: #{stats.avgPosition}</p>
              </div>
              <Search className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-orange-300">Backlinks</p>
                <p className="text-2xl font-bold text-white">{stats.totalBacklinks}</p>
                <p className="text-xs text-orange-400">Authority links</p>
              </div>
              <Link2 className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#C4D600]/20 to-[#C4D600]/10 border-[#C4D600]/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#C4D600]">Automation Runs</p>
                <p className="text-2xl font-bold text-white">{stats.automationRuns}</p>
                <p className="text-xs text-[#C4D600]">This week</p>
              </div>
              <Bot className="h-8 w-8 text-[#C4D600]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#141414] border border-white/10 p-1 flex-wrap">
          <TabsTrigger
            value="dashboard"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="keywords"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Target className="h-4 w-4 mr-2" />
            Keywords
          </TabsTrigger>
          <TabsTrigger
            value="local-seo"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Local SEO
          </TabsTrigger>
          <TabsTrigger
            value="backlinks"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Link2 className="h-4 w-4 mr-2" />
            Backlinks
          </TabsTrigger>
          <TabsTrigger
            value="leads"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Users className="h-4 w-4 mr-2" />
            Generated Leads
          </TabsTrigger>
          <TabsTrigger
            value="automation"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            <Bot className="h-4 w-4 mr-2" />
            Automation
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Lead Generation by Country */}
            <Card className="bg-[#141414] border-white/10 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#C4D600]" />
                  Lead Generation by Country
                </CardTitle>
                <CardDescription>Multi-country targeting performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {TARGET_COUNTRIES.slice(0, 6).map((country, i) => {
                    const leadCount = Math.floor(Math.random() * 50) + 10
                    const percentage = Math.floor(Math.random() * 30) + 10
                    return (
                      <div key={country.code} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{country.flag}</span>
                            <span className="text-white">{country.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#C4D600] font-medium">{leadCount} leads</span>
                            <Badge className="bg-green-500/20 text-green-400">+{percentage}%</Badge>
                          </div>
                        </div>
                        <Progress value={percentage + 50} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Service Performance */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#C4D600]" />
                  Top Services
                </CardTitle>
                <CardDescription>By lead generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {SERVICES.slice(0, 6).map((service, i) => (
                    <div key={service} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <span className="text-gray-300 text-sm">{service}</span>
                      <Badge className="bg-[#C4D600]/20 text-[#C4D600]">{Math.floor(Math.random() * 30) + 5}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Automation Status */}
          <Card className="bg-gradient-to-r from-[#C4D600]/10 to-transparent border-[#C4D600]/30">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#C4D600]/20 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-[#C4D600]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI SEO Automation Engine</h3>
                    <p className="text-gray-400">Automatically optimizes SEO across all target markets</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">24/7</p>
                    <p className="text-xs text-gray-400">Monitoring</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">10</p>
                    <p className="text-xs text-gray-400">Countries</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">10</p>
                    <p className="text-xs text-gray-400">Services</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#C4D600]">98%</p>
                    <p className="text-xs text-gray-400">Uptime</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#C4D600]" />
                  Recent Automation Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { task: "Keyword ranking check", status: "completed", time: "2 min ago" },
                    { task: "Backlink analysis", status: "completed", time: "15 min ago" },
                    { task: "Local SEO update - UAE", status: "completed", time: "1 hour ago" },
                    { task: "Competitor monitoring", status: "running", time: "In progress" },
                    { task: "Content optimization", status: "scheduled", time: "In 2 hours" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        {item.status === "completed" && <CheckCircle className="h-4 w-4 text-green-400" />}
                        {item.status === "running" && <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />}
                        {item.status === "scheduled" && <Clock className="h-4 w-4 text-gray-400" />}
                        <span className="text-gray-300">{item.task}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#C4D600]" />
                  Latest Generated Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leads.slice(0, 5).map((lead, i) => (
                    <div key={lead.id || i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <p className="text-white font-medium">
                          {lead.first_name} {lead.last_name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {lead.company || "No company"} - {lead.country}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            lead.lead_score >= 70
                              ? "bg-green-500/20 text-green-400"
                              : lead.lead_score >= 40
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }
                        >
                          Score: {lead.lead_score || 0}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{lead.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">SEO Campaigns</h2>
            <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#141414] border-white/10 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create SEO Campaign</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Campaign Name</Label>
                    <Input
                      value={campaignForm.name}
                      onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      placeholder="e.g., UAE Digital Marketing Q1 2025"
                    />
                  </div>

                  <div>
                    <Label>Target Countries</Label>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {TARGET_COUNTRIES.map((country) => (
                        <Button
                          key={country.code}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const current = campaignForm.targetCountries
                            if (current.includes(country.code)) {
                              setCampaignForm({
                                ...campaignForm,
                                targetCountries: current.filter((c) => c !== country.code),
                              })
                            } else {
                              setCampaignForm({ ...campaignForm, targetCountries: [...current, country.code] })
                            }
                          }}
                          className={
                            campaignForm.targetCountries.includes(country.code)
                              ? "bg-[#C4D600] text-[#0a0a0a] border-[#C4D600]"
                              : "border-white/20 text-gray-400"
                          }
                        >
                          {country.flag} {country.code}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Target Services</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {SERVICES.map((service) => (
                        <Button
                          key={service}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const current = campaignForm.targetServices
                            if (current.includes(service)) {
                              setCampaignForm({
                                ...campaignForm,
                                targetServices: current.filter((s) => s !== service),
                              })
                            } else {
                              setCampaignForm({ ...campaignForm, targetServices: [...current, service] })
                            }
                          }}
                          className={
                            campaignForm.targetServices.includes(service)
                              ? "bg-[#C4D600] text-[#0a0a0a] border-[#C4D600] justify-start"
                              : "border-white/20 text-gray-400 justify-start"
                          }
                        >
                          {service}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Target Keywords (one per line)</Label>
                    <Textarea
                      value={campaignForm.targetKeywords}
                      onChange={(e) => setCampaignForm({ ...campaignForm, targetKeywords: e.target.value })}
                      className="bg-white/5 border-white/10 text-white mt-1"
                      rows={4}
                      placeholder="digital marketing agency dubai&#10;social media marketing UAE&#10;web design company saudi arabia"
                    />
                  </div>

                  <div>
                    <Label>Automation Type</Label>
                    <Select
                      value={campaignForm.automationType}
                      onValueChange={(v) => setCampaignForm({ ...campaignForm, automationType: v })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        <SelectItem value="full" className="text-white">
                          Full Automation (SEO + Content + Backlinks)
                        </SelectItem>
                        <SelectItem value="seo-only" className="text-white">
                          SEO Only (Keywords + Rankings)
                        </SelectItem>
                        <SelectItem value="content" className="text-white">
                          Content Generation Only
                        </SelectItem>
                        <SelectItem value="backlinks" className="text-white">
                          Backlink Building Only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowCampaignDialog(false)}
                      className="border-white/20 text-white"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">Create Campaign</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Sample Campaigns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "UAE Digital Marketing",
                countries: ["UAE", "SA"],
                services: ["Digital Marketing", "Social Media"],
                status: "active",
                leads: 45,
                keywords: 120,
              },
              {
                name: "US Web Development",
                countries: ["US", "CA"],
                services: ["Web Development", "Mobile App"],
                status: "active",
                leads: 32,
                keywords: 85,
              },
              {
                name: "Europe Branding",
                countries: ["UK", "DE", "FR"],
                services: ["Branding & Design"],
                status: "paused",
                leads: 18,
                keywords: 65,
              },
            ].map((campaign, i) => (
              <Card key={i} className="bg-[#141414] border-white/10">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{campaign.name}</CardTitle>
                    <Badge
                      className={
                        campaign.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-1">
                    {campaign.countries.map((code) => (
                      <span key={code} className="text-lg">
                        {TARGET_COUNTRIES.find((c) => c.code === code)?.flag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {campaign.services.map((service) => (
                      <Badge key={service} variant="outline" className="border-white/20 text-gray-400 text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center p-2 rounded bg-white/5">
                      <p className="text-xl font-bold text-[#C4D600]">{campaign.leads}</p>
                      <p className="text-xs text-gray-400">Leads</p>
                    </div>
                    <div className="text-center p-2 rounded bg-white/5">
                      <p className="text-xl font-bold text-white">{campaign.keywords}</p>
                      <p className="text-xs text-gray-400">Keywords</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-gray-300 hover:text-white bg-transparent"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords" className="mt-6 space-y-6">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Tracked Keywords</CardTitle>
                <Button className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Keywords
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-gray-400">Keyword</TableHead>
                    <TableHead className="text-gray-400">Country</TableHead>
                    <TableHead className="text-gray-400">Position</TableHead>
                    <TableHead className="text-gray-400">Volume</TableHead>
                    <TableHead className="text-gray-400">Difficulty</TableHead>
                    <TableHead className="text-gray-400">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      keyword: "digital marketing agency dubai",
                      country: "UAE",
                      position: 5,
                      change: 2,
                      volume: 2400,
                      difficulty: 65,
                    },
                    {
                      keyword: "social media marketing uae",
                      country: "UAE",
                      position: 8,
                      change: -1,
                      volume: 1800,
                      difficulty: 58,
                    },
                    {
                      keyword: "web design company saudi",
                      country: "SA",
                      position: 12,
                      change: 5,
                      volume: 1200,
                      difficulty: 45,
                    },
                    {
                      keyword: "branding services riyadh",
                      country: "SA",
                      position: 3,
                      change: 0,
                      volume: 800,
                      difficulty: 38,
                    },
                    {
                      keyword: "seo agency uk",
                      country: "UK",
                      position: 18,
                      change: 4,
                      volume: 3200,
                      difficulty: 72,
                    },
                  ].map((kw, i) => (
                    <TableRow key={i} className="border-white/10">
                      <TableCell className="text-white font-medium">{kw.keyword}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-white/20 text-gray-400">
                          {TARGET_COUNTRIES.find((c) => c.code === kw.country)?.flag} {kw.country}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">#{kw.position}</span>
                          {kw.change > 0 && (
                            <span className="text-green-400 text-xs flex items-center">
                              <ArrowUpRight className="h-3 w-3" />
                              {kw.change}
                            </span>
                          )}
                          {kw.change < 0 && (
                            <span className="text-red-400 text-xs flex items-center">
                              <ArrowDownRight className="h-3 w-3" />
                              {Math.abs(kw.change)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">{kw.volume.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={kw.difficulty} className="w-16 h-2" />
                          <span
                            className={
                              kw.difficulty < 40
                                ? "text-green-400"
                                : kw.difficulty < 60
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }
                          >
                            {kw.difficulty}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Local SEO Tab */}
        <TabsContent value="local-seo" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#C4D600]" />
                  Google Business Profiles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { location: "Dubai, UAE", status: "verified", rating: 4.8, reviews: 156 },
                    { location: "Abu Dhabi, UAE", status: "verified", rating: 4.6, reviews: 89 },
                    { location: "Riyadh, Saudi", status: "pending", rating: 0, reviews: 0 },
                  ].map((profile, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div>
                        <p className="text-white font-medium">{profile.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={
                              profile.status === "verified"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {profile.status}
                          </Badge>
                          {profile.rating > 0 && (
                            <span className="text-gray-400 text-sm">
                              ⭐ {profile.rating} ({profile.reviews} reviews)
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/20 text-gray-400 bg-transparent">
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#C4D600]" />
                  Local Citations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Yelp", status: "active", accuracy: 100 },
                    { name: "Yellow Pages UAE", status: "active", accuracy: 100 },
                    { name: "Trustpilot", status: "active", accuracy: 95 },
                    { name: "Clutch.co", status: "pending", accuracy: 0 },
                    { name: "GoodFirms", status: "active", accuracy: 100 },
                  ].map((citation, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <CheckCircle
                          className={`h-4 w-4 ${citation.status === "active" ? "text-green-400" : "text-yellow-400"}`}
                        />
                        <span className="text-gray-300">{citation.name}</span>
                      </div>
                      <Badge
                        className={
                          citation.accuracy === 100
                            ? "bg-green-500/20 text-green-400"
                            : citation.accuracy > 0
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-gray-500/20 text-gray-400"
                        }
                      >
                        {citation.accuracy}% accurate
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backlinks Tab */}
        <TabsContent value="backlinks" className="mt-6 space-y-6">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Backlink Profile</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-white/20 text-gray-400 bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Backlink
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-gray-400">Source</TableHead>
                    <TableHead className="text-gray-400">DA</TableHead>
                    <TableHead className="text-gray-400">Anchor Text</TableHead>
                    <TableHead className="text-gray-400">Type</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backlinks.length > 0 ? (
                    backlinks.map((bl, i) => (
                      <TableRow key={bl.id || i} className="border-white/10">
                        <TableCell className="text-blue-400">{bl.source_url}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400">{bl.domain_authority || 50}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{bl.anchor_text}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              bl.is_dofollow ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                            }
                          >
                            {bl.is_dofollow ? "DoFollow" : "NoFollow"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                        </TableCell>
                        <TableCell className="text-gray-400">{new Date(bl.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                        No backlinks tracked yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generated Leads Tab */}
        <TabsContent value="leads" className="mt-6 space-y-6">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">SEO-Generated Leads</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      <SelectItem value="all" className="text-white">
                        All Countries
                      </SelectItem>
                      {TARGET_COUNTRIES.map((c) => (
                        <SelectItem key={c.code} value={c.code} className="text-white">
                          {c.flag} {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-white/20 text-gray-400 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-gray-400">Lead</TableHead>
                    <TableHead className="text-gray-400">Company</TableHead>
                    <TableHead className="text-gray-400">Country</TableHead>
                    <TableHead className="text-gray-400">Source</TableHead>
                    <TableHead className="text-gray-400">Service Interest</TableHead>
                    <TableHead className="text-gray-400">Score</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.slice(0, 10).map((lead, i) => (
                    <TableRow key={lead.id || i} className="border-white/10">
                      <TableCell>
                        <div>
                          <p className="text-white font-medium">
                            {lead.first_name} {lead.last_name}
                          </p>
                          <p className="text-xs text-gray-500">{lead.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{lead.company || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-white/20 text-gray-400">
                          {TARGET_COUNTRIES.find((c) => c.code === lead.country)?.flag} {lead.country}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400">{lead.source}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(lead.service_interest || []).slice(0, 2).map((service: string, j: number) => (
                            <Badge key={j} variant="outline" className="border-white/10 text-gray-400 text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            lead.lead_score >= 70
                              ? "bg-green-500/20 text-green-400"
                              : lead.lead_score >= 40
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }
                        >
                          {lead.lead_score || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            lead.status === "converted"
                              ? "bg-green-500/20 text-green-400"
                              : lead.status === "qualified"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-gray-500/20 text-gray-400"
                          }
                        >
                          {lead.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bot className="h-5 w-5 text-[#C4D600]" />
                  Automation Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Daily Keyword Ranking Check", schedule: "Every day at 6:00 AM", enabled: true },
                    { name: "Weekly Backlink Analysis", schedule: "Every Monday", enabled: true },
                    { name: "Competitor Monitoring", schedule: "Every 3 days", enabled: true },
                    { name: "Auto Content Generation", schedule: "When new keywords found", enabled: false },
                    { name: "Local SEO Updates", schedule: "Weekly", enabled: true },
                    { name: "Lead Score Recalculation", schedule: "Daily", enabled: true },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div>
                        <p className="text-white font-medium">{rule.name}</p>
                        <p className="text-xs text-gray-500">{rule.schedule}</p>
                      </div>
                      <Switch checked={rule.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#C4D600]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Run Full SEO Audit", icon: Search },
                    { name: "Check All Rankings", icon: TrendingUp },
                    { name: "Analyze Competitors", icon: Users },
                    { name: "Generate Content Ideas", icon: Sparkles },
                    { name: "Find New Backlinks", icon: Link2 },
                    { name: "Update Local Listings", icon: MapPin },
                    { name: "Score All Leads", icon: Target },
                    { name: "Export Reports", icon: Download },
                  ].map((action, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="h-auto py-4 flex-col gap-2 border-white/10 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent"
                    >
                      <action.icon className="h-5 w-5" />
                      <span className="text-xs">{action.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
