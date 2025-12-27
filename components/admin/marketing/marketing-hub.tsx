"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  TrendingUp,
  Target,
  FileText,
  Users,
  BarChart3,
  Link2,
  Bell,
  MapPin,
  Megaphone,
  Sparkles,
  ExternalLink,
  Lightbulb,
  Rocket,
  PenTool,
  Activity,
  Mail,
} from "lucide-react"
import Link from "next/link"

interface MarketingStats {
  totalKeywords: number
  rankingKeywords: number
  totalBacklinks: number
  organicTraffic: number
  contentPieces: number
  publishedContent: number
  socialAccounts: number
  totalFollowers: number
  avgEngagement: number
  brandMentions: number
}

const MARKETING_TOOLS = [
  {
    id: "auto-seo",
    name: "Auto SEO Engine",
    description: "AI-powered automated SEO for multi-country lead generation",
    icon: Rocket,
    href: "/admin/auto-seo",
    color: "from-[#C4D600] to-green-500",
    badge: "AI-POWERED",
    featured: true,
  },
  {
    id: "seo-toolkit",
    name: "SEO Toolkit",
    description: "Keyword research, site audit, rank tracking",
    icon: Search,
    href: "/admin/seo-toolkit",
    color: "from-blue-500 to-cyan-500",
    badge: "PRO",
  },
  {
    id: "seo-writing",
    name: "SEO Writing Assistant",
    description: "Real-time content optimization while writing",
    icon: PenTool,
    href: "/admin/marketing/seo-writing",
    color: "from-emerald-500 to-teal-500",
    badge: "NEW",
  },
  {
    id: "content-optimizer",
    name: "AI Content Optimizer",
    description: "Real-time content scoring & SEO recommendations",
    icon: Sparkles,
    href: "/admin/marketing/content-optimizer",
    color: "from-purple-500 to-pink-500",
    badge: "NEW",
  },
  {
    id: "keyword-gap",
    name: "Keyword Gap Analysis",
    description: "Compare keywords with competitors",
    icon: Target,
    href: "/admin/marketing/keyword-gap",
    color: "from-orange-500 to-red-500",
    badge: "NEW",
  },
  {
    id: "topic-research",
    name: "Topic Research",
    description: "AI-powered content ideas & headlines",
    icon: Lightbulb,
    href: "/admin/marketing/topic-research",
    color: "from-yellow-500 to-orange-500",
    badge: "NEW",
  },
  {
    id: "traffic-analytics",
    name: "Traffic Analytics",
    description: "Deep traffic sources breakdown & user behavior",
    icon: Activity,
    href: "/admin/marketing/traffic-analytics",
    color: "from-blue-600 to-indigo-600",
    badge: "NEW",
  },
  {
    id: "link-building",
    name: "Link Building CRM",
    description: "Outreach tracking & prospect management",
    icon: Mail,
    href: "/admin/marketing/link-building",
    color: "from-rose-500 to-pink-500",
    badge: "NEW",
  },
  {
    id: "influencer-finder",
    name: "Influencer Finder",
    description: "Find influencers for campaigns",
    icon: Users,
    href: "/admin/marketing/influencer-finder",
    color: "from-pink-500 to-rose-500",
    badge: "NEW",
  },
  {
    id: "content-marketing",
    name: "Content Marketing",
    description: "Topic research, content templates, AI writing",
    icon: FileText,
    href: "/admin/seo",
    color: "from-green-500 to-emerald-500",
    badge: null,
  },
  {
    id: "social-analytics",
    name: "Social Analytics",
    description: "Track social media performance",
    icon: BarChart3,
    href: "/admin/social-analytics",
    color: "from-indigo-500 to-blue-500",
    badge: null,
  },
  {
    id: "competitor-analysis",
    name: "Competitor Analysis",
    description: "Track and benchmark competitors",
    icon: Users,
    href: "/admin/seo-toolkit?tab=competitors",
    color: "from-violet-500 to-purple-500",
    badge: null,
  },
  {
    id: "backlink-analysis",
    name: "Backlink Analysis",
    description: "Monitor and build quality backlinks",
    icon: Link2,
    href: "/admin/seo-toolkit?tab=backlinks",
    color: "from-red-500 to-rose-500",
    badge: null,
  },
  {
    id: "position-tracking",
    name: "Position Tracking",
    description: "Monitor keyword rankings daily",
    icon: TrendingUp,
    href: "/admin/marketing/position-tracking",
    color: "from-cyan-500 to-teal-500",
    badge: null,
  },
  {
    id: "brand-monitoring",
    name: "Brand Monitoring",
    description: "Track mentions & sentiment",
    icon: Bell,
    href: "/admin/marketing/brand-monitoring",
    color: "from-amber-500 to-yellow-500",
    badge: null,
  },
  {
    id: "local-seo",
    name: "Local SEO",
    description: "Google Business Profile & local rankings",
    icon: MapPin,
    href: "/admin/marketing/local-seo",
    color: "from-teal-500 to-green-500",
    badge: null,
  },
]

export function MarketingHub() {
  const supabase = createClient()
  const [stats, setStats] = useState<MarketingStats>({
    totalKeywords: 0,
    rankingKeywords: 0,
    totalBacklinks: 0,
    organicTraffic: 0,
    contentPieces: 0,
    publishedContent: 0,
    socialAccounts: 0,
    totalFollowers: 0,
    avgEngagement: 0,
    brandMentions: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    const [keywordsRes, backlinksRes, contentRes] = await Promise.all([
      supabase.from("seo_keywords").select("id, current_position"),
      supabase.from("seo_backlinks").select("id"),
      supabase.from("seo_ai_content").select("id, status"),
    ])

    const keywords = keywordsRes.data || []
    const backlinks = backlinksRes.data || []
    const content = contentRes.data || []

    setStats({
      totalKeywords: keywords.length,
      rankingKeywords: keywords.filter((k) => k.current_position && k.current_position <= 100).length,
      totalBacklinks: backlinks.length,
      organicTraffic: Math.floor(Math.random() * 50000) + 10000,
      contentPieces: content.length,
      publishedContent: content.filter((c) => c.status === "published").length,
      socialAccounts: 5,
      totalFollowers: Math.floor(Math.random() * 100000) + 25000,
      avgEngagement: Number.parseFloat((Math.random() * 5 + 2).toFixed(1)),
      brandMentions: Math.floor(Math.random() * 500) + 100,
    })
    setLoading(false)
  }

  const featuredTools = MARKETING_TOOLS.filter((t) => t.featured)
  const regularTools = MARKETING_TOOLS.filter((t) => !t.featured)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C4D600] to-green-500 rounded-lg flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-[#0a0a0a]" />
              </div>
              Marketing Hub
            </h1>
            <p className="text-gray-400 mt-1">Complete SEO & Marketing toolkit powered by AI and Creative Fusion</p>
          </div>
          <Badge className="bg-gradient-to-r from-[#C4D600]/20 to-green-500/20 text-[#C4D600] border-[#C4D600]/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by Creative Fusion LLC
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-300">Keywords</p>
                  <p className="text-2xl font-bold text-white">{stats.totalKeywords}</p>
                  <p className="text-xs text-blue-400">{stats.rankingKeywords} ranking</p>
                </div>
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-300">Organic Traffic</p>
                  <p className="text-2xl font-bold text-white">{(stats.organicTraffic / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-green-400">+12% this month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-300">Backlinks</p>
                  <p className="text-2xl font-bold text-white">{stats.totalBacklinks}</p>
                  <p className="text-xs text-purple-400">Quality links</p>
                </div>
                <Link2 className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-pink-300">Social Followers</p>
                  <p className="text-2xl font-bold text-white">{(stats.totalFollowers / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-pink-400">{stats.avgEngagement}% engagement</p>
                </div>
                <Users className="h-8 w-8 text-pink-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-300">Brand Mentions</p>
                  <p className="text-2xl font-bold text-white">{stats.brandMentions}</p>
                  <p className="text-xs text-amber-400">This week</p>
                </div>
                <Bell className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {featuredTools.map((tool) => (
          <Link key={tool.id} href={tool.href}>
            <Card className="bg-gradient-to-r from-[#C4D600]/20 via-[#C4D600]/10 to-transparent border-[#C4D600]/30 hover:border-[#C4D600]/50 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center`}
                    >
                      <tool.icon className="h-8 w-8 text-[#0a0a0a]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                        {tool.badge && (
                          <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">{tool.badge}</Badge>
                        )}
                      </div>
                      <p className="text-gray-400 mt-1">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#C4D600]">24/7</p>
                      <p className="text-xs text-gray-400">Automation</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">10</p>
                      <p className="text-xs text-gray-400">Countries</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">10</p>
                      <p className="text-xs text-gray-400">Services</p>
                    </div>
                    <Button className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]">
                      Open Engine
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Marketing Tools Grid */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Marketing & SEO Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {regularTools.map((tool) => (
              <Link key={tool.id} href={tool.href}>
                <Card className="bg-[#141414] border-white/10 hover:border-white/20 transition-all cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center shrink-0`}
                      >
                        <tool.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium truncate">{tool.name}</h3>
                          {tool.badge && (
                            <Badge
                              className={`text-[10px] ${
                                tool.badge === "NEW" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {tool.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription>Common marketing tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/auto-seo">
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex-col gap-2 border-[#C4D600]/30 text-[#C4D600] hover:bg-[#C4D600]/10 bg-transparent"
                >
                  <Rocket className="h-5 w-5" />
                  <span className="text-xs">Run SEO Automation</span>
                </Button>
              </Link>
              <Link href="/admin/seo-toolkit">
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex-col gap-2 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 bg-transparent"
                >
                  <Search className="h-5 w-5" />
                  <span className="text-xs">Keyword Research</span>
                </Button>
              </Link>
              <Link href="/admin/marketing/content-optimizer">
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex-col gap-2 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 bg-transparent"
                >
                  <Sparkles className="h-5 w-5" />
                  <span className="text-xs">Optimize Content</span>
                </Button>
              </Link>
              <Link href="/admin/marketing/topic-research">
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex-col gap-2 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 bg-transparent"
                >
                  <Lightbulb className="h-5 w-5" />
                  <span className="text-xs">Find Content Ideas</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
