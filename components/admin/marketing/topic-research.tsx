"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Lightbulb,
  Search,
  TrendingUp,
  FileText,
  RefreshCw,
  Bookmark,
  HelpCircle,
  Newspaper,
  Sparkles,
  Target,
  Clock,
  ArrowRight,
  Zap,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"

interface ContentIdea {
  title: string
  type: string
  targetKeyword: string
  estimatedWordCount: number
  difficulty: string
  outline: string[]
  hook: string
  cta: string
}

interface TopicResearchResult {
  mainTopic: string
  contentIdeas: ContentIdea[]
  trendingAngles: string[]
  competitorGaps: string[]
}

export function TopicResearchTool() {
  const [searchTopic, setSearchTopic] = useState("")
  const [industry, setIndustry] = useState("digital marketing")
  const [targetAudience, setTargetAudience] = useState("business professionals")
  const [isSearching, setIsSearching] = useState(false)
  const [searched, setSearched] = useState(false)
  const [result, setResult] = useState<TopicResearchResult | null>(null)
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null)
  const [savedTopics, setSavedTopics] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  async function handleSearch() {
    if (!searchTopic.trim()) {
      toast.error("Please enter a topic to research")
      return
    }

    setIsSearching(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/topic-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: searchTopic,
          industry,
          targetAudience,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to research topic")
      }

      const data = await response.json()
      setResult(data)
      setSearched(true)
      toast.success("Topic research complete!")
    } catch (err) {
      console.error("Topic research error:", err)
      setError("Failed to research topic. Please try again.")
      toast.error("Failed to research topic")
    } finally {
      setIsSearching(false)
    }
  }

  function toggleSaveTopic(title: string) {
    setSavedTopics((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
    toast.success(savedTopics.includes(title) ? "Topic removed" : "Topic saved!")
  }

  function getDifficultyColor(difficulty: string) {
    if (difficulty === "easy") return "text-green-400 bg-green-500/20"
    if (difficulty === "medium") return "text-yellow-400 bg-yellow-500/20"
    return "text-red-400 bg-red-500/20"
  }

  function getTypeIcon(type: string) {
    switch (type) {
      case "guide":
      case "how-to":
        return <FileText className="h-4 w-4" />
      case "listicle":
        return <Target className="h-4 w-4" />
      case "comparison":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-[#C4D600]" />
              AI Topic Research
            </h1>
            <p className="text-gray-400 mt-1">AI-powered content ideas with outlines, hooks, and CTAs</p>
          </div>
          <Badge className="bg-[#C4D600]/20 text-[#C4D600] border-[#C4D600]/30">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </Badge>
        </div>

        {/* Search */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  placeholder="Enter a topic (e.g., digital marketing, branding, web design)"
                  value={searchTopic}
                  onChange={(e) => setSearchTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-[#141414] border-[#2a2a2a] text-white pl-10 h-12 text-lg"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-[#C4D600] text-[#0a0a0a] hover:bg-[#d4e600] h-12 px-8"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    AI Researching...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Research with AI
                  </>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Industry</label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="bg-[#141414] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="digital marketing">Digital Marketing</SelectItem>
                    <SelectItem value="branding">Branding & Design</SelectItem>
                    <SelectItem value="web development">Web Development</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="real estate">Real Estate</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Target Audience</label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger className="bg-[#141414] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="business professionals">Business Professionals</SelectItem>
                    <SelectItem value="entrepreneurs">Entrepreneurs</SelectItem>
                    <SelectItem value="marketing managers">Marketing Managers</SelectItem>
                    <SelectItem value="small business owners">Small Business Owners</SelectItem>
                    <SelectItem value="startups">Startups</SelectItem>
                    <SelectItem value="enterprise">Enterprise Companies</SelectItem>
                  </SelectContent>
                </Select>
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

        {searched && result && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Topic Cards */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                AI-Generated Content Ideas ({result.contentIdeas.length})
              </h2>
              <div className="grid gap-4">
                {result.contentIdeas.map((idea, index) => (
                  <Card
                    key={index}
                    className={`bg-[#1a1a1a] border-[#2a2a2a] cursor-pointer transition-all hover:border-[#C4D600]/50 ${
                      selectedIdea?.title === idea.title ? "ring-2 ring-[#C4D600]" : ""
                    }`}
                    onClick={() => setSelectedIdea(idea)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge variant="outline" className="text-xs border-[#C4D600]/30 text-[#C4D600]">
                              {getTypeIcon(idea.type)}
                              <span className="ml-1 capitalize">{idea.type}</span>
                            </Badge>
                            <Badge className={`text-xs border-0 ${getDifficultyColor(idea.difficulty)}`}>
                              {idea.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {idea.estimatedWordCount} words
                            </span>
                          </div>
                          <h3 className="text-white font-semibold text-lg">{idea.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">
                            <span className="text-[#C4D600]">Target:</span> {idea.targetKeyword}
                          </p>
                          <p className="text-gray-500 text-sm mt-2 italic">"{idea.hook}"</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSaveTopic(idea.title)
                          }}
                          className={savedTopics.includes(idea.title) ? "text-[#C4D600]" : "text-gray-400"}
                        >
                          <Bookmark
                            className="h-5 w-5"
                            fill={savedTopics.includes(idea.title) ? "currentColor" : "none"}
                          />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              {/* Selected Idea Details */}
              {selectedIdea && (
                <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#C4D600]" />
                      Content Outline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[250px]">
                      <div className="space-y-2">
                        {selectedIdea.outline.map((section, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-2 rounded bg-[#141414] text-gray-300 text-sm"
                          >
                            <ArrowRight className="h-4 w-4 text-[#C4D600] mt-0.5 flex-shrink-0" />
                            {section}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="mt-4 p-3 bg-[#C4D600]/10 rounded-lg border border-[#C4D600]/30">
                      <p className="text-xs text-gray-400 mb-1">Suggested CTA:</p>
                      <p className="text-sm text-[#C4D600]">{selectedIdea.cta}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Trending Angles */}
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#C4D600]" />
                    Trending Angles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[180px]">
                    <div className="space-y-2">
                      {result.trendingAngles.map((angle, i) => (
                        <div key={i} className="p-2 rounded bg-[#141414] text-gray-300 text-sm flex items-start gap-2">
                          <Newspaper className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          {angle}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Competitor Gaps */}
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#C4D600]" />
                    Content Gaps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[180px]">
                    <div className="space-y-2">
                      {result.competitorGaps.map((gap, i) => (
                        <div
                          key={i}
                          className="p-2 rounded bg-orange-500/10 border border-orange-500/30 text-orange-300 text-sm"
                        >
                          {gap}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Saved Topics */}
              {savedTopics.length > 0 && (
                <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Bookmark className="h-5 w-5 text-[#C4D600]" />
                      Saved Topics ({savedTopics.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {savedTopics.map((topic, i) => (
                        <div
                          key={i}
                          className="p-2 rounded bg-[#C4D600]/10 border border-[#C4D600]/30 text-[#C4D600] text-sm truncate"
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
