"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  RefreshCw,
  Filter,
  Bell,
  Target,
  ArrowUp,
  ArrowDown,
  Globe,
  Sparkles,
  Zap,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { toast } from "sonner"

interface KeywordRanking {
  keyword: string
  current: number
  previous: number
  best: number
  searchVolume: number
  url: string
}

export function PositionTrackingDashboard() {
  const [positionHistory, setPositionHistory] = useState<any[]>([])
  const [keywords, setKeywords] = useState<KeywordRanking[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("30")
  const [refreshing, setRefreshing] = useState(false)
  const [domain, setDomain] = useState("")
  const [tracked, setTracked] = useState(false)

  const filteredKeywords = keywords.filter((k) => k.keyword.toLowerCase().includes(searchQuery.toLowerCase()))

  const improved = keywords.filter((k) => k.current < k.previous).length
  const declined = keywords.filter((k) => k.current > k.previous).length
  const unchanged = keywords.filter((k) => k.current === k.previous).length
  const top10 = keywords.filter((k) => k.current <= 10).length
  const avgPosition =
    keywords.length > 0 ? Math.round(keywords.reduce((sum, k) => sum + k.current, 0) / keywords.length) : 0

  async function handleTrack() {
    if (!domain) {
      toast.error("Please enter a domain to track")
      return
    }

    setRefreshing(true)

    try {
      const response = await fetch("/api/ai/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: domain }),
      })

      if (!response.ok) throw new Error("Failed to track")

      const data = await response.json()

      // Generate position data from AI response
      if (data.keywords) {
        setKeywords(data.keywords)
        // Generate history data
        const history = []
        const today = new Date()
        for (let i = 30; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          const entry: any = { date: date.toISOString().split("T")[0] }
          data.keywords.slice(0, 4).forEach((kw: any) => {
            entry[kw.keyword] = kw.current + Math.floor(Math.random() * 5) - 2
          })
          history.push(entry)
        }
        setPositionHistory(history)
      }

      setTracked(true)
      toast.success("Position tracking started!")
    } catch (error) {
      console.error("Tracking error:", error)
      toast.error("Failed to track positions")
    } finally {
      setRefreshing(false)
    }
  }

  function getPositionBadge(current: number, previous: number) {
    const diff = previous - current
    if (diff > 0) {
      return (
        <Badge className="bg-green-500/20 text-green-400 border-0">
          <ArrowUp className="h-3 w-3 mr-1" />+{diff}
        </Badge>
      )
    } else if (diff < 0) {
      return (
        <Badge className="bg-red-500/20 text-red-400 border-0">
          <ArrowDown className="h-3 w-3 mr-1" />
          {diff}
        </Badge>
      )
    }
    return (
      <Badge className="bg-gray-500/20 text-gray-400 border-0">
        <Minus className="h-3 w-3 mr-1" />0
      </Badge>
    )
  }

  function getPositionColor(position: number) {
    if (position <= 3) return "text-green-400"
    if (position <= 10) return "text-[#C4D600]"
    if (position <= 20) return "text-yellow-400"
    if (position <= 50) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              AI Position Tracking
            </h1>
            <p className="text-gray-400 mt-1">AI-powered keyword ranking monitoring</p>
          </div>
          <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </Badge>
        </div>

        {/* Domain Input */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-400 mb-2 block">Domain to Track</label>
                <Input
                  placeholder="Enter your domain (e.g., creativefusion.ae)"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="bg-[#141414] border-[#2a2a2a] text-white"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleTrack}
                  disabled={refreshing}
                  className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]"
                >
                  {refreshing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      AI Tracking...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Start Tracking
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats - Show 0 by default */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">{keywords.length}</p>
              <p className="text-xs text-gray-400">Keywords Tracked</p>
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-green-400">{improved}</p>
              <p className="text-xs text-gray-400">Improved</p>
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingDown className="h-5 w-5 text-red-400" />
              </div>
              <p className="text-2xl font-bold text-red-400">{declined}</p>
              <p className="text-xs text-gray-400">Declined</p>
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-[#C4D600]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Sparkles className="h-5 w-5 text-[#C4D600]" />
              </div>
              <p className="text-2xl font-bold text-[#C4D600]">{top10}</p>
              <p className="text-xs text-gray-400">Top 10</p>
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-white/10">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">#{avgPosition || "--"}</p>
              <p className="text-xs text-gray-400">Avg. Position</p>
            </CardContent>
          </Card>
        </div>

        {tracked && positionHistory.length > 0 && (
          /* Position History Chart */
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-white">Position History</CardTitle>
                  <CardDescription className="text-gray-400">Track ranking changes over time</CardDescription>
                </div>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="14">Last 14 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={positionHistory.slice(-Number.parseInt(selectedTimeRange))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" fontSize={12} />
                  <YAxis reversed stroke="#666" fontSize={12} domain={[1, "auto"]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  {keywords.slice(0, 4).map((kw, i) => (
                    <Line
                      key={kw.keyword}
                      type="monotone"
                      dataKey={kw.keyword}
                      stroke={["#C4D600", "#3B82F6", "#10B981", "#F59E0B"][i]}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Lower position = better ranking (Position 1 is best)
              </p>
            </CardContent>
          </Card>
        )}

        {/* Keywords Table */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-white">Keyword Rankings</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white/5 border-white/10 text-white w-64"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredKeywords.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No keywords tracked yet. Enter a domain and start tracking to see rankings.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-gray-400 font-medium">Keyword</th>
                      <th className="text-center p-4 text-gray-400 font-medium">Current</th>
                      <th className="text-center p-4 text-gray-400 font-medium">Change</th>
                      <th className="text-center p-4 text-gray-400 font-medium">Best</th>
                      <th className="text-right p-4 text-gray-400 font-medium">Search Volume</th>
                      <th className="text-left p-4 text-gray-400 font-medium">URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKeywords.map((kw, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <span className="text-white font-medium">{kw.keyword}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`text-xl font-bold ${getPositionColor(kw.current)}`}>#{kw.current}</span>
                        </td>
                        <td className="p-4 text-center">{getPositionBadge(kw.current, kw.previous)}</td>
                        <td className="p-4 text-center">
                          <span className="text-gray-400">#{kw.best}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-white">{kw.searchVolume.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-400 text-sm truncate max-w-[150px] block">{kw.url}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Position Alerts */}
        <Card className="bg-gradient-to-r from-[#141414] to-[#1a1a1a] border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Bell className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Position Alerts</h3>
                <p className="text-gray-400 text-sm">Get notified when keywords move up or down significantly</p>
              </div>
              <Button className="bg-[#C4D600] text-black hover:bg-[#d4e600]">
                <Bell className="h-4 w-4 mr-2" />
                Configure Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
