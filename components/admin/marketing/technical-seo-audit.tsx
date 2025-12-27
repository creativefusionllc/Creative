"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Globe,
  Lock,
  Smartphone,
  Zap,
  Search,
  RefreshCw,
  Download,
} from "lucide-react"

interface AuditResult {
  category: string
  checks: {
    name: string
    status: "pass" | "fail" | "warning"
    message: string
    recommendation?: string
  }[]
}

export function TechnicalSeoAudit() {
  const [url, setUrl] = useState("creativefusion.ae")
  const [isAuditing, setIsAuditing] = useState(false)
  const [audited, setAudited] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function runAudit() {
    if (!url) return
    setIsAuditing(true)
    setError(null)

    try {
      console.log("[v0] Running REAL SEO audit for:", url)

      const response = await fetch("/api/real-seo-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          keywords: ["creative fusion", "digital marketing dubai", "branding agency uae"],
        }),
      })

      if (!response.ok) {
        throw new Error("SEO scan failed")
      }

      const data = await response.json()
      console.log("[v0] Real scan results:", data)

      setResults(data.scan)
      setAudited(true)
    } catch (err: any) {
      console.error("[v0] Audit error:", err)
      setError(err.message || "Failed to run audit")
    } finally {
      setIsAuditing(false)
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-400" />
      default:
        return null
    }
  }

  function getStatusBg(status: string) {
    switch (status) {
      case "pass":
        return "bg-green-500/10 border-green-500/20"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20"
      case "fail":
        return "bg-red-500/10 border-red-500/20"
      default:
        return ""
    }
  }

  function getCategoryIcon(category: string) {
    switch (category) {
      case "Crawlability":
        return <Search className="h-5 w-5" />
      case "Security":
        return <Lock className="h-5 w-5" />
      case "Performance":
        return <Zap className="h-5 w-5" />
      case "Mobile Usability":
        return <Smartphone className="h-5 w-5" />
      case "Indexability":
        return <XCircle className="h-5 w-5" />
      case "Structured Data":
        return <Zap className="h-5 w-5" />
      default:
        return <Zap className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            Technical SEO Audit (REAL SCAN)
          </h1>
          <p className="text-gray-400 mt-1">Real website analysis - crawls and scans your actual site like SEMrush</p>
        </div>
        {audited && (
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        )}
      </div>

      {/* URL Input */}
      <Card className="bg-[#141414] border-white/10">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                placeholder="Enter website URL (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-white/5 border-white/10 text-white pl-10 h-12"
              />
            </div>
            <Button
              onClick={runAudit}
              disabled={isAuditing}
              className="bg-[#C4D600] text-black hover:bg-[#d4e600] h-12 px-8"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Scanning Website...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run REAL Audit
                </>
              )}
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {audited && results && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-green-400">{results.seoScore}</p>
                <p className="text-gray-400">SEO Score</p>
                <p className="text-xs text-gray-500 mt-1">Based on real analysis</p>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-white">{results.wordCount}</p>
                <p className="text-gray-400">Words</p>
                <p className="text-xs text-gray-500 mt-1">Content length</p>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-red-400">{results.imagesWithoutAlt}</p>
                <p className="text-gray-400">Missing Alt Text</p>
                <p className="text-xs text-gray-500 mt-1">Out of {results.totalImages} images</p>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-yellow-400">{results.issues.length}</p>
                <p className="text-gray-400">Issues Found</p>
                <p className="text-xs text-gray-500 mt-1">Need attention</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Real Scan Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Title Tag</h3>
                <p className="text-gray-300">{results.title}</p>
                {results.title.length > 60 && (
                  <Badge className="mt-2 bg-yellow-500/20 text-yellow-400">
                    Too long ({results.title.length} chars)
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Meta Description</h3>
                <p className="text-gray-300">{results.metaDescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Issues & Recommendations</h3>
                <div className="space-y-2">
                  {results.issues.map((issue: string, i: number) => (
                    <div
                      key={i}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
                    >
                      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-red-400">{issue}</p>
                        {results.recommendations[i] && (
                          <p className="text-gray-400 text-sm mt-1">💡 {results.recommendations[i]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What's Working</h3>
                <div className="space-y-2">
                  {results.hasSSL && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <p className="text-green-400">SSL Certificate Active</p>
                    </div>
                  )}
                  {results.hasViewport && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <p className="text-green-400">Mobile Viewport Configured</p>
                    </div>
                  )}
                  {results.hasSchemaOrg && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <p className="text-green-400">Structured Data Found: {results.schemaTypes.join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
