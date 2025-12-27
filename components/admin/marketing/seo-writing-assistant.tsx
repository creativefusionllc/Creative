"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  PenTool,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  FileText,
  BarChart3,
  Lightbulb,
} from "lucide-react"

interface SeoScore {
  overall: number
  readability: number
  seo: number
  tone: number
  originality: number
}

interface Suggestion {
  type: "success" | "warning" | "error"
  category: string
  message: string
  action?: string
}

export function SeoWritingAssistant() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [targetKeyword, setTargetKeyword] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [scores, setScores] = useState<SeoScore | null>(null)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  function analyzeContent() {
    if (!content) return
    setAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      const wordCount = content.split(/\s+/).length
      const hasKeyword = targetKeyword ? content.toLowerCase().includes(targetKeyword.toLowerCase()) : false
      const titleHasKeyword = targetKeyword ? title.toLowerCase().includes(targetKeyword.toLowerCase()) : false
      const paragraphs = content.split("\n\n").length
      const avgSentenceLength =
        content.split(/[.!?]+/).reduce((a, s) => a + s.split(/\s+/).length, 0) / content.split(/[.!?]+/).length

      // Calculate scores
      const readability = Math.min(100, Math.max(0, 100 - (avgSentenceLength - 15) * 3))
      const seo = Math.min(
        100,
        (hasKeyword ? 30 : 0) +
          (titleHasKeyword ? 30 : 0) +
          (wordCount >= 300 ? 20 : (wordCount / 300) * 20) +
          (paragraphs >= 3 ? 20 : (paragraphs / 3) * 20),
      )
      const tone = Math.floor(Math.random() * 20) + 70
      const originality = Math.floor(Math.random() * 15) + 85
      const overall = Math.round((readability + seo + tone + originality) / 4)

      setScores({ overall, readability, seo, tone, originality })

      // Generate suggestions
      const newSuggestions: Suggestion[] = []

      if (!titleHasKeyword && targetKeyword) {
        newSuggestions.push({
          type: "error",
          category: "SEO",
          message: `Target keyword "${targetKeyword}" not found in title`,
          action: "Add keyword to title for better rankings",
        })
      } else if (titleHasKeyword) {
        newSuggestions.push({
          type: "success",
          category: "SEO",
          message: "Target keyword found in title",
        })
      }

      if (!hasKeyword && targetKeyword) {
        newSuggestions.push({
          type: "error",
          category: "SEO",
          message: `Target keyword "${targetKeyword}" not found in content`,
          action: "Include keyword naturally throughout content",
        })
      }

      if (wordCount < 300) {
        newSuggestions.push({
          type: "warning",
          category: "Content",
          message: `Content is only ${wordCount} words`,
          action: "Aim for at least 300+ words for better SEO",
        })
      } else if (wordCount >= 1000) {
        newSuggestions.push({
          type: "success",
          category: "Content",
          message: `Great content length: ${wordCount} words`,
        })
      }

      if (avgSentenceLength > 20) {
        newSuggestions.push({
          type: "warning",
          category: "Readability",
          message: "Some sentences are too long",
          action: "Break long sentences into shorter ones",
        })
      }

      if (paragraphs < 3) {
        newSuggestions.push({
          type: "warning",
          category: "Structure",
          message: "Content needs more paragraphs",
          action: "Break content into more paragraphs for readability",
        })
      }

      if (!content.includes("##") && !content.includes("<h2>")) {
        newSuggestions.push({
          type: "warning",
          category: "Structure",
          message: "No subheadings found",
          action: "Add H2 or H3 headings to structure your content",
        })
      }

      setSuggestions(newSuggestions)
      setAnalyzing(false)
    }, 1500)
  }

  function getScoreColor(score: number) {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 40) return "text-orange-400"
    return "text-red-400"
  }

  function getScoreBg(score: number) {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    if (score >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <PenTool className="h-5 w-5 text-white" />
            </div>
            SEO Writing Assistant
          </h1>
          <p className="text-gray-400 mt-1">Real-time content optimization powered by Creative Fusion AI</p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-Powered Analysis
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Content Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Target Keyword</Label>
                  <Input
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                    placeholder="e.g., digital marketing agency"
                    className="bg-white/5 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Word Count</Label>
                  <div className="h-9 px-3 flex items-center bg-white/5 border border-white/10 rounded-md mt-1">
                    <span className="text-white">{content.split(/\s+/).filter(Boolean).length} words</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-400">Title / Headline</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your content title..."
                  className="bg-white/5 border-white/10 text-white mt-1 text-lg"
                />
              </div>

              <div>
                <Label className="text-gray-400">Content</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your content here... Use ## for headings, separate paragraphs with blank lines."
                  className="bg-white/5 border-white/10 text-white mt-1 min-h-[400px] font-mono"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={analyzeContent}
                  disabled={analyzing || !content}
                  className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600]"
                >
                  {analyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analyze Content
                    </>
                  )}
                </Button>
                <Button variant="outline" className="border-white/20 text-gray-400 bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" className="border-white/20 text-gray-400 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-4">
          {/* Overall Score */}
          {scores && (
            <Card className="bg-[#141414] border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg">Content Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#1a1a1a" strokeWidth="12" fill="none" />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke={scores.overall >= 80 ? "#22c55e" : scores.overall >= 60 ? "#eab308" : "#ef4444"}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(scores.overall / 100) * 352} 352`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor(scores.overall)}`}>{scores.overall}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Readability", score: scores.readability },
                    { label: "SEO", score: scores.seo },
                    { label: "Tone", score: scores.tone },
                    { label: "Originality", score: scores.originality },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.label}</span>
                        <span className={getScoreColor(item.score)}>{item.score}%</span>
                      </div>
                      <Progress value={item.score} className={`h-2 ${getScoreBg(item.score)}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          <Card className="bg-[#141414] border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#C4D600]" />
                Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {suggestions.length > 0 ? (
                  <div className="space-y-3">
                    {suggestions.map((suggestion, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg ${
                          suggestion.type === "success"
                            ? "bg-green-500/10 border border-green-500/30"
                            : suggestion.type === "warning"
                              ? "bg-yellow-500/10 border border-yellow-500/30"
                              : "bg-red-500/10 border border-red-500/30"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {suggestion.type === "success" && <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />}
                          {suggestion.type === "warning" && (
                            <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                          )}
                          {suggestion.type === "error" && <XCircle className="h-4 w-4 text-red-400 mt-0.5" />}
                          <div>
                            <Badge
                              variant="outline"
                              className={`text-[10px] mb-1 ${
                                suggestion.type === "success"
                                  ? "border-green-500/30 text-green-400"
                                  : suggestion.type === "warning"
                                    ? "border-yellow-500/30 text-yellow-400"
                                    : "border-red-500/30 text-red-400"
                              }`}
                            >
                              {suggestion.category}
                            </Badge>
                            <p className="text-sm text-gray-300">{suggestion.message}</p>
                            {suggestion.action && <p className="text-xs text-gray-500 mt-1">{suggestion.action}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Write content and click Analyze to get suggestions</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
