"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Eye,
  Share2,
  TrendingUp,
  RefreshCw,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Sparkles,
  Target,
  Clock,
  Lightbulb,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface SocialAccount {
  id: string
  client_id: string
  platform: string
  account_handle: string
  followers_count: number
  following_count: number
  posts_count: number
  is_verified: boolean
  clients?: { name: string }
}

interface DailyStats {
  date: string
  followers_count: number
  likes_count: number
  comments_count: number
  views_count: number
  engagement_rate: number
}

interface AIAnalytics {
  overallScore: number
  growthTrend: string
  topPerformingPlatform: string
  engagementHealth: string
  keyInsights: string[]
  recommendations: string[]
  bestPostingTimes: string
  contentSuggestions: string[]
}

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
}

const platformColors: Record<string, string> = {
  instagram: "#E4405F",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
}

const COLORS = ["#C4D600", "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B"]

export function SocialMediaAnalyticsDashboard() {
  const supabase = createClient()
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [aiAnalytics, setAiAnalytics] = useState<AIAnalytics | null>(null)
  const [analyzingAI, setAnalyzingAI] = useState(false)

  const totalFollowers = accounts.reduce((sum, a) => sum + (a.followers_count || 0), 0)
  const totalPosts = accounts.reduce((sum, a) => sum + (a.posts_count || 0), 0)

  const platformBreakdown = accounts.reduce((acc: Record<string, number>, account) => {
    acc[account.platform] = (acc[account.platform] || 0) + (account.followers_count || 0)
    return acc
  }, {})

  const pieData = Object.entries(platformBreakdown).map(([name, value]) => ({ name, value }))

  async function fetchData() {
    const [accountsRes, statsRes] = await Promise.all([
      supabase
        .from("social_media_accounts")
        .select("*, clients(name)")
        .eq("is_active", true)
        .order("followers_count", { ascending: false }),
      supabase.from("social_media_daily_stats").select("*").order("date", { ascending: true }).limit(30),
    ])

    if (accountsRes.data) setAccounts(accountsRes.data)
    if (statsRes.data) setDailyStats(statsRes.data)
    setLoading(false)
  }

  async function generateAIAnalytics() {
    setAnalyzingAI(true)
    try {
      const response = await fetch("/api/ai/social-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accounts,
          dailyStats,
          clientName: "All Clients",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiAnalytics(data)
      }
    } catch (error) {
      console.error("AI Analytics Error:", error)
    }
    setAnalyzingAI(false)
  }

  async function handleRefresh() {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-[#C4D600]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Social Media Analytics</h1>
          <p className="text-gray-400">Real-time data from connected social media accounts</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={generateAIAnalytics}
            disabled={analyzingAI}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {analyzingAI ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                AI Analysis
              </>
            )}
          </Button>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* AI Analytics Panel */}
      {aiAnalytics && (
        <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-white">AI-Powered Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <Target className="h-6 w-6 mx-auto text-[#C4D600] mb-2" />
                <p className="text-3xl font-bold text-white">{aiAnalytics.overallScore}</p>
                <p className="text-sm text-gray-400">Performance Score</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto text-green-400 mb-2" />
                <p className="text-lg font-bold text-white capitalize">{aiAnalytics.growthTrend}</p>
                <p className="text-sm text-gray-400">Growth Trend</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <Share2 className="h-6 w-6 mx-auto text-blue-400 mb-2" />
                <p className="text-lg font-bold text-white capitalize">{aiAnalytics.topPerformingPlatform}</p>
                <p className="text-sm text-gray-400">Top Platform</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <Clock className="h-6 w-6 mx-auto text-orange-400 mb-2" />
                <p className="text-sm font-bold text-white">{aiAnalytics.bestPostingTimes}</p>
                <p className="text-sm text-gray-400">Best Times</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  Key Insights
                </h4>
                <ul className="space-y-2">
                  {aiAnalytics.keyInsights.map((insight, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-[#C4D600]">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-400" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {aiAnalytics.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-400">{i + 1}.</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards - Real data from database */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Followers</p>
                <p className="text-2xl font-bold text-white">{totalFollowers.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">From {accounts.length} accounts</p>
              </div>
              <div className="h-12 w-12 bg-[#C4D600]/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-[#C4D600]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Connected Accounts</p>
                <p className="text-2xl font-bold text-white">{accounts.length}</p>
                <p className="text-xs text-gray-500 mt-1">Active accounts</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Share2 className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Posts</p>
                <p className="text-2xl font-bold text-white">{totalPosts.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Across all platforms</p>
              </div>
              <div className="h-12 w-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Platforms</p>
                <p className="text-2xl font-bold text-white">{Object.keys(platformBreakdown).length}</p>
                <p className="text-xs text-gray-500 mt-1">Connected platforms</p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-[#141414] border border-white/10">
          <TabsTrigger
            value="overview"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="accounts"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Accounts
          </TabsTrigger>
          <TabsTrigger
            value="engagement"
            className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
          >
            Engagement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Distribution - Real data */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Followers by Platform</CardTitle>
                <CardDescription className="text-gray-400">Distribution from connected accounts</CardDescription>
              </CardHeader>
              <CardContent>
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
                    <Share2 className="h-12 w-12 mb-4 opacity-50" />
                    <p>No accounts connected yet</p>
                    <p className="text-sm text-gray-500 mt-1">Add social media accounts to see analytics</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Accounts - Real data */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Top Performing Accounts</CardTitle>
                <CardDescription className="text-gray-400">By follower count (database data)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accounts.slice(0, 5).map((account) => {
                    const Icon = platformIcons[account.platform.toLowerCase()] || Share2
                    return (
                      <div key={account.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${platformColors[account.platform.toLowerCase()]}20` }}
                          >
                            <Icon
                              className="h-5 w-5"
                              style={{ color: platformColors[account.platform.toLowerCase()] }}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white">@{account.account_handle}</p>
                            <p className="text-sm text-gray-400">{account.clients?.name || "Unknown"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">{(account.followers_count || 0).toLocaleString()}</p>
                          <p className="text-xs text-gray-400">followers</p>
                        </div>
                      </div>
                    )
                  })}
                  {accounts.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <p>No accounts connected yet</p>
                      <p className="text-sm text-gray-500 mt-1">Go to Social Accounts to add accounts</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Trend - Real data */}
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Engagement Trend</CardTitle>
              <CardDescription className="text-gray-400">
                {dailyStats.length > 0 ? `Last ${dailyStats.length} days from database` : "No data recorded yet"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dailyStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Line type="monotone" dataKey="likes_count" stroke="#C4D600" name="Likes" />
                    <Line type="monotone" dataKey="comments_count" stroke="#3B82F6" name="Comments" />
                    <Line type="monotone" dataKey="views_count" stroke="#8B5CF6" name="Views" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
                  <TrendingUp className="h-12 w-12 mb-4 opacity-50" />
                  <p>No engagement data recorded yet</p>
                  <p className="text-sm text-gray-500 mt-1">Data will appear as accounts sync</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          {accounts.map((account) => {
            const Icon = platformIcons[account.platform.toLowerCase()] || Share2
            return (
              <Card key={account.id} className="bg-[#141414] border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="h-14 w-14 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${platformColors[account.platform.toLowerCase()]}20` }}
                      >
                        <Icon className="h-7 w-7" style={{ color: platformColors[account.platform.toLowerCase()] }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-lg">@{account.account_handle}</p>
                          {account.is_verified && <Badge className="bg-blue-500/20 text-blue-400">Verified</Badge>}
                        </div>
                        <p className="text-gray-400">{account.clients?.name || "Unknown Client"}</p>
                        <Badge variant="outline" className="mt-1 capitalize border-white/20 text-gray-300">
                          {account.platform}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {(account.followers_count || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">Followers</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {(account.following_count || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">Following</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{(account.posts_count || 0).toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Posts</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {accounts.length === 0 && (
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="py-12 text-center">
                <Share2 className="h-12 w-12 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">No social media accounts connected</p>
                <p className="text-sm text-gray-500">Add client accounts from the Social Accounts page</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Engagement Metrics</CardTitle>
              <CardDescription className="text-gray-400">
                {dailyStats.length > 0 ? "Real data from daily tracking" : "No engagement data available"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dailyStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={dailyStats.slice(-14)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="likes_count" fill="#C4D600" name="Likes" />
                    <Bar dataKey="comments_count" fill="#3B82F6" name="Comments" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center text-gray-400">
                  <Eye className="h-12 w-12 mb-4 opacity-50" />
                  <p>No engagement data available yet</p>
                  <p className="text-sm text-gray-500 mt-1">Connect accounts and sync data to see metrics</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
