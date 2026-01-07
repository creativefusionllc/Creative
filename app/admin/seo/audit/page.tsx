"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Zap,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  TrendingUp,
  Clock,
  Shield,
  Eye,
  Smartphone,
} from "lucide-react"
import { toast } from "sonner"
import type { SEOAuditResult } from "@/lib/seo/seo-audit-engine"

export default function SEOAuditPage() {
  const [url, setUrl] = useState("")
  const [auditing, setAuditing] = useState(false)
  const [results, setResults] = useState<SEOAuditResult | null>(null)

  async function handleAudit() {
    if (!url) {
      toast.error("Please enter a URL to audit")
      return
    }

    setAuditing(true)
    setResults(null)

    try {
      const response = await fetch("/api/seo/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Audit failed")
      }

      const data = await response.json()
      setResults(data.results)
      toast.success(`SEO Audit complete! Score: ${data.results.overallScore}/100`)
    } catch (error) {
      console.error("Audit error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to perform audit")
    } finally {
      setAuditing(false)
    }
  }

  function getScoreColor(score: number) {
    if (score >= 80) return "text-green-400"
    if (score >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  function getSeverityIcon(severity: string) {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-orange-400" />
      case "warning":
        return <Info className="h-4 w-4 text-yellow-400" />
      default:
        return <CheckCircle2 className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Search className="h-6 w-6 text-white" />
            </div>
            Real SEO Audit Engine
          </h1>
          <p className="text-gray-400 mt-2">Perform comprehensive SEO analysis like SEMrush - with actual results</p>
        </div>

        {/* Audit Input */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-400 mb-2 block">Website URL to Audit</label>
                <Input
                  placeholder="https://creativefusion.llc"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAudit()}
                  className="bg-[#141414] border-[#2a2a2a] text-white"
                  disabled={auditing}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleAudit}
                  disabled={auditing || !url}
                  className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600] min-w-[140px]"
                >
                  {auditing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Auditing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Start Audit
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <>
            {/* Overall Score */}
            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Overall SEO Score</h2>
                    <p className="text-gray-400">Comprehensive analysis of {url}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-7xl font-bold ${getScoreColor(results.overallScore)}`}>
                      {results.overallScore}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">out of 100</p>
                  </div>
                </div>
                <Progress value={results.overallScore} className="mt-6 h-3" />
              </CardContent>
            </Card>

            {/* Category Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="bg-[#1a1a1a] border-gray-800">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <p className={`text-3xl font-bold ${getScoreColor(results.performance.score)}`}>
                    {Math.round(results.performance.score)}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Performance</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1a1a] border-gray-800">
                <CardContent className="p-6 text-center">
                  <Search className="h-8 w-8 text-[#C4D600] mx-auto mb-3" />
                  <p className={`text-3xl font-bold ${getScoreColor(results.seo.score)}`}>{results.seo.score}</p>
                  <p className="text-sm text-gray-400 mt-2">SEO</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1a1a] border-gray-800">
                <CardContent className="p-6 text-center">
                  <Eye className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <p className={`text-3xl font-bold ${getScoreColor(results.accessibility.score)}`}>
                    {results.accessibility.score}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Accessibility</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1a1a] border-gray-800">
                <CardContent className="p-6 text-center">
                  <Smartphone className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <p className={`text-3xl font-bold ${getScoreColor(results.mobile.score)}`}>{results.mobile.score}</p>
                  <p className="text-sm text-gray-400 mt-2">Mobile</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1a1a] border-gray-800">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                  <p className={`text-3xl font-bold ${getScoreColor(results.technical.score)}`}>
                    {results.technical.score}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Technical</p>
                </CardContent>
              </Card>
            </div>

            {/* Issues */}
            <Card className="bg-[#1a1a1a] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Issues Found ({results.issues.length})</CardTitle>
                <CardDescription className="text-gray-400">Problems that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                {results.issues.length === 0 ? (
                  <Alert className="bg-green-500/10 border-green-500/30">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-green-400">
                      No issues found! Your website is well-optimized.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {results.issues.map((issue, i) => (
                      <Alert
                        key={i}
                        className={
                          issue.severity === "critical"
                            ? "bg-red-500/10 border-red-500/30"
                            : issue.severity === "error"
                              ? "bg-orange-500/10 border-orange-500/30"
                              : "bg-yellow-500/10 border-yellow-500/30"
                        }
                      >
                        {getSeverityIcon(issue.severity)}
                        <AlertDescription>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {issue.category}
                              </Badge>
                              <span className="text-white font-medium">{issue.message}</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                              <strong>Fix:</strong> {issue.fix}
                            </p>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-[#1a1a1a] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">AI Recommendations</CardTitle>
                <CardDescription className="text-gray-400">Steps to improve your SEO score</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-[#C4D600] mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Top Keywords */}
            <Card className="bg-[#1a1a1a] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Top Keywords ({results.keywords.length})</CardTitle>
                <CardDescription className="text-gray-400">Most frequent keywords on the page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.keywords.slice(0, 10).map((kw, i) => (
                    <div key={i} className="bg-[#141414] p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{kw.keyword}</span>
                        <Badge variant="outline" className="text-[#C4D600]">
                          {kw.frequency}x
                        </Badge>
                      </div>
                      <div className="flex gap-2 text-xs">
                        {kw.inTitle && <Badge className="bg-green-500/20 text-green-400">Title</Badge>}
                        {kw.inMeta && <Badge className="bg-blue-500/20 text-blue-400">Meta</Badge>}
                        {kw.inH1 && <Badge className="bg-purple-500/20 text-purple-400">H1</Badge>}
                      </div>
                      <Progress value={kw.density * 10} className="mt-2 h-1" />
                      <p className="text-xs text-gray-500 mt-1">Density: {kw.density.toFixed(2)}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
