"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Target, Globe, RefreshCw, Download, CheckCircle, XCircle, AlertTriangle, Zap, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface KeywordGapData {
  keyword: string
  volume: number
  difficulty: number
  yourPosition: number | null
  competitor1Position: number | null
  competitor2Position: number | null
  competitor3Position: number | null
  opportunity: "missing" | "weak" | "strong" | "untapped"
}

export function KeywordGapTool() {
  const [yourDomain, setYourDomain] = useState("")
  const [competitor1, setCompetitor1] = useState("")
  const [competitor2, setCompetitor2] = useState("")
  const [competitor3, setCompetitor3] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [gapData, setGapData] = useState<KeywordGapData[]>([])
  const [filter, setFilter] = useState<string>("all")

  async function analyzeGap() {
    if (!competitor1 && !competitor2 && !competitor3) {
      toast.error("Please enter at least one competitor domain")
      return
    }

    if (!yourDomain) {
      toast.error("Please enter your domain")
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/ai/competitor-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          yourDomain,
          competitors: [competitor1, competitor2, competitor3].filter(Boolean),
        }),
      })

      if (!response.ok) throw new Error("Failed to analyze")

      const data = await response.json()
      setGapData(data.keywordGaps || [])
      setAnalyzed(true)
      toast.success("Keyword gap analysis complete!")
    } catch (error) {
      console.error("Analysis error:", error)
      toast.error("Failed to analyze. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  function getOpportunityBadge(opportunity: string) {
    switch (opportunity) {
      case "missing":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Missing</Badge>
      case "weak":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Weak</Badge>
      case "strong":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Strong</Badge>
      case "untapped":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Untapped</Badge>
      default:
        return null
    }
  }

  function getPositionDisplay(position: number | null) {
    if (position === null) return <span className="text-gray-600">-</span>
    if (position <= 3) return <span className="text-green-400 font-semibold">{position}</span>
    if (position <= 10) return <span className="text-yellow-400">{position}</span>
    return <span className="text-gray-400">{position}</span>
  }

  function getDifficultyColor(difficulty: number) {
    if (difficulty < 40) return "text-green-400"
    if (difficulty < 60) return "text-yellow-400"
    if (difficulty < 80) return "text-orange-400"
    return "text-red-400"
  }

  const filteredData = filter === "all" ? gapData : gapData.filter((d) => d.opportunity === filter)

  const stats = {
    missing: gapData.filter((d) => d.opportunity === "missing").length,
    weak: gapData.filter((d) => d.opportunity === "weak").length,
    strong: gapData.filter((d) => d.opportunity === "strong").length,
    untapped: gapData.filter((d) => d.opportunity === "untapped").length,
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Target className="h-8 w-8 text-[#C4D600]" />
              AI Keyword Gap Analysis
            </h1>
            <p className="text-gray-400 mt-1">AI-powered competitor keyword analysis to find opportunities</p>
          </div>
          <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </Badge>
        </div>

        {/* Domain Inputs */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Compare Domains</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your domain and up to 3 competitor domains for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Your Domain</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C4D600]" />
                  <Input
                    placeholder="yourdomain.com"
                    value={yourDomain}
                    onChange={(e) => setYourDomain(e.target.value)}
                    className="bg-[#141414] border-[#C4D600]/50 text-white pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Competitor 1</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="competitor1.com"
                    value={competitor1}
                    onChange={(e) => setCompetitor1(e.target.value)}
                    className="bg-[#141414] border-[#2a2a2a] text-white pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Competitor 2</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="competitor2.com"
                    value={competitor2}
                    onChange={(e) => setCompetitor2(e.target.value)}
                    className="bg-[#141414] border-[#2a2a2a] text-white pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Competitor 3</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="competitor3.com"
                    value={competitor3}
                    onChange={(e) => setCompetitor3(e.target.value)}
                    className="bg-[#141414] border-[#2a2a2a] text-white pl-10"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={analyzeGap}
              disabled={isAnalyzing}
              className="mt-4 bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  AI Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Analyze with AI
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Stats Cards - Show 0 by default */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            className={`bg-[#1a1a1a] border-[#2a2a2a] cursor-pointer transition-all ${filter === "missing" ? "ring-2 ring-red-500" : ""}`}
            onClick={() => setFilter(filter === "missing" ? "all" : "missing")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Missing Keywords</p>
                  <p className="text-2xl font-bold text-red-400">{stats.missing}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400/50" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Competitors rank, you don't</p>
            </CardContent>
          </Card>

          <Card
            className={`bg-[#1a1a1a] border-[#2a2a2a] cursor-pointer transition-all ${filter === "weak" ? "ring-2 ring-yellow-500" : ""}`}
            onClick={() => setFilter(filter === "weak" ? "all" : "weak")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Weak Keywords</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.weak}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400/50" />
              </div>
              <p className="text-xs text-gray-500 mt-2">You rank lower than competitors</p>
            </CardContent>
          </Card>

          <Card
            className={`bg-[#1a1a1a] border-[#2a2a2a] cursor-pointer transition-all ${filter === "strong" ? "ring-2 ring-green-500" : ""}`}
            onClick={() => setFilter(filter === "strong" ? "all" : "strong")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Strong Keywords</p>
                  <p className="text-2xl font-bold text-green-400">{stats.strong}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400/50" />
              </div>
              <p className="text-xs text-gray-500 mt-2">You outrank competitors</p>
            </CardContent>
          </Card>

          <Card
            className={`bg-[#1a1a1a] border-[#2a2a2a] cursor-pointer transition-all ${filter === "untapped" ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setFilter(filter === "untapped" ? "all" : "untapped")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Untapped Keywords</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.untapped}</p>
                </div>
                <Target className="h-8 w-8 text-blue-400/50" />
              </div>
              <p className="text-xs text-gray-500 mt-2">No one is ranking yet</p>
            </CardContent>
          </Card>
        </div>

        {analyzed && (
          /* Results Table */
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">AI-Generated Keyword Opportunities</CardTitle>
                <CardDescription className="text-gray-400">
                  {filteredData.length} keywords found {filter !== "all" && `(filtered by ${filter})`}
                </CardDescription>
              </div>
              <Button variant="outline" className="border-[#2a2a2a] text-gray-400 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              {filteredData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No keyword data yet. Run AI analysis to discover opportunities.
                </div>
              ) : (
                <div className="rounded-lg border border-[#2a2a2a] overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#2a2a2a] bg-[#141414]">
                        <TableHead className="text-gray-400">Keyword</TableHead>
                        <TableHead className="text-gray-400 text-right">Volume</TableHead>
                        <TableHead className="text-gray-400 text-right">KD%</TableHead>
                        <TableHead className="text-gray-400 text-center">You</TableHead>
                        <TableHead className="text-gray-400 text-center">Comp 1</TableHead>
                        <TableHead className="text-gray-400 text-center">Comp 2</TableHead>
                        <TableHead className="text-gray-400 text-center">Comp 3</TableHead>
                        <TableHead className="text-gray-400">Opportunity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((row, index) => (
                        <TableRow key={index} className="border-[#2a2a2a]">
                          <TableCell className="text-white font-medium">{row.keyword}</TableCell>
                          <TableCell className="text-right text-gray-300">{row.volume.toLocaleString()}</TableCell>
                          <TableCell className={`text-right ${getDifficultyColor(row.difficulty)}`}>
                            {row.difficulty}%
                          </TableCell>
                          <TableCell className="text-center">{getPositionDisplay(row.yourPosition)}</TableCell>
                          <TableCell className="text-center">{getPositionDisplay(row.competitor1Position)}</TableCell>
                          <TableCell className="text-center">{getPositionDisplay(row.competitor2Position)}</TableCell>
                          <TableCell className="text-center">{getPositionDisplay(row.competitor3Position)}</TableCell>
                          <TableCell>{getOpportunityBadge(row.opportunity)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
