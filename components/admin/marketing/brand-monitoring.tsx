"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Bell,
  MessageSquare,
  TrendingUp,
  Globe,
  Twitter,
  Linkedin,
  Instagram,
  ExternalLink,
  Search,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Sparkles,
  AlertTriangle,
  Zap,
  AlertCircle,
  Target,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { toast } from "sonner"

interface Mention {
  source: string
  platform: string
  sentiment: string
  snippet: string
  date: string
  reach: number
  engagement: number
}

interface SentimentTrend {
  period: string
  positive: number
  neutral: number
  negative: number
}

interface TopTopic {
  topic: string
  count: number
  sentiment: string
}

interface Alert {
  type: string
  message: string
  priority: string
}

interface BrandMonitorResult {
  brandName: string
  overallSentiment: {
    score: number
    label: string
  }
  mentions: Mention[]
  sentimentTrend: SentimentTrend[]
  topTopics: TopTopic[]
  alerts: Alert[]
  recommendations: string[]
}

export function BrandMonitoringDashboard() {
  const [brandName, setBrandName] = useState("Creative Fusion LLC")
  const [industry, setIndustry] = useState("Digital Marketing Agency")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [monitored, setMonitored] = useState(false)
  const [result, setResult] = useState<BrandMonitorResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleMonitor() {
    if (!brandName.trim()) {
      toast.error("Please enter a brand name")
      return
    }

    setIsMonitoring(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/brand-monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName,
          industry,
          competitors: ["Competitor A", "Competitor B"],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to monitor brand")
      }

      const data = await response.json()
      setResult(data)
      setMonitored(true)
      toast.success("Brand monitoring complete!")
    } catch (err) {
      console.error("Brand monitoring error:", err)
      setError("Failed to monitor brand. Please try again.")
      toast.error("Failed to monitor brand")
    } finally {
      setIsMonitoring(false)
    }
  }

  function getSourceIcon(platform: string) {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  function getSentimentBadge(sentiment: string) {
    switch (sentiment) {
      case "positive":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-0">
            <ThumbsUp className="h-3 w-3 mr-1" />
            Positive
          </Badge>
        )
      case "negative":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-0">
            <ThumbsDown className="h-3 w-3 mr-1" />
            Negative
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-0">
            <Minus className="h-3 w-3 mr-1" />
            Neutral
          </Badge>
        )
    }
  }

  function getSentimentColor(label: string) {
    if (label === "very_positive" || label === "positive") return "text-green-400"
    if (label === "neutral") return "text-gray-400"
    return "text-red-400"
  }

  function getAlertIcon(type: string) {
    switch (type) {
      case "crisis":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case "spike":
        return <TrendingUp className="h-4 w-4 text-blue-400" />
      case "opportunity":
        return <Target className="h-4 w-4 text-green-400" />
      default:
        return <Bell className="h-4 w-4 text-yellow-400" />
    }
  }

  // Convert sentiment trend to chart format
  const chartData =
    result?.sentimentTrend.map((trend) => ({
      date: trend.period,
      positive: trend.positive,
      neutral: trend.neutral,
      negative: trend.negative,
      total: trend.positive + trend.neutral + trend.negative,
    })) || []

  // Calculate sentiment pie data
  const sentimentPieData = result
    ? [
        { name: "Positive", value: result.mentions.filter((m) => m.sentiment === "positive").length, color: "#22c55e" },
        { name: "Neutral", value: result.mentions.filter((m) => m.sentiment === "neutral").length, color: "#6b7280" },
        { name: "Negative", value: result.mentions.filter((m) => m.sentiment === "negative").length, color: "#ef4444" },
      ]
    : []

  const filteredMentions =
    result?.mentions.filter(
      (m) =>
        m.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.source.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-white" />
              </div>
              AI Brand Monitoring
            </h1>
            <p className="text-gray-400 mt-1">AI-powered mention tracking, sentiment analysis, and alerts</p>
          </div>
          <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </Badge>
        </div>

        {/* Search Panel */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Brand Name</label>
                <Input
                  placeholder="Enter your brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="bg-[#141414] border-[#2a2a2a] text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Industry</label>
                <Input
                  placeholder="e.g., Digital Marketing Agency"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-[#141414] border-[#2a2a2a] text-white"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleMonitor}
                  disabled={isMonitoring}
                  className="w-full bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]"
                >
                  {isMonitoring ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      AI Monitoring...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Monitor Brand
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {monitored && result && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                    <Badge className="bg-green-500/20 text-green-400 border-0 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-white">{result.mentions.length}</p>
                  <p className="text-xs text-gray-400">Total Mentions</p>
                </CardContent>
              </Card>

              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <ThumbsUp className="h-5 w-5 text-green-400" />
                  </div>
                  <p className={`text-2xl font-bold ${getSentimentColor(result.overallSentiment.label)}`}>
                    {result.overallSentiment.score > 0 ? "+" : ""}
                    {result.overallSentiment.score}
                  </p>
                  <p className="text-xs text-gray-400">Sentiment Score</p>
                </CardContent>
              </Card>

              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Globe className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {(result.mentions.reduce((acc, m) => acc + m.reach, 0) / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-gray-400">Total Reach</p>
                </CardContent>
              </Card>

              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{result.alerts.length}</p>
                  <p className="text-xs text-gray-400">Active Alerts</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Sentiment Breakdown */}
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Sentiment Analysis</CardTitle>
                  <CardDescription className="text-gray-400">AI-powered brand perception</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={sentimentPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sentimentPieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {sentimentPieData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-gray-400">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mentions Trend */}
              <Card className="bg-[#141414] border-white/10 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Sentiment Trend</CardTitle>
                  <CardDescription className="text-gray-400">Sentiment distribution over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="positive"
                        stackId="1"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="neutral"
                        stackId="1"
                        stroke="#6b7280"
                        fill="#6b7280"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="negative"
                        stackId="1"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            {result.alerts.length > 0 && (
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    AI Alerts & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {result.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          alert.priority === "high"
                            ? "bg-red-500/10 border-red-500/30"
                            : alert.priority === "medium"
                              ? "bg-yellow-500/10 border-yellow-500/30"
                              : "bg-blue-500/10 border-blue-500/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {getAlertIcon(alert.type)}
                          <div>
                            <Badge
                              className={`text-xs mb-2 ${
                                alert.priority === "high"
                                  ? "bg-red-500/20 text-red-400"
                                  : alert.priority === "medium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {alert.type.toUpperCase()}
                            </Badge>
                            <p className="text-sm text-gray-300">{alert.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Mentions */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">AI-Generated Mentions</CardTitle>
                    <CardDescription className="text-gray-400">Simulated brand mentions across the web</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search mentions..."
                      className="pl-9 bg-white/5 border-white/10 text-white w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMentions.map((mention, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              mention.platform === "twitter"
                                ? "bg-blue-500/20 text-blue-400"
                                : mention.platform === "linkedin"
                                  ? "bg-blue-600/20 text-blue-500"
                                  : mention.platform === "instagram"
                                    ? "bg-pink-500/20 text-pink-400"
                                    : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {getSourceIcon(mention.platform)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white">{mention.source}</span>
                              {getSentimentBadge(mention.sentiment)}
                            </div>
                            <p className="text-gray-300 text-sm">{mention.snippet}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{mention.date}</span>
                              <span>Reach: {mention.reach.toLocaleString()}</span>
                              <span>Engagement: {mention.engagement.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Topics & Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-[#C4D600]" />
                    Top Discussed Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.topTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-medium">{topic.topic}</span>
                          {getSentimentBadge(topic.sentiment)}
                        </div>
                        <span className="text-gray-400 text-sm">{topic.count} mentions</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#C4D600]" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="p-3 bg-[#C4D600]/10 border border-[#C4D600]/30 rounded-lg">
                        <p className="text-sm text-gray-300">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
