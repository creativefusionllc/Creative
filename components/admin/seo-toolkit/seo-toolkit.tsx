"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Globe,
  TrendingUp,
  Link2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  FileSearch,
  ExternalLink,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Users,
  Clock,
  Sparkles,
  Plus,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"

// Mock data for demonstration
const mockKeywordData = [
  { keyword: "digital marketing agency", volume: 12100, difficulty: 67, cpc: 15.5, trend: "up", position: 8 },
  { keyword: "social media marketing", volume: 8100, difficulty: 72, cpc: 12.3, trend: "up", position: 12 },
  { keyword: "branding services", volume: 2900, difficulty: 45, cpc: 8.75, trend: "stable", position: 5 },
  { keyword: "website design company", volume: 6600, difficulty: 58, cpc: 18.2, trend: "down", position: 15 },
  { keyword: "seo services", volume: 14800, difficulty: 78, cpc: 22.4, trend: "up", position: 23 },
  { keyword: "content marketing", volume: 9900, difficulty: 65, cpc: 11.8, trend: "up", position: 18 },
]

const mockSiteAuditData = {
  score: 78,
  issues: {
    critical: 3,
    warnings: 12,
    notices: 28,
  },
  categories: [
    { name: "Performance", score: 85, status: "good" },
    { name: "SEO", score: 72, status: "warning" },
    { name: "Accessibility", score: 68, status: "warning" },
    { name: "Best Practices", score: 82, status: "good" },
    { name: "Security", score: 95, status: "good" },
  ],
  topIssues: [
    { type: "critical", message: "Missing meta descriptions on 5 pages", pages: 5 },
    { type: "critical", message: "Broken internal links found", pages: 3 },
    { type: "critical", message: "Images missing alt text", pages: 8 },
    { type: "warning", message: "Pages with slow load time (>3s)", pages: 7 },
    { type: "warning", message: "Duplicate title tags detected", pages: 4 },
  ],
}

const mockCompetitorData = [
  { domain: "competitor1.com", traffic: 125000, keywords: 2340, backlinks: 15600, da: 58 },
  { domain: "competitor2.com", traffic: 89000, keywords: 1890, backlinks: 12300, da: 52 },
  { domain: "competitor3.com", traffic: 67000, keywords: 1450, backlinks: 8900, da: 45 },
]

const mockBacklinkData = [
  { source: "forbes.com", da: 95, anchor: "digital marketing experts", type: "dofollow", date: "2024-12-01" },
  { source: "entrepreneur.com", da: 92, anchor: "branding agency", type: "dofollow", date: "2024-11-28" },
  { source: "medium.com", da: 88, anchor: "creative services", type: "nofollow", date: "2024-11-25" },
  { source: "linkedin.com", da: 98, anchor: "marketing solutions", type: "nofollow", date: "2024-11-20" },
]

export function SeoToolkit() {
  const [searchDomain, setSearchDomain] = useState("")
  const [keywordSearch, setKeywordSearch] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  function handleAnalyze() {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  function getDifficultyColor(difficulty: number) {
    if (difficulty < 40) return "text-green-400"
    if (difficulty < 60) return "text-yellow-400"
    if (difficulty < 80) return "text-orange-400"
    return "text-red-400"
  }

  function getScoreColor(score: number) {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 40) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Search className="h-5 w-5 text-white" />
              </div>
              SEO Toolkit
            </h1>
            <p className="text-gray-400 mt-1">Professional SEO analysis powered by Creative Fusion</p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by Creative Fusion LLC
          </Badge>
        </div>

        {/* Quick Search */}
        <Card className="bg-[#141414] border-white/10">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={searchDomain}
                  onChange={(e) => setSearchDomain(e.target.value)}
                  placeholder="Enter domain to analyze (e.g., example.com)"
                  className="pl-12 bg-white/5 border-white/10 text-white h-12 text-lg"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-blue-500 hover:bg-blue-600 text-white h-12 px-8"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="keywords" className="space-y-6">
          <TabsList className="bg-[#141414] border border-white/10 p-1">
            <TabsTrigger
              value="keywords"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              <Target className="h-4 w-4 mr-2" />
              Keyword Research
            </TabsTrigger>
            <TabsTrigger
              value="audit"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              <FileSearch className="h-4 w-4 mr-2" />
              Site Audit
            </TabsTrigger>
            <TabsTrigger
              value="competitors"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              <Users className="h-4 w-4 mr-2" />
              Competitor Analysis
            </TabsTrigger>
            <TabsTrigger
              value="backlinks"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              <Link2 className="h-4 w-4 mr-2" />
              Backlink Analysis
            </TabsTrigger>
            <TabsTrigger
              value="rank"
              className="text-gray-400 hover:text-[#C4D600] data-[state=active]:bg-[#C4D600] data-[state=active]:text-[#0a0a0a]"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Rank Tracking
            </TabsTrigger>
          </TabsList>

          {/* Keyword Research */}
          <TabsContent value="keywords" className="space-y-6">
            <Card className="bg-[#141414] border-white/10">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    Keyword Research
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={keywordSearch}
                      onChange={(e) => setKeywordSearch(e.target.value)}
                      placeholder="Search for keywords..."
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-gray-400 font-medium">Keyword</th>
                        <th className="text-right p-4 text-gray-400 font-medium">Volume</th>
                        <th className="text-right p-4 text-gray-400 font-medium">Difficulty</th>
                        <th className="text-right p-4 text-gray-400 font-medium">CPC</th>
                        <th className="text-right p-4 text-gray-400 font-medium">Position</th>
                        <th className="text-center p-4 text-gray-400 font-medium">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockKeywordData.map((kw, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <span className="text-white font-medium">{kw.keyword}</span>
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-white">{kw.volume.toLocaleString()}</span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    kw.difficulty < 40
                                      ? "bg-green-500"
                                      : kw.difficulty < 60
                                        ? "bg-yellow-500"
                                        : kw.difficulty < 80
                                          ? "bg-orange-500"
                                          : "bg-red-500"
                                  }`}
                                  style={{ width: `${kw.difficulty}%` }}
                                />
                              </div>
                              <span className={getDifficultyColor(kw.difficulty)}>{kw.difficulty}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-green-400">${kw.cpc.toFixed(2)}</span>
                          </td>
                          <td className="p-4 text-right">
                            <Badge
                              className={
                                kw.position <= 10
                                  ? "bg-green-500/20 text-green-400 border-0"
                                  : kw.position <= 20
                                    ? "bg-yellow-500/20 text-yellow-400 border-0"
                                    : "bg-gray-500/20 text-gray-400 border-0"
                              }
                            >
                              #{kw.position}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            {kw.trend === "up" && <ArrowUpRight className="h-5 w-5 text-green-400 mx-auto" />}
                            {kw.trend === "down" && <ArrowDownRight className="h-5 w-5 text-red-400 mx-auto" />}
                            {kw.trend === "stable" && <div className="w-5 h-0.5 bg-gray-400 mx-auto rounded-full" />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Audit */}
          <TabsContent value="audit" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Overall Score */}
              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#1f1f1f" strokeWidth="12" fill="none" />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke={
                          mockSiteAuditData.score >= 80
                            ? "#22c55e"
                            : mockSiteAuditData.score >= 60
                              ? "#eab308"
                              : "#ef4444"
                        }
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(mockSiteAuditData.score / 100) * 352} 352`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-4xl font-bold ${getScoreColor(mockSiteAuditData.score)}`}>
                        {mockSiteAuditData.score}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-lg">Site Health Score</h3>
                  <p className="text-gray-400 text-sm">Based on {43} checked pages</p>
                </CardContent>
              </Card>

              {/* Issues Summary */}
              <Card className="bg-[#141414] border-white/10 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Issues Found</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                      <XCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                      <p className="text-3xl font-bold text-red-400">{mockSiteAuditData.issues.critical}</p>
                      <p className="text-sm text-gray-400">Critical</p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                      <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-3xl font-bold text-yellow-400">{mockSiteAuditData.issues.warnings}</p>
                      <p className="text-sm text-gray-400">Warnings</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                      <CheckCircle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-3xl font-bold text-blue-400">{mockSiteAuditData.issues.notices}</p>
                      <p className="text-sm text-gray-400">Notices</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {mockSiteAuditData.topIssues.slice(0, 3).map((issue, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        {issue.type === "critical" ? (
                          <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0" />
                        )}
                        <span className="text-white flex-1">{issue.message}</span>
                        <Badge variant="outline" className="border-white/20 text-gray-400">
                          {issue.pages} pages
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Scores */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Category Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  {mockSiteAuditData.categories.map((cat, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-400 text-sm">{cat.name}</span>
                        <span className={`font-bold ${getScoreColor(cat.score)}`}>{cat.score}</span>
                      </div>
                      <Progress value={cat.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitor Analysis */}
          <TabsContent value="competitors" className="space-y-6">
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  Competitor Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-gray-400 font-medium">Domain</th>
                        <th className="text-right p-4 text-gray-400 font-medium">Traffic</th>
                        <th className="text-right p-4 text-gray-400 font-medium">Keywords</th>
                        <th className="text-right p-4 text-gray-400 font-medium">Backlinks</th>
                        <th className="text-right p-4 text-gray-400 font-medium">DA</th>
                        <th className="text-center p-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCompetitorData.map((comp, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                <Globe className="h-4 w-4 text-gray-400" />
                              </div>
                              <span className="text-white font-medium">{comp.domain}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-white">{comp.traffic.toLocaleString()}</span>
                            <span className="text-gray-500 text-sm"> /mo</span>
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-white">{comp.keywords.toLocaleString()}</span>
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-white">{comp.backlinks.toLocaleString()}</span>
                          </td>
                          <td className="p-4 text-right">
                            <Badge className="bg-blue-500/20 text-blue-400 border-0">{comp.da}</Badge>
                          </td>
                          <td className="p-4 text-center">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {mockCompetitorData.map((comp, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">{comp.domain}</span>
                          <span className="text-white text-sm">{comp.traffic.toLocaleString()}</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            style={{ width: `${(comp.traffic / 150000) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Domain Authority</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-around">
                    {mockCompetitorData.map((comp, i) => (
                      <div key={i} className="text-center">
                        <div className="relative w-20 h-20 mb-2">
                          <svg className="w-20 h-20 transform -rotate-90">
                            <circle cx="40" cy="40" r="35" stroke="#1f1f1f" strokeWidth="6" fill="none" />
                            <circle
                              cx="40"
                              cy="40"
                              r="35"
                              stroke="#3b82f6"
                              strokeWidth="6"
                              fill="none"
                              strokeDasharray={`${(comp.da / 100) * 220} 220`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-white">{comp.da}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs truncate max-w-[80px]">{comp.domain}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Backlink Analysis */}
          <TabsContent value="backlinks" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Link2 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">1,234</p>
                      <p className="text-xs text-gray-400">Total Backlinks</p>
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
                      <p className="text-2xl font-bold text-white">892</p>
                      <p className="text-xs text-gray-400">Dofollow Links</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Globe className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">156</p>
                      <p className="text-xs text-gray-400">Referring Domains</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#141414] border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">+48</p>
                      <p className="text-xs text-gray-400">New This Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Backlinks</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-gray-400 font-medium">Source</th>
                        <th className="text-center p-4 text-gray-400 font-medium">DA</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Anchor Text</th>
                        <th className="text-center p-4 text-gray-400 font-medium">Type</th>
                        <th className="text-right p-4 text-gray-400 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBacklinkData.map((link, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="text-white">{link.source}</span>
                              <ExternalLink className="h-3 w-3 text-gray-500" />
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className="bg-green-500/20 text-green-400 border-0">{link.da}</Badge>
                          </td>
                          <td className="p-4">
                            <span className="text-gray-300">{link.anchor}</span>
                          </td>
                          <td className="p-4 text-center">
                            <Badge
                              className={
                                link.type === "dofollow"
                                  ? "bg-green-500/20 text-green-400 border-0"
                                  : "bg-gray-500/20 text-gray-400 border-0"
                              }
                            >
                              {link.type}
                            </Badge>
                          </td>
                          <td className="p-4 text-right text-gray-400">{link.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rank Tracking */}
          <TabsContent value="rank" className="space-y-6">
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Rank Tracking
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white bg-transparent">
                      <Clock className="h-4 w-4 mr-2" />
                      Last 30 Days
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Keywords
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Tracked Keywords</p>
                    <p className="text-2xl font-bold text-white">24</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Avg. Position</p>
                    <p className="text-2xl font-bold text-white">12.4</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Top 10</p>
                    <p className="text-2xl font-bold text-green-400">8</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Improved</p>
                    <p className="text-2xl font-bold text-blue-400">15</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-gray-400 font-medium">Keyword</th>
                        <th className="text-center p-4 text-gray-400 font-medium">Position</th>
                        <th className="text-center p-4 text-gray-400 font-medium">Change</th>
                        <th className="text-right p-4 text-gray-400 font-medium">Volume</th>
                        <th className="text-right p-4 text-gray-400 font-medium">Traffic</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockKeywordData.map((kw, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <span className="text-white">{kw.keyword}</span>
                          </td>
                          <td className="p-4 text-center">
                            <Badge
                              className={
                                kw.position <= 10
                                  ? "bg-green-500/20 text-green-400 border-0"
                                  : kw.position <= 20
                                    ? "bg-yellow-500/20 text-yellow-400 border-0"
                                    : "bg-gray-500/20 text-gray-400 border-0"
                              }
                            >
                              #{kw.position}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            {kw.trend === "up" && (
                              <span className="flex items-center justify-center gap-1 text-green-400">
                                <ArrowUpRight className="h-4 w-4" />
                                +3
                              </span>
                            )}
                            {kw.trend === "down" && (
                              <span className="flex items-center justify-center gap-1 text-red-400">
                                <ArrowDownRight className="h-4 w-4" />
                                -2
                              </span>
                            )}
                            {kw.trend === "stable" && <span className="text-gray-400">-</span>}
                          </td>
                          <td className="p-4 text-right text-gray-300">{kw.volume.toLocaleString()}</td>
                          <td className="p-4 text-right text-gray-300">
                            {Math.round(kw.volume * (1 / kw.position) * 0.3).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
