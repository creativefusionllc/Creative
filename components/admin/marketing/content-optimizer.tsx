"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Eye,
  Clock,
  Target,
  Lightbulb,
  RefreshCw,
  Zap,
  TrendingUp,
  BookOpen,
} from "lucide-react"
import { toast } from "sonner"

interface ContentScore {
  overall: number
  readability: number
  seo: number
  tone: number
  originality: number
}

interface KeywordAnalysis {
  density: number
  occurrences: number
  inTitle: boolean
  inFirstParagraph: boolean
  inHeadings: boolean
}

interface ReadabilityMetrics {
  fleschScore: number
  gradeLevel: string
  avgSentenceLength: number
  complexWords: number
}

interface Suggestion {
  type: "error" | "warning" | "success" | "info"
  category: string
  message: string
  fix?: string
}

export function ContentOptimizerTool() {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [targetKeyword, setTargetKeyword] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [score, setScore] = useState<ContentScore>({
    overall: 0,
    readability: 0,
    seo: 0,
    tone: 0,
    originality: 0,
  })
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [keywordAnalysis, setKeywordAnalysis] = useState<KeywordAnalysis | null>(null)
  const [readabilityMetrics, setReadabilityMetrics] = useState<ReadabilityMetrics | null>(null)
  const [improvements, setImprovements] = useState<string[]>([])

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const charCount = content.length
  const sentenceCount = content.split(/[.!?]+/).filter(Boolean).length
  const paragraphCount = content.split(/\n\n+/).filter(Boolean).length
  const avgWordsPerSentence = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0

  async function analyzeContent() {
    if (!content.trim()) {
      toast.error("Please enter content to analyze")
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/ai/content-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          targetKeyword,
          title,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze content")
      }

      const data = await response.json()

      setScore(data.scores)
      setSuggestions(data.suggestions)
      setKeywordAnalysis(data.keywordAnalysis)
      setReadabilityMetrics(data.readabilityMetrics)
      setImprovements(data.improvements)
      setAnalyzed(true)
      toast.success("Content analyzed successfully!")
    } catch (error) {
      console.error("Analysis error:", error)
      toast.error("Failed to analyze content. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  function getScoreColor(value: number) {
    if (value >= 80) return "text-green-400"
    if (value >= 60) return "text-yellow-400"
    if (value >= 40) return "text-orange-400"
    return "text-red-400"
  }

  function getScoreBg(value: number) {
    if (value >= 80) return "bg-green-500"
    if (value >= 60) return "bg-yellow-500"
    if (value >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  function getSuggestionIcon(type: string) {
    switch (type) {
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      default:
        return <Lightbulb className="h-5 w-5 text-blue-400" />
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-[#C4D600]" />
              AI Content Optimizer
            </h1>
            <p className="text-gray-400 mt-1">Real AI-powered content scoring & SEO recommendations</p>
          </div>
          <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Editor */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#C4D600]" />
                  Content Editor
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Paste or write your content for AI-powered analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Target Keyword</label>
                    <Input
                      placeholder="e.g., digital marketing agency"
                      value={targetKeyword}
                      onChange={(e) => setTargetKeyword(e.target.value)}
                      className="bg-[#141414] border-[#2a2a2a] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Content Title</label>
                    <Input
                      placeholder="e.g., How to Grow Your Business"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-[#141414] border-[#2a2a2a] text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Content</label>
                  <Textarea
                    placeholder="Paste your article, blog post, or any content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="bg-[#141414] border-[#2a2a2a] text-white min-h-[400px] font-mono text-sm"
                  />
                </div>

                {/* Content Stats */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FileText className="h-4 w-4" />
                    <span>{wordCount} words</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>{charCount} characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>{sentenceCount} sentences</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>{paragraphCount} paragraphs</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>~{Math.ceil(wordCount / 200)} min read</span>
                  </div>
                </div>

                <Button
                  onClick={analyzeContent}
                  disabled={isAnalyzing}
                  className="w-full bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]"
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

            {/* Keyword Analysis */}
            {analyzed && keywordAnalysis && (
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#C4D600]" />
                    Keyword Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="p-3 bg-[#141414] rounded-lg">
                      <p className="text-xs text-gray-400">Density</p>
                      <p
                        className={`text-xl font-bold ${keywordAnalysis.density >= 1 && keywordAnalysis.density <= 2 ? "text-green-400" : "text-yellow-400"}`}
                      >
                        {keywordAnalysis.density.toFixed(2)}%
                      </p>
                    </div>
                    <div className="p-3 bg-[#141414] rounded-lg">
                      <p className="text-xs text-gray-400">Occurrences</p>
                      <p className="text-xl font-bold text-white">{keywordAnalysis.occurrences}</p>
                    </div>
                    <div className="p-3 bg-[#141414] rounded-lg">
                      <p className="text-xs text-gray-400">In Title</p>
                      <p className={`text-xl font-bold ${keywordAnalysis.inTitle ? "text-green-400" : "text-red-400"}`}>
                        {keywordAnalysis.inTitle ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="p-3 bg-[#141414] rounded-lg">
                      <p className="text-xs text-gray-400">In First Para</p>
                      <p
                        className={`text-xl font-bold ${keywordAnalysis.inFirstParagraph ? "text-green-400" : "text-red-400"}`}
                      >
                        {keywordAnalysis.inFirstParagraph ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="p-3 bg-[#141414] rounded-lg">
                      <p className="text-xs text-gray-400">In Headings</p>
                      <p
                        className={`text-xl font-bold ${keywordAnalysis.inHeadings ? "text-green-400" : "text-yellow-400"}`}
                      >
                        {keywordAnalysis.inHeadings ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Readability Metrics */}
            {analyzed && readabilityMetrics && (
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#C4D600]" />
                    Readability Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-[#141414] rounded-lg">
                      <p className="text-xs text-gray-400">Flesch Score</p>
                      <p
                        className={`text-xl font-bold ${readabilityMetrics.fleschScore >= 60 ? "text-green-400" : readabilityMetrics.fleschScore >= 40 ? "text-yellow-400" : "text-red-400"}`}
                      >
                        {readabilityMetrics.fleschScore}
                      </p>
                    </div>
                    <div className="p-3 bg-[#141414] rounded-lg">
                      <p className="text-xs text-gray-400">Grade Level</p>
                      <p className="text-xl font-bold text-white">{readabilityMetrics.gradeLevel}</p>
                    </div>
                    <div className="p-3 bg-[#141414] rounded-lg">
                      <p className="text-xs text-gray-400">Avg Sentence</p>
                      <p
                        className={`text-xl font-bold ${readabilityMetrics.avgSentenceLength <= 20 ? "text-green-400" : "text-yellow-400"}`}
                      >
                        {readabilityMetrics.avgSentenceLength} words
                      </p>
                    </div>
                    <div className="p-3 bg-[#141414] rounded-lg">
                      <p className="text-xs text-gray-400">Complex Words</p>
                      <p className="text-xl font-bold text-white">{readabilityMetrics.complexWords}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Score Panel */}
          <div className="space-y-4">
            {/* Overall Score */}
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Content Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-4">
                  <div className={`text-6xl font-bold ${analyzed ? getScoreColor(score.overall) : "text-gray-600"}`}>
                    {analyzed ? score.overall : "--"}
                  </div>
                  <p className="text-gray-400 mt-2">
                    {analyzed
                      ? score.overall >= 80
                        ? "Excellent!"
                        : score.overall >= 60
                          ? "Good, room to improve"
                          : "Needs improvement"
                      : "Analyze to see score"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Individual Scores */}
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Readability", value: score.readability, icon: Eye },
                  { label: "SEO", value: score.seo, icon: Search },
                  { label: "Tone of Voice", value: score.tone, icon: Target },
                  { label: "Originality", value: score.originality, icon: Sparkles },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </span>
                      <span className={analyzed ? getScoreColor(item.value) : "text-gray-600"}>
                        {analyzed ? item.value : "--"}%
                      </span>
                    </div>
                    <Progress value={analyzed ? item.value : 0} className="h-2 bg-[#2a2a2a]" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Improvements */}
            {analyzed && improvements.length > 0 && (
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#C4D600]" />
                    Top Improvements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-[#C4D600] font-bold">{index + 1}.</span>
                        <span className="text-gray-300">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Suggestions */}
        {analyzed && suggestions.length > 0 && (
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#C4D600]" />
                AI Optimization Suggestions
              </CardTitle>
              <CardDescription className="text-gray-400">
                {suggestions.filter((s) => s.type === "error" || s.type === "warning").length} issues found,{" "}
                {suggestions.filter((s) => s.type === "success").length} items optimized
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      suggestion.type === "error"
                        ? "bg-red-500/10 border-red-500/30"
                        : suggestion.type === "warning"
                          ? "bg-yellow-500/10 border-yellow-500/30"
                          : suggestion.type === "success"
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-blue-500/10 border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getSuggestionIcon(suggestion.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                            {suggestion.category}
                          </Badge>
                        </div>
                        <p className="text-white text-sm">{suggestion.message}</p>
                        {suggestion.fix && (
                          <p className="text-gray-400 text-sm mt-1">
                            <span className="text-[#C4D600]">Fix:</span> {suggestion.fix}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
