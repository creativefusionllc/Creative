"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, FileText, Search, TrendingUp, Copy, Download, Zap } from "lucide-react"

export function AIContentWriter() {
  const [topic, setTopic] = useState("")
  const [contentType, setContentType] = useState("blog")
  const [tone, setTone] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [seoScore, setSeoScore] = useState(0)

  const handleGenerate = async () => {
    if (!topic) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, contentType, tone }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedContent(data.content)
        setSeoScore(data.seoScore)
      }
    } catch (error) {
      console.error("[v0] Content generation error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            AI Content Writer
          </h1>
          <p className="text-gray-600 mt-2">Generate SEO-optimized content with AI</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Content Generated</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">248</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. SEO Score</p>
              <p className="text-3xl font-bold text-green-600 mt-1">92</p>
            </div>
            <Search className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Time Saved</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">420h</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">186</p>
            </div>
            <Zap className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Content Generator */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Content Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Topic or Keyword</label>
              <Input
                placeholder="e.g., Digital Marketing Trends 2025"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Content Type</label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog Post</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="social">Social Media Post</SelectItem>
                  <SelectItem value="email">Email Newsletter</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                  <SelectItem value="product">Product Description</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="informative">Informative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!topic || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>

          {/* AI Features */}
          <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              AI Features
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ SEO keyword optimization</li>
              <li>✓ Readability scoring</li>
              <li>✓ Grammar & spelling check</li>
              <li>✓ Meta descriptions</li>
              <li>✓ Title suggestions</li>
            </ul>
          </div>
        </Card>

        {/* Output Panel */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Generated Content</h2>
            {generatedContent && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            )}
          </div>

          {generatedContent ? (
            <div className="space-y-4">
              {seoScore > 0 && (
                <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">SEO Score</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-green-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600" style={{ width: `${seoScore}%` }} />
                      </div>
                      <span className="text-sm font-bold text-green-800">{seoScore}%</span>
                    </div>
                  </div>
                  <Badge className="bg-green-600">Excellent</Badge>
                </div>
              )}

              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center">
                <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Your AI-generated content will appear here</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Templates */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Quick Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left">
            <h3 className="font-semibold mb-1">Blog Post</h3>
            <p className="text-sm text-gray-600">2000+ words, SEO optimized</p>
          </button>
          <button className="p-4 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <h3 className="font-semibold mb-1">Social Media</h3>
            <p className="text-sm text-gray-600">Engaging posts with hashtags</p>
          </button>
          <button className="p-4 border-2 border-dashed rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left">
            <h3 className="font-semibold mb-1">Email Campaign</h3>
            <p className="text-sm text-gray-600">Conversion-focused emails</p>
          </button>
        </div>
      </Card>
    </div>
  )
}
